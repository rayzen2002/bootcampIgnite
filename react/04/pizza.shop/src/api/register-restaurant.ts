import { api } from '@/lib/axios'

export interface RegisterRestaurantBody {
  email: string
  restaurantName: string
  managerName: string
  phone: string
}
export async function RegisterRestaurant({
  email,
  managerName,
  phone,
  restaurantName,
}: RegisterRestaurantBody) {
  await api.post('/restaurants', {
    email,
    managerName,
    phone,
    restaurantName,
  })
}
