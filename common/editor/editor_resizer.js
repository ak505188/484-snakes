function EditorResizer() {

    var size = 20;

    var grid = Utils.editorGrid;
    var oldSize = grid.getWidth();

    //init
    (function() {
        size = getValue('size', 5, 100, size);
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
        grid.setWidth(size);
        grid.setHeight(size);
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
        return oldPos.x < size && oldPos.y < size;
    }

    function convertIndex(oldIndex) {
        var oldPos = convertIndexToPosition(oldIndex);
        return oldPos.y * size + oldPos.x;
    }

    function convertIndexToPosition(index) {
        return {
            x: index % oldSize,
            y: Math.floor(index / size)
        };
    }

    function updateCurrentVisuals() {
        var currentSizeEl = document.getElementById('currentSize');
        currentSizeEl.innerHTML = size;
    }
}

function doResize(event) {
    event.preventDefault(); //prevents form refresh from submit click
    var resizer = new EditorResizer();
    resizer.resize();
    return false;
}