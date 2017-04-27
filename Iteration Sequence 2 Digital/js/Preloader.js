"use strict";

GameStates.makePreloader = function( game ) {

	var background = null;
	var preloadBar = null;

	var ready = false;

    return {
    
        preload: function () {

            //	These are the assets we loaded in Boot.js
            //	A nice sparkly background and a loading progress bar
            //background = this.game.add.sprite(0, 0, 'preloaderBackground');
            //background.scale.setTo(1.5, 1.5);
            preloadBar = this.game.add.sprite(25, 150, 'preloaderBar');
    
            //	This sets the preloadBar sprite as a loader sprite.
            //	What that does is automatically crop the sprite from 0 to full-width
            //	as the files below are loaded in.
            this.game.load.setPreloadSprite(preloadBar);

            
            

            //	+ lots of other required assets here
            //this.game.load.spritesheet('players', 'assets/players.png', 31, 32);

            
            this.game.load.audio('menuMusic', 'assets/DarkWinds.ogg');
            this.game.load.audio('music', 'assets/TheLoomingBattle.ogg');
            this.game.load.audio('winner', 'assets/WellDone.ogg');


            this.game.load.tilemap('tilemap', 'assets/Map.json', null, Phaser.Tilemap.TILED_JSON);

            this.game.load.image('fantasy', 'assets/fantasy-tileset.png');
            this.game.load.image('background', 'assets/back.jpg');
            this.game.load.image('playButton', 'assets/playbutton.png');
            this.game.load.image('map', 'assets/MapImage.png');
            this.game.load.image('blackness', 'assets/blackness.png');
            this.game.load.image('chest', 'assets/chest.jpg');
            //this.game.load.image('archer', 'assets/archer.jpg');
            this.game.load.image('knight', 'assets/knight.jpg');
            //this.game.load.image('mage', 'assets/mage.jpg');
            //this.game.load.image('rogue', 'assets/rogue.jpg');

        },
    
        create: function () {
    
            //	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
            preloadBar.cropEnabled = false;
            game.state.start('MainMenu');
    
        },
    
        
    
    };
};
