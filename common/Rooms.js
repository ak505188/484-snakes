var Rooms = function() {
  this.rooms = {};
  this.createRoom = function (room_name, settings) {
    var response = {
      room_name: room_name,
      exists: false
    };
    // Defaults based on editor. Can and probably should be changed
    if (this.rooms[room_name] === undefined) {
      this.rooms[room_name] = new Room(settings);
      return response;
    }
    response.exists = true;
    return response;
  };

  this.getCurrentGames = function() {
    var rooms = this.rooms;
    var currentGames = [];
    Object.keys(this.rooms).forEach(function(room) {
      currentGames.push({
	room: room,
	playerCount: Object.keys(rooms[room].players).length,
	settings: rooms[room].settings
      });
    });

    // Sort currentGames by playercount
    currentGames.sort(function(a, b) {
      return b.playerCount - a.playerCount;
    });

    return currentGames;
  };

  this.getRoom = function(name) {
    return this.rooms[name];
  };

  this.roomExists = function(name) {
    return this.rooms[name] === undefined ? false : true;
  };

  return this;
};

var Room = function(_settings) {
  this.settings = _settings ? _settings : {
    speed: 0,
    width: 20,
    height: 20,
    grid: null
  };
  this.players = {};
  this.addNewPlayer = function(address, name, settings) {
    // Want some sort of unique identifier that is not name as key
    this.players[address] = new Player(address, name, settings);
  };

  this.getPlayer = function(address) {
    return this.players[address];
  };

  this.getPlayers = function() {
    return this.players;
  };

  // This function removes a player from room
  // if they haven't reconnected after the set timeout
  this.removePlayer = function(address, _socketId) {
    // 2nd argument is timeout value aka how long it takes before
    // checking if player reconnected
    // Arguments after that are passed to function call
    // This syntax is really weird
    setTimeout(destroyPlayer, 3000, address, _socketId, this);
  };

  function destroyPlayer(address, oldSocketId, context) {
    var player = context.getPlayer(address);

    // If id is the same the player hasn't reconnected
    // If it has changed the player has reconnected
    if (player.socketId === oldSocketId) {
      // Problem with below is that undefined still counts towards length
      // context.players[address] = undefined;

      // delete is supposed to be slow but I don't think the performance hit here matters
      delete context.players[address];
    }
  }

  return this;
};

var Player = function(_address, _name, _settings) {
  // Need some sort of unique identifier? Name maybe?
  // Instead of empty objects need some defaults for name and settings
  // Using remoteAddress & remotePort as key for now
  if (_address === undefined) {
    return null;
  }

  this.address = _address;
  this.socketId = null;
  this.name = _name ? _name : {};
  this.settings = _settings ? _settings : {};
  this.action = null;

  this.setAction = function(_action) {
    this.action = _action;
  };

  this.setSocketId = function(_socketId) {
    this.socketId = _socketId;
  };

  return this;
};

module.exports = {
  Rooms: Rooms,
  Room: Room,
  Player: Player
};
