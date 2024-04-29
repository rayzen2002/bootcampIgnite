import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

interface fetchNearByGymsServiceRequest {
  userLatitude: number
  userLongitude: number
}
interface fetchNearByGymsServiceResponse {
  gyms: Gym[]
}
export class FetchNearByGymsService {
  constructor(private gymRepository: GymsRepository) {}
  async execute({
    userLatitude,
    userLongitude,
  }: fetchNearByGymsServiceRequest): Promise<fetchNearByGymsServiceResponse> {
    const gyms = await this.gymRepository.findManyNearBy({
      latitude: userLatitude,
      longitude: userLongitude,
    })
    return { gyms }
  }
}
