inherits(GameObject, BodyPart);

function BodyPart(_rep) {
    GameObject.call(this, _rep);

    var onSnake = _rep.onSnake || false;
    var playerNum = _rep.playerNum || 1;

    //@Override
    this.update = function(data, grid) {

    };

    //@Override
    this.draw = function(ctx, cellWidth, cellHeight) {
        ctx.fillStyle = 'green';	//make this calculated by player number or something
        ctx.fillRect(this.getX() * cellWidth, this.getY() * cellHeight, cellWidth, cellHeight);	//todo: move this to generate location... always seems to be the same code...
    };
}