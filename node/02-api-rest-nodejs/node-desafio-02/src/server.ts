import { app } from './app'

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log(`server running on port 3333`)
  })
