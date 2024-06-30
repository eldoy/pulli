var axios = require('axios')
var axiosRetry = require('axios-retry')

module.exports = async function (config) {
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
