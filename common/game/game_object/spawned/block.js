inherits(SpawnedObject, Block);

function Block(_rep) {
	SpawnedObject.call(this, _rep, 'Block', Utils.hazard, Utils.spawnTime, '#f02520', Utils.noColor, Utils.spawnFlashTime);

	//constants
	var FLASH_LIMIT = 4;	//todo: remove

	//private fields
	var flashProg = 0;	//todo: remove


	//public
	this.update = function(gridMap, spawnMap, width, height) {
		this.incSpawnTime();
	};

	this.draw = function(ctx, cellWidth, cellHeight) {
		ctx.fillStyle = '#f02520';
		if (!this.isSpawning() || flashProg % FLASH_LIMIT < FLASH_LIMIT / 2) {
			ctx.fillRect(this.getX() * cellWidth, this.getY() * cellHeight, cellWidth, cellHeight);	//todo: move this to generate location... always seems to be the same code...
			ctx.fillStyle = 'black';
			ctx.strokeRect(this.getX() * cellWidth, this.getY() * cellHeight, cellWidth, cellHeight);
		}
		flashProg++;
	};

	this.getConfig = function() {
		return {
			name: 'Block',
			x: this.getX(),
			y: this.getY()
		};
	};
}