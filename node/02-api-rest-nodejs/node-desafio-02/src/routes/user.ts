import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import crypto from 'node:crypto'
import { z } from 'zod'

export async function userRoutes(server: FastifyInstance) {
  server.post('/user', async (request, response) => {
    let sessionId = request.cookies.sessionId
    if (!sessionId) {
      sessionId = crypto.randomUUID()
      response.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      })
      await knex('users').insert({
        sessionId,
        id: crypto.randomUUID(),
      })
    }
  })
  server.get('/users', async () => {
    const users = await knex('users').select()
    return users
  })
}
