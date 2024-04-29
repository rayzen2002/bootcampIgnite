import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateService } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateService

describe('Authenticate service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateService(usersRepository)
  })
  it('Should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'Jhon Doe',
      email: 'jhon@email.com',
      password_hash: await hash('bigsecret', 6),
    })
    const { user } = await sut.execute({
      email: 'jhon@email.com',
      password: 'bigsecret',
    })
    expect(user.id).toEqual(expect.any(String))
  })
  it('Should not be able to authenticate with wrong Email', async () => {
    expect(() =>
      sut.execute({
        email: 'jhondoe@email.com',
        password: 'bigsecret',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
  it('Should not be able to authenticate with wrong Password', async () => {
    await usersRepository.create({
      name: 'Jhon Doe',
      email: 'jhon@email.com',
      password_hash: await hash('bigsecret', 6),
    })
    expect(() =>
      sut.execute({
        email: 'jhondoe@email.com',
        password: 'bigsecretmistaken',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
