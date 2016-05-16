function TestController() {

    var editorBodyEl = document.getElementById('editorBody');
    var testBodyEl = document.getElementById('testBody');
    var canvas = document.getElementById('test');
    var drawInterval;

    //public
    this.enterTest = function() {
        editorBodyEl.style.display = 'none';
        testBodyEl.style.display = 'block';

        var gridMap = Utils.editorGrid.getGridMap();
        var generator = new ExportGenerator(gridMap);
        var json = JSON.parse(generator.generateJSONStr());

        Utils.tempListener = new Listener();
        Utils.tempRenderer = new GameRenderer('test');
        Utils.controller = new GameController({
            stageData: json
        });
        drawInterval = setInterval(function() {
            Utils.tempRenderer.render();
        }, 10);
        Utils.controller.start();
    };

    this.exitTest = function() {
        Utils.controller.stop();
        if (drawInterval) {
            clearInterval(drawInterval);
        }
        Utils.spawnTime = 0;
        testBodyEl.style.display = 'none';
        editorBodyEl.style.display = 'block';
    };
}

function doEnterTest() {
    var test = new TestController();
    test.enterTest();
}

function doExitTest() {
    var test = new TestController();
    test.exitTest();
}