var isDeveloping = process.env.NODE_ENV !== 'production';
var port = isDeveloping ? 3000 : process.env.PORT;
var hostname = process.env.HOSTNAME || '0.0.0.0';
var express = require('express');
var app = express();
var path = require('path');
var root = path.dirname(__dirname);

app.get('/', function (req, res) {
  var options = {
    root: root
  };
  res.sendFile('app/index.html', options);
})

var server = app.listen(port, hostname, function () {

  console.log('Example app listening at http://localhost:%s', port)

})
