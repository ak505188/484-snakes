inherits(GameObject, Snake);

function Snake(_rep) {
	GameObject.call(this, _rep);

	/** a snake based off a collection of body parts - x and y position represent the position of the head */

	//constants
	var LEFT = 37;
	var UP = 38;
	var RIGHT = 39;
	var DOWN = 40;

	var DIRECTION = {};
	DIRECTION[LEFT] = {x: -1, y: 0};
	DIRECTION[UP] = {x: 0, y: -1};
	DIRECTION[RIGHT] = {x: 1, y: 0};
	DIRECTION[DOWN] = {x: 0, y: 1};

	//fields
	var length = _rep.defaultLength || 1;
	var direction = DIRECTION[RIGHT];
	var playerNum = _rep.playerNum || 1;
	var bodyParts = new Queue();
	var dead = false;

	//init code
	for (var i = length; i >= 0; i--) {
		var rep = {
			x: this.getX() - i,	//todo: calc location based on direction
			y: this.getY(),	//todo: calc location based on direction
			onSnake: true,
			playerNum: playerNum
		};
		bodyParts.enqueue(new BodyPart(rep));
	}
	debugger;

	//keyboard event -- this prob needs to be moved to controller (register key bindings that relate to certain objects...?)
	window.onkeydown = handleKeyPress;

	//public
	this.getCurrentLength = function() {
		return length;
	};

	this.isDead = function() {
		return dead;
	};

	//@Override
	this.update = function(grid, data) {
		if (!dead) {
			var newPosition = this.getNewPosition(direction);
			var objAtPos = grid[newPosition.y * data.width + newPosition.x];

			//todo: make this code not suck
			dead = objAtPos instanceof Block || newPosition.x < 0 || newPosition.y < 0 || newPosition.x >= data.width || newPosition.y >= data.height;
			if (!dead) {
				var tail = bodyParts.dequeue();
				tail.setPosition(newPosition);
				bodyParts.enqueue(tail);
				this.translate(direction);	//updates the entire snake's known position
			}
		} else {
			//game over or something...
		}
	};

	//@Override
	this.draw = function(ctx, cellWidth, cellHeight) {
		bodyParts.forEachInternal('draw', [ctx, cellWidth, cellHeight]);
	};

	//private helpers
	function handleKeyPress(e) {
		var code = e.keyCode;
		if (code >= LEFT && code <= DOWN) {
			direction = DIRECTION[code];
		}
	}
}