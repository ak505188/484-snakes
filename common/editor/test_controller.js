function TestController() {

    var editorBodyEl = document.getElementById('editorBody');
    var testBodyEl = document.getElementById('testBody');
    var canvas = document.getElementById('test');

    //public
    this.enterTest = function() {
        editorBodyEl.style.display = 'none';
        testBodyEl.style.display = 'block';

        var gridMap = Utils.editorGrid.getGridMap();
        var generator = new ExportGenerator(gridMap);
        var json = JSON.parse(generator.generateJSONStr());

        Utils.controller = new GameController(canvas, json);
        Utils.controller.start();
    };

    this.exitTest = function() {
        Utils.controller.stop();
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