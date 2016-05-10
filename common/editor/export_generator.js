function ExportGenerator(_gridMap) {

    var gridMap = _gridMap;
    var difficulty = 0;
    var speed = 0;
    var width = Utils.grid.getWidth();
    var height = Utils.grid.getHeight();

    //init
    (function() {
        var diffValue = document.getElementById('difficulty').value;
        var speedValue = document.getElementById('speed').value;
        if (diffValue) {
            difficulty = parseInt(diffValue);
        }
        if (speedValue) {
            speed = parseInt(speedValue);
        }
    })();

    //public
    this.generateJSON = function() {
        var grid = {};
        for (var key in gridMap) {
            if (gridMap.hasOwnProperty(key)) {
                grid[key] = gridMap[key].getConfig();
            }
        }
        var jsonRep = {
            difficulty: difficulty,
            speed: speed,
            grid: grid,
            width: width,
            height: height
        };
        return jsonRep;
    };

    this.generateJSONFile = function(filename) {
        var jsonStr = JSON.stringify(this.generateJSON());

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
    var gridMap = Utils.grid.getGridMap();
    var filename = (document.getElementById('title').value || 'My_Stage') + '.json';
    var exp = new ExportGenerator(gridMap);
    exp.generateJSONFile(filename);
}