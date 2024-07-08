var axios = require('axios')
var axiosRetry = require('axios-retry')
var { SocksProxyAgent } = require('socks-proxy-agent')

async function pulli(options = {}) {
  if (typeof options == 'string') {
    options = { url: options }
  }

  if (options.socks5) {
    var { host = 'localhost', port = '9050' } = options.socks5
    var url = `socks5://${host}:${port}`
    options.httpsAgent = new SocksProxyAgent(url)
  }

  if (options.retries) {
    if (typeof options.retryCondition != 'function') {
      options.retryCondition = function (error) {
        return axiosRetry.isRetryableError(error)
      }
    }
    axiosRetry.default(axios, options)
  }

  var response
  try {
    response = await axios(options)
  } catch (err) {
    response = err.response
    response.error = err
  }

  if (response.error) {
    if (options.onerror) {
      await options.onerror(response)
    }
  } else {
    if (options.onsuccess) {
      await options.onsuccess(response)
    }
  }

  return response
}

function alias(method) {
  return async function (url, options = {}) {
    if (typeof url == 'object') {
      options = url
    }
    if (typeof url == 'string') {
      options.url = url
    }
    options.method = method
    return pulli(options)
  }
}

var methods = ['get', 'patch', 'post', 'put', 'delete', 'options', 'head']
for (var method of methods) {
  pulli[method] = alias(method)
}

module.exports = pulli
