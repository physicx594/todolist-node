
const headers = require('./headers.js')

const errorHandle = (res) => {
  res.writeHead(400, headers)
  res.write(JSON.stringify({
    status: 'false',
    message: '欄位錯誤拉'
  }))
  res.end()
}

module.exports = errorHandle