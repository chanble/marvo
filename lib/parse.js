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

var createToc = function (){
  var tocHTML = '<div class="toc-glyphicon"><button type="button" class="btn btn-default" aria-label="Left Align"><span class="glyphicon glyphicon-list-alt" aria-hidden="true"></span></button></div>'
  toc.forEach(function(v){
    
  });
  return tocHTML;
}

exports.md2html = function (data) {
  return marked(data)
}

exports.createToc = createToc