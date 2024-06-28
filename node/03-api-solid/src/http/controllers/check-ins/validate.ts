import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCheckInService } from '@/services/factories/make-check-in-service'
import { makeValidateCheckInService } from '@/services/factories/make-validate-check-in-service'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })
 
  const { checkInId } = createCheckInParamsSchema.parse(request.params)

  const checkInService = makeValidateCheckInService()
  await checkInService.execute({
   checkInId
  })

  return reply.status(204).send()
}
