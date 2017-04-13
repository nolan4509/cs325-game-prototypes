"use strict";

GameStates.makePreloader = function(game) {

	//var background = null;
	var preloadBar = null;

	var ready = false;

    return {
    
        preload: function () {

            this.game.physics.startSystem(Phaser.ARCADE);
            this.game.world.setBounds(0, 0, 800, 600);
            this.game.stage.backgroundColor = '#000';

            preloadBar = this.game.add.sprite(200, 200, 'preloaderBar');
    

            this.game.load.setPreloadSprite(preloadBar);

            this.game.load.audio('startSound', 'assets/menu.wav');
            this.game.load.audio('theme', 'assets/arcade.wav');
            this.game.load.audio('ping', 'assets/Bell-tone.mp3');

            this.game.load.image('playButton', 'assets/play.png');

            this.game.load.bitmapFont('font','assets/font.png','assets/font.fnt');
        },
    
        create: function () {
    
            preloadBar.cropEnabled = false;
            game.state.start('MainMenu');
        },
    };
};
