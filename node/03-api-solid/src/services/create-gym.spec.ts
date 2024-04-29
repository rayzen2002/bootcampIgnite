import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterService } from './register'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymService } from './create-gym'

describe('Register service', () => {
  let gymsRepository: InMemoryGymsRepository
  let sut: CreateGymService
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymService(gymsRepository)
  })
  it('Should be able to create Gym', async () => {
    const { gym } = await sut.execute({
      name: 'Jhon Doe Gym',
      latitude: 0,
      longitude: 0,
      description: null,
      phone: null,
    })
    expect(gym.id).toEqual(expect.any(String))
  })
})
