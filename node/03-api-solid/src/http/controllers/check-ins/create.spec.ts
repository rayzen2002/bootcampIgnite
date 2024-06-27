import { app } from '@/app'
import { prisma } from '@/lib/database'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create CheckIn (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('Should be able to Create a CheckIn', async () => {
    const { token } = await createAndAuthenticateUser(app)
    const gym = await prisma.gym.create({
      data: {
        name: 'rayzenGym',
        latitude: -27.2092052,
        longitude: -49.6401091,
      },
    })
    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -27.2092052,
        longitude: -49.6401091,
      })

    expect(response.statusCode).toEqual(201)
  })
})
