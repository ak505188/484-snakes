function EditorCanvas() {

    //constants
    var WIDTH = 500;
    var HEIGHT = 500;

    //private fields
    var scope = this;
    var width = 20;
    var height = 20;
    var baseStep = 200;

    var grid = new GameGrid(width, height, 0, baseStep);
    var canvas = document.getElementById('editor');
    var ctx = canvas.getContext('2d');
    var currentObj;

    //init
    (function() {
        canvas.width = WIDTH;
        canvas.height = HEIGHT;
        canvas.addEventListener('contextmenu', handleRightClick, false);
        canvas.addEventListener('mousedown', handleLeftClick, false);
        Utils.editorGrid = grid;
    })();

    //public
    this.render = function() {
        grid.render(ctx, canvas.width, canvas.height);
    };

    this.setObject = function(obj) {
        currentObj = Utils.clone(obj);
    };

    //private helpers
    function handleLeftClick(event) {
        if (currentObj) {
            var clone = Utils.clone(currentObj);
            var cellDim = grid.getCellDimensions(canvas.width, canvas.height);
            var x = Math.floor(event.offsetX / cellDim.width);
            var y = Math.floor(event.offsetY / cellDim.height);

            clone.setX(x);
            clone.setY(y);
            grid.insertAt(clone, x, y);
        }
    }

    function handleRightClick(event) {
        event.preventDefault(); //prevents context menu from showing up
        var cellDim = grid.getCellDimensions(canvas.width, canvas.height);
        var x = Math.floor(event.offsetX / cellDim.width);
        var y = Math.floor(event.offsetY / cellDim.height);

        grid.removeAt(x, y);
    }
}