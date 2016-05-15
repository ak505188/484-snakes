function handleNewConnection(data) {
  var clients = data.total_client_count;
  if (gotLobbyList === false) {
    gotLobbyList = true;
    listLobby(data.currentGames);
  }
  document.getElementById("status").innerHTML = "Total clients connected: " + clients;
}

function listLobby(currentGames) {
  var gamesList = '<tr>' + '<th colspan="1">Room</th>' +
    '<th colspan="4">Settings</th>' +
    '<th colspan="1">Players</th></tr>';
  document.getElementById("lobby").innerHTML = '';
  if (Object.keys(currentGames).length !== 0) {
    for (var i in currentGames) {
      gamesList += gameDiv(currentGames[i]);
    }
    document.getElementById("lobby").innerHTML = gamesList;
  }
}

function gameDiv(game) {
  var link = '\'/g/' + game.room + '\'';
  var goToRoom = '"window.location.href = ' + link + ';"';
  var div = '<tr class="game" onclick=' + goToRoom + '>' +
    roomNameColumn(game.room) +
    roomSettingColumn(game.settings) +
    playerCountColumn(game.playerCount) +
    '</tr>';
  return div;
}

function roomNameColumn(room) {
  return '<td>' + room + '</td>';
}

function playerCountColumn(players) {
  return '<td class="players">' + players + '</td>';
}

function roomSettingColumn(settings) {
  var height = '<td>' + 'Height: ' + settings.height + '</td>';
  var width = '<td>' + 'Width: ' + settings.width + '</td>';
  var speed = '<td>' + 'Speed: ' + settings.speed + '</td>';
  var gameType = '<td>' + 'Type: ' + (settings.grid === null ? 'Normal' : 'Custom') + '</td>';
  return height + width + speed + gameType;
}
