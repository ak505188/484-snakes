function Renderer(_id) {
    //this class with handle ALL game-related rendering logic!!

    //private fields
    var canvas = document.getElementById(_id);
    var ctx = canvas.getContext('2d');
    var newConfig = {};
    var viewList = [];

    var gridWidth = 20;
    var gridHeight = 20;

    //public
    //Abstract functions
    this.drawForeground = function() {};
    this.drawObj = function(viewConfig, cellWidth, cellHeight) {};
    this.onAfterDraw = function() {};

    this.preRenderUpdate = function() {
        if (newConfig.viewList) {
            viewList = newConfig.viewList;
        }
    };

    this.getCellDimensions = function() {
        return {
            width: canvas.width / gridWidth,
            height: canvas.height / gridHeight
        };
    };

    this.drawObj = function(viewConfig, cellWidth, cellHeight) {
        var xPos = viewConfig.x * cellWidth;
        var yPos = viewConfig.y * cellHeight;
        ctx.fillStyle = viewConfig.color1;
        ctx.fillRect(xPos, yPos, cellWidth, cellHeight);
        ctx.strokeRect(xPos, yPos, cellWidth, cellHeight);
    };

    this.render = function() {
        this.preRenderUpdate();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBackground();

        var dim = this.getCellDimensions();
        for (var i = 0; i < viewList.length; i++) {
            var viewConfig = viewList[i];
            this.drawObj(viewConfig, dim.width, dim.height);
        }

        this.drawForeground();
        this.onAfterDraw();
    };

    this.setDimensions = function(dimensions) {
        gridWidth = dimensions.width;
        gridHeight = dimensions.height;
    };

    this.updateView = function(viewMap) {
        newConfig = viewMap;
    };

    this.setViewList = function(_viewList) {
        viewList = _viewList;
    };
    
    this.getCanvas = function() {
        return canvas;
    };

    this.getCtx = function() {
        return ctx;
    };

    this.getNewConfig = function() {
        return newConfig;
    };

    this.getGridWidth = function() {
        return gridWidth;
    };

    this.getGridHeight = function() {
        return gridHeight;
    };

    //private helpers
    function drawBackground () {
        ctx.strokeStyle = '#000000';
        ctx.fillStyle = '#aaaaaa';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}