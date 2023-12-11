import { FastifyReply, FastifyRequest } from 'fastify'

export async function checkSessionIdExists(
  request: FastifyRequest,
  response: FastifyReply,
) {
  // console.log(request.cookies.sessionId)
  const { sessionId } = request.cookies
  if (!sessionId) {
    response.status(401).send({
      error: 'Unauthorized',
    })
  }
}
