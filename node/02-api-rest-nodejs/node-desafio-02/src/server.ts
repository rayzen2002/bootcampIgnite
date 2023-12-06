import fastify from 'fastify'

const app = fastify()

app.get('/', ()=>{
    return 'is that running?'
})

app.listen({
    port: 3333
}, ()=>{
    console.log(`server running on port 3333`)
})