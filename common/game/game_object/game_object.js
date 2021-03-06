function GameObject(_rep, _type, _classification, _color, _flashColor, _flashTime) {
	var x = _rep.x;
	var y = _rep.y;
	var type = _type;
	var color = _color;
	var flashColor = _flashColor;
	var flashTime = _flashTime;
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

	this.getColor = function() {
		return color;
	};

	this.getFlashColor = function() {
		return flashColor;
	};

	this.getFlashTime = function() {
		return flashTime;
	};

	this.setColor = function(_color) {
		color = _color;
	};

	this.setFlashColor = function(_flashColor) {
		flashColor = _flashColor;
	};

	this.stopFlashing = function() {
		this.setFlashColor(color);
	};

	this.getType = function() {
		return type;
	};

	this.getViewConfig = function() {
		return {
			x: x,
			y: y,
			color1: color,
			color2: flashColor,
			flashTime: flashTime
		};
	};

	this.onAfterSpawn = function() {
		this.stopFlashing();
	};


	//abstract
	this.update = function(gridMap, spawnMap, width, height) {};
	this.getConfig = function() {};
}