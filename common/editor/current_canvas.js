function CurrentCanvas() {

    //constants
    var WIDTH = 50;
    var HEIGHT = 50;

    //private fields
    var canvas = document.getElementById('current');
    var ctx = canvas.getContext('2d');
    var object = null;

    //init
    (function() {
        canvas.width = WIDTH;
        canvas.height = HEIGHT;
    })();

    //public
    this.render = function() {
        if (object) {
            draw(object.getViewConfig());
        } else {
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    };

    this.setObject = function(obj) {
        object = Utils.clone(obj);
    };

    //private helpers
    function draw(viewConfig) {
        ctx.fillStyle = viewConfig.color1;
        ctx.strokeRect(viewConfig.x, viewConfig.y, canvas.width, canvas.height);
        ctx.fillRect(viewConfig.x, viewConfig.y, canvas.width, canvas.height);
    }
}