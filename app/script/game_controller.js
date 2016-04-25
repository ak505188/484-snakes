function GameController() {
	//mess with these
	var WIDTH_RATIO = 0.5;
	var HEIGHT_RATIO = 0.7;
	var BASE_STEP = 500;

	//init code
	var canvas = document.getElementById('game');
	var ctx = canvas.getContext('2d');
	var inputMode = /*document.getElementById('inputMode')*/ 'random';
	var jsonData = {};
	var grid = null;

	(function() {
		if (inputMode === 'random') {
			var gen = new RandomStageGenerator(BASE_STEP);
			jsonData = gen.generateRandomData();
		} else {
			jsonData = document.getElementById('jsonInput').value;	//todo: this will end up being a file upload, not a textarea...
		}
		window.onresize = handleResize;
		grid = new GameGrid(jsonData);
		handleResize();
	})();

	// public
	this.start = function() {
		setInterval(handleStep, jsonData.step);
	};

	//private functions
	function handleResize() {
		canvas.width = WIDTH_RATIO * window.innerWidth;
		canvas.height = HEIGHT_RATIO * window.innerHeight;
		grid.render(ctx, canvas.width, canvas.height);
	}

	function handleStep() {
		grid.update();
		grid.render(ctx, canvas.width, canvas.height);
	}
}