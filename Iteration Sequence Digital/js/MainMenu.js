"use strict";

GameStates.makeMainMenu = function(game, shared) {

	var music = null;
	var playButton = null;
    var background = null;
    
    function startGame(pointer) {

        game.state.start('Game');

    }
    
    return {
    
        create: function () {

            music = game.add.audio('startSound');
            music.play();
    
            this.game.physics.startSystem(Phaser.ARCADE);
            this.game.world.setBounds(0, 0, 600, 600);
            this.game.stage.backgroundColor = '#000';
    
            playButton = game.add.button( 200, 300, 'playButton', startGame, null);
            playButton.scale.setTo(0.5, 0.5);
    
            var style = {font: "bold 14px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle"};
            var text = game.add.text(175, 200, "Try to get more squares than your opponent!", style);
        },
    
        update: function () {
    
            //	Do some nice funky main menu effect here
    
        }
        
    };
};
