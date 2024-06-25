import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchGymsService } from '@/services/factories/make-search-gyms-service'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymsQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })
  const { query, page } = searchGymsQuerySchema.parse(request.query)

  const createGymService = makeSearchGymsService()
  const { gyms } = await createGymService.execute({
    query,
    page,
  })

  return reply.status(200).send({ gyms })
}
