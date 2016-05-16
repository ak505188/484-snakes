function Initializer() {
    //grabs the stage config from the local storage of the player that initiated the game

    //private fields
    var mode = localStorage.mode;
    var initialConfig;

    //public
    this.createInitialConfig = function() {
        if (mode === 'Default') {
            initialConfig = getDefaultConfig();
        } else if (mode === 'Random') {
            initialConfig = getRandomConfig();
        } else {
            initialConfig = getCustomConfig();
        }
    };

    this.getInitialConfig = function() {
        return initialConfig;
    };

    //private helpers
    function getDefaultConfig() {
        return {
            difficulty: 0,
            speed: 6,
            width: 20,
            height: 20
        };
    }

    function getRandomConfig() {
        var randomConfig = JSON.parse(localStorage.random);
        return {
            difficulty: randomConfig.difficulty,
            speed: randomConfig.speed,
            width: randomConfig.size,
            height: randomConfig.size
        };
    }

    function getCustomConfig() {
        //todo: find out why this is double encoded
        var json = JSON.parse(JSON.parse(localStorage.currentLevel));
        return {
            stageData: json
        };
    }
}