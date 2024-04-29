import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymService } from './search-gyms'

describe('Search Gyms Service', () => {
  let gymsRepository: InMemoryGymsRepository
  let sut: SearchGymService
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymService(gymsRepository)
  })

  it('Should be able to search for gyms', async () => {
    await gymsRepository.create({
      name: 'Nenel Gym',
      latitude: 0,
      longitude: 0,
      description: null,
      phone: null,
    })
    await gymsRepository.create({
      name: 'Anti Gym',
      latitude: 0,
      longitude: 0,
      description: null,
      phone: null,
    })
    const { gyms } = await sut.execute({
      query: 'Nenel',
      page: 1,
    })
    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ name: 'Nenel Gym' })])
  })
  it('Should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        name: `Anti-Nenel Gym ${i}`,
        latitude: 0,
        longitude: 0,
        description: null,
        phone: null,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Nenel',
      page: 2,
    })
    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ name: 'Anti-Nenel Gym 21' }),
      expect.objectContaining({ name: 'Anti-Nenel Gym 22' }),
    ])
  })
})
