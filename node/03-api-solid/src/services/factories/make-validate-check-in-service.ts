import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { ValidateCheckInService } from '../validate-check-in'

export function makeValidateCheckInService() {
  const checkinsRepository = new PrismaCheckInsRepository()
  const useCase = new ValidateCheckInService(checkinsRepository)

  return useCase
}
