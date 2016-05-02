function GameController() {
	//mess with these
	var WIDTH_RATIO = 0.5;
	var HEIGHT_RATIO = 0.7;
	var BASE_STEP = 200;

	//init code
	var canvas = document.getElementById('game');
	var ctx = canvas.getContext('2d');
	var inputMode = /*document.getElementById('inputMode')*/ 'random';
	var step;	//game step in ms
	var stepInterval;	//reference to interval

	(function() {
		if (inputMode === 'random') {
			var ran = new RandomGridGenerator(BASE_STEP);
			ran.populateGrid();
		} else {
			var jsonData = document.getElementById('jsonInput').value;	//todo: instead of an expression, just populate the grid
			grid.populateData(jsonData);	//todo: maybe use a grid populator???
		}
		step = Utils.grid.getStep();
		window.onresize = handleResize;
		handleResize();
	})();


	// public
	this.start = function() {
		stepInterval = setInterval(handleStep, step);
		setInterval(handleFlash, 50);
	};

	this.restart = function() {
		clearInterval(stepInterval);
		stepInterval = setInterval(handleStep, step);
	};

	this.setStep = function(_step) {
		step = _step;
	};


	//private functions
	function handleResize() {
		canvas.width = WIDTH_RATIO * window.innerWidth;
		canvas.height = HEIGHT_RATIO * window.innerHeight;
		Utils.grid.render(ctx, canvas.width, canvas.height);
	}

	function handleStep() {
		Utils.grid.update();
	}

	function handleFlash() {
		Utils.grid.render(ctx, canvas.width, canvas.height);
	}
}