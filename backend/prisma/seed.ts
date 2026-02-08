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

  const cases = [
    {
      title: "Potential Breach of Employment Contract",
      description:
        "Client was terminated abruptly after restructuring. Seeking legal advice on recovery of unpaid salary.",
      category: "Employment Law",
      jurisdiction: "Singapore",
      createdAt: daysAgo(3),
      access: CaseAccessStatus.GRANTED,
      attachments: 2,
    },
    {
      title: "Child Custody & Access Arrangement",
      description:
        "A dispute involving child custody and access rights following divorce proceedings.",
      category: "Family Law",
      jurisdiction: "Singapore",
      createdAt: daysAgo(7),
      access: null,
      attachments: 1,
    },
    {
      title: "Non-Payment in Service Agreement",
      description:
        "A local SME owner reports non-payment from a client after project completion.",
      category: "Commercial",
      jurisdiction: "Indonesia",
      createdAt: daysAgo(5),
      access: CaseAccessStatus.REQUESTED,
      attachments: 3,
    },
    {
      title: "Trademark Infringement Advice",
      description:
        "An entrepreneur seeks legal advice on a potential trademark infringement claim.",
      category: "Intellectual Property",
      jurisdiction: "Singapore",
      createdAt: daysAgo(14),
      access: CaseAccessStatus.REVOKED,
      attachments: 0,
    },
    {
      title: "Unpaid Salary Dispute",
      description:
        "Employee claims unpaid salary after resignation without proper compensation.",
      category: "Employment Law",
      jurisdiction: "Indonesia",
      createdAt: daysAgo(1),
      access: null,
      attachments: 0,
    },
    {
      title: "Shareholder Agreement Review",
      description:
        "Review and advice requested for a shareholder agreement in a private company.",
      category: "Commercial",
      jurisdiction: "Singapore",
      createdAt: daysAgo(30),
      access: CaseAccessStatus.GRANTED,
      attachments: 1,
    },
  ];

  for (const c of cases) {
    const caseRow = await prisma.case.create({
      data: {
        title: c.title,
        description: c.description,
        category: c.category,
        jurisdiction: c.jurisdiction,
        status: CaseStatus.OPEN,
        ownerId: client.id,
        createdAt: c.createdAt,
      },
    });

    if (c.access) {
      await prisma.caseAccess.create({
        data: {
          caseId: caseRow.id,
          lawyerId: lawyer.id,
          status: c.access,
          createdAt: daysAgo(2),
        },
      });
    }

    for (let i = 0; i < c.attachments; i++) {
      await prisma.document.create({
        data: {
          caseId: caseRow.id,
          originalName: `document_${i + 1}.pdf`,
          storedName: `document_${i + 1}.pdf`,
          mimeType: "application/pdf",
          size: 150000,
          uploadedById: client.id,
          createdAt: c.createdAt,
        },
      });
    }
  }

  console.log("✅ Seed data ready (6 cases)");
  console.log("Client login  → client@sibyl.sg / Testing123");
  console.log("Lawyer login  → lawyer@sibyl.sg / Testing123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
