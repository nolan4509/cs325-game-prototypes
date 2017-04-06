"use strict";

GameStates.makeGame = function(game, shared) {
    // Create your own variables.    
    
    return {
        preload: function() {
            this.grid = new Board(this.game);
            this.grid.preload();
        },

        create: function() {
            this.game.world.setBounds(0, 0, 600, 600);
            this.game.stage.backgroundColor = '#000000';
            // this.game.stage.backgroundColor = '#dcdcdc';

            this.game.add.sprite(0, 0, this.circlebmd);

            this.grid.create();
            //this.grid.initialBoard();

            var p1Style = {font: "bold 20px Arial", fill: "#009bff", boundsAlignH: "center", boundsAlignV: "middle"};
            var p2Style = {font: "bold 20px Arial", fill: "#ff0000", boundsAlignH: "center", boundsAlignV: "middle"};
            var player1Score = this.game.add.text(100, 400, "Player 1 Score:\n" + this.p1Score, p1Style);
            var player2Score = this.game.add.text(400, 400, "Player 2 Score:\n" + this.p2Score, p2Style);
        },

        update: function() {

        },
    };
};
