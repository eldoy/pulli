var axios = require('axios')
var axiosRetry = require('axios-retry')
var { SocksProxyAgent } = require('socks-proxy-agent')

async function http(options = {}) {
  if (typeof options == 'string') {
    options = { url: options }
  }

  var { socks5, ...options } = options

  if (socks5) {
    var { host = 'localhost', port = '9050' } = socks5
    var url = `socks5://${host}:${port}`
    options.httpsAgent = new SocksProxyAgent(url)
  }

  if (options.retries) {
    axiosRetry.default(axios, options)
  }

  var res
  try {
    res = await axios(options)
  } catch (err) {
    res = err.response
  }

  var { status, headers, data } = res

  return { status, headers, data }
}

function alias(method) {
  return async function (url, options = {}) {
    if (typeof url == 'object') {
      options = url
    } else {
      options = { ...options, url }
    }
    return http({ ...options, method })
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
