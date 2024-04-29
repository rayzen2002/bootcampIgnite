import { FetchUserCheckinsService } from '../fetch-user-check-ins-history'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeFetchUserCheckinsService() {
  const checkinsRepository = new PrismaCheckInsRepository()
  const useCase = new FetchUserCheckinsService(checkinsRepository)

  return useCase
}
