"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
    var hero = null;
    var fireball = null;
    var boss = null;
    var jumpTimer = 0;
    var fireballSound = null;
    var jumpSound = null;
    var loseSound = null;
    var winSound = null;
    var music = null;
    var facing = 'down';
    var batsAlive = 6;
    function quitGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        game.state.start('MainMenu');

    }
    function GameOver() {
        batsAlive = 6;
        music.stop();
        loseSound.play();
        game.state.start('MainMenu');
    }
    function bossHit(fireball, boss){
        fireball.kill();
        boss.kill();
        
        //Explosions
        var explosions = game.add.group();
        explosions.createMultiple(6, 'boom');
        boss.animations.add('boom');
        var boom = explosions.getFirstExists(false);
        boom.reset(boss.body.x-50, boss.body.y-50);
        boom.animations.play('boom');
        boss.animations.play('boom');
        batsAlive--;
        if(batsAlive == 0){
            music.stop();
            winSound.play();
        }
        
    }
    return {
    
        create: function () {

            //Start the Arcade Physics systems
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            loseSound = this.game.add.audio('loseSound');
            fireballSound = this.game.add.audio('fireballSound');
            jumpSound = this.game.add.audio('jumpSound');
            winSound = this.game.add.audio('winSound');
            music = this.game.add.audio('music');
            music.play();


            //Add the tilemap and tileset image. The first parameter in addTilesetImage
            //is the name you gave the tilesheet when importing it into Tiled, the second
            //is the key to the asset in Phaser
            this.map = this.game.add.tilemap('tilemap');
            this.map.addTilesetImage('overworld', 'overworld');
            this.map.addTilesetImage('objects', 'objects');
            //Add both the background, ground, and walkable layers. 
            this.GroundLayer = this.map.createLayer('GroundLayer');
            this.ObjectLayer = this.map.createLayer('ObjectLayer');
            this.WalkableLayer = this.map.createLayer('WalkableLayer');
            //Before you can use the collide function you need to set what tiles can collide
            this.map.setCollisionBetween(1, 10000, true, 'ObjectLayer');
            //Change the world size to match the size of this layer
            this.GroundLayer.resizeWorld();


            
            //Player
            //Add the sprite to the game and enable arcade physics on it
            hero = this.game.add.sprite(this.game.world.centerX+10, this.game.world.centerY-150, 'hero');
            this.game.physics.arcade.enable(hero);
            hero.anchor.setTo(0.5, 0.5);
            hero.body.collideWorldBounds = true;
            hero.body.velocity.x = 0;
            hero.body.velocity.y = 0;
            hero.scale.setTo(1.2, 1.2);
            //Create a running animation for the sprite and play it
            hero.animations.add('right', [12, 13, 14, 15, 16], 10, true);
            hero.animations.add('left', [6, 7, 8, 9, 10], 10, true);
            hero.animations.add('down', [0, 1, 2, 3, 4], 10, true);
            hero.animations.add('up', [18, 19, 20, 21, 22], 10, true);
            //Make the camera follow the sprite
            this.game.camera.follow(hero);
            //Enable cursor keys so we can create some controls
            this.cursors = this.game.input.keyboard.createCursorKeys();
            this.shootkey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

            

            //Fireball
            fireball = game.add.group();
            fireball.enableBody = true;
            fireball.physicsBodyType = Phaser.Physics.ARCADE;
            fireball.createMultiple(20, 'fireball');

            fireball.setAll('anchor.x', 0.5);
            fireball.setAll('anchor.y', 0.5);
            fireball.setAll('outOfBoundsKill', true);
            fireball.setAll('checkWorldBounds', true);


            fireball.callAll('animations.add', 'animations', 'shootup', [16, 17, 18, 19, 20, 21, 22, 23], 20, true);
            fireball.callAll('animations.add', 'animations', 'shootdown', [48, 49, 50, 51, 52, 53, 54, 55], 20, true);
            fireball.callAll('animations.add', 'animations', 'shootleft', [0, 1, 2, 3, 4, 5, 6, 7], 20, true);
            fireball.callAll('animations.add', 'animations', 'shootright', [32, 33, 34, 35, 36, 37, 38, 39], 20, true);
            
            

            //Boss
            boss = game.add.group();
            boss.enableBody = true;
            boss.physicsBodyType = Phaser.Physics.ARCADE;
            boss.createMultiple(10, 'boss');

            
            //Desperate attempts to make the enemies...
            var x = null;
            for(x = 0; x<6; x++){
                var bats = this.game.add.sprite(Math.random() *400+10, this.game.world.centerY+200, 'boss');
                bats.checkWorldBounds = true;
                bats.events.onOutOfBounds.add(GameOver, this);
                bats.animations.add('boom', null, 20);
                bats.animations.play('boom');
                boss.add(bats);
            }
            boss.setAll('anchor.x', 0.5);
            boss.setAll('anchor.y', 0.5);
            boss.setAll('outOfBoundsKill', true);
            boss.setAll('checkWorldBounds', true);
            boss.callAll('animations.add', 'animations', 'fly', [8, 9, 10, 11], 20, true);
            boss.callAll('play', null, 'fly');
            boss.setAll('body.velocity.y', -50);

        },
    

        update: function () {
            //Make the sprite collide with the ground layer
            this.game.physics.arcade.collide(hero, this.ObjectLayer);
            this.game.physics.arcade.collide(fireball, this.ObjectLayers);

            this.game.physics.arcade.overlap(fireball, boss, bossHit, null, this);

            if(this.cursors.up.isDown) {
                if(this.cursors.right.isUp){
                    hero.body.velocity.x = 0;
                }
                if(this.cursors.left.isUp){
                    hero.body.velocity.x = 0;
                }
                facing = 'up';
                hero.body.velocity.y = -100;
                hero.animations.play('up');
            }
            else if(this.cursors.down.isDown){
                if(this.cursors.right.isUp){
                    hero.body.velocity.x = 0;
                }
                if(this.cursors.left.isUp){
                    hero.body.velocity.x = 0;
                }
                facing = 'down';
                hero.body.velocity.y = 100;
                hero.animations.play('down');
            }
            else if(this.cursors.right.isDown){
                if(this.cursors.up.isUp){
                    hero.body.velocity.y = 0;
                }
                if(this.cursors.down.isUp){
                    hero.body.velocity.y = 0;
                }
                facing = 'right';
                hero.body.velocity.x = 100;
                hero.animations.play('right');
            }
            else if(this.cursors.left.isDown){
                if(this.cursors.up.isUp){
                    hero.body.velocity.y = 0;
                }
                if(this.cursors.down.isUp){
                    hero.body.velocity.y = 0;
                }
                facing = 'left';
                hero.body.velocity.x = -100;
                hero.animations.play('left');
            }
            else{
                hero.body.velocity.x = 0;
                hero.body.velocity.y = 0;
                hero.animations.stop();
            }
            if(this.shootkey.isDown && game.time.now > jumpTimer){
                fireballSound.play();
                jumpTimer = game.time.now + 750;
                var bullet = fireball.getFirstExists(false);
                bullet.reset(hero.x, hero.y);
                switch(facing){
                    case 'up':
                        bullet.animations.play('shootup');
                        bullet.body.velocity.y = -200;
                        break;
                    case 'right':
                        bullet.animations.play('shootright');
                        bullet.body.velocity.x = 200;
                        break;
                    case 'left':
                        bullet.animations.play('shootleft');
                        bullet.body.velocity.x = -200;
                        break;
                    default:
                        bullet.animations.play('shootdown');
                        bullet.body.velocity.y = 200;
                }
            }
        }
        
    };
};
