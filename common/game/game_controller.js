function GameController(/*todo: remove param*/_canvas, _initialConfig) {
	//mess with these
	var WIDTH_RATIO = 0.5;	//todo: remove
	var HEIGHT_RATIO = 0.7;	//todo: remove

	//fields
	var canvas = _canvas;	//todo: remove
	var ctx = canvas.getContext('2d');	//todo: remove
	var initialConfig = _initialConfig;
	var step;	//game step in ms
	var stepInterval;	//reference to interval
	var drawInterval;	//todo: remove???

	//init
	(function() {
		Utils.spawnTime = 10;
		var gen;
		if (initialConfig/*.stageData*/) {	//todo: for now initialConfig is stageData json, but this will change
			gen = new UploadGenerator(initialConfig/*.stageData*/);
		} else {
			gen = new RandomGridGenerator(/*initialConfig*/);	//todo: pass in initConfig from which to grab random params
		}
		gen.populateGrid();
		step = Utils.grid.getStep();
		window.onresize = handleResize;	//todo: remove
		handleResize();
	})();


	// public
	this.start = function() {
		stepInterval = setInterval(handleStep, step);
		drawInterval = setInterval(handleFlash, 50);	//todo: remove
	};

	this.restart = function() {
		clearInterval(stepInterval);
		stepInterval = setInterval(handleStep, step);
	};

	this.setStep = function(_step) {
		step = _step;
	};

	this.stop = function() {
		clearInterval(stepInterval);
		clearInterval(drawInterval);
	};

	this.isUploadMode = function() {
		return initialConfig != undefined && initialConfig != null;
	};


	//private functions
	//todo: remove
	function handleResize() {
		canvas.width = WIDTH_RATIO * window.innerWidth;
		canvas.height = HEIGHT_RATIO * window.innerHeight;
		Utils.grid.render(ctx, canvas.width, canvas.height);
	}

	function handleStep() {
		Utils.grid.update();
	}

	//todo: remove
	function handleFlash() {
		Utils.grid.render(ctx, canvas.width, canvas.height);
	}
}