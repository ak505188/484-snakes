function createRoom(room_name) {
  var nameIsValid = /^[A-Za-z0-9]*$/;
  room_name = room_name.trim();
  if (!nameIsValid.test(room_name) || room_name === '') {
    console.log('Invalid name!');
    return false;
  }
  sendRequest(room_name);
  return false;
}

function sendRequest(room_name) {
  room = {
    room: room_name,
    settings: {}
  }
  httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = handleResponse;
  httpRequest.open('POST', window.location.href + 'g', true);
  httpRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  httpRequest.send(JSON.stringify(room));
}

function handleResponse() {
  // Request is completed
  if (httpRequest.readyState === 4) {
    if (httpRequest.status === 200) {
      var response = JSON.parse(httpRequest.responseText);
      if (response.exists) {
	// If the room already exists. Decide what to do here.
	console.log('Game already exists!');
      } else {
	// Redirect to game.
        window.location.replace(window.location.href + 'g/' + response.room_name);
      }
    } else {
      console.log('There was a problem with the request.');
    }
  }
}
