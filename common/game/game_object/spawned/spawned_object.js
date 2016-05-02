inherits(GameObject, SpawnedObject);

function SpawnedObject(_rep, _classification, _spawnDuration) {
    GameObject.call(this, _rep, _classification);

    //private fields
    var spawnDuration = _spawnDuration;
    var spawning = true;
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