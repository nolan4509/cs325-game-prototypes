"use strict";

GameStates.makePreloader = function( game ) {

	var background = null;
	var preloadBar = null;

	var ready = false;

    return {
    
        preload: function () {

            //	These are the assets we loaded in Boot.js
            //	A nice sparkly background and a loading progress bar
            background = this.game.add.sprite(0, 0, 'preloaderBackground');
            background.scale.setTo(1.5, 1.5);
            preloadBar = this.game.add.sprite(200, 200, 'preloaderBar');
    
            //	This sets the preloadBar sprite as a loader sprite.
            //	What that does is automatically crop the sprite from 0 to full-width
            //	as the files below are loaded in.
            this.game.load.setPreloadSprite(preloadBar);

            
            

            //	+ lots of other required assets here
            this.game.load.spritesheet('hero', 'assets/player.png', 16, 16);
            this.game.load.spritesheet('boss', 'assets/skeleton.png', 16, 16);
            this.game.load.spritesheet('fireball', 'assets/fireball.png', 64, 64);
            this.game.load.spritesheet('boom', 'assets/explode.png', 128, 128)
            
            this.game.load.audio('fireballSound', 'assets/fireball.wav');
            this.game.load.audio('startSound', 'assets/Soliloquy.mp3');
            this.game.load.audio('winSound', 'assets/win.wav');
            this.game.load.audio('music', 'assets/music.mp3')

            this.game.load.tilemap('tilemap', 'assets/Game4Map.json', null, Phaser.Tilemap.TILED_JSON);

            this.game.load.image('overworld', 'assets/Overworld.png');
            this.game.load.image('objects', 'assets/objects.png');
            this.game.load.image('starfield', 'assets/starfield.png');
            this.game.load.image('playButton', 'assets/menu.png');

        },
    
        create: function () {
    
            //	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
            preloadBar.cropEnabled = false;
            game.state.start('MainMenu');
    
        },
    
        
    
    };
};
