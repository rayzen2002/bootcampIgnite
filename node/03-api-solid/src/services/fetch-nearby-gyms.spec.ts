import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearByGymsService } from './fetch-nearby-gyms'

describe('Fetch Near By Gyms Service', () => {
  let gymsRepository: InMemoryGymsRepository
  let sut: FetchNearByGymsService
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearByGymsService(gymsRepository)
  })

  it('Should be able to search for gyms', async () => {
    await gymsRepository.create({
      name: 'Near Gym',
      latitude: -27.2092052,
      longitude: -49.5229501,
      description: null,
      phone: null,
    })
    await gymsRepository.create({
      name: 'Far Gym',
      latitude: -50,
      longitude: -50,
      description: null,
      phone: null,
    })
    const { gyms } = await sut.execute({
      userLatitude: -27.2092052,
      userLongitude: -49.5229501,
    })
    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ name: 'Near Gym' })])
  })
})
