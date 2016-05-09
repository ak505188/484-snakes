function GameObject(_rep, _type, _classification) {
	var x = _rep.x;
	var y = _rep.y;
	var type = _type;
	var classification = _classification;

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

	this.getPosition = function() {
		return {
			x: x,
			y: y
		};
	};

	this.setClassification = function(_classification) {
		classification = _classification;
	};

	this.classify = function() {
		return classification;
	};

	this.isHazard = function() {
		return classification === Utils.hazard;
	};

	this.isPickup = function() {
		return classification === Utils.pickup;
	};

	this.getConfig = function() {
		return {
			x: x,
			y: y,
			classification: classification
		};
	};

	this.getType = function() {
		return type;
	};


	//abstract
	this.update = function(gridMap, spawnMap, width, height) {};
	this.draw = function(ctx, cellWidth, cellHeight) {};
}