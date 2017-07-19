
$(document).ready(function(){

});
//board object
  var board = {
  //indicates how many rows and columns the game should have
  	numRows : 10,

    bombs : [],
    //initalizes the boardValues Array
    initVals : function(numRows){
      array = [];      
      for (var j = 0; j < numRows; j++){
          newArray = [];
          array.push(newArray);
        for (var i = 0; i < numRows; i++){
          newArray.push(0);
        }
      }
      this.values = array
    },
    values : [],
  //renders the board
    render : function(){
      this.initVals(this.numRows);
      this.createRows(this.numRows);
    },
  //creates rows and columns of the board
    createRows: function(numRows){
      for(var a = 0; a < numRows; a++){
        $(".board").append("<div class = 'boardRow" + a + " wip' ></div>")
        for (var i = 0; i < numRows; i++){
          $(".boardRow" + a).append("<div class = 'block wip' >"+ a + i + "</div>")
        }
     }
    },

    bombSet : function(numRows){
      for(var i = 0; i < numRows; i++){
        var num1 = Math.floor(Math.random()*10);
        var num2 = Math.floor(Math.random()*10);
        var bombs = [num1,num2]
        this.bombs.push(bombs)
        this.values[num1][num2] = "Bomb"

       $row = $('[class^="boardRow"]').eq(num1);
       $block = $row.children().eq(num2);
       $block.addClass('bomb')
      }
      return this.values
    },

    update: function(){
      $('.bomb').each( function(){
        $(this).html("B")
        });
    },

    bombCheck: function(){
      var bombSpots = this.bombs
      for (var pair in bombSpots){
        var x = bombSpots[pair][0];
        var y = bombSpots[pair][1];
        this.countMaster(x,y);
     /**  
        this.countLeft(x,y);
        this.countRight(x,y);
        this.countDown(x,y);
        this.countUp(x,y);
        this.countUpLeft(x,y);
        this.countUpRight(x,y);
        this.countDownLeft(x,y);
        this.countDownRight(x,y);
        //console.log(board.values);

      **/
      }
      console.log(board.values);

    },
/**
    countLeft : function(x,y){
      var a = x
      var b = y-1
      if (b >= 0){
        var space = this.values[a][b]
        if (b >= 0 && space !== "Bomb" ) {      
          board.values[a][b] += 1;
        }
      }
    },
    countRight : function(x,y){
      var a = x
      var b = y + 1

      if (b < 10) {
        var space = this.values[a][b]
        if (b < 10 && space !== "Bomb" ) {
          board.values[a][b] += 1;
        }
      }
    },
    countDown : function(x,y){
      var a = x + 1
      var b = y 
      if (a < 10){
        var space = this.values[a][b]
        if (a < 10 && space !== "Bomb" ) {
          board.values[a][b] += 1;
        }
      }
    },
    countUp : function(x,y){
      var a = x - 1
      var b = y 
      if (a >= 0){
        var space = this.values[a][b]
        if (a > 0 && space !== "Bomb" ) {
          board.values[a][b] += 1;
        }
      }
    },

    countUpLeft : function(x,y){
      var a = x - 1
      var b = y -1
       if (a >= 0 && b >= 0){
        var space = this.values[a][b]
        if (a >= 0 && space !== "Bomb" ) {
          board.values[a][b] += 1;
        }
      }
    },

    countUpRight : function(x,y){
      var a = x - 1
      var b = y + 1
      if (a >= 0 && b < 10){
        var space = this.values[a][b]
        if (a > 0 && space !== "Bomb" ) {
          board.values[a][b] += 1;
        }
      }
    },

    countDownLeft : function(x,y){
      var a = x + 1
      var b = y - 1
       if (a < 10 && b >= 0){
        var space = this.values[a][b]
        if (a >= 0 && space !== "Bomb" ) {
          board.values[a][b] += 1;
        }
      }
    },
**/
    countDownRight : function(x,y){
      var a = x + 1
      var b = y + 1
      if (a < 10 && b < 10){
        var space = this.values[a][b]
        if (a > 0 && space !== "Bomb" ) {
          board.values[a][b] += 1;
        }
      }
    },

    countMaster: function(x,y){
      var left         = [x     , y - 1]
      var upLeft       = [x - 1 , y - 1]
      var up           = [x - 1 , y    ]
      var upRight      = [x - 1 , y + 1]
      var right        = [x     , y + 1]
      var downRight    = [x + 1 , y + 1]
      var down         = [x + 1 , y    ]
      var downLeft     = [x + 1 , y - 1]
      var directions   = [left, upLeft, up, upRight, right, downRight,down, downLeft]

      for (var coordinates in directions) {
        a = directions[coordinates][0] 
        b = directions[coordinates][1]

        if (a >= 0 && a < 10 && b >=0 && b < 10){
           var space = this.values[a][b]
           if (space !== "Bomb"){
            board.values[a][b] += 1;
           }
        }
      }
    //

    }
    

  }
 board.render()
 console.log(board.values)
console.log(board.bombSet(board.numRows))
console.log(board.bombs)
board.update();
board.bombCheck();

/**
Board Object
render
bomb set

  do 10 times
    pick random number 1 through 10
    pick another random number 1 through 10
	make that value a bomb

add numbers
  find bomb
    space - 1 
      add 1
    space + 1
      add 1
    space up one 
      add 1
    space down one
      add 1
    space up one -1
      add 1
    space up one + 1
      add 1
    space down one -1
      add 1
    space down one + 1
      add 1

onclick
  determine left or right click
  if left click
    bomb? 
    reveal
  if right click
    flag

reveal
  if space clicked = "", 
    reveal all the spaces where there are no bombs 
    put the numbers up. 

**/