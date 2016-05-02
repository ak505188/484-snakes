function Queue() {
    var head = null;
    var length = 0;

    //inserts obj as head
    this.enqueue = function(obj) {
        var node = new Node(obj);
        node.setNext(head);
        if (head !== null) {
            head.setPrevious(node);
        }
        head = node;
        length++;
    };

    //pushes obj as tail
    this.push = function(obj) {
        var node = new Node(obj);
        var tail = getTailNode();
        if (tail !== null) {
            tail.setNext(node);
            node.setPrevious(tail);
        }
        length++;
    };

    //dequeues tail and returns the dequeue'd content
    this.dequeue = function() {
        var tail = getTailNode();
        var tailContent = null;
        if (tail !== null) {
            var preTail = tail.getPrevious();
            if (preTail !== null) {
                preTail.setNext(null);
            } else {
                head = null;
            }
            tailContent = tail.getContent();
            length--;
        }
        return tailContent;
    };

    //generates list where the first item is the head (most recently enqueued) and the last is the tail (next to be dequeue'd)
    this.getAsList = function() {
        var list = [];
        var cur = head;
        for (var i = 0; i < length; i++) {
            list.push(cur.getContent());
            cur = cur.getNext();
        }
        return list;
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
        var tail = getTailNode();
        var tailContent = null;
        if (tail !== null) {
            tailContent = tail.getContent();
        }
        return tailContent;
    };

    this.getLength = function() {
        return length;
    };


    //private
    function getTailNode() {
        var cur = head;
        for (var i = 0; i < length - 1; i++) {
            cur = cur.getNext();
        }
        return cur;
    }
}