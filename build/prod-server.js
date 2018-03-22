require('./check-versions')()

var config = require('../config')

process.env.NODE_ENV = JSON.parse(config.build.env.NODE_ENV)

var opn = require('opn')
var path = require('path')

var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.prod.conf')

// default port where prod server listens for incoming traffic
var port = process.env.PORT || config.build.port

// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.build.proxyTable

var app = express()

var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {
    
  }
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

proxyTable.forEach(function (context) {
  app.use(proxyMiddleware(context.routepath, {
    target: context.proxyTarget,
    changeOrigin: true,
    secure: false
  }))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.build.assetsPublicPath, config.build.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

// var uri = 'http://172.16.1.192:' + port // 本地
// var uri = 'http://172.17.15.176:' + port // 测试
var uri = 'http://172.17.15.160:' + port; // 正式

var _resolve;
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting prod server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
