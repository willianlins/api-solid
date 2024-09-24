import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { AutenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const prismaUserRepository = new PrismaUserRepository()

  const authenticateUseCase = new AutenticateUseCase(prismaUserRepository)

  return authenticateUseCase
}
