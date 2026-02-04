import { CaseAccessStatus } from '@prisma/client'

export interface BrowseCasesQuery {
  page?: number
  limit?: number
  search?: string
  category?: string
  jurisdiction?: string
  posted?: 'any' | '7d' | '30d'
  sort?: 'recent' | 'oldest'
}

export interface CaseCardDTO {
  id: string
  title: string
  description: string
  category: string
  jurisdiction: string
  createdAt: Date
  clientLabel: string
  attachmentsCount: number

  access: {
    status: CaseAccessStatus | null
    grantedAt: Date | null
  }

  actions: {
    canOpen: boolean
    canRequestAccess: boolean
    canWithdraw: boolean
  }
}
