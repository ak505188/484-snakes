/** this is not the server side framework, just a node class :P */

function Node(_content) {
    var content = _content;
    var next = null;
    var previous = null;

    //public
    this.getNext = function() {
        return next;
    };

    this.getPrevious = function() {
        return previous;
    };

    this.getContent = function() {
        return content;
    };

    this.setNext = function(_next) {
        next = _next;
    };

    this.setPrevious = function(_previous) {
        previous = _previous;
    }
}