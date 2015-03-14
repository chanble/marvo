var app = require('../');

app.serve(process.cwd(), {port: 5000}, function () {
  console.log('server start at localhost:5000');
})