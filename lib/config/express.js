var express = require('express')
var path = require('path')

module.exports = function (app) {

  app.use('/__public', express.static(path.join(app.get('root'), 'client/public')));
  app.set('view engine', 'jade');
  return app
}