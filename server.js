var furu = require('furu')

var retries = 0

furu({ port: 9000 }, async function (req, res) {
  switch (req.pathname) {
    case '/test':
      return { method: req.method }
    case '/test/retry':
      console.log({ retries })
      if (retries < 2) {
        retries++
        res.statusCode = 500
        return ''
      } else {
        retries = 0
        return { method: req.method }
      }
    case '/test/retry/clean':
      retries = 0
      return ''
    default:
      return
  }
})
