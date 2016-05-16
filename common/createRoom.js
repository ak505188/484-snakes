function createRoom(room_name) {
  var nameIsValid = /^[A-Za-z0-9]*$/;
  room_name = room_name.trim();
  if (!nameIsValid.test(room_name) || room_name === '') {
    alert('Invalid name!');
    return false;
  }
  // Gotta get settings somewhere in here
  sendRequest(room_name);
  return false;
}

function sendRequest(room_name, settings) {
  room = {
    room: room_name,
    settings: settings
  };
  httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = handleResponse;
  httpRequest.open('POST', window.location.href + 'g', true);
  httpRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  httpRequest.send(JSON.stringify(room, JSON.parse(localStorage.currentLevel)));
}

function handleResponse() {
  // Request is completed
  if (httpRequest.readyState === 4) {
    if (httpRequest.status === 200) {
      var response = JSON.parse(httpRequest.responseText);
      if (response.exists) {
        // If the room already exists. Decide what to do here.
        alert('Game already exists!');
      } else {
        // Redirect to game.
        // Below line will make back button skip lobby page
        // window.location.replace(window.location.href + 'g/' + response.room_name);
        window.location.href = (window.location.href + 'g/' + response.room_name);
      }
    } else {
      console.log('There was a problem with the request.');
    }
  }
}
