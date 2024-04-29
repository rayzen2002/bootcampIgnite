import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-respository'
import { CreateGymService } from '../create-gym'

export function makeCrateGymService() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new CreateGymService(gymsRepository)

  return useCase
}
