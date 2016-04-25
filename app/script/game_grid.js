function GameGrid(_data) {
	var data = _data;	//structure of actual game objects
	var grid = _data.grid;	//map grid of game objects

	//public
	this.update = function() {
		for (var key in grid) {
			var obj = grid[key];
			obj.update();
		}
	};

	this.render = function(ctx, canvasWidth, canvasHeight) {
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
		drawBackground(ctx, canvasWidth, canvasHeight);

		var cellWidth = canvasWidth / data.width;
		var cellHeight = canvasHeight / data.height;
		for (var key in grid) {
			var obj = grid[key];
			obj.draw(ctx, cellWidth, cellHeight);
		}
	};

	//private helpers
	function drawBackground(ctx, canvasWidth, canvasHeight) {
		ctx.strokeStyle = '#000000';
		ctx.fillStyle = '#aaaaaa';
		ctx.fillRect(0, 0, canvasWidth, canvasHeight);
	}
}