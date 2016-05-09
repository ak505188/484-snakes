function EditorCanvas() {

    //constants
    var WIDTH = 500;
    var HEIGHT = 500;

    //private fields
    var scope = this;
    //todo: make this settable in UI
    var width = 20;
    var height = 20;
    var difficulty = 0;
    var baseStep = 200;

    var grid = new GameGrid(width, height, difficulty, baseStep);
    var canvas = document.getElementById('editor');
    var ctx = canvas.getContext('2d');
    var currentObj;

    //init
    (function() {
        canvas.width = WIDTH;
        canvas.height = HEIGHT;
        canvas.addEventListener('mousedown', onClick, false);
    })();

    //public
    this.render = function() {
        grid.render(ctx, canvas.width, canvas.height);
    };

    this.setObject = function(obj) {
        currentObj = Utils.clone(obj);
    };

    //private helpers
    function onClick(event) {
        if (event.which === 1) {
            handleLeftClick(event);
        } else if (event.which === 3 || event.button === 2) {
            handleRightClick(event);
        }
    }

    function handleLeftClick(event) {
        if (currentObj) {
            var clone = Utils.clone(currentObj);
            var cellDim = grid.getCellDimensions(canvas.width, canvas.height);
            var x = Math.floor((event.x - canvas.offsetLeft) / cellDim.width);
            var y = Math.floor((event.y - canvas.offsetTop) / cellDim.height);

            clone.setX(x);
            clone.setY(y);
            grid.insertAt(clone, x, y);
        }
    }

    //todo: figure out how to properly respond to right click and block context menu
    function handleRightClick(event) {
        var cellDim = grid.getCellDimensions(canvas.width, canvas.height);
        var x = Math.floor((event.x - canvas.offsetLeft) / cellDim.width);
        var y = Math.floor((event.y - canvas.offsetTop) / cellDim.height);

        grid.removeAt(x, y);
        return false;
    }
}