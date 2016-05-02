inherits(SpawnedObject, Wanderer);

function Wanderer(_rep) {
    SpawnedObject.call(this, _rep, Utils.hazard, Utils.spawnTime);

    //constants
    var BASE_DELAY = 10;
    var FLASH_LIMIT = 4;
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
    var flashProg = 0;
    var tier = _rep.tier;
    var color;
    var moveDelay;
    var moveProg;

    //init
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

    this.draw = function(ctx, cellWidth, cellHeight) {
        ctx.fillStyle = color;
        if (!this.isSpawning() || flashProg % FLASH_LIMIT < FLASH_LIMIT / 2) {
            ctx.fillRect(this.getX() * cellWidth, this.getY() * cellHeight, cellWidth, cellHeight);	//todo: move this to generate location... always seems to be the same code...
        }
        flashProg++;
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