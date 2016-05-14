//todo: this remains until we find an easier way to pass grid around
//todo: we may need to split this or have two instances of it because of the separation between front and back end

var Utils = {

    //global references to components -- terrible
    grid: null,
    editorGrid: null,
    controller: null,

    //global constants
    spawnTime: 0,
    spawnFlashTime: 4,
    noColor: 'none',
    baseStep: 500,

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

    //starting
    startingInfo: {
        "0": {x: 2/3, y: 1/3, direction: this.keyRight},
        "1": {x: 2/3, y: 2/3, direction: this.keyDown},
        "2": {x: 1/3, y: 2/3, direction: this.keyLeft},
        "3": {x: 1/3, y: 1/3, direction: this.keyUp}
    },

    init: function() {
        this.directions = {};
        this.directions[Utils.keyLeft] = {x: -1, y: 0};
        this.directions[Utils.keyUp] = {x: 0, y: -1};
        this.directions[Utils.keyRight] = {x: 1, y: 0};
        this.directions[Utils.keyDown] = {x: 0, y: 1};

        this.opposites = {};
        this.opposites[Utils.keyLeft] = Utils.keyRight;
        this.opposites[Utils.keyUp] = Utils.keyDown;
        this.opposites[Utils.keyRight] = Utils.keyLeft;
        this.opposites[Utils.keyDown] = Utils.keyUp;
    },


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
Utils.init();