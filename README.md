# Pulli HTTP Client

HTTP client based on Axios and a minimal set of plugins.

Features:
- Very easy to use
- Supports automatic retries
- Can be used with Socks5 proxies on the Tor Network
- Does not throw errors

### Install

```
npm i pulli
```

### Usage

Same as Axios get and post, except it supports retries and Socks5.

```js
var http = require('pulli')

// Get request
var response = await http('/some/url')
var response = await http({ url: '/some/url', method: 'get' })

// Post request
var response = await http({ url: '/some/url', method: 'post' })
```

### Response object

The repsonse object looks like this:

```js
{
  // `data` is the response that was provided by the server
  data: {},

  // `status` is the HTTP status code from the server response
  status: 200,

  // `statusText` is the HTTP status message from the server response
  statusText: 'OK',

  // `headers` the HTTP headers that the server responded with
  headers: {},

  // `config` is the config that was provided to `axios` for the request
  config: {},

  // `request` is the request that generated this response
  request: {},

  // `error` is the error object if there was an error
  error: {}
}
```


### Request with retries
```js
var http = require('pulli')

var response = await http.get('/some/url', { retries: 3 })
```

### Request via Socks5

In order to run a Tor proxy in `localhost:9050`:
- Install: `brew install tor`
- Run: `tor`

More [here](https://gist.github.com/skippednote/ca7b40620858b57668a0abba2ed9ef85).

```js
var http = require('pulli')

var response = await http.get('/some/url', { socks5: true })

var response = await http.get('/some/url', {
  socks5: { host: 'localhost', port: '9050' }
})
```

### Request method aliases
```js
var http = require('pulli')

var response = await http.get('/some/url')
var response = await http.post('/some/url', { data: 'hello' })
var response = await http.put('/some/url', { socks5: true, data: 'hello' })
var response = await http.patch('/some/url', { retries: 3 })
var response = await http.delete('/some/url')
var response = await http.options('/some/url')
var response = await http.head('/some/url')
```

### Request with status callbacks
```js
var http = require('pulli')

var success
var error

function onsuccess(response) {
  success = true
}

function onerror(response) {
  error = true
}

var response = await http.get('/some/url', { onsuccess, onerror })
```

Created by [Eldøy Projects](https://eldoy.com)
