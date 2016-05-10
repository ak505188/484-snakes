function StageGenerator(_difficulty, _speed, _height, _width) {

    var difficulty = _difficulty;
    var speed = _speed;
    var height = _height;
    var width = _width;

    Utils.grid = new GameGrid(width, height, difficulty, speed);

    //public superclass methods
    this.populateGrid = function() {
        this.generateStage();
        this.generatorSnakes();
        //todo: more here for other objects...
    };

    this.generatorSnakes = function() {
        var player = 0;	//todo: allow this to handle up to 4 players
        var startingInfo = Utils.startingInfo[player];
        var paramsMap = {
            x: Math.floor(startingInfo.x * width),
            y: Math.floor(startingInfo.y * height),
            direction: startingInfo.direction,
            defaultLength: 1,
            playerNum: 0
        };
        Utils.grid.createSnake(paramsMap);
    };

    //abstract
    this.generateStage = function() {};

    //setters/getters
    this.getDifficulty = function() {
        return difficulty;
    }
}