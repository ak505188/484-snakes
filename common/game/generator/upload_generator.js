inherits(StageGenerator, UploadGenerator);

function UploadGenerator(_json) {
    StageGenerator.call(this,
        _json.difficulty,
        _json.speed,
        _json.width,
        _json.height
    );

    //fields
    var repMap = _json.grid;

    //@Override
    this.generateStage = function() {
        debugger;
        for (var key in repMap) {
            if (repMap.hasOwnProperty(key)) {
                var rep = repMap[key];
                var objName = rep.name;
                var obj = new window[objName](rep);
                Utils.grid.insert(obj);
            }
        }
    };
}