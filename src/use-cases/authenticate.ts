import { UsersRepository } from '@/repositories/users-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import * as bcrypt from 'bcryptjs'
import { User } from '@prisma/client'

interface AutheticateUseCaseRequest {
  email: string
  password: string
}

interface AutheticateUseCaseResponse {
  user: User
}

export class AutenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AutheticateUseCaseRequest): Promise<AutheticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMarches = await bcrypt.compare(
      password,
      user.password_hash,
    )

    if (!doesPasswordMarches) {
      throw new InvalidCredentialsError()
    }

    return { user }
  }
}
