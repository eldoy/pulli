var furu = require('furu')

furu({ port: 9000 }, async function (req) {
  if (req.pathname == '/test') {
    return { method: req.method }
  }
})
