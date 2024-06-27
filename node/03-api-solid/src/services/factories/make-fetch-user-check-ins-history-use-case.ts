import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { FetchUserCheckinsService } from '../FetchUserCheckInsHistoryUseCase'

export function makeFetchUserCheckinsService() {
  const checkinsRepository = new PrismaCheckInsRepository()
  const useCase = new FetchUserCheckinsService(checkinsRepository)

  return useCase
}
