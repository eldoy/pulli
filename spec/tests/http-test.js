it('should request via axios', async ({ $, t }) => {
  var request = { url: 'http://localhost:9000/test' }

  var result = await $.http('http://localhost:9000')
  t.equal(Object.keys(result).length, 3)
  t.equal(result.status, 404)
  t.equal(typeof result.headers, 'object')
  t.deepStrictEqual(result.data, {
    error: 'AxiosError: Request failed with status code 404'
  })

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

  result = await $.http({ ...request, method: 'post' })
  t.equal(Object.keys(result).length, 3)
  t.equal(result.status, 200)
  t.equal(typeof result.headers, 'object')
  t.deepStrictEqual(result.data, { method: 'POST' })

  result = await $.http({ ...request, method: 'put' })
  t.equal(Object.keys(result).length, 3)
  t.equal(result.status, 200)
  t.equal(typeof result.headers, 'object')
  t.deepStrictEqual(result.data, { method: 'PUT' })

  result = await $.http({ ...request, method: 'patch' })
  t.equal(Object.keys(result).length, 3)
  t.equal(result.status, 200)
  t.equal(typeof result.headers, 'object')
  t.deepStrictEqual(result.data, { method: 'PATCH' })

  result = await $.http({ ...request, method: 'delete' })
  t.equal(Object.keys(result).length, 3)
  t.equal(result.status, 200)
  t.equal(typeof result.headers, 'object')
  t.deepStrictEqual(result.data, { method: 'DELETE' })

  result = await $.http({ ...request, method: 'options' })
  t.equal(Object.keys(result).length, 3)
  t.equal(result.status, 204)
  t.equal(typeof result.headers, 'object')
  t.deepStrictEqual(result.data, '')

  result = await $.http({ ...request, method: 'head' })
  t.equal(Object.keys(result).length, 3)
  t.equal(result.status, 200)
  t.equal(typeof result.headers, 'object')
  t.deepStrictEqual(result.data, '')
})

it('should request via socks5', async ({ $, t }) => {
  var request = { url: 'http://localhost:9000/test', socks5: true }

  var result = await $.http({ url: 'http://localhost:9000', socks5: true })
  t.equal(Object.keys(result).length, 3)
  t.equal(result.status, 404)
  t.equal(typeof result.headers, 'object')
  t.deepStrictEqual(result.data, {
    error: 'AxiosError: Request failed with status code 404'
  })

  result = await $.http(request)
  t.equal(Object.keys(result).length, 3)
  t.equal(result.status, 200)
  t.equal(typeof result.headers, 'object')
  t.deepStrictEqual(result.data, { method: 'GET' })

  result = await $.http({ ...request, method: 'get' })
  t.equal(Object.keys(result).length, 3)
  t.equal(result.status, 200)
  t.equal(typeof result.headers, 'object')
  t.deepStrictEqual(result.data, { method: 'GET' })

  result = await $.http({ ...request, method: 'post' })
  t.equal(Object.keys(result).length, 3)
  t.equal(result.status, 200)
  t.equal(typeof result.headers, 'object')
  t.deepStrictEqual(result.data, { method: 'POST' })

  result = await $.http({ ...request, method: 'put' })
  t.equal(Object.keys(result).length, 3)
  t.equal(result.status, 200)
  t.equal(typeof result.headers, 'object')
  t.deepStrictEqual(result.data, { method: 'PUT' })

  result = await $.http({ ...request, method: 'patch' })
  t.equal(Object.keys(result).length, 3)
  t.equal(result.status, 200)
  t.equal(typeof result.headers, 'object')
  t.deepStrictEqual(result.data, { method: 'PATCH' })

  result = await $.http({ ...request, method: 'delete' })
  t.equal(Object.keys(result).length, 3)
  t.equal(result.status, 200)
  t.equal(typeof result.headers, 'object')
  t.deepStrictEqual(result.data, { method: 'DELETE' })

  result = await $.http({ ...request, method: 'options' })
  t.equal(Object.keys(result).length, 3)
  t.equal(result.status, 204)
  t.equal(typeof result.headers, 'object')
  t.deepStrictEqual(result.data, '')

  result = await $.http({ ...request, method: 'head' })
  t.equal(Object.keys(result).length, 3)
  t.equal(result.status, 200)
  t.equal(typeof result.headers, 'object')
  t.deepStrictEqual(result.data, '')
})

xit('should use different IP address via socks5', async ({ $, t }) => {
  var result = await $.http({ url: 'https://api.ipify.org' })
  t.equal(Object.keys(result).length, 3)
  t.equal(result.status, 200)
  t.equal(typeof result.headers, 'object')
  t.equal(typeof result.data, 'string')
  var axiosIp = result.data

  result = await $.http({ url: 'https://api.ipify.org', socks5: true })
  t.equal(Object.keys(result).length, 3)
  t.equal(result.status, 200)
  t.equal(typeof result.headers, 'object')
  t.equal(typeof result.data, 'string')
  var socks5Ip = result.data

  t.notEqual(axiosIp, socks5Ip)
})
