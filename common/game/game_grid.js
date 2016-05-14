function GameGrid(_width, _height, _difficulty, _speed) {
	var scope = this;	//allows private context to access public scope
	var width = _width;
	var height = _height;
	var difficulty = _difficulty;
	var speed = _speed;
	var step = calculateStep();

	var gridMap = {};	//map grid of game objects
	var snakes = [];
	var spawnMap = {};
	var waitMap = {};

	//public
	this.update = function() {
		//todo: in each subfunction, add code to generate viewList and pass in the viewConfig for each obj in a position
		var viewList = [];
		var statusList = [];
		updateWaiting();
		updateSnakes(statusList);
		updateSpawning(viewList);
		updateGrid(viewList);

		var viewConfig = {
			viewList: viewList
			//todo: add playerStatus key somewhere that determines foreground rendering
		};
		//todo: push the value to the renderer newConfig for ALL players
	};

	this.positionToIndex = function(x, y) {
		return y * width + x;
	};

	this.indexToPosition = function(index) {
		return {
			x: index % width,	//integer operations
			y: Math.floor(index / height)
		};
	};

	this.getAtIndex = function(index) {
		return gridMap[index];
	};

	this.getIndex = function(obj) {
		return this.positionToIndex(obj.getX(), obj.getY());
	};

	this.getAt = function(x, y) {
		var index = this.positionToIndex(x, y);
		return this.getAtIndex(index);
	};

	this.getAtPosition = function(position) {
		var index = this.positionToIndex(position.x, position.y);
		return this.getAtIndex(index);
	};

	this.getSpawningAtPosition = function(position) {
		var index = this.positionToIndex(position.x, position.y);
		return spawnMap[index];
	};

	this.insertAtIndex = function(obj, index) {
		gridMap[index] = obj;
	};

	this.insertAt = function(obj, x, y) {
		var index = this.positionToIndex(x, y);
		this.insertAtIndex(obj, index);
	};

	this.insert = function(obj) {
		var index = this.getIndex(obj);
		gridMap[index] = obj;
	};

	this.removeAtIndex = function(index) {
		var obj = gridMap[index];
		delete gridMap[index];
		return obj;
	};

	this.removeAt = function(x, y) {
		var index = this.positionToIndex(x, y);
		this.removeAtIndex(index);
	};

	this.remove = function(obj) {
		var index = this.getIndex(obj);
		delete gridMap[index];
		return obj;
	};

	this.getWidth = function() {
		return width;
	};

	this.setWidth = function(_width) {
		width = _width;
	}

	this.getHeight = function() {
		return height;
	};

	this.setHeight = function(_height) {
		height = _height;
	};

	this.getStep = function() {
		return step;
	};

	this.getRandomEmptyIndex = function() {
		var index;
		do {
			index = Math.round(Math.random() * width * height);
		} while (gridMap[index] || spawnMap[index]);
		return index;
	};

	this.moveToIndex = function(obj, index) {
		this.remove(obj);
		var position = this.indexToPosition(index);
		obj.setPosition(position);
		this.insert(obj);
	};

	this.moveTo = function(obj, position) {
		this.remove(obj);
		obj.setPosition(position);
		this.insert(obj);
	};

	this.moveBy = function(obj, vector) {
		this.remove(obj);
		obj.translate(vector);
		this.insert(obj);
	};

	this.moveToRandom = function(obj) {
		var index = this.getRandomEmptyIndex();
		this.moveToIndex(obj, index);
	};

	this.createObject = function(_type, _index, _paramsMap) {
		var rep = this.indexToPosition(_index);
		if (_paramsMap) {
			for (var key in _paramsMap) {
				if (_paramsMap.hasOwnProperty(key)) {
					var param = _paramsMap[key];
					rep[key] = param;
				}
			}
		}
		return new window[_type](rep);
	};

	this.insertNewObject = function(_type, _index, _paramsMap) {
		var obj = this.createObject(_type, _index, _paramsMap);
		gridMap[_index] = obj;
		return obj;
	};

	this.spawnNewObject = function(_type, _index, _paramsMap) {
		var obj = this.createObject(_type, _index, _paramsMap);
		spawnMap[_index] = obj;
		return obj;
	};

	this.insertNewObjectRandomPosition = function(_type, _paramsMap) {
		var index = this.getRandomEmptyIndex();
		return this.insertNewObject(_type, index, _paramsMap);
	};

	this.spawnAtRandomPosition = function(_type, _paramsMap) {
		var index = this.getRandomEmptyIndex();
		return this.spawnNewObject(_type, index, _paramsMap);
	};

	this.createSnake = function(params) {
		snakes.push(new Snake(params));
	};

	this.createPellet = function() {
		this.insertNewObjectRandomPosition('BodyPart', {classification: Utils.pickup});
	};

	this.increaseDifficulty = function() {
		difficulty++;
		var step = calculateStep();
		if (!Utils.controller.isUploadMode()) {
			this.spawnAtRandomPosition('Block');
		}
		if (difficulty % Utils.fastWandererOffset == 0) {
			this.spawnAtRandomPosition('Wanderer', { tier: 1 });
		} else if (difficulty % Utils.wandererOffset === 0) {
			this.spawnAtRandomPosition('Wanderer', { tier: 0 });
		}
		Utils.controller.setStep(step);
		Utils.controller.restart();
	};

	this.isOutOfBounds = function(position) {
		return position.x < 0 ||
			position.y < 0 ||
			position.x >= width ||
			position.y >= height;
	};

	this.getPelletLifeSpan = function() {
		return 40 + (speed * 15);
	};

	this.getGridMap = function() {
		return gridMap;
	};

	this.setGridMap = function(_gridMap) {
		gridMap = _gridMap;
	}

	this.getSpeed = function() {
		return speed;
	};


	//private helpers
	function updateWaiting() {
		for (var key in waitMap) {
			if (waitMap.hasOwnProperty(key)) {
				var waitObj = waitMap[key];
				if (!gridMap[key]) {
					gridMap[key] = waitObj;
					delete waitMap[key];
				}
			}
		}
	}

	function updateSnakes(statusList) {
		//todo: update status list -- each player's status
		for (var i = 0; i < snakes.length; i++) {
			snakes[i].update(gridMap, width, height);
		}
	}

	function updateSpawning(viewList) {
		for (var key in spawnMap) {
			if (spawnMap.hasOwnProperty(key)) {
				var obj = spawnMap[key];
				obj.update(gridMap, spawnMap, width, height);
				if (!obj.isSpawning()) {
					if (gridMap[key]) {
						waitMap[key] = obj;
					} else {
						gridMap[key] = obj;
					}
					delete spawnMap[key];
				} else {
					viewList.push(obj.getViewConfig());
				}
			}
		}
	}

	function updateGrid(viewList) {
		for (var key in gridMap) {
			if (gridMap.hasOwnProperty(key)) {
				var obj = gridMap[key];
				obj.update(gridMap, spawnMap, width, height, step);
				viewList.push(obj.getViewConfig());
			}
		}
	}

	function calculateStep() {
		return Utils.baseStep - (50 * speed + 5 * difficulty);
	}
}