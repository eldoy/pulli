var axios = require('axios').default
var axiosRetry = require('axios-retry')
var { SocksProxyAgent } = require('socks-proxy-agent')

async function http(config = {}) {
  if (typeof config == 'string') {
    config = { url: config }
  }

  if (config.socks5) {
    var { host = 'localhost', port = '9050' } = config.socks5
    var url = `socks5://${host}:${port}`
    config.httpsAgent = new SocksProxyAgent(url)
  }

  if (config.retries) {
    if (typeof config.retryCondition != 'function') {
      config.retryCondition = function (error) {
        return axiosRetry.isRetryableError(error)
      }
    }
    axiosRetry.default(axios, config)
  }

  var res
  try {
    res = await axios(config)
  } catch (err) {
    res = err.response
  }

  var { status, headers, data } = res

  return { status, headers, data }
}

function alias(method) {
  return async function (url, config = {}) {
    if (typeof url == 'string') {
      config.url = url
    }
    config.method = method
    return http(config)
  }
}

var aliases = ['get', 'patch', 'post', 'put', 'delete', 'options', 'head']
aliases.forEach((verb) => (http[verb] = alias(verb)))

module.exports = http
