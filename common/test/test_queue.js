(function() {
    var q = new Queue();
    var a = {a:'a',b:'b'};

    q.enqueue(a);
    console.log(q.getHead());
    console.log(q.getTail());

    debugger;
    var done = q.dequeue();
    console.log(done);
})();