import {
  PrismaClient,
  CaseAccessStatus,
  UserRole,
  CaseStatus,
} from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  await prisma.caseAccess.deleteMany()
  await prisma.document.deleteMany()
  await prisma.case.deleteMany()
  await prisma.user.deleteMany()

  const passwordHash = await bcrypt.hash('Testing123', 10)

  const client = await prisma.user.create({
    data: {
      email: 'client@sibyl.sg',
      password: passwordHash,
      role: UserRole.CLIENT,
    },
  })

  const lawyer = await prisma.user.create({
    data: {
      email: 'lawyer@sibyl.sg',
      password: passwordHash,
      role: UserRole.LAWYER,
    },
  })

  const cases = [
    {
      title: 'Potential Breach of Employment Contract',
      description:
        'Client was terminated abruptly after restructuring. Seeking legal advice on recovery of unpaid salary.',
      category: 'Employment Law',
      jurisdiction: 'Singapore',
      daysAgo: 3,
      status: CaseStatus.OPEN,
      access: CaseAccessStatus.GRANTED,
      withDocument: true,
    },
    {
      title: 'Child Custody & Access Arrangement',
      description:
        'Dispute regarding custody and access rights following divorce proceedings.',
      category: 'Family Law',
      jurisdiction: 'Singapore',
      daysAgo: 7,
      status: CaseStatus.OPEN,
      access: CaseAccessStatus.REVOKED,
      withDocument: false,
    },
    {
      title: 'Non-Payment in Service Agreement',
      description:
        'A local SME owner reports non-payment from a client after project completion.',
      category: 'Commercial',
      jurisdiction: 'Singapore',
      daysAgo: 5,
      status: CaseStatus.OPEN,
      access: null,
      withDocument: false,
    },
    {
      title: 'Trademark Infringement Advice',
      description:
        'An entrepreneur seeks legal advice on potential trademark infringement claims.',
      category: 'Intellectual Property',
      jurisdiction: 'Singapore',
      daysAgo: 2,
      status: CaseStatus.CLOSED, 
      access: CaseAccessStatus.GRANTED,
      withDocument: false,
    },
  ]

  for (const item of cases) {
    const createdAt = new Date()
    createdAt.setDate(createdAt.getDate() - item.daysAgo)

    const caseRow = await prisma.case.create({
      data: {
        title: item.title,
        description: item.description,
        category: item.category,
        jurisdiction: item.jurisdiction,
        status: item.status,
        ownerId: client.id,
        createdAt,
      },
    })

    if (item.access) {
      await prisma.caseAccess.create({
        data: {
          caseId: caseRow.id,
          lawyerId: lawyer.id,
          status: item.access,
          createdAt,
        },
      })
    }

    if (item.withDocument) {
      await prisma.document.create({
        data: {
          caseId: caseRow.id,
          originalName: 'file-sample_150kB.pdf',
          storedName: 'file-sample_150kB.pdf',
          mimeType: 'application/pdf',
          size: 150000,
          uploadedById: client.id,
          createdAt,
        },
      })
    }
  }

  console.log('✅ Seed demo data ready')
  console.log('Client login  → client@example.com / password123')
  console.log('Lawyer login  → lawyer@example.com / password123')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
