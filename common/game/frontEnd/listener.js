function Listener() {

    //todo: this class will be responsible for handling any front-end player-specific inputs
    //todo: back end will query the listener for each player at the beginning of its step to get the current movement state of each player

    //private fields
    var keyCode = -1;

    //init
    (function() {
        window.addEventListener('keydown', handleKeyDown, false);
    })();

    //public
    this.getKeyCode = function() {
        return keyCode;
    };

    //private helpers
    function handleKeyDown(e) {
        var code = e.keyCode;
        if (code >= Utils.keyLeft && code <= Utils.keyDown) {
            keyCode = code;
        }
    }
}