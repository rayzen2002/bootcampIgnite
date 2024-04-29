import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-respository'
import { SearchGymService } from '../search-gyms'

export function makeSearchGymsService() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new SearchGymService(gymsRepository)

  return useCase
}
