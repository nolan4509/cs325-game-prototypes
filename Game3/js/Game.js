"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
    var bouncy = null;
    var hero = null;
    var fireball = null;
    var boss = null;
    var jumpTimer = 0;
    var doh = null;
    var fireballSound = null;
    var jumpSound = null;
    var loseSound = null;
    var pressStartSound = null;
    var winSound = null;
    var princess = null;
    function quitGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        game.state.start('MainMenu');

    }
    function GameOver() {
        
        loseSound.play();
        game.state.start('MainMenu');
    }
    function bossHit(fireball, boss){
            fireball.kill();
            boss.kill();
            //boss.destroy();
            winSound.play();
            
            boss.animations.play('boom');
        }
    return {
    
        create: function () {

            //Start the Arcade Physics systems
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            loseSound = this.game.add.audio('loseSound');
            fireballSound = this.game.add.audio('fireballSound');
            jumpSound = this.game.add.audio('jumpSound');
            winSound = this.game.add.audio('winSound');


            //Change the background colour
            this.game.stage.backgroundColor = "#a9f0ff";
            //Add the tilemap and tileset image. The first parameter in addTilesetImage
            //is the name you gave the tilesheet when importing it into Tiled, the second
            //is the key to the asset in Phaser
            this.map = this.game.add.tilemap('tilemap');
            this.map.addTilesetImage('tiles', 'tileset');
            //Add both the background and ground layers. We won't be doing anything with the
            //GroundLayer though
            this.backgroundlayer = this.map.createLayer('Background');
            this.groundLayer = this.map.createLayer('Ground');
            //Before you can use the collide function you need to set what tiles can collide
            this.map.setCollisionBetween(1, 100, true, 'Ground');



            //Player
            //Add the sprite to the game and enable arcade physics on it
            hero = this.game.add.sprite(15, this.game.world.centerY, 'hero');
            this.game.physics.arcade.enable(hero);
            hero.anchor.setTo(0.5, 0.5);
            hero.checkWorldBounds = true;
            //Change the world size to match the size of this layer
            this.groundLayer.resizeWorld();
            //Set some physics on the sprite
            hero.body.bounce.y = 0.2;
            hero.body.gravity.y = 2000;
            hero.body.gravity.x = 0;
            hero.body.velocity.x = 100;
            //Create a running animation for the sprite and play it
            hero.animations.add('right', [28, 29, 30, 31, 32, 33, 34, 35, 36], 20, true);
            hero.animations.add('left', [10, 11, 12, 13, 14, 15, 16, 17], 20, true);
            //Make the camera follow the sprite
            this.game.camera.follow(hero);
            //Enable cursor keys so we can create some controls
            this.cursors = this.game.input.keyboard.createCursorKeys();
            this.shootkey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            hero.events.onOutOfBounds.add(GameOver, this);



            //Fireball
            fireball = game.add.weapon(1, 'fireball');
            //The bullet will be automatically killed when it leaves the world bounds
            fireball.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
            fireball.bulletAngleOffset = 0;
            fireball.bulletSpeed = 400;
            fireball.trackSprite(hero, 5, 0);
            fireball.fireAngle = 0;
            fireball.enableBody = true;
            fireball.physicsBodyType = Phaser.Physics.ARCADE;



            //Boss
            boss = game.add.sprite(2950, game.world.centerY, 'bossattack');
            game.physics.arcade.enable(boss);
            boss.anchor.setTo(0.5, 0.5);
            boss.checkWorldBounds = true;
            boss.body.gravity.y = 2000;
            boss.animations.add('attack', [8, 9, 10, 11, 12, 13, 14], 20, true);
            boss.animations.add('boom');
            
            //Princess
            princess = game.add.sprite(2975, game.world.centerY, 'princess');
            game.physics.arcade.enable(princess);
            princess.anchor.setTo(0.5, 0.5);
            princess.checkWorldBounds = true;
            princess.body.gravity.y = 2000;
        },
    
        update: function () {
            
            //Make the sprite collide with the ground layer
            this.game.physics.arcade.collide(hero, this.groundLayer);
            this.game.physics.arcade.collide(boss, this.groundLayer);

            game.physics.arcade.overlap(hero, boss, bossHit, null, this);

            //Make the sprite jump when the up key is pushed
            if(this.cursors.up.isDown && game.time.now > jumpTimer) {
                jumpSound.play();
                hero.body.velocity.y = -600;
                jumpTimer = game.time.now + 500;
            }
            else if(this.cursors.right.isDown){
                hero.body.velocity.x = 200;
                hero.animations.play('right');
            }
            else if(this.cursors.left.isDown){
                hero.body.velocity.x = -200;
                hero.animations.play('left');
            }
            else{
                hero.body.velocity.x = 0;
                hero.animations.stop();
            }
            if(this.shootkey.isDown && game.time.now > jumpTimer){
                fireball.fire();
                fireballSound.play();
                jumpTimer = game.time.now + 750;
            }
        }
        
    };
};
