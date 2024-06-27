var axios = require('axios')
var axiosRetry = require('axios-retry')

function denullify(obj) {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v != null))
}

function handleResponse(res, error = false) {
  var response = error ? res.response : res
  var { status, headers, data } = response
  if (error) data = { error: res.toString() }
  return { status, headers, data }
}

module.exports = {
  request: async function (req) {
    var {
      retries = 0,
      shouldResetTimeout,
      retryCondition,
      retryDelay,
      onRetry,
      onMaxRetryTimesExceeded,
      validateResponse,
      ...req
    } = req

    if (retries) {
      var options = denullify({
        retries,
        shouldResetTimeout,
        retryCondition,
        retryDelay,
        onRetry,
        onMaxRetryTimesExceeded,
        validateResponse
      })

      axiosRetry.default(axios, options)
    }

    return new Promise((resolve) => {
      axios(req)
        .then((res) => resolve(handleResponse(res)))
        .catch((err) => resolve(handleResponse(err, true)))
    })
  }
}
