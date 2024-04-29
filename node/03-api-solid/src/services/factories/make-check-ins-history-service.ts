import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-respository'
import { CheckInService } from '../checkin'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeCheckInsRepository() {
  const checkinsRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new CheckInService(checkinsRepository, gymsRepository)

  return useCase
}
