(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function getRoomFromUri(uri) {
  uri = uri.split('g/');
  return (Object.keys(uri).length !== 2 ? undefined : uri[1]);
}

function getCurrentGames(rooms) {
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

function createRoom(room_name, settings, rooms) {
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

module.exports = {
  getRoomFromUri: getRoomFromUri,
  getUriFromSocket: getUriFromSocket,
  getCurrentGames: getCurrentGames,
  createRoom: createRoom
};

},{}]},{},[1]);
