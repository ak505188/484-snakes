inherits(SpawnedObject, Block);

function Block(_rep) {
	SpawnedObject.call(this, _rep, Utils.hazard, Utils.spawnTime);

	//constants
	var FLASH_LIMIT = 4;

	//private fields
	var flashProg = 0;


	//public
	this.update = function(gridMap, spawnMap, width, height) {
		this.incSpawnTime();
	};
	
	this.draw = function(ctx, cellWidth, cellHeight) {
		ctx.fillStyle = '#f02520';
		if (!this.isSpawning() || flashProg % FLASH_LIMIT < FLASH_LIMIT / 2) {
			ctx.fillRect(this.getX() * cellWidth, this.getY() * cellHeight, cellWidth, cellHeight);	//todo: move this to generate location... always seems to be the same code...
		}
		flashProg++;
	};
}