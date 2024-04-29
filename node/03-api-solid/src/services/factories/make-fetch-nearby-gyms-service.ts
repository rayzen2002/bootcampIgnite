import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-respository'
import { FetchNearByGymsService } from '../fetch-nearby-gyms'

export function makeFetchNearByGymsService() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new FetchNearByGymsService(gymsRepository)

  return useCase
}
