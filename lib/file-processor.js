var fs = require('fs');
var async = require('async');
var path = require('path');
var Q = require('q');
var parse = require('./parse');

function getRealPath (projectPath, urlPath) {
  return path.join(projectPath, decodeURI(urlPath))
}

function processFile (projectPath, urlPath) {
  var filePath = getRealPath(projectPath, urlPath)

  var deferred = Q.defer()

  fs.exists(filePath, function (exists) {
    if (!exists) return deferred.reject()

    fs.readFile(filePath, {encoding: 'utf8'}, function (err, data) {
      deferred.resolve({
        fileName: decodeURI(urlPath.replace(/^.*[\/](.+)/, '$1')),
        html: parse.md2html(data),
        toc: parse.createToc(),
        filePath: filePath
      })
    })

  })

  return deferred.promise
}

function processDir (projectPath, urlPath) {
  var dirPath = getRealPath(projectPath, urlPath)

  var deferred = Q.defer()

  fs.readdir(dirPath, function (err, fileNames) {
    if (err) return deferred.reject(err)
    fileNames = fileNames || []

    var fileNames = fileNames.filter(function (name) {
      var dotIndex = name.lastIndexOf('.')

      if (
          (dotIndex === -1) ||       // is directory or
          (dotIndex !== 0 && name.substr(dotIndex) === '.md')  // is markdown file
      ) {
        return true
      }
    })

    var paths = fileNames.map(function (name) {
      return path.join(dirPath, name)
    })

    async.map(paths, fs.lstat, function (err, fileStats) {
      if (err) return deferred.reject(err)

      var files = fileStats
                        .map(function (fileStat, i) {
                          return {
                            name: fileNames[i],
                            mtime: fileStat.mtime,
                            isFile: fileStat.isFile()
                          }
                        })
                        .filter(function(file) {
                          // remove files which is not markdown actually
                          return file.isFile ? file.name.lastIndexOf('.') >= 0 : true
                        })
                        .sort(function(file, compareFile) {
                          return file.isFile ? 1 : -1;
                        })
                        .sort(function (file, compareFile) {
                          if (!file.isFile && compareFile.isFile)
                            return -1;
                          return file.name.localeCompare(compareFile.name)
                        })

      deferred.resolve({
        files: files,
        dirPath: dirPath,
        dirName: dirPath.replace(/^.*([\\\/].+)[\\\/]/, '$1'),
        path: decodeURI(urlPath)
      })
    })
  })

  return deferred.promise
}

module.exports = {
  getRealPath: getRealPath,
  processFile: processFile,
  processDir: processDir
}
