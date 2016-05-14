inherits(SpawnedObject, Wanderer);

function Wanderer(_rep, _spawnTime) {
    SpawnedObject.call(
        this,
        _rep,
        'Wanderer',
        Utils.hazard,
        _spawnTime || Utils.spawnTime,
        '#e3c800' /*todo: need logic for determining color*/,
        Utils.noColor,
        Utils.spawnFlashTime
    );

    //constants
    var BASE_DELAY = 10;
    var NEIGHBORS = [
        //{x: -1, y: -1},
        {x: 0, y: -1},
        //{x: 1, y: -1},
        {x: 1, y: 0},
        //{x: 1, y: 1},
        {x: 0, y: 1},
        //{x: -1, y: 1},
        {x: -1, y: 0}
    ];

    //private fields
    var scope = this;
    var tier = _rep.tier;
    var color;
    var moveDelay;
    var moveProg = 0;

    //init
    //todo: move this before super call or something... need to pass color to superclass
    (function() {
        moveDelay = BASE_DELAY - (tier * 2);
        switch (tier) {
            case 0:
                color = '#e3c800';
                break;
            case 1:
                color = '#b30086';
                break;
        }
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