var express = require('express');
var app = express();
var path = require('path');
var game = require('./routes/game.js');

var isDeveloping = process.env.NODE_ENV !== 'production';
var port = isDeveloping ? 3000 : process.env.PORT;
var hostname = process.env.HOSTNAME || '0.0.0.0';
var root = path.dirname(__dirname);

app.get('/', function (req, res) {
  var options = {
    root: root
  };
  res.sendFile('app/index.html', options);
})

app.use('/game', game);

var server = app.listen(port, hostname, function () {

  console.log('Listening on port %s. Open http://localhost:%s in browser.', port, port);

})
