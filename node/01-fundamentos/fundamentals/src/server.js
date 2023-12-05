import http from 'node:http';
import { json } from './middlewares/json.js';
import { Database } from './middlewares/database.js';
import { randomUUID } from 'node:crypto';
import { routes } from './middlewares/routes.js';
import { extractQueryParams } from './utils/extract-query-params.js';

const users = [];
const database = new Database()
const server = http.createServer(async(req,res) => {
 
  const { method, url } = req;
  await json(req,res)
  const route = routes.find(route => {
    console.log(route.path)
    return route.method === method && route.path.test(url)
  })
  if(route){
    const routeParams = req.url.match(route.path)
    // console.log(extractQueryParams(routeParams.groups.query))
    console.log(routeParams.groups)
    const { query , ...params } = routeParams.groups
    req.params = params
    req.query = query ? extractQueryParams(query) : {}
    return route.handler(req,res)
  }

  return res.writeHead(404).end()
})

server.listen(3334);