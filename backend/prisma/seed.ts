import { PrismaClient, UserRole, CaseStatus, CaseAccessStatus } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
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

  const legalCase = await prisma.case.create({
    data: {
      title: 'Contract Dispute',
      category: 'Contract',
      status: CaseStatus.OPEN,
      ownerId: client.id,
    },
  })

  await prisma.caseAccess.create({
    data: {
      caseId: legalCase.id,
      lawyerId: lawyer.id,
      status: CaseAccessStatus.GRANTED,
    },
  })

  console.log('Seed completed')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
