var axios = require('axios')
var axiosRetry = require('axios-retry')
var { SocksProxyAgent } = require('socks-proxy-agent')

async function request(config) {
  if (config.retries) {
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
    if (typeof url == 'object') {
      config = url
    } else {
      config = { ...config, url }
    }
    return http({ ...config, method })
  }
}

var http = async function (config = {}) {
  if (typeof config == 'string') {
    config = { url: config, method: 'get' }
  }

  var { socks5, ...config } = config

  if (socks5) {
    var { host = 'localhost', port = '9050' } = socks5
    var url = `socks5://${host}:${port}`
    config.httpsAgent = new SocksProxyAgent(url)
  }

  return request(config)
}

http.get = alias('get')
http.patch = alias('patch')
http.post = alias('post')
http.put = alias('put')
http.delete = alias('delete')
http.options = alias('options')
http.head = alias('head')

module.exports = http
