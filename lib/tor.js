var tor = require('tor-request')

module.exports = {
  request: async function (req) {
    if (typeof req == 'string') {
      req = { url: req }
    }

    return new Promise((resolve) => {
      tor.request(
        { url: req.url, headers: { 'user-agent': 'giraffe' } },
        async function (err, res, body) {
          var { statusCode, statusMessage, config, req, rawHeaders } = res

          var headers = []
          var chunkSize = 2
          for (let i = 0; i < rawHeaders.length; i += chunkSize) {
            headers.push(rawHeaders.slice(i, i + chunkSize))
          }
          headers = Object.fromEntries(headers)

          resolve({
            status: statusCode,
            statusText: statusMessage,
            headers,
            config,
            request: req,
            data: body,
            error: err
          })
        }
      )
    })
  }
}
