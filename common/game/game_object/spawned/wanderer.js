inherits(SpawnedObject, Wanderer);

function Wanderer(_rep, _spawnTime) {
    SpawnedObject.call(
        this,
        _rep,
        'Wanderer',
        Utils.hazard,
        _spawnTime || Utils.spawnTime,
        Utils.wandererColors[_rep.tier],
        Utils.noColor,
        Utils.spawnFlashTime
    );

    //constants
    var BASE_DELAY = 8;
    var NEIGHBORS = [
        {x: 0, y: -1},
        {x: 1, y: 0},
        {x: 0, y: 1},
        {x: -1, y: 0}
    ];

    //private fields
    var scope = this;
    var tier = _rep.tier;
    var moveDelay;
    var moveProg = 0;

    (function() {
        moveDelay = BASE_DELAY - (tier * 3);
    })();

    //public
    this.update = function(gridMap, spawnMap, width, height) {
        this.incSpawnTime();
        if (!this.isSpawning()) {
            if (moveProg < moveDelay) {
                moveProg++;
            } else {
                moveToRandomNeighbor();
                moveProg = 0;
            }
        }
    };

    this.getConfig = function() {
        return {
            name: 'Wanderer',
            x: this.getX(),
            y: this.getY(),
            tier: this.getTier()
        };
    };

    this.getTier = function() {
        return tier;
    };

    //private helpers
    function moveToRandomNeighbor() {
        var openNeighbors = [];
        var position = scope.getPosition();
        for (var i = 0; i < NEIGHBORS.length; i++) {
            var neighborOffset = NEIGHBORS[i];
            var neighborPos = Utils.addVectors(position, neighborOffset);
            if (!Utils.grid.isOutOfBounds(neighborPos) &&
                    !Utils.grid.getAtPosition(neighborPos) &&
                    !Utils.grid.getSpawningAtPosition(neighborPos)) {
                openNeighbors.push(neighborPos);
            }
        }
        var selection = Math.floor(Math.random() * openNeighbors.length);
        Utils.grid.moveTo(scope, openNeighbors[selection]);
    }
}