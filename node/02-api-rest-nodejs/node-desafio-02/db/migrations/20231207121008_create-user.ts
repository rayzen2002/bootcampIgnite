import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.uuid('id').primary()
    table.text('sessionId').references('diets.sessionId')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users')
}
