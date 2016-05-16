function SelectionCanvas() {

    //constant
    var NUM_OBJECTS = 3;
    var WIDTH = 200;
    var HEIGHT = 50;

    //fields
    var canvas = document.getElementById('selection');
    var ctx = canvas.getContext('2d');
    var objects = [];

    //init
    (function() {
        canvas.width = WIDTH;
        canvas.height = HEIGHT;
        canvas.addEventListener('mousedown', handleClick, false);

        addBlock();
        addWanderer(0);
        addWanderer(1);
    })();

    //public
    this.render = function() {
        ctx.strokeStyle = '#000000';
        ctx.fillStyle = '#aaaaaa';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < objects.length; i++) {
            draw(objects[i].getViewConfig());
        }
    };

    //private helpers
    function draw(viewConfig) {
        var itemWidth = WIDTH / NUM_OBJECTS;
        ctx.fillStyle = viewConfig.color1;
        ctx.fillRect(viewConfig.x * itemWidth, 0, itemWidth, canvas.height);
        ctx.strokeRect(viewConfig.x * itemWidth, 0, itemWidth, canvas.height);
    }

    function addBlock() {
        var rep = getNewLocation();
        objects.push(new Block(rep, 0));
    }

    function addWanderer(tier) {
        var rep = getNewLocation();
        rep.tier = tier;
        objects.push(new Wanderer(rep, 0));
    }

    function getNewLocation() {
        return {
            x: objects.length,
            y: 0
        };
    }

    function handleClick(event) {
        var xPos = event.offsetX;
        var index = Math.floor(xPos / (canvas.width / NUM_OBJECTS));
        if (index < objects.length) {
            var obj = objects[index];
            Utils.fireEvent('objectselected', { obj : obj});
        }
    }
}