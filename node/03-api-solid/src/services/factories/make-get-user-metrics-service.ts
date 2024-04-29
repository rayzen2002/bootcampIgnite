import { GetUserMetricsService } from '../get-user-metrics'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeGetUserMetricsService() {
  const checkinsRepository = new PrismaCheckInsRepository()
  const useCase = new GetUserMetricsService(checkinsRepository)

  return useCase
}
