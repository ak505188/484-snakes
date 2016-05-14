function Listener() {

    //todo: this class will be responsible for handling any front-end player-specific inputs
    //todo: back end will query the listener for each player at the beginning of its step to get the current movement state of each player

    //constants
    var DIRECTIONS = {};
    DIRECTIONS[Utils.keyLeft] = {x: -1, y: 0};
    DIRECTIONS[Utils.keyUp] = {x: 0, y: -1};
    DIRECTIONS[Utils.keyRight] = {x: 1, y: 0};
    DIRECTIONS[Utils.keyDown] = {x: 0, y: 1};

    var OPPOSITES = {};
    OPPOSITES[Utils.keyLeft] = Utils.keyRight;
    OPPOSITES[Utils.keyUp] = Utils.keyDown;
    OPPOSITES[Utils.keyRight] = Utils.keyLeft;
    OPPOSITES[Utils.keyDown] = Utils.keyUp;

    //private fields
    //todo: figure out how to init this within THIS class based on player number logic
    var previousKey = _rep.direction;
    var previousMovement = _rep.direction;
    var direction = DIRECTIONS[_rep.direction] || DIRECTIONS[Utils.keyRight];
    var playerNum = _rep.playerNum || 0;

    //init
    (function() {
        window.addEventListener('keydown', handleKeyDown, false);
    })();

    //public
    this.getDirection = function() {
        return direction;
    };

    //private helpers
    function handleKeyDown(e) {
        var code = e.keyCode;
        if (code >= Utils.keyLeft && code <= Utils.keyDown && code != OPPOSITES[previousMovement]) {
            direction = DIRECTIONS[code];
            previousKey = code;
        }
    }
}