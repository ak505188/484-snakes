function Renderer() {
    //this class with handle ALL game-related rendering logic!!

    //constants
    var WIDTH_RATIO = 0.5;
    var HEIGHT_RATIO = 0.7;

    //private fields
    var canvas = document.getElementById('game');
    var ctx = canvas.getContext('2d');
    var newConfig = {};
    var viewList = [];
    var statusList = [/*todo: put default initial text here to render before game starts */];
    var width = 20;
    var height = 20;
    var drawProg = 0;

    //init
    (function() {
        window.onresize = handleResize;
    })();

    //public
    this.render = function() {
        preRenderUpdate();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBackground();

        var dim = getCellDimensions();
        for (var i = 0; i < viewList.length; i++) {
            var viewConfig = viewList[i];
            drawObj(viewConfig, dim.width, dim.height);
        }

        drawForeground();
        drawProg++;
    };

    this.setDimensions = function(dimensions) {
        width = dimensions.width;
        height = dimensions.height;
    };

    this.updateView = function(viewMap) {
        newConfig = viewMap;
    };


    //private helpers
    function drawBackground () {
        //todo: draw the bg here
    }

    //todo: redo this logic obvi
    function drawObj (viewConfig, cellWidth, cellHeight) {
        if (drawProg % viewConfig.flashTime < viewConfig.flashTime / 2) {
            ctx.fillStyle = viewConfig.color1;
        } else {
            ctx.fillStyle = viewConfig.color2;
        }
        ctx.fillRect(this.getX() * cellWidth, this.getY() * cellHeight, cellWidth, cellHeight);
        if (ctx.fillStyle === viewConfig.color1 || viewConfig.color2 !== Utils.noColor) {
            ctx.fillStyle = 'black';
            ctx.strokeRect(this.getX() * cellWidth, this.getY() * cellHeight, cellWidth, cellHeight);
        }
    }

    function preRenderUpdate() {
        statusList = newConfig.statusList;
        viewList = newConfig.viewList;
        width = newConfig.width;
        height = newConfig.height;
    }

    function drawForeground() {
        //todo: draw the fg here
    }

    function getCellDimensions() {
        return {
            width: canvas.width / width,
            height: canvas.height / height
        };
    }

    function handleResize() {
        canvas.width = WIDTH_RATIO * window.innerWidth;
        canvas.height = HEIGHT_RATIO * window.innerHeight;
    }
}