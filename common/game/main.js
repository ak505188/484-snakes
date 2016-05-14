(function() {
	//begins game -- in multiplayer, this is the main app for the server
	var canvas = document.getElementById('game');	//todo: remove

	//todo: implement wait logic to allow players to join game
	//todo: game controller is created and started once all players join/time runs out (player 1 click Start Now)
	//todo: grab initialConfig from player 1 and pass initialConfig as arg to GameController constructor
	Utils.controller = new GameController(canvas);	//todo: remove canvas param
	Utils.controller.start();
})();