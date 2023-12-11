import fastify from 'fastify'
import { dietRoutes } from './routes/diet'
import fastifyCookie from '@fastify/cookie'
import { userRoutes } from './routes/user'

export const app = fastify()
app.register(fastifyCookie)
app.register(userRoutes)
app.register(dietRoutes, {
  prefix: 'diets',
})
