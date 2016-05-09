inherits(GameObject, SpawnedObject);

function SpawnedObject(_rep, _type, _classification, _spawnDuration) {
    GameObject.call(this, _rep, _type, _classification);

    //private fields
    var spawnDuration = _spawnDuration;
    var spawning = _spawnDuration > 0;
    var spawnProg = 0;


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