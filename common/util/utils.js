//todo: this remains until we find an easier way to pass grid around

var Utils = {

    //global constants
    grid: null,
    controller: null,
    spawnTime: 0,

    //keyboard codes
    keyLeft: 37,
    keyUp: 38,
    keyRight: 39,
    keyDown: 40,

    //object classification
    hazard: 0,
    pickup: 1,

    //spawn offsets
    wandererOffset: 5,
    fastWandererOffset: 20,


    addVectors: function(v1, v2) {
        return {
            x: v1.x + v2.x,
            y: v1.y + v2.y
        }
    },

    subtractVectors: function(v1, v2) {
        return {
            x: v1.x - v2.x,
            y: v1.y - v2.y
        }
    },

    //clones all properties other than position
    clone: function(obj) {
        var newRep = {
            x: 0,
            y: 0
        };
        if (obj.classify) {
            newRep.classification = obj.classify();
        }
        if (obj.getTier) {
            newRep.tier = obj.getTier();
        }
        var type = obj.getType();
        return new window[type](newRep);
    },

    fireEvent: function(name, detail) {
        var event = new CustomEvent(name, {
            detail: detail,
            bubbles: true,
            cancelable: true
        });
        document.dispatchEvent(event);
    }
};