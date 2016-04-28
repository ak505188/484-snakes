var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');

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
})

// TODO: This route will handle creating a game
app.post('/g', function(req, res) {
  // console.log(req.body);
  var response = createRoom(req.body.room, req.body.settings);
  res.set('Content-Type', 'application/json;charset=UTF-8');
  res.status(200).send(JSON.stringify(response));
});

app.get('/g/*', function(req, res) {
  console.log(getRoomFromUri(req.url));
  res.sendFile('app/game.html', { root: global.root_dir });
});

server.listen(port, hostname, function () {
  console.log('Listening on port %s. Open http://localhost:%s in browser.', port, port);
})

io.on('connection', function (socket) {
  // Update lobby page with total number of people connected
  io.emit('new connection', { total_client_count: io.engine.clientsCount });

  // Do stuff on disconnect
  socket.on('disconnect', function() {
    io.emit('new connection', { total_client_count: io.engine.clientsCount });
    // TODO: Emit new client count to all rooms
  });

  // IP & port of client
  // Really useful for keeping track of connected users
  var client = {
    remoteAddress: socket.request.connection.remoteAddress,
    remotePort: socket.request.connection.remotePort
  }
  console.log(client);

  // Get room from URI
  var room = getUriFromSocket(socket);

  socket.on('join_room', function(data) {
    var room = getUriFromSocket(socket);
    if (rooms[room] !== undefined) {
      socket.join(room);
      io.to(room).emit('status', { client_count: io.sockets.adapter.rooms[room].length });
    }
  });

});

function getUriFromSocket(socket) {
  var url = socket.request.headers.referer.split(socket.request.headers.host);
  return url[1];
}

function getRoomFromUri(url) {
  url = url.split('/');
  return (Object.keys(url).length !== 3 ? undefined : url[2]);
}

function createRoom(room_name, settings) {
  var response = {
    room_name: room_name,
    exists: false
  };
  if (rooms[room_name] === undefined) {
    rooms[room_name] = {
      players: {},
      settings: settings
    };
    return response;
  }
  response.exists = true;
  return response;
}
