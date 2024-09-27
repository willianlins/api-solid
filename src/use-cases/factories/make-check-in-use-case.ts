import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { PrismaCheckinRepository } from '@/repositories/prisma/prisma-check-ins.repository'
import { CheckinUseCase } from '../check-in'

export function makeCheckinUseCase() {
  const checkInsRepository = new PrismaCheckinRepository()
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new CheckinUseCase(checkInsRepository, gymsRepository)

  return useCase
}
