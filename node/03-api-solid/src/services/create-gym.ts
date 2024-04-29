import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

interface CreateGymServiceRequest {
  name: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}
interface CreateGymServiceResponse {
  gym: Gym
}
export class CreateGymService {
  constructor(private gymRepository: GymsRepository) {}
  async execute({
    name,
    description,
    latitude,
    longitude,
    phone,
  }: CreateGymServiceRequest): Promise<CreateGymServiceResponse> {
    const gym = await this.gymRepository.create({
      name,
      description,
      latitude,
      longitude,
      phone,
    })
    return { gym }
  }
}
