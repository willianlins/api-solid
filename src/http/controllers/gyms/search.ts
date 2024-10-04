import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeSearchGymUseCase } from '@/use-cases/factories/make-search-gyms-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymsQueryParams = z.object({
    q: z.coerce.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { q, page } = searchGymsQueryParams.parse(request.query)

  const searchGymsUseCase = makeSearchGymUseCase()

  const { gyms } = await searchGymsUseCase.execute({
    query: q,
    page,
  })

  return reply.status(200).send({
    gyms,
  })
}
