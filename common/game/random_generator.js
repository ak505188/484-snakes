function RandomGridGenerator(_baseStep) {

	//constants - todo: move somewhere more generic
	var STARTING_INFO = {
		"0": {x: 2/3, y: 1/3, direction: Utils.keyRight},
		"1": {x: 2/3, y: 2/3, direction: Utils.keyDown},
		"2": {x: 1/3, y: 2/3, direction: Utils.keyLeft},
		"3": {x: 1/3, y: 1/3, direction: Utils.keyUp}
	};

	var difficulty = /*parseInt(document.getElementById('difficulty').value)*/ 0;
	var width = /*parseInt(document.getElementById('width').value)*/ 20;
	var height = /*parseInt(document.getElementById('height').value)*/ 20;

	Utils.grid = new GameGrid(width, height, difficulty, _baseStep);

	/**
		Use the difficulty number to determine how many blocks are in the room.
		The actual positioning of the blocks will be random unless this proves to be troublesome...
			Then, we may need to come up with an algorithm for random but fair positioning
		Every difficulty level will add another block and increase the speed by X%
			Every 5 difficulty levels will add a some other hazardous object. (fireball?)
			Collect 10 (coins?) to raise the current play difficulty level by 1. 
			Add difficulty increase, a new block/hazard (depending on the number) will flash and then appear.
			Three coins will spawn at once. Once all three are collected, you will have to get the snake piece to spawn more.
	*/

	//public
	this.populateGrid = function() {
		generateAllBlocks();
		generateAllSnakes();
		//todo: more here for other objects...
	};

	//private helpers
	//todo: move this method somewhere more generic - this happens for both random and upload modes
	function generateAllSnakes() {
		var player = 0;	//todo: allow this to handle up to 4 players
		var startingInfo = STARTING_INFO[player];
		var paramsMap = {
			x: Math.floor(startingInfo.x * width),
			y: Math.floor(startingInfo.y * height),
			direction: startingInfo.direction,
			defaultLength: 1,
			playerNum: 0
		};
		Utils.grid.createSnake(paramsMap);
	}

	function generateAllBlocks() {
		for (var i = 0; i < difficulty; i++) {
			Utils.grid.spawnAtRandomPosition('Block');
		}
	}
}