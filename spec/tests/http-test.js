it('should request via axios', async ({ $, t }) => {
  var request = { url: 'http://localhost:9000/test' }

  var result = await $.http('http://localhost:9000')

  t.equal(Object.keys(result).length, 3)
  t.equal(result.status, 404)
  t.equal(typeof result.headers, 'object')

  t.equal(result.data, '')

  result = await $.http(request.url)
  t.equal(Object.keys(result).length, 3)
  t.equal(result.status, 200)
  t.equal(typeof result.headers, 'object')
  t.deepStrictEqual(result.data, { method: 'GET' })

  result = await $.http({ ...request, method: 'get' })
  t.equal(Object.keys(result).length, 3)
  t.equal(result.status, 200)
  t.equal(typeof result.headers, 'object')
  t.deepStrictEqual(result.data, { method: 'GET' })

  result = await $.http({ ...request, method: 'post', data: 'test' })
  t.equal(Object.keys(result).length, 3)
  t.equal(result.status, 200)
  t.equal(typeof result.headers, 'object')
  t.deepStrictEqual(result.data, { method: 'POST', body: 'test' })
})

it('should request via socks5', async ({ $, t }) => {
  var result = await $.http({ url: 'http://example.com', socks5: true })
  t.equal(Object.keys(result).length, 3)
  t.equal(result.status, 200)
  t.equal(typeof result.headers, 'object')
  t.ok(result.data.includes('Example Domain'))
})

it('should request with ', async ({ $, t }) => {
  var request = { url: 'http://localhost:9000/test' }

  var result = await $.http('http://localhost:9000')
  t.equal(Object.keys(result).length, 3)
  t.equal(result.status, 404)
  t.equal(typeof result.headers, 'object')
  t.equal(result.data, '')

  result = await $.http.get(request.url)
  t.equal(Object.keys(result).length, 3)
  t.equal(result.status, 200)
  t.equal(typeof result.headers, 'object')
  t.deepStrictEqual(result.data, { method: 'GET' })

  result = await $.http.post(request.url, { data: 'test' })
  t.equal(Object.keys(result).length, 3)
  t.equal(result.status, 200)
  t.equal(typeof result.headers, 'object')
  t.deepStrictEqual(result.data, { method: 'POST', body: 'test' })

  result = await $.http.put(request.url)
  t.equal(Object.keys(result).length, 3)
  t.equal(result.status, 200)
  t.equal(typeof result.headers, 'object')
  t.deepStrictEqual(result.data, { method: 'PUT' })

  result = await $.http.patch(request.url)
  t.equal(Object.keys(result).length, 3)
  t.equal(result.status, 200)
  t.equal(typeof result.headers, 'object')
  t.deepStrictEqual(result.data, { method: 'PATCH' })

  result = await $.http.delete(request.url)
  t.equal(Object.keys(result).length, 3)
  t.equal(result.status, 200)
  t.equal(typeof result.headers, 'object')
  t.deepStrictEqual(result.data, { method: 'DELETE' })

  result = await $.http.options(request.url)
  t.equal(Object.keys(result).length, 3)
  t.equal(result.status, 204)
  t.equal(typeof result.headers, 'object')
  t.deepStrictEqual(result.data, '')

  result = await $.http.head(request.url)
  t.equal(Object.keys(result).length, 3)
  t.equal(result.status, 200)
  t.equal(typeof result.headers, 'object')
  t.deepStrictEqual(result.data, '')
})

it('should retry', async ({ $, t }) => {
  async function clean() {
    return $.http('http://localhost:9000/test/retry/clean')
  }

  var request = { url: 'http://localhost:9000/test/retry' }

  var result = await $.http(request)
  t.equal(result.status, 500)
  await clean()

  result = await $.http({ ...request, retries: 1 })
  t.equal(result.status, 500)
  await clean()

  var result = await $.http({ ...request, retries: 2 })
  t.equal(result.status, 200)
  t.equal(result.data.method, 'GET')
  await clean()

  var result = await $.http.post(request.url, { retries: 2 })
  t.equal(result.status, 200)
  t.equal(result.data.method, 'POST')
  await clean()
})

it('should callback', async ({ $, t }) => {
  var result

  function onsuccess(response) {
    result = response
  }
  function onerror(response) {
    result = response
  }

  await $.http({ url: 'http://localhost:9000', onerror })

  t.equal(Object.keys(result).length, 5)
  t.equal(result.status, 404)
  t.equal(typeof result.headers, 'object')
  t.equal(result.data, '')
  t.equal(Object.keys(result.config).length, 2)
  t.equal(result.config.url, 'http://localhost:9000')
  t.equal(typeof result.config.onerror, 'function')
  t.equal(typeof result.response, 'object')

  await $.http({ url: 'http://localhost:9000/test', onsuccess })

  t.equal(Object.keys(result).length, 5)
  t.equal(result.status, 200)
  t.equal(typeof result.headers, 'object')
  t.deepStrictEqual(result.data, { method: 'GET' })
  t.equal(Object.keys(result.config).length, 2)
  t.equal(result.config.url, 'http://localhost:9000/test')
  t.equal(typeof result.config.onsuccess, 'function')
  t.equal(typeof result.response, 'object')
})
