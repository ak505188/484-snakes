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

	this.translate = function(_vector) {
		x += _vector.x;
		y += _vector.y;
	};


	//abstract
	this.update = function() {};
	this.draw = function(ctx, cellWidth, cellHeight) {};
}