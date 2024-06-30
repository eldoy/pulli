var axios = require('axios')
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

http.get = alias('get')
http.patch = alias('patch')
http.post = alias('post')
http.put = alias('put')
http.delete = alias('delete')
http.options = alias('options')
http.head = alias('head')

module.exports = http
