const http = require('http')
const { v4: uuidv4 } = require('uuid');



const requestListener = (req,res)=>{
  res.writeHead(200,{'Content-Type': 'text/plain'})
  res.write('123333')
  res.end()
}


const server = http.createServer(requestListener)
server.listen(8888) 