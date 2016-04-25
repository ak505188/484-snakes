inherits(GameObject, Block);

function Block(_rep) {
	GameObject.call(this, _rep);
	
	this.draw = function(ctx, cellWidth, cellHeight) {
		ctx.fillStyle = 'brown';
		ctx.fillRect(this.getX() * cellWidth, this.getY() * cellHeight, cellWidth, cellHeight);	//todo: move this to generate location... always seems to be the same code...
	};
}