import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { Checkin, Prisma } from '@prisma/client'
import dayjs from 'dayjs'
import { randomUUID } from 'node:crypto'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: Checkin[] = []

  async findById(id: string) {
    const checkIn = this.items.find((item) => item.id === id)

    if (!checkIn) {
      return null
    }

    return checkIn
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkInOnSameDate = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.createdAt)
      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

      return checkIn.user_id === userId && isOnSameDate
    })

    if (!checkInOnSameDate) {
      return null
    }

    return checkInOnSameDate
  }

  async findManyByUserId(userId: string, page: number) {
    return this.items
      .filter((checkIn) => checkIn.user_id === userId)
      .slice((page - 1) * 20, page * 20)
  }

  async countByUserId(userId: string) {
    return this.items.filter((checkIn) => checkIn.user_id === userId).length
  }

  async create(data: Prisma.CheckinUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validatedAt: data.validatedAt ? new Date(data.validatedAt) : null,
      createdAt: new Date(),
    }

    this.items.push(checkIn)

    return checkIn
  }

  async save(checkIn: Checkin) {
    const checkInIndex = this.items.findIndex((item) => item.id === checkIn.id)

    if (checkInIndex >= 0) {
      this.items[checkInIndex] = checkIn
    }

    return checkIn
  }
}
