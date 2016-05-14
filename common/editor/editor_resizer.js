function EditorResizer() {

    var width = 20;
    var height = 20;

    var grid = Utils.editorGrid;
    var oldWidth = grid.getWidth();
    var oldHeight = grid.getHeight();

    //init
    (function() {
        width = getValue('width', 5, 100, width);
        height = getValue('height', 5, 100, height);
    })();

    //public
    this.resize = function() {
        var oldMap = grid.getGridMap();
        var newMap = {};
        for (var key in oldMap) {
            if (oldMap.hasOwnProperty(key) && isIndexIncluded(key)) {
                var newIndex = convertIndex(key);
                newMap[newIndex] = oldMap[key];
            }
        }
        grid.setWidth(width);
        grid.setHeight(height);
        grid.setGridMap(newMap);
        updateCurrentVisuals();
    };

    //private helpers
    function getValue(id, min, max, defaultValue) {
        var value = defaultValue;
        var valueStr = document.getElementById(id).value;
        if (valueStr) {
            value = parseInt(valueStr);
            if (value < min) {
                value = min;
            } else if (value > max) {
                value = max;
            }
        }
        return value;
    }

    function isIndexIncluded(index) {
        var oldPos = convertIndexToPosition(index);
        return oldPos.x < width && oldPos.y < height;
    }

    function convertIndex(oldIndex) {
        var oldPos = convertIndexToPosition(oldIndex);
        return oldPos.y * width + oldPos.x;
    }

    function convertIndexToPosition(index) {
        return {
            x: index % oldWidth,
            y: Math.floor(index / oldHeight)
        };
    }

    function updateCurrentVisuals() {
        var currentWidthEl = document.getElementById('currentWidth');
        var currentHeightEl = document.getElementById('currentHeight');
        currentWidthEl.innerHTML = width;
        currentHeightEl.innerHTML = height;
    }
}

function doResize(event) {
    event.preventDefault(); //prevents form refresh from submit click
    var resizer = new EditorResizer();
    resizer.resize();
    return false;
}