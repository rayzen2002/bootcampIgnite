import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterService } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('Register service', () => {
  let usersRepository: InMemoryUsersRepository
  let registerUseCase: RegisterService
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    registerUseCase = new RegisterService(usersRepository)
  })
  it('Should be able to register', async () => {
    const { user } = await registerUseCase.execute({
      name: 'Jhon Doe',
      email: 'jhon@email.com',
      password: 'bigsecret',
    })
    expect(user.id).toEqual(expect.any(String))
  })
  it('Should hash user password upon registration', async () => {
    const { user } = await registerUseCase.execute({
      name: 'Jhon Doe',
      email: 'jhon@email.com',
      password: 'bigsecret',
    })
    const isPasswordCorrectlyHashed = await compare(
      'bigsecret',
      user.password_hash,
    )
    expect(isPasswordCorrectlyHashed).toBe(true)
  })
  it('Should not be able to register with same e-mail twice', async () => {
    const email = 'jhon@email.com'
    await registerUseCase.execute({
      name: 'Jhon Doe',
      email,
      password: 'bigsecret',
    })
    await expect(() =>
      registerUseCase.execute({
        name: 'Jhon Doe',
        email,
        password: 'bigsecret',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
