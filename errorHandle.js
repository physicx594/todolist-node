
const headers = require('./headers.js')

const errorHandle = (res) => {
  res.writeHead(400, headers)
  res.write(JSON.stringify({
    status: 'false',
    message: '欄位錯誤'
  }))
  res.end()
}

module.export = errorHandle