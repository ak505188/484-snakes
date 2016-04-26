inherits(GameObject, Snake);

function Snake(_rep) {
	GameObject.call(this, _rep);

	//static
	var DIRECTION = {
		"37": {x: -1, y: 0},	//left
		"38": {x: 0, y: -1},	//up
		"39": {x: 1, y: 0},		//right
		"40": {x: 0, y: 1}		//down
	};

	//fields
	var length = _rep.defaultLength || 1;
	var direction = DIRECTION["39"];

	//keyboard event
	window.onkeydown = handleKeyPress;

	//public
	this.getRepresentation = function() {
		return rep;
	};

	this.getCurrentLength = function() {
		return length;
	};

	//@Override
	this.update = function() {
		this.translate(direction);
	};

	//@Override
	this.draw = function(ctx, cellWidth, cellHeight) {
		ctx.fillStyle = 'green';
		ctx.fillRect(this.getX() * cellWidth, this.getY() * cellHeight, cellWidth, cellHeight);	//todo: move this to generate location... always seems to be the same code...
	};

	//private helpers
	function handleKeyPress(e) {
		var code = e.keyCode;
		if (code >= 37 && code <= 40) {
			direction = DIRECTION[code];
		}
	}
}