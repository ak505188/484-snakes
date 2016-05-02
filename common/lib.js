function getRoomFromUri(uri) {
  uri = uri.split('g/');
  return (Object.keys(uri).length !== 2 ? undefined : uri[1]);
}

module.exports = {
  getRoomFromUri: getRoomFromUri
}
