"use strict";

GameStates.makeMainMenu = function( game, shared ) {

	var music = null;
	var playButton = null;
    var background = null;
    
    function startGame(pointer) {

        //	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
        music.stop();

        //	And start the actual game
        game.state.start('Game');

    }
    
    return {
    
        create: function () {
    
            //	We've already preloaded our assets, so let's kick right into the Main Menu itself.
            //	Here all we're doing is playing some music and adding a picture and button
            //	Naturally I expect you to do something significantly better :)
    
            music = game.add.audio('startSound');
            music.play();
    
            background = game.add.sprite(0, 0, 'starfield');
            background.scale.setTo(1.5, 1.5);
    
            playButton = game.add.button( 100, 200, 'playButton', startGame, null);
            playButton.scale.setTo(0.5, 0.5);
    
            var style = {font: "bold 14px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle"};
            var text = game.add.text(100, 100, "Don't let the skeletons get to your house!", style);
        },
    
        update: function () {
    
            //	Do some nice funky main menu effect here
    
        }
        
    };
};
