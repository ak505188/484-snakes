inherits(SpawnedObject, Block);

function Block(_rep) {
	SpawnedObject.call(this, _rep, 'Block', Utils.hazard, Utils.spawnTime, '#f02520', Utils.noColor, Utils.spawnFlashTime);

	//public
	this.update = function(gridMap, spawnMap, width, height) {
		this.incSpawnTime();
	};

	this.getConfig = function() {
		return {
			name: 'Block',
			x: this.getX(),
			y: this.getY()
		};
	};
}