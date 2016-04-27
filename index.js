var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var isDeveloping = process.env.NODE_ENV !== 'production';
var port = isDeveloping ? 3000 : process.env.PORT;
var hostname = process.env.HOSTNAME || '0.0.0.0';
global.root_dir = __dirname;
var rooms = {};

app.use(express.static(__dirname + '/common'));

app.get('/', function (req, res) {
  res.sendFile('app/index.html', { root: global.root_dir });
})

app.get('/game', function(req, res) {
  res.sendFile('app/lobby.html', { root: global.root_dir });
});

app.get('/game/*', function(req, res) {
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

  socket.join(room);

  console.log(socket.id, 'connected');
  io.to(room).emit('status', { client_count: io.sockets.adapter.rooms[room].length });
});

function getUriFromSocket(socket) {
  var url = socket.request.headers.referer.split(socket.request.headers.host);
  return url[1];
}

function getRoomFromUri(url) {
  url = url.split('/');
  return (Object.keys(url).length !== 3 ? undefined : url[2]);
}
