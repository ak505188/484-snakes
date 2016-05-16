inherits(Renderer, GameRenderer);

function GameRenderer(_id) {
    Renderer.call(this, _id);
    //this class with handle ALL game-related rendering logic!!

    //constants
    var WIDTH_RATIO = 0.5;
    var HEIGHT_RATIO = 0.75;

    //private fields
    var scope = this;
    var drawProg = 0;
    var statusConfig = {
        title: '484 Snakes Multiplayer',
        waiting: 'Waiting for players...'
    };
    var textRenderer = new TextWriter(this.getCanvas());

    //init
    (function() {
        window.onresize = handleResize;
        handleResize();
    })();

    //public
    //@Override
    this.preRenderUpdate = function() {
        var newConfig = this.getNewConfig();
        if (newConfig.statusConfig) {
            statusConfig = newConfig.statusConfig;
        }
        if (newConfig.viewList) {
            this.setViewList(newConfig.viewList);
        }
    };

    //@Override
    this.drawForeground = function() {
        drawBottomBar();
        textRenderer.renderText(statusConfig);
    };

    //@Override
    this.drawObj = function(viewConfig, cellWidth, cellHeight) {
        var ctx = this.getCtx();
        var xPos = viewConfig.x * cellWidth;
        var yPos = viewConfig.y * cellHeight;
        if (drawProg % viewConfig.flashTime < viewConfig.flashTime / 2) {
            ctx.fillStyle = viewConfig.color1;
        } else {
            ctx.fillStyle = viewConfig.color2;
        }
        ctx.fillRect(xPos, yPos, cellWidth, cellHeight);
        if (ctx.fillStyle === viewConfig.color1 || viewConfig.color2 !== Utils.noColor) {
            ctx.strokeRect(xPos, yPos, cellWidth, cellHeight);
        }
    };

    //@Override
    this.getCellDimensions = function() {
        var canvas = this.getCanvas();
        return {
            width: canvas.width / this.getGridWidth(),
            height: (canvas.height - Utils.infoBarHeight) / this.getGridHeight()
        };
    };

    //@Override
    this.onAfterDraw = function() {
        drawProg++;
    };

    //private helpers
    function drawBottomBar() {
        var canvas = scope.getCanvas();
        var ctx = scope.getCtx();
        var yPos = canvas.height - Utils.infoBarHeight;
        ctx.fillStyle = '#00ccff';
        ctx.fillRect(0, yPos, canvas.width, Utils.infoBarHeight);
        ctx.strokeRect(0, yPos, canvas.width, Utils.infoBarHeight);
    }

    function handleResize() {
        var canvas = scope.getCanvas();
        canvas.width = WIDTH_RATIO * window.innerWidth;
        canvas.height = HEIGHT_RATIO * window.innerHeight;
    }
}