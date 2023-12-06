import {
  test,
  beforeAll,
  afterAll,
  describe,
  expect,
  beforeEach,
  expect,
} from 'vitest'
import { execSync } from 'node:child_process'
import { server } from '../src/app'
import request from 'supertest'
import { ChildProcess } from 'child_process'
import { title } from 'node:process'

describe('Transaction routes', () => {
  beforeAll(async () => {
    await server.ready()
  })
  afterAll(async () => {
    await server.close()
  })
  beforeEach(async () => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })
  test('Should be able to create a new transaction', async () => {
    await request(server.server)
      .post('/transactions')
      .send({
        title: 'New Transaction',
        amount: 6666,
        type: 'debit',
      })
      .expect(201)
  })

  test('Should be able to list all transactions', async () => {
    const createTransactionResponse = await request(server.server)
      .post('/transactions')
      .send({
        title: 'New Transaction',
        amount: 6666,
        type: 'debit',
      })
    const cookie = createTransactionResponse.get('Set-Cookie')

    const listTransactionsResponse = await request(server.server)
      .get('/transactions')
      .set('Cookie', cookie)
      .expect(200)
    expect(listTransactionsResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: 'New Transaction',
        amount: -6666,
      }),
    ])
  })
  test('Should be able to list a specific transactions', async () => {
    const createTransactionResponse = await request(server.server)
      .post('/transactions')
      .send({
        title: 'New Transaction',
        amount: 6666,
        type: 'debit',
      })
    const cookie = createTransactionResponse.get('Set-Cookie')

    const listTransactionsResponse = await request(server.server)
      .get('/transactions')
      .set('Cookie', cookie)
      .expect(200)

    const transactionId = listTransactionsResponse.body.transactions[0].id
    const getTransactionResponse = await request(server.server)
      .get(`/transactions/${transactionId}`)
      .set('Cookie', cookie)
      .expect(200)
    expect(getTransactionResponse.body.transaction).toEqual(
      expect.objectContaining({
        title: 'New Transaction',
        amount: -6666,
      }),
    )
  })
  test('Should be able to get the summary', async () => {
    const createTransactionResponse = await request(server.server)
      .post('/transactions')
      .send({
        title: 'Debit Transaction',
        amount: 6666,
        type: 'debit',
      })
    const cookie = createTransactionResponse.get('Set-Cookie')

    await request(server.server)
      .post('/transactions')
      .set('Cookie', cookie)
      .send({
        title: 'Credit Transaction',
        amount: 8888,
        type: 'credit',
      })
    const summaryResponse = await request(server.server)
      .get('/transactions/summary')
      .set('Cookie', cookie)
      .expect(200)
    expect(summaryResponse.body).toEqual({ amount: 2222 })
  })
})
