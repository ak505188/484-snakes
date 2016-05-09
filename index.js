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

// Let our html files use files from /common
app.use(express.static(__dirname + '/common'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', function (req, res) {
  res.sendFile('app/lobby.html', { root: global.root_dir });
});

// TODO: This route will handle creating a game
app.post('/g', function(req, res) {
  var response = createRoom(req.body.room, req.body.settings);
  res.set('Content-Type', 'application/json;charset=UTF-8');
  res.status(200).send(JSON.stringify(response));
});

app.get('/g/*', function(req, res) {
  var room = (lib.getRoomFromUri(req.url));
  if (rooms[room] === undefined) {
    res.sendStatus(404);
    // TODO: Send createGame page
  } else {
    res.sendFile('app/game.html', { root: global.root_dir });
  }
});

server.listen(port, hostname, function () {
  console.log('Listening on port %s. Open http://localhost:%s in browser.', port, port);
});

io.on('connection', function (socket) {
  // IP & port of client
  // Really useful for keeping track of connected users
  var client = {
    remoteAddress: socket.request.connection.remoteAddress,
    remotePort: socket.request.connection.remotePort
  };
  var room = lib.getRoomFromUri(getUriFromSocket(socket));

  // Do stuff on disconnect
  socket.on('disconnect', function() {
    io.emit('new connection', { total_client_count: io.engine.clientsCount });
    // TODO: Emit new client count to all rooms
  });

  socket.on('join_room', function(data) {
    if (rooms[room] !== undefined) {
      // add player to room
      // TODO: remove player on disconnect
      socket.join(room);
      rooms[room].players.push(client);
      io.to(room).emit('status', { client_count: io.sockets.adapter.rooms[room].length });
    }
  });

  // Update lobby page with total number of people connected
  io.emit('new connection', {
    total_client_count: io.engine.clientsCount,
    currentGames: getCurrentGames()
  });
});

function getCurrentGames() {
  var currentGames = [];
  Object.keys(rooms).forEach(function(room) {
    currentGames.push({
      room: room,
      playerCount: Object.keys(rooms[room].players).length
    });
  });

 // Sort currentGames by playercount
 currentGames.sort(function(a, b) {
   return b.playerCount - a.playerCount;
 });

 return currentGames;
}

function getUriFromSocket(socket) {
  var url = socket.request.headers.referer.split(socket.request.headers.host);
  return url[1];
}

function createRoom(room_name, settings) {
  var response = {
    room_name: room_name,
    exists: false
  };
  if (rooms[room_name] === undefined) {
    rooms[room_name] = {
      players: [],
      settings: settings
    };
    return response;
  }
  response.exists = true;
  return response;
}
