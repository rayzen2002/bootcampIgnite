import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryUsersRepository implements UsersRepository {
  async findById(id: string): Promise<{
    id: string
    name: string
    email: string
    password_hash: string
    createdAt: Date
  } | null> {
    const user = this.items.find((item) => item.id === id)
    if (!user) {
      return null
    }
    return user
  }

  public items: User[] = []
  async create(data: Prisma.UserCreateInput): Promise<{
    id: string
    name: string
    email: string
    password_hash: string
    createdAt: Date
  }> {
    const user = {
      id: randomUUID(),
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
