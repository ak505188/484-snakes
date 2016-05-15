var lib = require('./common/lib.js');

function socketServer(io, rooms) {
  io.on('connection', function (socket) {
    // IP & port of client
    // Really useful for keeping track of connected users
    var client = {
      remoteAddress: socket.request.connection.remoteAddress,
      remotePort: socket.request.connection.remotePort
    };
    // var room = lib.getRoomFromUri(lib.getUriFromSocket(socket));

    // Do stuff on disconnect
    socket.on('disconnect', function() {
      io.emit('new connection', { total_client_count: io.engine.clientsCount });
      // TODO: Emit new client count to all rooms
    });

    socket.on('join_room', function(data) {
      var room = lib.getRoomFromUri(lib.getUriFromSocket(socket));
      if (rooms[room] !== undefined) {
	// add player to room
	// TODO: remove player on disconnect
	socket.join(room);
	rooms[room].players.push(client);
	io.to(room).emit('status', { client_count: io.sockets.adapter.rooms[room].length });
      }
    });

    socket.on('start_game', startGame(data, getRoom(socket), io));

    // Update lobby page with total number of people connected
    io.emit('new connection', {
      total_client_count: io.engine.clientsCount,
      currentGames: lib.getCurrentGames(rooms)
    });
  });
}

function startGame(data, room, io) {
  // Initialize game state
}

function getRoom(socket) {
  return lib.getRoomFromUri(lib.getUriFromSocket(socket));
}

module.exports = socketServer;
