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
    
            music = game.add.audio('menuMusic');
            music.play();
    

            background = game.add.sprite(0, 0, 'background');
            background.scale.setTo(0.16, 0.3);
    
            playButton = game.add.button(50, 150, 'playButton', startGame, null);
            playButton.scale.setTo(0.25, 0.25);
    
            var style = {font: "14px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle"};
            var text = game.add.text(20, 25, "Navigate through the maze", style);
            var text2 = game.add.text(50,50, "to find the treasure!", style);
            var text3 = game.add.text(40, 75, "Beware, it's dark inside!", style);
        },
        

        update: function () {
    
            //	Do some nice funky main menu effect here
    
        }
        
    };
};
