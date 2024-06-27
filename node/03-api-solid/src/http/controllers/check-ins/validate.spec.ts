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
  it('Should be able to validate a CheckIn', async () => {
    const { token } = await createAndAuthenticateUser(app)
    const user = await prisma.user.findFirstOrThrow()
    const gym = await prisma.gym.create({
      data: {
        name: 'rayzenGym',
        latitude: -27.2092052,
        longitude: -49.6401091,
      },
    })
    let checkIn = await prisma.checkin.create({data:{
        gym_id: gym.id,
        user_id: user.id
    }})
    const response = await request(app.server)
      .patch(`/check-ins/${checkIn.id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(204)
    checkIn = await prisma.checkin.findUniqueOrThrow({where: {
        id: checkIn.id
    }})
    expect(checkIn.validatedAt).toEqual(expect.any(Date))
  })
})
