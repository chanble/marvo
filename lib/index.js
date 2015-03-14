var express = require('express')
var path = require('path')
var errors = require('./config/errors')

exports.server = function (dirPath, options, callback) {

  var app = express()

  // Save variables
  app.set('projPath', dirPath)
  app.set('port', options.port)
  app.set('root', path.join(__dirname, '../'))
  app.set('views', path.join(__dirname, './views'))

  require('./config/express')(app)
  require('./config/routes')(app)

  var server = app.listen(app.get('port'), function () {
    if (callback) callback()
  })

  // Error handling
  app.use(errors[404].bind(app))
  app.use(errors[500])

}

exports.compile = function () {

  // TODO
}