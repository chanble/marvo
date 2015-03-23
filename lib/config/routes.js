var express = require('express');
var path = require('path');
var errors = require('./errors');
var fileProcessor = require('../file-processor');

module.exports = function (app) {

  /**
   * Intercept inappropriate path
   */
  app.use(function (req, res, next) {
    if (req.path.indexOf('..') >= 0){
      return next({
        message: 'unsafe path'
      })
    }

    next()
  })


  /**
   * Handle markdown file URI
   */
  app.route('/*.md')
    .get(function (req, res, next) {
      fileProcessor.processFile(app.get('projPath'), req.path).then(function(results) {
        res.render('file', results)
      }, function() {
        next()
      })
    })

  /**
   * Handle other files URI
   */
  app.route('/*.*')
    .get(function (req, res, next) {
      res.sendFile(path.join(decodeURI(app.get('projPath')), decodeURI(req.path)))
    })

  /**
   * Handle directory URI
   */
  app.route('/*')
    .get(function (req, res, next) {
      fileProcessor.processDir(app.get('projPath'), req.path).then(function(results) {
        res.render('dir', results)
      }, function(err) {
        next(err)
      })
    })


  return app
}

