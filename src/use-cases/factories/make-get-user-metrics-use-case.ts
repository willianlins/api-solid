import { GetUserMetricsUseCase } from '../get-user-matrics'
import { PrismaCheckinRepository } from '@/repositories/prisma/prisma-check-ins.repository'

export function makeGetUserMetricsUseCase() {
  const checkInsRepository = new PrismaCheckinRepository()

  const useCase = new GetUserMetricsUseCase(checkInsRepository)

  return useCase
}
