var test = require('node:test')
var assert = require('node:assert')

var http = require('../../index.js')

test('request via axios', async () => {
  var request = { url: 'http://localhost:9000/test' }

  var result = await http('http://localhost:9000')

  assert.equal(result.status, 404)
  assert.equal(typeof result.headers, 'object')

  assert.equal(result.data, '')

  result = await http(request.url)
  assert.equal(result.status, 200)
  assert.equal(typeof result.headers, 'object')
  assert.deepStrictEqual(result.data, { method: 'GET' })

  result = await http({ ...request, method: 'get' })
  assert.equal(result.status, 200)
  assert.equal(typeof result.headers, 'object')
  assert.deepStrictEqual(result.data, { method: 'GET' })

  result = await http({ ...request, method: 'post', data: 'test' })
  assert.equal(result.status, 200)
  assert.equal(typeof result.headers, 'object')
  assert.deepStrictEqual(result.data, { method: 'POST', body: 'test' })
})

test('request via socks5', async () => {
  var result = await http({ url: 'http://example.com', socks5: true })
  assert.equal(result.status, 200)
  assert.equal(typeof result.headers, 'object')
  assert.ok(result.data.includes('Example Domain'))
})

test('request with alias', async () => {
  var request = { url: 'http://localhost:9000/test' }

  var result = await http('http://localhost:9000')
  assert.equal(result.status, 404)
  assert.equal(typeof result.headers, 'object')
  assert.equal(result.data, '')

  result = await http.get(request.url)
  assert.equal(result.status, 200)
  assert.equal(typeof result.headers, 'object')
  assert.deepStrictEqual(result.data, { method: 'GET' })

  result = await http.post(request.url, { data: 'test' })
  assert.equal(result.status, 200)
  assert.equal(typeof result.headers, 'object')
  assert.deepStrictEqual(result.data, { method: 'POST', body: 'test' })

  result = await http.put(request.url)
  assert.equal(result.status, 200)
  assert.equal(typeof result.headers, 'object')
  assert.deepStrictEqual(result.data, { method: 'PUT' })

  result = await http.patch(request.url)
  assert.equal(result.status, 200)
  assert.equal(typeof result.headers, 'object')
  assert.deepStrictEqual(result.data, { method: 'PATCH' })

  result = await http.delete(request.url)
  assert.equal(result.status, 200)
  assert.equal(typeof result.headers, 'object')
  assert.deepStrictEqual(result.data, { method: 'DELETE' })

  result = await http.options(request.url)
  assert.equal(result.status, 204)
  assert.equal(typeof result.headers, 'object')
  assert.deepStrictEqual(result.data, '')

  result = await http.head(request.url)
  assert.equal(result.status, 200)
  assert.equal(typeof result.headers, 'object')
  assert.deepStrictEqual(result.data, '')
})

test('retry', async () => {
  async function clean() {
    return http('http://localhost:9000/test/retry/clean')
  }

  var request = { url: 'http://localhost:9000/test/retry' }

  var result = await http(request)
  assert.equal(result.status, 500)
  await clean()

  result = await http({ ...request, retries: 1 })
  assert.equal(result.status, 500)
  await clean()

  var result = await http({ ...request, retries: 2 })
  assert.equal(result.status, 200)
  assert.equal(result.data.method, 'GET')
  await clean()

  var result = await http.post(request.url, { retries: 2 })
  assert.equal(result.status, 200)
  assert.equal(result.data.method, 'POST')
  await clean()
})

test('callback', async () => {
  var result

  function onsuccess(response) {
    result = response
  }
  function onerror(response) {
    result = response
  }

  await http({ url: 'http://localhost:9000', onerror })

  assert.equal(result.status, 404)
  assert.equal(typeof result.headers, 'object')
  assert.equal(result.data, '')

  await http({ url: 'http://localhost:9000/test', onsuccess })

  assert.equal(result.status, 200)
  assert.equal(typeof result.headers, 'object')
  assert.deepStrictEqual(result.data, { method: 'GET' })
})
