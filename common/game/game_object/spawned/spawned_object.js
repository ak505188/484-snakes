inherits(GameObject, SpawnedObject);

function SpawnedObject(_rep, _type, _classification, _spawnDuration, _color, _flashColor, _flashTime) {
    GameObject.call(this, _rep, _type, _classification, _color, _flashColor, _flashTime);

    //constants
    var FLASH_LIMIT = 4;	//todo: remove

    //private fields
    var spawnDuration = _spawnDuration;
    var spawning = _spawnDuration > 0;
    var spawnProg = 0;
    var flashProg = 0;	//todo: remove

    //public
    this.incSpawnTime = function() {
        if (spawning) {
            if (spawnProg < spawnDuration) {
                spawnProg++;
            } else {
                spawning = false;
            }
        }
    };

    this.isSpawning = function() {
        return spawning;
    };
}