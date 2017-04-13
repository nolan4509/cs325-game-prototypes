var Board = function(game) {
  this.game = game;
  this.boardWidth = 8;
  this.boardHeight = 8;
  this.board = [];
  this.idCount = 0;
  this.selected = null;
  this.scoreList = [];
  this.score = 0;
  this.moveCount = 0;
  this.moveLimit = 20;
  this.ping = null;
};

Board.prototype = {
  preload: function() {
    this.ping = this.game.add.audio('ping');
    var circSize = 32;
    this.circlebmd = this.game.add.bitmapData(circSize, circSize);
    this.circlebmd.circle(circSize/2, circSize/2, circSize/2, '#FFFFFF');

    this.linebmd = this.game.add.bitmapData(800, 600);
    this.linebmd.ctx.lineWidth = "4";
    this.linebmd.ctx.strokeColor = "#000000";
    this.linebmd.ctx.stroke();
  },
  create: function() {
    this.dots = this.game.add.group();
    this.dots.createMultiple(64, this.circlebmd);
    this.dots.setAll('anchor.x', 0.5);
    this.dots.setAll('anchor.y', 0.5);


    this.guideLine = this.game.add.sprite(0, 0, this.linebmd);

    this.colors = [0xff0000, 0x0000ff, 0xffff00, 0x00ffff, 0x00ff00];
  },

  //Create the Initial Board Layout
  initialBoard: function() {
    this.board = [];
    for(var i = 0; i < this.boardWidth; i++) {
      var column = [];
      for(var j = 0; j < this.boardHeight; j++) {
        var dot = this.addDot();
        column.push(dot);
      }
      this.board.push(column);
    }
    this.drawBoard();
    return this.board;
  },

  //When you click on a dot
  clickDot: function(dot) {
    this.selected = dot;
    this.scoreList.push(dot);
  },

  //When over a dot, if haven't clicked just return, if connecting a line update
  overDot: function(dot) {
    if (this.selected === null || !this.isAdjacent(this.selected, dot)) {return;} 

    if (this.scoreList[this.scoreList.length - 2] === dot) {
      // If you move your mouse back to you're previous match, deselect you're last match
      // This is so the player can choose a different path 
      this.scoreList.pop();
      this.selected = dot;
      this.looped = false;
    }else if (this.scoreList.indexOf(dot) > -1 && this.scoreList.length > 3 ) {
      // If the Item is in the list (but isn't the previous item) then you've made a loop
      this.looped = true;
    }else if (this.selected.tint === dot.tint ) {
      this.looped = false;
      this.selected = dot; 
      if (this.scoreList.indexOf(dot) === -1) {
        this.scoreList.push(dot);
      }
    }

    this.linebmd.clear();
    this.linebmd.ctx.beginPath();
    this.linebmd.ctx.strokeStyle = '#'+("00000" + this.selected.tint.toString(16)).substr(-6);
    this.linebmd.ctx.moveTo(this.scoreList[0].x, this.scoreList[0].y);

    for(var i = 0; i < this.scoreList.length-1;i++) {
      var next = this.scoreList[i+1];
      this.linebmd.ctx.lineTo(next.x, next.y);
    }
    if (this.looped === true) {
      this.linebmd.ctx.lineTo(dot.x, dot.y);
    }
    this.linebmd.ctx.lineWidth = 4;
    this.linebmd.ctx.stroke();
    this.linebmd.ctx.closePath();
  },

  //When you release
  upDot: function(dot) {
    this.linebmd.clear();
    this.ping.play();
    if (this.looped === true) {
      this.looper();
    }
    this.score += this.scorePoints();
    this.scoreList = [];
    this.selected = null;
    this.drawBoard();
  },

  //Did the player create a loop, if so clear all of that color
  looper: function() {
     for(var i = 0; i < this.boardWidth; i++) {
      for(var j = 0; j < this.boardHeight; j++) {
        var dot = this.board[i][j];
        if (this.selected.tint === dot.tint) {
          this.scoreList.push(dot);
        }
      }
    }
  },

  //Update their score for each dot destroyed
  scorePoints: function() {
    if (this.scoreList.length === 1) {return 0;}
    var listIds = [];
    this.scoreList.forEach(function(dot) {
      listIds.push(dot._id);
    },this);

    for(var i = 0; i < this.boardWidth; i++) {
      for(var j = 0; j < this.boardHeight; j++) {
        var dot = this.board[i][j];
        if (listIds.indexOf(dot._id) > -1) {
          dot.kill();
          this.board[i].splice(j,1);
          this.board[i].push(this.addDot());
          j--;
        }
      }
    }
    this.looped = false;

    this.moveCount += 1;
    return this.scoreList.length;
  },

  //Add dot back to the board layout
  addDot: function() {
    var num = this.game.rnd.between(0,4);
    var dot = this.dots.getFirstDead();
    dot._id = this.idCount;
    dot.spriteNum = num;
    dot.tint = this.colors[num];
    dot.inputEnabled = true;
    dot.events.onInputDown.add(this.clickDot, this);
    dot.events.onInputUp.add(this.upDot, this);
    dot.events.onInputOver.add(this.overDot, this);
    dot.reset(this.game.world.centerX, -this.game.world.centerY);
    this.idCount++;
    return dot;
  },

  //Actually place the dots
  drawBoard: function() {
    for(var i = 0; i < this.boardWidth;i++) {
      for(var j = 0;j < this.boardHeight;j++) {
        var xpos = i*64 + 160;
        var ypos = 550 - j*64;
        var dot = this.board[i][j];
        dot.scale.x = 1;
        dot.scale.y = 1;
        if (dot.x !== xpos || dot.y !== ypos) {
          var t = this.game.add.tween(dot).to({x: xpos, y: ypos}, 300).start();
        }
      }
    }
  },

  //2D Array position of dot
  getPosition: function(dot) {
    //Iterate through game board until the the dot is found
    //return it's position in the 2d array
    for(var i = 0; i < this.boardWidth;i++) {
      var j = this.board[i].indexOf(dot);
      if (j > -1) {
        return {i: i, j: j};
      }
    }
    return {};
  },

  //Using the array, are the dots next to each other
  isAdjacent: function(firstDot, secondDot) {
    var firstPos = this.getPosition(firstDot);
    var secondPos = this.getPosition(secondDot);
    if (
        (secondPos.i === firstPos.i) && 
        ((secondPos.j === (firstPos.j - 1)) || (secondPos.j === (firstPos.j + 1)))) {
      return true;
    }else if ((secondPos.j === firstPos.j) && 
        ((secondPos.i === (firstPos.i - 1)) || (secondPos.i === (firstPos.i + 1)))) {
      return true;
    }else {
      return false;
    }
  },
};
