var tor = require('./lib/tor')
var axios = require('./lib/axios')

module.exports = async function (config = {}) {
  if (typeof config == 'string') {
    config = { url: config, method: 'get' }
  }

  var result
  if (config.socks5) {
    result = await tor.request(config)
  } else {
    result = await axios.request(config)
  }

  return result
}
