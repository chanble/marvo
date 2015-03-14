var getRealPath = require('../file-processor').getRealPath;

exports[404] = function (req, res) {
  res.status(404)
  res.render('404', {
    filePath: getRealPath(this.get('projPath'), req.path)
  })
}

exports[500] = function (err, req, res, next) {
  res.status(err.status || 500)
  res.render('500', {
    message: err.message,
    error: err
  })
}