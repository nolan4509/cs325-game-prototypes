"use strict";

GameStates.makeGame = function(game, shared) {
    // Create your own variables.    
    this.game = game;
    return {
        preload: function() {
            this.dots = new Board(this.game);
            this.dots.preload();
        },
        create: function() {
            this.game.world.setBounds(0, 0, 800, 600);
            this.game.stage.backgroundColor = '#000000';
            
            this.highestScore = JSON.parse(localStorage.getItem('dotsHighestScore'));

            this.game.add.sprite(0, 0, this.circlebmd);

            this.dots.create();
            this.dots.initialBoard();

            this.moveText = this.game.add.bitmapText(800 - 120 , 16, 'font','0/'+this.dots.moveLimit, 50);
            this.scoreText = this.game.add.bitmapText(20, 16, 'font', 'Score: '+this.dots.score, 50);

            this.music = this.game.add.audio('theme');
            this.music.play();
        },

        update: function() {
            this.scoreText.setText('Score: ' + this.dots.score);
            this.moveText.setText(this.dots.moveCount+'/'+this.dots.moveLimit);

            if (this.dots.looped == true) {
              this.game.stage.backgroundColor = '#FFFFFF';
            }else {
              this.game.stage.backgroundColor = '#000000';
            }
            if (this.dots.moveCount === this.dots.moveLimit) {
              this.game.score = this.dots.score;
              if (this.dots.score > this.highestScore) {
                localStorage.setItem('dotsHighestScore', this.dots.score);
              }
              this.music.stop();
              this.game.state.start('MainMenu');
            }
        },
    };
};
