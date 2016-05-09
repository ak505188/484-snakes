(function() {
    var selector = new SelectionCanvas();
    var editor = new EditorCanvas();
    var current = new CurrentCanvas();

    var interval = setInterval(render, 50);
    document.addEventListener('objectselected', handleSelection, false);

    function render() {
        selector.render();
        editor.render();
        current.render();
    }

    function handleSelection(event) {
        var obj = event.detail.obj;
        current.setObject(obj);
        editor.setObject(obj);
    }

})();