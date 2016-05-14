function Initializer() {
    //grabs the stage config from the player that initiated the game

    //private fields
    var mode;
    var initialConfig;

    //init
    //todo: uncomment all this stuff below once the UI is actually built...
    /*(function() {
        var modeRadios = document.getElementsByName('mode');    //todo: assuming mode is determined by radios
        for (var i = 0; i < modeRadios.length; i++) {
            var radio = modeRadios[i];
            if (radio.checked) {
                mode = radio.value;
                break;
            }
        }
    })();*/

    //public
    this.createInitialConfig = function() {
        //if (mode === 'random') {
            initialConfig = getRandomConfig();
        //} else {
        //    initialConfig = getUploadConfig();
        //}
    };

    this.getInitialConfig = function() {
        return initialConfig;
    };

    //private helpers
    function getRandomConfig() {
        return {
            difficulty: /*document.getElementById('difficulty')*/0,
            speed: /*document.getElementById('speed')*/6,
            width: /*document.getElementById('width')*/20,
            height: /*document.getElementById('height')*/20
        };
    }

    function getUploadConfig() {
        //todo: check somewhere that file is json format
        var file = document.getElementById('input').files[0];
        var json = JSON.parse(file.content);
        return {
            stageData: json
        };
    }
}