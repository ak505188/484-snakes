function ExportGenerator(_gridMap) {

    var gridMap = _gridMap;
    var speed = 0;
    var width = Utils.editorGrid.getWidth();
    var height = Utils.editorGrid.getHeight();

    //init
    (function() {
        var speedValue = document.getElementById('speed').value;
        if (speedValue) {
            speed = parseInt(speedValue);
        }
    })();

    //public
    this.generateJSONStr = function() {
        var grid = {};
        for (var key in gridMap) {
            if (gridMap.hasOwnProperty(key)) {
                grid[key] = gridMap[key].getConfig();
            }
        }
        var jsonRep = {
            speed: speed,
            grid: grid,
            width: width,
            height: height
        };
        return JSON.stringify(jsonRep);
    };

    this.generateJSONFile = function(filename) {
        var jsonStr = this.generateJSONStr();

        //note: this complicated little piece of code came from stack overflow...
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonStr));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }
}

function doExport() {
    var gridMap = Utils.editorGrid.getGridMap();
    var filename = (document.getElementById('title').value || 'My_Stage') + '.json';
    var exp = new ExportGenerator(gridMap);
    exp.generateJSONFile(filename);
}