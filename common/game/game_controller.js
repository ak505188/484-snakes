function GameController(_initialConfig) {

	//fields
	var initialConfig = _initialConfig;
	var step;	//game step in ms
	var stepInterval;	//reference to interval

	//init
	(function() {
		Utils.spawnTime = 10;
		var gen;
		if (initialConfig.stageData) {
			gen = new UploadGenerator(initialConfig.stageData);
		} else {
			gen = new RandomGridGenerator(initialConfig);
		}
		gen.populateGrid();
		step = Utils.grid.getStep();
		Utils.grid.createPellet();
	})();


	// public
	this.start = function() {
		stepInterval = setInterval(handleStep, step);
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
	};

	this.isUploadMode = function() {
		var data = initialConfig.stageData;
		return data !== undefined && data !== null;
	};


	//private functions
	function handleStep() {
		Utils.grid.update();
	}
}