var lib = require('./common/lib.js');

var socket_rooms = {};

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
      if (socket_rooms[socket.id] !== undefined) {
	rooms.getRoom(socket_rooms[socket.id]).removePlayer(client.remoteAddress, socket.id);
	socket_rooms[socket.id] = undefined;
      }
      io.emit('new connection', { total_client_count: io.engine.clientsCount });
      // TODO: Emit new client count to all rooms
    });

    socket.on('join_room', function(data) {
      var room = getRoom(socket);
      if (rooms.roomExists(room)) {
	// add player to room
	// TODO: remove player on disconnect
	socket_rooms[socket.id] = room;
	socket.join(room);
	rooms.getRoom(room).addNewPlayer(client.remoteAddress);
	rooms.getRoom(room).getPlayer(client.remoteAddress).setSocketId(socket.id);
	io.to(room).emit('status', { client_count: io.sockets.adapter.rooms[room].length });
      }
    });

    socket.on('game_action', function(data) {
      var room = getRoom(socket);
      var action = data.action;
      var playerKey = client.remoteAddress;
      rooms.getRoom(room).getPlayer(playerKey).setAction(action);
    });

    // Don't know if we need data
    // It's just how sockets pass data
    // Without it we only get the event but I think that's all we need
    socket.on('start_game', function(data) {
      var room = getRoom(socket);
      startGame(data, room, io.to(room).emit);
    });

    // Update lobby page with total number of people connected
    io.emit('new connection', {
      total_client_count: io.engine.clientsCount,
      currentGames: rooms.getCurrentGames(rooms)
    });
  });
}

function startGame(data, room, emit) {
  gameController = setInterval(function() {
    // Game logic here
    Object.keys(room.getPlayers()).forEach(function(player) {
      console.log(player.action);
    });
    // To emit new data to frontend
    // Can change event name to whatever just has to match frontend
    emit('update_game', {});
  }, 1000);	// 1000 will be changed to the game speed
}

function getRoom(socket) {
  return lib.getRoomFromUri(lib.getUriFromSocket(socket));
}

module.exports = socketServer;
