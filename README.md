# Waveorb HTTP
Waveorb HTTP Client. Based on Axios.

### Install

```
npm i waveorb-http
```

### Usage

Same as Axios get and post, except it supports retries and Sock5.

```js
var http = require('waveorb-http')

// Get request
var { data, status, headers } = await http.get('/some/url')

// Post request
var { data, status, headers } = await http.post('/some/url')
```

Created by [Eldøy Projects](https://eldoy.com)
