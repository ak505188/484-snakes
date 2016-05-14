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
    var statusConfig = {
        title: '484 Snakes Multiplayer',
        waiting: 'Waiting for players...'
    };

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
        ctx.strokeStyle = '#000000';
        ctx.fillStyle = '#aaaaaa';
        ctx.fillRect(0, 0, width, height);
    }

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
        statusConfig = newConfig.statusConfig;
        viewList = newConfig.viewList;
        width = newConfig.width;
        height = newConfig.height;
    }

    function drawForeground() {
        //todo: draw the fg here
        for (var key in statusConfig) {
            if (statusConfig.hasOwnProperty(key)) {
                var textConfig;
                switch (key) {
                    case 'title':
                        textConfig = getTitleConfig();
                        break;
                    case 'waiting':
                        textConfig = getWaitingConfig();
                        break;

                }
                ctx.font = textConfig.size + 'px Arial';
                ctx.textAlign = textConfig.align;
                ctx.fillText(statusConfig[key], textConfig.x, textConfig.y);
            }
        }
    }

    function getTitleConfig() {
        return {
            x: canvas.width / 2,
            y: canvas.height / 2,
            align: 'center',
            size: 30
        };
    }

    function getWaitingConfig() {
        return {
            x: canvas.width / 2,
            y: canvas.height - (canvas.height / 4),
            align: 'center',
            size: 10
        };
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