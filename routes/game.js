var express = require('express');
var router = express.Router();

// middleware that is specific to this router
// router.use(function timeLog(req, res, next) {
//   console.log('Time: ', Date.now());
//   next();
// });
router.use(express.static(__dirname + '/app/script'));

// define the home page route
router.get('/', function(req, res) {
  res.send('Game!');
});

// define the about route
router.get('*', function(req, res) {
  res.sendFile('app/game.html', { root: global.root_dir });
});

module.exports = router;
