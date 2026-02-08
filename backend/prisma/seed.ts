import {
  PrismaClient,
  CaseAccessStatus,
  UserRole,
  CaseStatus,
} from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

function daysAgo(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

async function main() {
  await prisma.caseAccess.deleteMany();
  await prisma.document.deleteMany();
  await prisma.case.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash("Testing123", 10);

  const client = await prisma.user.create({
    data: {
      email: "client@sibyl.sg",
      password: passwordHash,
      role: UserRole.CLIENT,
    },
  });

  const lawyer = await prisma.user.create({
    data: {
      email: "lawyer@sibyl.sg",
      password: passwordHash,
      role: UserRole.LAWYER,
    },
  });

  const categories = [
    "Employment Law",
    "Family Law",
    "Commercial",
    "Intellectual Property",
  ];

  const jurisdictions = ["Singapore", "Indonesia"];

  const accessStatuses: (CaseAccessStatus | null)[] = [
    null,
    CaseAccessStatus.REQUESTED,
    CaseAccessStatus.GRANTED,
    CaseAccessStatus.REVOKED,
  ];

  const TOTAL_CASES = 25;

  for (let i = 1; i <= TOTAL_CASES; i++) {
    const category = categories[i % categories.length];
    const jurisdiction = jurisdictions[i % jurisdictions.length];
    const createdAt = daysAgo(i);

    const caseRow = await prisma.case.create({
      data: {
        title: `${category} Case #${i}`,
        description: `Sample description for ${category} case number ${i}.`,
        category,
        jurisdiction,
        status: i % 6 === 0 ? CaseStatus.CLOSED : CaseStatus.OPEN,
        ownerId: client.id,
        createdAt,
      },
    });

    const accessStatus = accessStatuses[i % accessStatuses.length];

    if (accessStatus) {
      await prisma.caseAccess.create({
        data: {
          caseId: caseRow.id,
          lawyerId: lawyer.id,
          status: accessStatus,
          createdAt: daysAgo(i - 1),
        },
      });
    }

    if (i % 4 === 0) {
      await prisma.document.create({
        data: {
          caseId: caseRow.id,
          originalName: "file-sample_150kB.pdf",
          storedName: "file-sample_150kB.pdf",
          mimeType: "application/pdf",
          size: 150000,
          uploadedById: client.id,
          createdAt: daysAgo(i),
        },
      });
    }
  }

  console.log("✅ Seed demo data ready");
  console.log("Client login  → client@sibyl.sg / Testing123");
  console.log("Lawyer login  → lawyer@sibyl.sg / Testing123");
  console.log(`Cases created → ${TOTAL_CASES}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
