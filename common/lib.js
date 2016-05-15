function getRoomFromUri(uri) {
  uri = uri.split('g/');
  return (Object.keys(uri).length !== 2 ? undefined : uri[1]);
}

function getCurrentGames(rooms) {
  var currentGames = [];
  Object.keys(rooms).forEach(function(room) {
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
}

function getUriFromSocket(socket) {
  var url = socket.request.headers.referer.split(socket.request.headers.host);
  return url[1];
}

function createRoom(room_name, settings, rooms) {
  var response = {
    room_name: room_name,
    exists: false
  };
  // Defaults based on editor. Can and probably should be changed
  var roomSettings = settings !== undefined ? settings : {
    speed: 0,
    width: 20,
    height: 20,
    grid: {}
  };
  if (rooms[room_name] === undefined) {
    rooms[room_name] = {
      players: [],
      settings: roomSettings
    };
    return response;
  }
  response.exists = true;
  return response;
}

module.exports = {
  getRoomFromUri: getRoomFromUri,
  getUriFromSocket: getUriFromSocket,
  getCurrentGames: getCurrentGames,
  createRoom: createRoom
};
