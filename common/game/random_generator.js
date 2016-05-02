function RandomStageGenerator(baseStep) {
	
	var difficulty = /*parseInt(document.getElementById('difficulty').value)*/ 30;
	var width = /*parseInt(document.getElementById('width').value)*/ 20;
	var height = /*parseInt(document.getElementById('height').value)*/ 20;

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
	this.generateRandomData = function() {
		var data = {};
		data.grid = {};
		data.width = width;
		data.height = height;
		data.step = baseStep - ((difficulty * 5) + 200);

		generateObjects(data.grid);
		return data;
	};

	//private helpers
	function constructObjectRep(index) {
		return {
			x: index % width,	//integer operations
			y: Math.floor(index / height)
		};
	}

	function constructBlockRep(index) {
		return constructObjectRep(index);
	}

	function constructSnakeRep(index) {
		return constructObjectRep(index);
	}

	function generateObjectRandomIndex(grid, type) {
		var index;
		do {	//todo: write an alg to prevent "deadends"
			index = Math.round(Math.random() * width * height);
		} while (grid[index]);
		var rep;
		switch (type) {
			case 'Snake':
				rep = constructSnakeRep(index);
				rep.defaultLength = 3;
				break;
			case 'Block':
				rep = constructBlockRep(index);
				break;
			default:
				rep = constructObjectRep(index);
		}
		grid[index] = new window[type](rep);
	}

	function generateAllSnakes(grid) {
		generateObjectRandomIndex(grid, 'Snake');
	}

	function generateAllBlocks(grid) {
		for (var i = 0; i < difficulty; i++) {
			generateObjectRandomIndex(grid, 'Block');
		}
	}

	function generateObjects(grid) {
		generateAllBlocks(grid);
		generateAllSnakes(grid);
	}
}