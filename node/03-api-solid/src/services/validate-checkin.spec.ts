import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { ValidateCheckInService } from './validate-check-in'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

describe('Validate CheckIn service', () => {
  let checkInsRepository: InMemoryCheckInsRepository
  let sut: ValidateCheckInService
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInService(checkInsRepository)

    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })
  it('Should be able to validate the check-in', async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: '01',
      user_id: 'user-01',
    })
    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
      userId: createdCheckIn.user_id,
    })
    expect(checkIn.validatedAt).toEqual(expect.any(Date))
    expect(checkInsRepository.items[0].validatedAt).toEqual(expect.any(Date))
  })
  it('Should not be able to validate an inexistent check-in', async () => {
    await expect(() =>
      sut.execute({
        checkInId: 'inexistent',
        userId: 'inexistent',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
  it('Should not be able to validate the checkin after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2024, 6, 29))
    const createdCheckIn = await checkInsRepository.create({
      gym_id: '01',
      user_id: 'user-01',
    })
    console.log(createdCheckIn)

    vi.advanceTimersByTime(1000 * 60 * 21)
    await expect(() =>
      sut.execute({
        checkInId: createdCheckIn.id,
        userId: createdCheckIn.user_id,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
