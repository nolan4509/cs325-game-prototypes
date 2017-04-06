"use strict";

var Board = function(game) {
    // Create your own variables.
    this.game = game;
    this.boardWidth = 5;
    this.boardHeight = 5;
    this.board = [];
    this.dots = [];
    this.score = 0;
    this.p1Score = 0;
    this.p2Score = 0;
    this.whiteColor = '#ffffff';
    this.blueColor = '#009bff';
    this.redColor = '#ff0000';

    };
    
    Board.prototype = {
        preload: function() {
            var circleSize = 16;
            this.circlebmd = this.game.add.bitmapData(circleSize, circleSize);
            this.circlebmd.circle(circleSize/2, circleSize/2, circleSize/2, this.whiteColor);

            this.linebmd = this.game.add.bitmapData(600,600);
            this.linebmd.ctx.lineWidth = "3";
            this.linebmd.ctx.strokeColor = "#000000";
            this.linebmd.ctx.stroke();
            
        },

        create: function () {
            this.colors = [0xffffff, 0x009bff, 0xff0000];
            
            this.grid = this.game.add.group();
            this.grid.createMultiple(64, this.circlebmd);
            this.grid.setAll('anchor.x', 0.5);
            this.grid.setAll('anchor.y', 0.5);

            //this.lineGrid = this.game.add.group();
            //this.lineGrid.createMultiple(64, this.linebmd);

            this.board = [];
            for(var i = 0;i < this.boardWidth; i++) {
                var column = [];
                for(var j = 0; j < this.boardHeight; j++) {
                    var dot = this.addDot();
                    column.push(dot);
                    this.dots.push(dot);
                }
                this.board.push(column);
            }
            
            for(var i = 0; i < this.boardWidth;i++) {
                for(var j = 0; j < this.boardHeight;j++) {
                    var xpos = i*64 + 56;
                    var ypos = 312 - j*64;
                    var dot = this.board[i][j];
                    dot.scale.x = 1;
                    dot.scale.y = 1;
                    //this.linebmd.line(xpos, ypos, xpos + 64, ypos - 64, '#ffffff', 3);
                    if (dot.x !== xpos || dot.y !== ypos) {
                        var t = this.game.add.tween(dot).to({x: xpos, y: ypos}, 300).start();
                    }
                }
            }
            this.linebmd.clear();
            this.linebmd.ctx.beginPath();
            this.linebmd.ctx.strokeStyle = '#ffffff';
            //this.linebmd.ctx.moveTo(this.dots[0].x, this.dots[0].y);
            this.linebmd.ctx.moveTo(56, 312);

            for(var i = 0;i < this.dots.length-1;i++) {
                var current = this.dots[i];
                var next = this.dots[i+1];
                this.linebmd.line(current.x, current.y, next.x, next.y);
            }
            this.linebmd.ctx.lineWidth = 3;
            this.linebmd.ctx.stroke();
            this.linebmd.ctx.closePath();
            //this.lineGrid.setAll('anchor.x', 0.5);
            //this.lineGrid.setAll('anchor.y', 0.5);
            //this.linebmd.line(56, 312, 56 + 64, 312 - 64, '#ffffff', 3);
        },

        addDot: function() {
            var dot = this.grid.getFirstDead();
            dot._id = this.dotidCount;
            dot.tint = this.colors[0];
            dot.inputEnabled = true;
            //dot.events.onInputDown.add(this.clickDot, this);
            //dot.events.onInputUp.add(this.upDot, this);
            //dot.events.onInputOver.add(this.overDot, this);
            dot.reset(this.game.world.centerX, -this.game.world.centerY);
            this.dotidCount++;
            return dot;
        },

        addLine: function() {
            var line = this.grid.getFirstDead();
            line._id = this.lineidCount;
            line.tint = this.colors[0];
            line.inputEnabled = true;
            //line.events.onInputDown.add(this.clickLine, this);
            //line.events.onInputUp.add(this.upLine, this);
            //line.events.onInputOver.add(this.overLine, this);
            line.reset(this.game.world.centerX, -this.game.world.centerY);
            this.lineidCount++;
            return line;
        },

        update: function () {
            
        },
        
    };

