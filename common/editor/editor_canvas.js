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
        drawBackground();
        ctx.strokeStyle = 'black';
        var gridMap = grid.getGridMap();
        for (var key in gridMap) {
            if (gridMap.hasOwnProperty(key)) {
                drawObj(gridMap[key].getViewConfig());
            }
        }
    };

    this.setObject = function(obj) {
        currentObj = Utils.clone(obj);
    };

    //private helpers
    function drawObj(viewConfig) {
        var dim = getCellDimensions();
        ctx.fillStyle = viewConfig.color1;
        ctx.fillRect(viewConfig.x * dim.width, viewConfig.y * dim.height, dim.width, dim.height);
        ctx.strokeRect(viewConfig.x * dim.width, viewConfig.y * dim.height, dim.width, dim.height);
    }

    function handleLeftClick(event) {
        if (currentObj) {
            var clone = Utils.clone(currentObj);
            var cellDim = getCellDimensions();
            var x = Math.floor(event.offsetX / cellDim.width);
            var y = Math.floor(event.offsetY / cellDim.height);

            clone.setX(x);
            clone.setY(y);
            grid.insertAt(clone, x, y);
        }
    }

    function handleRightClick(event) {
        event.preventDefault(); //prevents context menu from showing up
        var cellDim = getCellDimensions();
        var x = Math.floor(event.offsetX / cellDim.width);
        var y = Math.floor(event.offsetY / cellDim.height);

        grid.removeAt(x, y);
    }

    function getCellDimensions() {
        return {
            width: canvas.width / grid.getWidth(),
            height: canvas.height / grid.getHeight()
        };
    }

    function drawBackground() {
        var dim = getCellDimensions();
        ctx.fillStyle = '#ffffcc';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#99ff99';
        for (var i = 0; i < WIDTH; i += dim.width) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(canvas.width, i);
            ctx.closePath();
            ctx.stroke();
        }
        for (var j = 0; j < HEIGHT; j += dim.height) {
            ctx.beginPath();
            ctx.moveTo(j, 0);
            ctx.lineTo(j, canvas.height);
            ctx.closePath();
            ctx.stroke();
        }
    }
}