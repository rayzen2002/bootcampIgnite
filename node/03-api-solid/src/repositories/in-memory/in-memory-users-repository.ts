import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []
  async create(data: Prisma.UserCreateInput): Promise<{
    id: string
    name: string
    email: string
    password_hash: string
    createdAt: Date
  }> {
    const user = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      createdAt: new Date(),
    }
    this.items.push(user)
    return user
  }

  async findByEmail(email: string): Promise<{
    id: string
    name: string
    email: string
    password_hash: string
    createdAt: Date
  } | null> {
    const user = this.items.find((item) => item.email === email)
    if (!user) {
      return null
    }
    return user
  }
}
