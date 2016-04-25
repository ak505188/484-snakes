var router = require('express').Router();

// middleware that is specific to this router
// router.use(function timeLog(req, res, next) {
//   console.log('Time: ', Date.now());
//   next();
// });

// define the home page route
router.get('/', function(req, res) {
  res.send('Game!');
});

// define the about route
router.get('*', function(req, res) {
  res.sendFile('app/game.html', { root: global.root_dir });
});

module.exports = router;
