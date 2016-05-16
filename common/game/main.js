(function() {
	//begins game -- in multiplayer, this is the main app for the server
	//todo: implement wait logic to allow players to join game
	//todo: game controller is created and started once all players join/time runs out (player 1 click Start Now)
	//todo: grab initialConfig from player 1 and pass initialConfig as arg to GameController constructor
	var init = new Initializer();	//todo: temp - use a single/multi controller
	init.createInitialConfig();
	var initialConfig = init.getInitialConfig();

	Utils.controller = new GameController(initialConfig);	//todo: remove canvas param
	Utils.controller.start();
})();