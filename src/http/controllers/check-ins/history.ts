import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { mackFetchCheckiInsHistoryUseCase } from '@/use-cases/factories/make-fetch-user-check-ins-history-use-case'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkinHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = checkinHistoryQuerySchema.parse(request.query)

  const fetchUserCheckInsHistoryUseCase = mackFetchCheckiInsHistoryUseCase()

  const { checkIns } = await fetchUserCheckInsHistoryUseCase.execute({
    userId: request.user.sub,
    page,
  })

  return reply.status(200).send({
    checkIns,
  })
}
