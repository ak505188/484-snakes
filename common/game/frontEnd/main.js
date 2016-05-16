(function() {
    //the main app that runs on all players' browsers

    //todo: if player number is 1, or player is creator, do:
    var init = new Initializer();
    init.createInitialConfig();

    //todo: for everyone
    var listener = new Listener();
    var renderer = new GameRenderer('game');
    var drawInterval = setInterval(function() {
        renderer.render();
    }, 10);

    //todo: on close or something, clear the interval

    //todo: temp -- for now until theres a single/multi controller
    Utils.tempListener = listener;
    Utils.tempRenderer = renderer;
})();