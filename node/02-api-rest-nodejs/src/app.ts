import fastify from 'fastify'
import { transactionsRoutes } from './routes/transactions'
import cookie from '@fastify/cookie'

export const server = fastify()
server.register(cookie)
server.register(transactionsRoutes, {
  prefix: 'transactions',
})
