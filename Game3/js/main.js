Rock = function(){
    //Enemy Rock Constructor
    this.x = game.world.randomX;
    this.y = game.world.randomY;
    this.minSpeed = -100;
    this.maxSpeed = 100;        
    this.vx = Math.random()*(this.maxSpeed - this.minSpeed+1)-this.minSpeed;        
    this.vy = Math.random()*(this.maxSpeed - this.minSpeed+1)-this.minSpeed;        
    this.rock = game.add.sprite(this.x,this.y,"rock");        
    this.rock.anchor.setTo(0.5, 0.5);        
    game.physics.enable( this.rock, Phaser.Physics.ARCADE );
    this.rock.body.collideWorldBounds = true;        
    this.rock.body.bounce.setTo(1, 1);        
    this.rock.body.velocity.x = this.vx;        
    this.rock.body.velocity.y = this.vy;        
    this.rock.body.immovable = true;
}



var game = new Phaser.Game( 900, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );

function preload() {

    game.load.image( 'bullet', 'assets/bullet.png');
    game.load.image( 'space', 'assets/starfield.png');
    game.load.image( 'rock', 'assets/rock.jpg');
    
    game.load.spritesheet( 'cowboy', 'assets/Cowboy4.png', 50, 55, 26);
    game.load.spritesheet( 'boom', 'assets/explode.png', 128, 128);

    game.load.audio( 'music', 'assets/ridingthesupernova.ogg');
}

var player;
var walk;
var music;
var bullet;
var score;
var rock;
var rocks;
var space;

function create() {
    music = game.add.audio('music');
    music.play();
    space = game.add.tileSprite(0, 0, 900, 600, 'space');


    // Create a sprite at the center of the screen using the 'cowboy' image.
    player = game.add.sprite( game.world.centerX, game.world.centerY, 'cowboy' );
    player.scale.setTo(1.5, 1.5);
    // Anchor the sprite at its center, as opposed to its top-left corner.
    // so it will be truly centered.
    player.anchor.setTo( 0.5, 0.5 );
    // Turn on the arcade physics engine for this sprite.
    game.physics.enable( player, Phaser.Physics.ARCADE );
    // Make it bounce off of the world bounds.
    player.body.collideWorldBounds = true;
    

    //Add new animation called 'walk', 
    walk = player.animations.add('walk');
    //Starts the animation playing using the key 'walk', at 15 fps, and true to keep looping
    player.animations.play('walk', 15, true);

    //Create multiple rocks to send at player
    rocks = [];
    for (var i = 0; i<10; i++){
        rocks.push(new Rock());
    }

    var explode = player.animations.add('boom');
}

function update() {
    // Accelerate the 'logo' sprite towards the cursor,
    // accelerating at 700 pixels/second and moving no faster than 400 pixels/second
    // in X or Y.
    // This function returns the rotation angle that makes it visually match its
    // new trajectory.
    player.rotation = game.physics.arcade.accelerateToPointer( player, this.game.input.activePointer, 700, 400, 400 );
    
    //If the player collide with any rock, call dead function
    for (var i=0; i<10; i++){
        game.physics.arcade.collide(player, rocks[i].rock, dead, null, this);
    }
}


function dead() {
    console.log('You Died');

    //Not working?
    player.animations.play('boom');
}
