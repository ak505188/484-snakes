function GameObject(_rep) {
	var x = _rep.x;
	var y = _rep.y;

	this.getX = function() {
		return x;
	};

	this.getY = function() {
		return y;
	};

	this.setX = function(_x) {
		x = _x;
	};

	this.setY = function(_y) {
		y = _y;
	};

	this.getNewPosition = function(_vector) {
		return {
			x: x + _vector.x,
			y: y + _vector.y
		};
	};

	this.translate = function(_vector) {
		x += _vector.x;
		y += _vector.y;
	};

	this.setPosition = function(_vector) {
		x = _vector.x;
		y = _vector.y;
	};


	//abstract
	this.update = function(grid, data) {};
	this.draw = function(ctx, cellWidth, cellHeight) {};
}