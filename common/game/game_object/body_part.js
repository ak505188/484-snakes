inherits(GameObject, BodyPart);

function BodyPart(_rep) {
    GameObject.call(this, _rep, 'BodyPart', _rep.classification);

    //constant
    var COLOR_STEP = 6;
    var DARK_COLOR = false;
    var LIGHT_COLOR = true;

    //todo: color should be determined by player num
    var FILL_COLORS = {};
    FILL_COLORS[DARK_COLOR] = '#b4d310';
    FILL_COLORS[LIGHT_COLOR] = '#e9fcf4';

    var LIFE_SPAN = 40;

    //private fields
    var snake = _rep.snake;
    var colorNum = 0;
    var lifeNum = 0;

    //@Override
    this.update = function(gridMap, spawnMap, width, height, step) {
        if (!snake) {
            if (lifeNum >= LIFE_SPAN) {
                lifeNum = 0;
                Utils.grid.moveToRandom(this);
            }
            lifeNum++;
        }
    };

    //@Override
    this.draw = function(ctx, cellWidth, cellHeight) {
        if (snake) {
            ctx.fillStyle = FILL_COLORS[DARK_COLOR];
        } else {
            var halfColorStep = COLOR_STEP / 2;
            ctx.fillStyle = FILL_COLORS[colorNum % COLOR_STEP > halfColorStep];
            colorNum++;
        }
        ctx.fillRect(this.getX() * cellWidth, this.getY() * cellHeight, cellWidth, cellHeight);	//todo: move this to generate location... always seems to be the same code...
    };

    this.joinSnake = function(_snake) {
        snake = _snake;
        this.setClassification(Utils.hazard);
    };
}