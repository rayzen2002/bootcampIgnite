import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import crypto from 'node:crypto'
import { knex } from '../database'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'
import { request } from 'node:http'
import { server } from '../app'

export async function transactionsRoutes(server: FastifyInstance) {
  // server.addHook('preHandler', async (request, response) => {
  //   checkSessionIdExists(request, response)
  // })
  server.post(
    '/',

    async (request, response) => {
      const createTransactionBodySchema = z.object({
        title: z.string(),
        amount: z.number(),
        type: z.enum(['credit', 'debit']),
      })
      const { title, amount, type } = createTransactionBodySchema.parse(
        request.body,
      )
      let sessionId = request.cookies.sessionId
      if (!sessionId) {
        sessionId = crypto.randomUUID()
        response.cookie('sessionId', sessionId, {
          path: '/',
          maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias
        })
      }
      await knex('transactions').insert({
        id: crypto.randomUUID(),
        title,
        amount: type === 'credit' ? amount : amount * -1,
        session_id: sessionId,
      })
      response.status(201).send(`Transacao criada com sucesso!`)
    },
  )
  server.get(
    '/',
    { preHandler: [checkSessionIdExists] },

    async (request) => {
      const { sessionId } = request.cookies
      const transactions = await knex('transactions')
        .where('session_id', sessionId)
        .select('*')
      return {
        transactions,
      }
    },
  )
  server.get(
    '/:id',
    { preHandler: [checkSessionIdExists] },
    async (request) => {
      const { sessionId } = request.cookies
      const getTransactionParamsSchema = z.object({
        id: z.string().uuid(),
      })
      const { id } = getTransactionParamsSchema.parse(request.params)

      const transaction = await knex('transactions')
        .where({
          session_id: sessionId,
          id,
        })

        .first()
      return { transaction }
    },
  )
  server.get(
    '/summary',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const { sessionId } = request.cookies
      const summary = await knex('transactions')
        .where('session_id', sessionId)
        .sum('amount', { as: 'amount' })
        .first()
      return summary
    },
  )
}
