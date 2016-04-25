var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var game = require('./routes/game.js');
var url = require('url');

var isDeveloping = process.env.NODE_ENV !== 'production';
var port = isDeveloping ? 3000 : process.env.PORT;
var hostname = process.env.HOSTNAME || '0.0.0.0';
global.root_dir = __dirname;

app.get('/', function (req, res) {
  var options = {
    root: global.root_dir
  };
  res.sendFile('app/index.html', options);
})

app.use('/game', game);

server.listen(port, hostname, function () {
  console.log('Listening on port %s. Open http://localhost:%s in browser.', port, port);
})

io.on('connection', function (socket) {
  var room = getUriFromSocket(socket);
  socket.join(room);
  // console.log(socket);

  console.log(socket.id, 'connected');
  io.to(room).emit('status', { client_count: io.sockets.adapter.rooms[room].length });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

function getUriFromSocket(socket) {
  var url = socket.request.headers.referer.split(socket.request.headers.host);
  return url[1];
}
