import fastify from 'fastify'

const server = fastify()

server.get('/', () => {
  return 'hello man'
})

server
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Server running on port 3333')
  })
