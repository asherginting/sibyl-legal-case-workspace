import {
  PrismaClient,
  UserRole,
  CaseAccessStatus,
  Prisma,
  CaseStatus,
} from "@prisma/client";
import { BrowseCasesQuery, CaseCardDTO, CaseDetailDTO } from "./cases.types";

const prisma = new PrismaClient();

export async function browseCases(
  query: BrowseCasesQuery,
  user: { id: string; role: UserRole },
) {
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Number(query.limit) || 5, 100);
  const skip = (page - 1) * limit;

  const where: any = {};

  if (query.search) {
    where.OR = [
      { title: { contains: query.search, mode: "insensitive" } },
      { description: { contains: query.search, mode: "insensitive" } },
    ];
  }

  if (query.category) where.category = query.category;
  if (query.jurisdiction) where.jurisdiction = query.jurisdiction;

  if (query.posted === "7d") {
    where.createdAt = { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) };
  }
  if (query.posted === "30d") {
    where.createdAt = { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) };
  }

  if (user.role === UserRole.CLIENT) {
    where.ownerId = user.id;
  } else {
    where.access = {
      some: { lawyerId: user.id },
    };
  }

  const orderBy: Prisma.CaseOrderByWithRelationInput =
    query.sort === "oldest"
      ? { createdAt: Prisma.SortOrder.asc }
      : { createdAt: Prisma.SortOrder.desc };

  const [cases, total] = await prisma.$transaction([
    prisma.case.findMany({
      where,
      skip,
      take: limit,
      orderBy,
      include: {
        owner: true,
        access: {
          where: { lawyerId: user.id },
        },
        _count: {
          select: { documents: true },
        },
      },
    }),
    prisma.case.count({ where }),
  ]);

  const data: CaseCardDTO[] = cases.map((c) => {
    const access = c.access[0] || null;
    const status = access?.status ?? null;

    const canOpen = status === CaseAccessStatus.GRANTED;
    const canWithdraw = status === CaseAccessStatus.REVOKED;
    const canRequestAccess = status === null;

    return {
      id: c.id,
      title: c.title,
      description: c.description ?? "",
      category: c.category,
      jurisdiction: c.jurisdiction ?? "",
      createdAt: c.createdAt,
      clientLabel: `Client: ${c.owner.email[0].toUpperCase()}`,
      attachmentsCount: c._count.documents,

      access: {
        status: access?.status ?? null,
        grantedAt: access?.createdAt ?? null,
      },

      actions: {
        canOpen,
        canWithdraw,
        canRequestAccess,
      },
    };
  });

  return {
    response_code: 200,
    response_message: "Success",
    data,
    page: {
      page_number: page,
      page_size: data.length,
      limit,
      total,
    },
  };
}

export async function getCaseDetail(
  caseId: string,
  user: { id: string; role: UserRole },
): Promise<CaseDetailDTO> {
  const caseRow = await prisma.case.findUnique({
    where: { id: caseId },
    include: {
      owner: true,
      access: true,
    },
  });

  if (!caseRow) {
    throw { status: 404, message: "CASE_NOT_FOUND" };
  }

  if (user.role === UserRole.CLIENT) {
    if (caseRow.ownerId !== user.id) {
      throw { status: 403, message: "FORBIDDEN" };
    }
  }

  if (user.role === UserRole.LAWYER) {
    const granted = caseRow.access.some(
      (a) => a.lawyerId === user.id && a.status === CaseAccessStatus.GRANTED,
    );

    if (!granted) {
      throw { status: 404, message: "CASE_NOT_FOUND" };
    }
  }

  return {
    id: caseRow.id,
    title: caseRow.title,
    status: caseRow.status,
    category: caseRow.category,
    jurisdiction: caseRow.jurisdiction ?? "",
    createdAt: caseRow.createdAt,

    summary: caseRow.description ?? "",
    parties: [],
    keyEvents: [],
  };
}

export async function requestAccess(caseId: string, user: any) {
  if (user.role !== UserRole.LAWYER) {
    throw { status: 403, message: "FORBIDDEN" };
  }

  const legalCase = await prisma.case.findUnique({
    where: { id: caseId },
  });

  if (!legalCase) {
    throw { status: 404, message: "CASE_NOT_FOUND" };
  }

  const existing = await prisma.caseAccess.findUnique({
    where: {
      caseId_lawyerId: {
        caseId,
        lawyerId: user.id,
      },
    },
  });

  if (existing?.status === CaseAccessStatus.GRANTED) {
    throw { status: 400, message: "ALREADY_GRANTED" };
  }

  if (!existing) {
    await prisma.caseAccess.create({
      data: {
        caseId,
        lawyerId: user.id,
        status: CaseAccessStatus.REVOKED,
      },
    });
  }

  return { message: "Access requested" };
}

export async function withdrawAccess(caseId: string, user: any) {
  if (user.role !== UserRole.LAWYER) {
    throw { status: 403, message: 'FORBIDDEN' }
  }

  const existing = await prisma.caseAccess.findUnique({
    where: {
      caseId_lawyerId: {
        caseId,
        lawyerId: user.id,
      },
    },
  })

  if (!existing) {
    throw { status: 400, message: 'NO_REQUEST' }
  }

  if (existing.status === CaseAccessStatus.GRANTED) {
    throw { status: 400, message: 'CANNOT_WITHDRAW_GRANTED' }
  }

  await prisma.caseAccess.delete({
    where: {
      caseId_lawyerId: {
        caseId,
        lawyerId: user.id,
      },
    },
  })

  return { message: 'Access withdrawn' }
}

export async function createCase(
  input: {
    title: string
    description?: string
    category: string
    jurisdiction?: string
  },
  user: { id: string; role: UserRole }
) {
  if (user.role !== UserRole.CLIENT) {
    throw { status: 403, message: 'FORBIDDEN' }
  }

  if (!input.title || !input.category) {
    throw { status: 400, message: 'INVALID_INPUT' }
  }

  const legalCase = await prisma.case.create({
    data: {
      title: input.title,
      description: input.description ?? null,
      category: input.category,
      jurisdiction: input.jurisdiction ?? null,
      status: CaseStatus.OPEN,
      ownerId: user.id,
    },
  })

  return legalCase
}

