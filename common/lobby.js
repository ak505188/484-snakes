// Went halfway and decided to update active games on new room creation
// That way we can update periodically but it won't reappear on every
// refresh anyone does on our webapp

// We can update every time but if we do the table will disappear
// and reappear on every change. (This includes things like other
// people refreshing the page anywhere on the website)
var currentGames = [];
var defaultLevel = {
  speed: 0,
  grid: {},
  width: 20,
  height: 20
};

function handleNewConnection(data) {
  var clients = data.total_client_count;
  var newCurrentGames = data.currentGames;
  if (Object.keys(currentGames).length !== Object.keys(newCurrentGames).length) {
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

function clickDefault() {
  document.getElementById('savedGames').style.display = 'none';
  localStorage.currentLevel = JSON.stringify(defaultLevel);
}

function clickRandom() {
  document.getElementById('savedGames').style.display = 'none';
  localStorage.currentLevel = JSON.stringify({
    speed: Math.floor((Math.random() * 10) + 1),
    width: Math.floor((Math.random() * 10) + 1),
    height: Math.floor((Math.random() * 10) + 1)
  });
}

function clickUpload() {
  document.getElementById('savedGames').style.display = 'none';
  // Need to actually handle upload here
  console.log('Handle upload');
}

function clickSaved() {
  document.getElementById('savedGames').style.display = 'block';
}

function generateSelectForSaved() {
  var games = JSON.parse(localStorage.levels);

  var selectDiv = '<select id="saved" onchange="selectGame(this)"">';
  selectDiv += '<option value="null">--</option>';

  if (localStorage.levels !== undefined) {
    Object.keys(games).forEach(function(game) {
      selectDiv += '<option value="' + game + '" ' + 
        'onclick="selectGame()">' + game + 
        '</option>';
    });
  }
  selectDiv += '</select>';
  
  document.getElementById('savedGames').innerHTML = selectDiv;
  document.getElementById('savedGames').style.display = 'none';
}

function selectGame(context) {
  localStorage.currentLevel = context.value === null ? defaultLevel : 
    JSON.stringify(JSON.parse(localStorage.levels)[context.value]);
}

function toggleSingleplayer(){
  var eleDiv = document.getElementById('singleplayer');
  document.getElementById('multiplayer').style.display = 'none';

  // based on condition you can change visibility
  if(eleDiv.style.display == "block") {
    eleDiv.style.display = "none";
  }
  else {
    eleDiv.style.display = "block";
  }
}

function toggleMultiplayer(){
  document.getElementById('singleplayer').style.display = 'none';
  var eleDiv2 = document.getElementById('multiplayer');

  if(eleDiv2.style.display == "block") {
    eleDiv2.style.display = "none";
  }
  else {
    eleDiv2.style.display = "block";
  }
}

window.onload = function() {
  generateSelectForSaved();
  localStorage.currentLevel = defaultLevel;
};