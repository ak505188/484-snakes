// Went halfway and decided to update active games on new room creation
// That way we can update periodically but it won't reappear on every
// refresh anyone does on our webapp

// We can update every time but if we do the table will disappear
// and reappear on every change. (This includes things like other
// people refreshing the page anywhere on the website)
var currentGames = [];
var copiedHTML = [];
var defaultLevel = {
  speed: 5,
  grid: {},
  width: 20,
  height: 20
};

function handleNewConnection(data) {
  var clients = data.total_client_count;
  var newCurrentGames = data.currentGames;
  if (newCurrentGames !== undefined) {
    if (Object.keys(currentGames).length !== Object.keys(newCurrentGames).length) {
      listLobby(data.currentGames);
    }
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
  hideSavedSelect();
  clearCopiedHTML();
  localStorage.currentLevel = JSON.stringify(defaultLevel);
}

function clickRandom(id) {
  hideSavedSelect();
  clearCopiedHTML();
  copyInnerHTML('randomParamsSrc', id);
  document.getElementById(id).style.display = 'block';
  localStorage.mode = "Random";
}

function clickUpload() {
  hideSavedSelect();
  clearCopiedHTML();
  localStorage.mode = "Custom";
  // Need to actually handle upload here
  alert('Upload not supported yet!');
}

function clickSaved(id) {
  clearCopiedHTML();
  document.getElementById(id).style.display = 'block';
  localStorage.mode = "Custom";
}

function hideSavedSelect() {
  document.getElementById('savedGamesSingle').style.display = 'none';
  document.getElementById('savedGamesMulti').style.display = 'none';
}

function generateSelectForSaved() {
  var selectDiv = '<select id="saved" onchange="selectGame(this)"">';
  selectDiv += '<option>--</option>';

  if (localStorage.levels !== undefined) {
    var games = JSON.parse(localStorage.levels);
    Object.keys(games).forEach(function(game) {
      selectDiv += '<option value="' + game + '" ' +
        'onclick="selectGame()">' + game +
        '</option>';
    });
  }
  selectDiv += '</select>';

  document.getElementById('savedGamesSingle').innerHTML = selectDiv;
  document.getElementById('savedGamesSingle').style.display = 'none';
  document.getElementById('savedGamesMulti').innerHTML = selectDiv;
  document.getElementById('savedGamesMulti').style.display = 'none';
}

function copyInnerHTML(fromId, toId) {
  var htmlSrc = document.getElementById(fromId);
  var htmlDest = document.getElementById(toId);
  htmlDest.innerHTML = htmlSrc.innerHTML;
  copiedHTML.push(htmlDest);
}

function clearCopiedHTML() {
  for (var i = 0; i < copiedHTML.length; i++) {
    copiedHTML[i].innerHTML = '';
  }
  copiedHTML = [];
}

function selectGame(context) {
   if(context.value === '--') {
     localStorage.currentLevel = JSON.stringify(defaultLevel);
     localStorage.mode = "Default";
   } else {
     localStorage.currentLevel = JSON.stringify(JSON.parse(localStorage.levels)[context.value]);
     localStorage.mode = "Custom";
   }
}

//todo: if either of these buttons are clicked, must handle clicking Random or Saved if they are already checked!
function toggleSingleplayer(){
  clearCopiedHTML();
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
  clearCopiedHTML();
  document.getElementById('singleplayer').style.display = 'none';
  var eleDiv2 = document.getElementById('multiplayer');

  if(eleDiv2.style.display == "block") {
    eleDiv2.style.display = "none";
  }
  else {
    eleDiv2.style.display = "block";
  }
}

function handleGameStart() {
  if (localStorage.mode === 'Random') {
    storeRandomConfig();
  }
  window.location.href='/single';
}

function storeRandomConfig() {
  var randomConfig = {};
  var speedInput = document.getElementById('randomSpeed');
  var difficultyInput = document.getElementById('randomDifficulty');
  var sizeInput = document.getElementById('randomSize');
  if (speedInput.value) {
    randomConfig.speed = parseInt(speedInput.value);
  } else {
    randomConfig.speed = 6; //todo: make work with default value
  }
  if (difficultyInput.value) {
    randomConfig.difficulty = parseInt(difficultyInput.value);
  } else {
    randomConfig.difficulty = 0;
  }
  if (sizeInput.value) {
    randomConfig.size = parseInt(sizeInput.value);
  } else {
    randomConfig.size = 20;
  }
  localStorage.random = JSON.stringify(randomConfig);
}

window.onload = function() {
  generateSelectForSaved();
  localStorage.currentLevel = JSON.stringify(defaultLevel);
  localStorage.mode = "Default";
};
