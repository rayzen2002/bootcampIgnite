import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFetchNearByGymsService } from '@/services/factories/make-fetch-nearby-gyms-service'

export async function nearBy(request: FastifyRequest, reply: FastifyReply) {
  const nearByGymsQuerySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })
  const { latitude, longitude } = nearByGymsQuerySchema.parse(request.query)

  const fetchNearByGymsService = makeFetchNearByGymsService()
  const { gyms } = await fetchNearByGymsService.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(201).send({ gyms })
}
