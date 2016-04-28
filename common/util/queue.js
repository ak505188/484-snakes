function Queue() {
    var head = null;
    var length = 0;

    this.enqueue = function(obj) {
        var node = new Node(obj);
        node.setNext(head);
        if (head !== null) {
            head.setPrevious(node);
        }
        head = node;
        length++;
    };

    //dequeues and returns the dequeue'd content
    this.dequeue = function() {
        var retval = null;
        if (head !== null) {
            var cur = head;
            for (var i = 0; i < length - 1; i++) {
                cur = cur.getNext();
            }
            var prev = cur.getPrevious();
            if (prev !== null) {
                prev.setNext(null);
            } else {
                head = null;
            }
            cur.setPrevious(null);
            retval = cur.getContent();
            length--;
        }
        return retval;
    };

    this.getAsList = function() {
        var list = [];
        var cur = head;
        for (var i = 0; i < length; i++) {
            list.push(cur.getContent());
            cur = cur.getNext();
        }
        return list;
    };

    //todo: correct this logic
    this.forEach = function() {
        var cur = head;
        var fnObj = arguments[0];
        for (var i = 0; i < length; i++) {
            var content = cur.getContent();
            fnObj(content, arguments);
            cur = cur.getNext();
        }
    };

    this.forEachInternal = function(fnName, fnArgs) {
        var cur = head;
        for (var i = 0; i < length; i++) {
            var content = cur.getContent();
            content[fnName].apply(content, fnArgs);
            cur = cur.getNext();
        }
    };

    this.getHead = function() {
        var headContent = null;
        if (head !== null) {
            headContent = head.getContent();
        }
        return headContent;
    };

    this.getTail = function() {
        var cur = head;
        var tailContent = null;
        for (var i = 0; i < length - 1; i++) {
            cur = cur.getNext();
        }
        if (cur !== null) {
            tailContent = cur.getContent();
        }
        return tailContent;
    };

    this.getLength = function() {
        return length;
    };
}