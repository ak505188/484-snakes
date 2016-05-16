function TextWriter(_canvas) {

    //private fields
    var canvas = _canvas;
    var ctx = _canvas.getContext('2d');

    //public
    this.renderText = function(statusConfig) {
        for (var key in statusConfig) {
            if (statusConfig.hasOwnProperty(key)) {
                var value = statusConfig[key];
                var textConfig;
                switch (key) {
                    case 'title':
                        textConfig = getTitleConfig(value);
                        break;
                    case 'waiting':
                        textConfig = getWaitingConfig(value);
                        break;
                    case 'dead':
                        textConfig = getDeadConfig(value);
                        break;
                    case 'length':
                        textConfig = getLengthConfig(value);
                        break;
                    case 'speed':
                        textConfig = getSpeedConfig(value);
                        break;
                    case 'difficulty':
                        textConfig = getDifficultyConfig(value);
                        break;
                    case 'totalSteps':
                        textConfig = getTotalStepsConfig(value);
                        break;
                }
                if (textConfig) {
                    handleDrawText(textConfig);
                }
            }
        }
    };

    //private helpers
    function handleDrawText(textConfig) {
        ctx.fillStyle = 'black';
        ctx.font = textConfig.size + 'px Arial';
        ctx.textAlign = textConfig.align;
        var content = textConfig.content;
        for (var i = 0; i < content.length; i++) {
            var yPos = textConfig.y + i * textConfig.size;
            ctx.fillText(content[i], textConfig.x, yPos);
        }
    }

    function getTitleConfig(value) {
        return {
            x: canvas.width / 2,
            y: canvas.height / 2,
            align: 'center',
            content: [value],
            size: 30
        };
    }

    function getWaitingConfig(value) {
        return {
            x: canvas.width / 2,
            y: canvas.height - (canvas.height / 4),
            align: 'center',
            content: [value],
            size: 10
        };
    }

    function getDeadConfig(value) {
        var config;
        if (value == true) {
            config = {
                x: canvas.width / 2,
                y: canvas.height / 2,
                align: 'center',
                content: ['Game Over'],
                size: 50
            };
        }
        return config;
    }

    function getLengthConfig(value) {
        return getInfoConfig('Length', value, Utils.infoHorizontalRatios.length);
    }

    function getSpeedConfig(value) {
        return getInfoConfig('Speed', value, Utils.infoHorizontalRatios.speed);
    }

    function getDifficultyConfig(value) {
        return getInfoConfig('Difficulty', value, Utils.infoHorizontalRatios.difficulty);
    }

    function getTotalStepsConfig(value) {
        return getInfoConfig('Total Steps', value, Utils.infoHorizontalRatios.totalSteps);
    }

    function getInfoConfig(text, value, horizontalRatio) {
        return {
            x: canvas.width * horizontalRatio,
            y: canvas.height - Utils.infoBarHeight + 20,
            align: 'center',
            content: [text, value],
            size: 20
        }
    }
}