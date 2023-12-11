import { FastifyInstance } from 'fastify'
import { knex, knex } from '../database'
import { z } from 'zod'
import crypto from 'node:crypto'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'
import console from 'node:console'
export async function dietRoutes(server: FastifyInstance) {
  interface DietElement {
    isOnDiet: number
    index: number
  }
  server.post(
    '/',
    { preHandler: [checkSessionIdExists] },
    async (request, response) => {
      const dietSchema = z.object({
        name: z.string(),
        description: z.string(),
        isOnDiet: z.boolean(),
      })
      const { name, description, isOnDiet } = dietSchema.parse(request.body)
      const userSchema = z.object({
        sessionId: z.string(),
      })
      const sessionId = userSchema.parse(request.cookies)
      const user = await knex('users')
        .where('sessionId', sessionId.sessionId)
        .select()
      console.log(user[0].sessionId)

      await knex('diets').insert({
        id: crypto.randomUUID(),
        name,
        description,
        isOnDiet,
        sessionId: user[0].sessionId,
      })
      return user
    },
  )

  server.get(
    '/user/:id',
    { preHandler: [checkSessionIdExists] },
    async (request) => {
      const userParamsSchema = z.object({
        id: z.string(),
      })
      const { id } = userParamsSchema.parse(request.params)
      const user = await knex('users').where('id', id)
      const diet = await knex('diets')
        .where('sessionId', user[0].sessionId)
        .select('*')
      return { diet }
    },
  )
  server.put(
    `/:id`,
    { preHandler: [checkSessionIdExists] },
    async (request) => {
      const dietSchema = z.object({
        name: z.string(),
        description: z.string(),
        isOnDiet: z.boolean(),
      })
      const { name, description, isOnDiet } = dietSchema.parse(request.body)
      const dietParamsSchema = z.object({
        id: z.string(),
      })
      const { id } = dietParamsSchema.parse(request.params)
      const diets = await knex('diets').where('id', id).select().update({
        name,
        description,
        isOnDiet,
      })
      return { diets }
    },
  )
  server.delete(
    '/:id',
    { preHandler: [checkSessionIdExists] },
    async (request) => {
      const { sessionId } = request.cookies
      const dietParamsSchema = z.object({
        id: z.string(),
      })
      const { id } = dietParamsSchema.parse(request.params)
      await knex('diets')
        .where('id', id)
        .andWhere('sessionId', sessionId)
        .select()
        .delete()
    },
  )
  server.get(
    '/:id',
    { preHandler: [checkSessionIdExists] },
    async (request) => {
      const dietParamsSchema = z.object({
        id: z.string(),
      })
      const { id } = dietParamsSchema.parse(request.params)

      const meal = await knex('diets')
        .where('id', id)
        // .andWhere('sessionId', sessionId)
        .select()
      return { meal }
    },
  )
  server.get('/metrics/:id', async (request) => {
    const userParamsSchema = z.object({
      id: z.string(),
    })
    const { id } = userParamsSchema.parse(request.params)
    const user = await knex('users').where('id', id).select()
    const meals = await knex('diets')
      .where('sessionId', user[0].sessionId)
      .select()
    const isOnDiet = meals.filter((diet) => diet.isOnDiet === 1)
    const isOnDietSequence = meals
      .map((diet, index) => {
        return {
          isOnDiet: diet.isOnDiet,
          index,
        }
      })
      .filter((diet) => diet.isOnDiet === 1)
    let currentSequence: DietElement[] = []
    let longestSequence: DietElement[] = []
    let currentIndex = 0

    for (const element of isOnDietSequence) {
      if (element.isOnDiet === 1) {
        if (currentIndex === element.index - 1) {
          currentSequence.push(element)
        }
        currentIndex = element.index

        // Check if the current sequence is longer than the longest one
        if (currentSequence.length > longestSequence.length) {
          longestSequence = [...currentSequence]
        }
      } else {
        // Reset the current sequence if the current element is not 1
        currentSequence = []
      }
    }

    return {
      'Quantidade total de refeições registradas': meals.length,
      'Quantidade total de refeições dentro da dieta': isOnDiet.length,
      'Quantidade total de refeições fora da dieta':
        meals.length - isOnDiet.length,
      'Melhor sequência de refeições dentro da dieta':
        longestSequence.length + 1,
    }
  })
}
