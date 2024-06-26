var furu = require('furu')

async function handleRequest(req) {
  if (req.pathname == '/test') {
    return { method: req.method }
  }
  return
}

furu({ port: 9000 }, handleRequest)
