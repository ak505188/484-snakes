inherits(GameObject, BodyPart);

function BodyPart(_rep) {
    GameObject.call(
        this,
        _rep,
        'BodyPart',
        _rep.classification,
        '#b4d310',
        '#b4d310',
        6
    );

    //private fields
    var snake = _rep.snake;
    var lifeNum = 0;
    var scope = this;
    var altColor = '#e9fcf4';

    //init
    (function() {
        if (scope.isPickup()) {
            scope.setFlashColor(altColor);
        }
    })();

    //@Override
    this.update = function(gridMap, spawnMap, width, height) {
        if (!snake) {
            if (lifeNum >= Utils.grid.getPelletLifeSpan()) {
                lifeNum = 0;
                Utils.grid.moveToRandom(this);
            }
            lifeNum++;
        }
    };

    this.joinSnake = function(_snake) {
        snake = _snake;
        this.setFlashColor('#b4d310');
        this.setClassification(Utils.hazard);
    };

    this.getConfig = function() {
        return {
            name: 'BodyPart',
            x: this.getX(),
            y: this.getY(),
            classification: this.classify()
        };
    };
}