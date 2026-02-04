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

  const passwordHash = await bcrypt.hash('password123', 10)

  const client = await prisma.user.create({
    data: {
      email: 'client@example.com',
      password: passwordHash,
      role: UserRole.CLIENT,
    },
  })

  const lawyer = await prisma.user.create({
    data: {
      email: 'lawyer@example.com',
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
      access: CaseAccessStatus.GRANTED,
    },
    {
      title: 'Child Custody & Access Arrangement',
      description:
        'A 34-year-old female professional was dismissed without notice following a company restructuring.',
      category: 'Family Law',
      jurisdiction: 'Singapore',
      daysAgo: 7,
      access: CaseAccessStatus.REVOKED,
    },
    {
      title: 'Non-Payment in Service Agreement',
      description:
        'A local SME owner reports non-payment from a client after project completion.',
      category: 'Commercial',
      jurisdiction: 'Singapore',
      daysAgo: 5,
      access: CaseAccessStatus.REVOKED,
    },
    {
      title: 'Trademark Infringement Advice',
      description:
        'An entrepreneur seeks legal advice on potential infringement claims.',
      category: 'Intellectual Property',
      jurisdiction: 'Singapore',
      daysAgo: 2,
      access: CaseAccessStatus.REVOKED,
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
        status: CaseStatus.OPEN,
        ownerId: client.id,
        createdAt,
      },
    })

    await prisma.caseAccess.create({
      data: {
        caseId: caseRow.id,
        lawyerId: lawyer.id,
        status: item.access,
        createdAt,
      },
    })
  }

  console.log('Seed demo data ready')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
