(function() {
	//begins game
	var canvas = document.getElementById('game');
	Utils.controller = new GameController(canvas);
	Utils.controller.start();
})();