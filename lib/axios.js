var axios = require('axios')
var axiosRetry = require('axios-retry')

module.exports = {
  request: async function (req) {
    if (typeof req == 'string') {
      req = { url: req, method: 'get' }
    }

    return new Promise((resolve) => {
      axios(req)
        .then((res) => resolve({ ...res, error: null }))
        .catch((err) => {
          resolve({ ...err.response, error: err.toString() })
        })
    })
  }
}
