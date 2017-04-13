"use strict";

GameStates.makeMainMenu = function(game, shared) {

	var music = null;
	var playButton = null;
    var background = null;
    
    function startGame(pointer) {
        music.stop();
        game.state.start('Game');

    }
    
    return {
    
        create: function () {


            music = game.add.audio('startSound');
            music.play();
    
            game.physics.startSystem(Phaser.ARCADE);
            game.world.setBounds(0, 0, 800, 600);
            game.stage.backgroundColor = '#000';
    
            playButton = game.add.button(250, 300, 'playButton', startGame, null);
            playButton.scale.setTo(0.5, 0.5);
    
            var style = {font: "bold 16px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle"};
            var text = game.add.text(200, 200, "Try to connect the most dots in 20 moves!", style);

            var highestScore = JSON.parse(localStorage.getItem('dotsHighestScore'));
            var scoreStyle = {font: "bold 18px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle"};
            var scoreText = game.add.text(300, 400, "Your High Score: "+highestScore, scoreStyle);
            scoreText.updateText();
        },
    
        update: function () {
    
            //	Do some nice funky main menu effect here
    
        }
        
    };
};
