var marked = require('marked')
var highlight = require('highlight.js')

var renderer = new marked.Renderer()
var toc = []

renderer.heading = function (text, level) {
  var escapedText = text.toLowerCase().replace(/\s+/g, '-')
  toc.push({
    anchor: escapedText,
    level: level,
    text: text
  })
  return '<h' + level + ' id="' + escapedText + '">' + text + '</h' + level + '>'
}

marked.setOptions({
  renderer: renderer,
  langPrefix: '',
  breaks: true,
  highlight: function (code, language) {
    if (language)
      return highlight.highlight(language, code).value
    return code
  }
})

var createToc = function () {
  var tocHTML_button = '<button type="button" class="btn btn-default" aria-label="Left Align"><span class="glyphicon glyphicon-list-alt" aria-hidden="true"></span></button>'
  var tocHTML_content = '<ul>'
  var curLevel = 1
  toc.forEach(function(v) {
    if (v.level > curLevel) {
      tocHTML_content += '<ul>'
    }else if (v.level < curLevel) {
      tocHTML_content += '</ul>'
    }
    curLevel = v.level
    tocHTML_content += '<li><a href="#' + v.anchor + '">' + v.text + '</a></li>'
  });
  tocHTML_content += '</ul>'
  tocHTML = tocHTML_content + tocHTML_button
  toc = []
  return tocHTML;
}

module.exports = {
  md2html : function (data) {
    return marked(data)
  },
  createToc: createToc
}
