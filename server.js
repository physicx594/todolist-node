const http = require('http')
const { v4: uuidv4 } = require('uuid');
const errorHandle = require('./errorHandle.js')
const headers = require('./headers.js')

const todos = []

const requestListener = (req,res)=>{
  let body = ''
  req.on('data', chunk=>{
    body += chunk
  })

  if(req.url === '/todos' && req.method === 'GET') {
    res.writeHead(200, headers)
    res.write(JSON.stringify({
      status: 'success',
      data: todos
    }))
    res.end()  
  } else if(req.url === '/todos' && req.method === 'POST') {
    req.on('end',()=>{
      try{
        const title = JSON.parse(body).title
        if(title === undefined) return errorHandle(res)
        
        const todo = { title, id: uuidv4() }

        todos.push(todo)
        res.writeHead(200, headers)
        res.write(JSON.stringify({
          status: 'success',
          data: todos
        }))
        res.end()
      } catch(error) {
        errorHandle(res)
      }
    })
  } else if(req.url === '/todos' && req.method === 'DELETE') {
    todos.length = 0
    res.writeHead(200, headers)
    res.write(JSON.stringify({
      status: 'success',
      data: todos,
    }))
    res.end()
  } else if(req.url.startsWith('/todos/') && req.method === 'DELETE') {
    const id = req.url.split('/').pop()
    const index = todos.findIndex(item=>item.id == id)

    if(index === -1) return errorHandle(res)
    
    todos.splice(index, 1)
    res.writeHead(200, headers)
    res.write(JSON.stringify({
      status: 'success',
      data: todos,
    }))
    res.end()
  } else if(req.method === 'OPTIONS') {
    res.writeHead(200, headers)
    res.write(JSON.stringify({
      status: 'success',
      message: 'OPTIONS'
    }))
    res.end()  
  } else {
    res.writeHead(404, headers)
    res.write(JSON.stringify({
      status: 'false',
      message: '無此路由'
    }))
    res.end()  
  }
}


const server = http.createServer(requestListener)
server.listen(8888) 