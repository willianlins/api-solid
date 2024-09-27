import { FetchUserCheckinsHistoryUseCase } from '../fetch-user-check-ins-history'
import { PrismaCheckinRepository } from '@/repositories/prisma/prisma-check-ins.repository'

export function mackFetchCheckiInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckinRepository()

  const useCase = new FetchUserCheckinsHistoryUseCase(checkInsRepository)

  return useCase
}
