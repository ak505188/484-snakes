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
    grid: {}
  };
  this.players = {};
  this.addNewPlayer = function(address, name, settings) {
    // Want some sort of unique identifier that is not name as key
    this.players[name] = new Player(address, name, settings);
  };

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
  this.name = _name ? _name : {};
  this.settings = _settings ? _settings : {};

  this.action = {};

  return this;
};

module.exports = {
  Rooms: Rooms,
  Room: Room,
  Player: Player
};
