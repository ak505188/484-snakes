function getRoomFromUri(uri) {
  uri = uri.split('g/');
  return (Object.keys(uri).length !== 2 ? undefined : uri[1]);
}

function getUriFromSocket(socket) {
  var url = socket.request.headers.referer.split(socket.request.headers.host);
  return url[1];
}

module.exports = {
  getRoomFromUri: getRoomFromUri,
  getUriFromSocket: getUriFromSocket,
};
