"use strict";
//CURRENT
//
//
//
GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
    var player = null;
    var lightAngle = Math.PI/4;
    var numberOfRays = 20;
    var rayLength = 100;
    var maskGraphics = null;
    var chest;
    var music = null;
    var winMusic = null;
    function winner() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.
        music.stop();
        winMusic = this.game.add.audio('winner');
        winMusic.play();
        //  Then let's go back to the main menu.
        game.state.start('MainMenu');

    }
    
    return {
    
        create: function () {

            //Start the Arcade Physics systems
            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            //Add the tilemap and tileset image. The first parameter in addTilesetImage
            //is the name you gave the tilesheet when importing it into Tiled, the second
            //is the key to the asset in Phaser
            this.map = this.game.add.tilemap('tilemap');
            this.map.addTilesetImage('fantasy', 'fantasy');
            //Add both the background, ground, and walkable layers. 
            this.GroundLayer = this.map.createLayer('Ground');
            this.ObjectLayer = this.map.createLayer('Walls');
            //this.FinishLayer = this.map.createLayer('Finish');
            //this.map.createFromObjects('Finish', 8, this, 0, true, false);
            //Before you can use the collide function you need to set what tiles can collide
            this.map.setCollisionBetween(1, 10000, true, 'Walls');
            //Change the world size to match the size of this layer
            //this.game.world.setBounds(0, 0, 1000, 1000);
            this.GroundLayer.resizeWorld();
            
            music = this.game.add.audio('music');
            music.play();

            
            

            //Enable cursor keys so we can create some controls
            this.cursors = this.game.input.keyboard.createCursorKeys();
            //this.game.world.scale.set(1.5);
            //this.GroundLayer.resizeWorld();


            this.lightAngle = Math.PI/2;
            this.numberOfRays = 600;
            this.rayLength = 300;
            this.wallsBitmap =  this.game.make.bitmapData(3200,3200);
            this.wallsBitmap.draw('map');
            this.wallsBitmap.update();
            this.game.add.sprite(0,0,this.wallsBitmap);
            this.maskGraphics = this.game.add.graphics(0,0);
            this.blackness = this.game.add.sprite(0,0,'blackness');
            this.blackness.alpha = 0.7;
            this.mapSprite = this.game.add.sprite(0,0,'map');
            
            //Player
            //Add the sprite to the game and enable arcade physics on it
            player = this.game.add.sprite(48, 800 - 48, 'knight');
            this.game.physics.arcade.enable(player);
            player.anchor.setTo(0.5, 0.5);
            player.body.collideWorldBounds = true;
            player.body.velocity.x = 0;
            player.body.velocity.y = 0;
            player.scale.setTo(.8, .8);

            //Make the camera follow the sprite
            this.game.camera.follow(player);

            //Chest
            chest = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY+32, 'chest');
            this.game.physics.arcade.enable(chest);
            chest.anchor.setTo(0.5, 0.5);
            chest.body.collideWorldBounds = true;
            chest.body.velocity.x = 0;
            chest.body.velocity.y = 0;
        },
    

        update: function () {
            //Make the sprite collide with the ground layer
            this.game.physics.arcade.collide(player, this.ObjectLayer);
            this.game.physics.arcade.overlap(player, chest, winner, null, this);


            
            player.body.velocity.x = 0;
            player.body.velocity.y = 0;
            if (this.cursors.up.isDown)
            {
                player.body.velocity.y = -200;
            }
            else if (this.cursors.down.isDown)
            {
                player.body.velocity.y = 200;
            }

            if (this.cursors.left.isDown)
            {
                player.body.velocity.x = -200;
            }
            else if (this.cursors.right.isDown)
            {
                player.body.velocity.x = 200;
            }


            var mouseAngle = Math.atan2(player.y-this.game.input.y,player.x-this.game.input.x);
            this.maskGraphics.clear();
            this.maskGraphics.lineStyle(2, 0xffffff, 1);
            this.maskGraphics.beginFill(0xffff00, 0.5);
            this.maskGraphics.moveTo(player.x, player.y);
            for(var i = 0; i<this.numberOfRays; i++){
              //this.maskGraphics.moveTo(this.player.x,this.player.y);
              var rayAngle = mouseAngle-(this.lightAngle/2)+(this.lightAngle/this.numberOfRays)*i
              var lastX = player.x;
              var lastY = player.y;
              for(let j= 1; j<=this.rayLength;j+=1){
                var landingX = Math.round(player.x-(2*j)*Math.cos(rayAngle));
                var landingY = Math.round(player.y-(2*j)*Math.sin(rayAngle));
                if(this.wallsBitmap.getPixel32(landingX,landingY)===0){
                  lastX = landingX;
                  lastY = landingY;
                }
                else{
                  this.maskGraphics.lineTo(lastX,lastY);
                  break;
                }
              }
              this.maskGraphics.lineTo(lastX,lastY);
            }
            this.maskGraphics.lineTo(player.x,player.y);
            this.maskGraphics.endFill();
            this.mapSprite.mask = this.maskGraphics;
        }
    };
};
