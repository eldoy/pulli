# Waveorb HTTP

Waveorb HTTP Client. Based on Axios.

Features:
- Very easy to use
- Supports automatic retries
- Can be used with Socks5 proxies on the Tor Network
- Does not throw errors

### Install

```
npm i waveorb-http
```

### Usage

Same as Axios get and post, except it supports retries and Socks5.

```js
var http = require('waveorb-http')

// Get request
var { data, status, headers } = await http('/some/url')
var { data, status, headers } = await http({ url: '/some/url', method: 'get' })

// Post request
var { data, status, headers } = await http({ url: '/some/url', method: 'post' })
```

#### Request with retries
```js
var http = require('waveorb-http')

var { data, status, headers } = await http.get('/some/url', { retries: 3 })
```

#### Request via Socks5
```js
var http = require('waveorb-http')

var { data, status, headers } = await http.get('/some/url', { socks5: true })

var { data, status, headers } = await http.get('/some/url', {
  socks5: { host: 'localhost', port: '9050' }
})
```

#### Request method aliases
```js
var http = require('waveorb-http')

var { data, status, headers } = await http.get('/some/url')
var { data, status, headers } = await http.post('/some/url', { data: 'test' })
var { data, status, headers } = await http.put('/some/url', { socks5: true, data: 'test' })
var { data, status, headers } = await http.patch('/some/url', { retries: 3 })
var { data, status, headers } = await http.delete('/some/url')
var { data, status, headers } = await http.options('/some/url')
var { data, status, headers } = await http.head('/some/url')
```

Created by [Eldøy Projects](https://eldoy.com)
