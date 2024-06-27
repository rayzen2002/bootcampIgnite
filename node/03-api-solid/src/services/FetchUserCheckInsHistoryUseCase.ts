import { Checkin } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface FetchUserCheckinsServiceRequest {
  userId: string
  page: number
}
interface FetchUserCheckinsServiceResponse {
  checkIns: Checkin[]
}
export class FetchUserCheckinsService {
  constructor(private FetchUserCheckinsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckinsServiceRequest): Promise<FetchUserCheckinsServiceResponse> {
    const checkIns = await this.FetchUserCheckinsRepository.findManyByUserId(
      userId,
      page,
    )

    return {
      checkIns,
    }
  }
}
