inherits(StageGenerator, RandomGridGenerator);

function RandomGridGenerator(/*initialConfig*/) {	//todo: pass in initial config (from a player's initializer)
	StageGenerator.call(this,
		/*initialConfig.difficulty*/ 0,
		/*initialConfig.speed*/ 6,
		/*initialConfig.width*/ 20,
		/*initialConfig.height*/ 20
	);

	/**
		Use the difficulty number to determine how many blocks are in the room.
		The actual positioning of the blocks will be random unless this proves to be troublesome...
			Then, we may need to come up with an algorithm for random but fair positioning
		Every difficulty level will add another block and increase the speed by X%
			Every 5 difficulty levels will add a some other hazardous object. (fireball?)
			Collect 10 (coins?) to raise the current play difficulty level by 1. 
			Add difficulty increase, a new block/hazard (depending on the number) will flash and then appear.
			Three coins will spawn at once. Once all three are collected, you will have to get the snake piece to spawn more.
	*/

	//@Override
	this.generateStage = function() {
		for (var i = 0, len = this.getDifficulty(); i < len; i++) {
			Utils.grid.spawnAtRandomPosition('Block');
		}
	}
}