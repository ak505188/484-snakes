function GameController(_canvas, _stageRep) {
	//mess with these
	var WIDTH_RATIO = 0.5;
	var HEIGHT_RATIO = 0.7;

	//fields
	var canvas = _canvas;
	var ctx = canvas.getContext('2d');
	var stageRep = _stageRep;
	var step;	//game step in ms
	var stepInterval;	//reference to interval
	var drawInterval;

	//init
	(function() {
		Utils.spawnTime = 10;
		var gen;
		if (stageRep) {
			gen = new UploadGenerator(stageRep);
		} else {
			gen = new RandomGridGenerator();
		}
		gen.populateGrid();
		step = Utils.grid.getStep();
		window.onresize = handleResize;
		handleResize();
	})();


	// public
	this.start = function() {
		stepInterval = setInterval(handleStep, step);
		drawInterval = setInterval(handleFlash, 50);
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
		return stageRep != undefined && stageRep != null;
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