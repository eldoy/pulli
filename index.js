var { SocksProxyAgent } = require('socks-proxy-agent')
var axios = require('./lib/axios')

module.exports = async function (config = {}) {
  if (typeof config == 'string') {
    config = { url: config, method: 'get' }
  }

  var { socks5, ...config } = config

  if (socks5) {
    var { host = 'localhost', port = '9050' } = socks5
    var url = `socks5://${host}:${port}`
    config.httpsAgent = new SocksProxyAgent(url)
  }

  return axios.request(config)
}
