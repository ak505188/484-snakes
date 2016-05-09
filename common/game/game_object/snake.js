inherits(GameObject, Snake);

function Snake(_rep) {
	GameObject.call(this, _rep, 'Snake', Utils.hazard);

	/** a snake based off a collection of body parts - x and y position represent the position of the head */
	/** the snake is not stored in the grid's map; instead is in a separate list that updates first. it's body parts are in the grid map. */

	//constants
	var DIRECTION = {};
	DIRECTION[Utils.keyLeft] = {x: -1, y: 0};
	DIRECTION[Utils.keyUp] = {x: 0, y: -1};
	DIRECTION[Utils.keyRight] = {x: 1, y: 0};
	DIRECTION[Utils.keyDown] = {x: 0, y: 1};

	var OPPOSITES = {};
	OPPOSITES[Utils.keyLeft] = Utils.keyRight;
	OPPOSITES[Utils.keyUp] = Utils.keyDown;
	OPPOSITES[Utils.keyRight] = Utils.keyLeft;
	OPPOSITES[Utils.keyDown] = Utils.keyUp;

	//fields
	var scope = this;
	var length = _rep.defaultLength || 1;
	var previousKey = _rep.direction;
	var previousMovement = _rep.direction;
	var direction = DIRECTION[_rep.direction] || DIRECTION[Utils.keyRight];
	var playerNum = _rep.playerNum || 0;
	var bodyParts = new Queue();
	var dead = false;

	//init code
	(function() {
		Utils.grid.createPellet();
		for (var i = length - 1; i >= 0; i--) {
			var rep = {
				x: scope.getX() - i,	//todo: calc location based on direction
				y: scope.getY(),	//todo: calc location based on direction
				classification: Utils.hazard,
				snake: scope
			};
			var bodyPart = new BodyPart(rep);
			bodyParts.enqueue(bodyPart);
			Utils.grid.insertAt(bodyPart, rep.x, rep.y);
		}
	})();

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
	this.update = function(gridMap, spawnMap, width, height) {
		if (!dead) {
			var newPosition = this.getNewPosition(direction);
			var objAtPos = gridMap[newPosition.y * width + newPosition.x];
			previousMovement = previousKey;
			dead = Utils.grid.isOutOfBounds(newPosition) ||
				(objAtPos && objAtPos.isHazard());

			if (!dead) {
				if (objAtPos && objAtPos.isPickup()) {
					handlePickup(objAtPos);
				}
				var tail = bodyParts.dequeue();
				bodyParts.enqueue(tail);
				Utils.grid.moveTo(tail, newPosition);
				this.translate(direction);
			}
		} else {
			//game over or something...
		}
	};

	//private helpers
	function handleKeyPress(e) {
		var code = e.keyCode;
		if (code >= Utils.keyLeft && code <= Utils.keyDown && code != OPPOSITES[previousMovement]) {
			direction = DIRECTION[code];
			previousKey = code;
		}
	}

	function handlePickup(obj) {
		if (obj instanceof BodyPart) {
			obj.joinSnake(scope);
			var tail = bodyParts.getTail();
			var pos = Utils.subtractVectors(tail.getPosition(), direction);
			Utils.grid.moveTo(obj, pos);
			bodyParts.push(obj);
			Utils.grid.createPellet();
			Utils.grid.increaseDifficulty();
		}
	}
}