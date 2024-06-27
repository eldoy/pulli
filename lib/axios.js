var axios = require('axios')
var axiosRetry = require('axios-retry')

function handleResponse(res, error = false) {
  var response = error ? res.response : res
  var { status, headers, data } = response
  if (error) data = { error: res.toString() }
  return { status, headers, data }
}

module.exports = {
  request: async function (req) {
    if (typeof req == 'string') {
      req = { url: req, method: 'get' }
    }

    return new Promise((resolve) => {
      axios(req)
        .then((res) => resolve(handleResponse(res)))
        .catch((err) => resolve(handleResponse(err, true)))
    })
  }
}
