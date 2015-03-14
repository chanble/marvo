var marked = require('marked')
var highlight = require('highlight.js')

marked.setOptions({
  langPrefix: '',
  breaks: true,
  highlight: function (code, language) {
    if (language)
      return highlight.highlight(language, code).value

    return code
  }
})

exports.md2html = function (data) {
  return marked(data)
}