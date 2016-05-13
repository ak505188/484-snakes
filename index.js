var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');
var lib = require('./common/lib.js');

var isDeveloping = process.env.NODE_ENV !== 'production';
var port = isDeveloping ? 3000 : process.env.PORT;
var hostname = process.env.HOSTNAME || '0.0.0.0';
global.root_dir = __dirname;

var rooms = {};
var socketLogic = require('./server')(io, rooms);

// Let our html files use files from /common
app.use(express.static(__dirname + '/common'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', function (req, res) {
  res.sendFile('app/lobby.html', { root: global.root_dir });
});

// TODO: This route will handle creating a game
app.post('/g', function(req, res) {
  var response = lib.createRoom(req.body.room, req.body.settings, rooms);
  res.set('Content-Type', 'application/json;charset=UTF-8');
  res.status(200).send(JSON.stringify(response));
});

app.get('/g/*', function(req, res) {
  var room = (lib.getRoomFromUri(req.url));
  if (rooms[room] === undefined) {
    res.sendStatus(404);
    // TODO: Send createGame page
  } else {
    res.sendFile('app/multiplayer.html', { root: global.root_dir });
  }
});

app.get('/single', function(req, res) {
  res.sendFile('app/singleplayer.html', { root: global.root_dir });
});

server.listen(port, hostname, function () {
  console.log('Listening on port %s. Open http://localhost:%s in browser.', port, port);
});
