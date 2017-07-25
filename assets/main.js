
$(document).ready(function(){
  $('.board').on("click", 'div', function(event){
    //collect the target event and pass it to the function
    $selection = $(event.target)
    event.stopPropagation();
    //console.log($selection.parent().index())
    board.uncoverableSquares($selection)
    game.turn();
  })
});

  

//[[{value: 0, 1, 2, 3, 4, isBomb: false or true, beenChecked: true or false, markedAsSafe: true or false }],[],[]]
//board object
  var board = {
  //indicates how many rows and columns the game should have
  	numRows : 10,
    bombs : [],
    //classes that are either covered or uncovered
    covered: [],
    //initalizes the boardValues Array
    initVals : function(numRows){
      array = [];  
          
      for (var j = 0; j < numRows; j++){
          newArray = [];        
          array.push(newArray);         
        for (var i = 0; i < numRows; i++){
          newArray.push({value:0, isCovered: true, isBomb: false, safe: false});
        }
      }

      this.values = array
      this.covered = arrayCovered
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
          $(".boardRow" + a).append("<div class = 'block "+board.covered[a][i] +" wip' >"+ board.values[a][i] + "</div>")
        }
     }
    },

    bombSet : function(numRows){
      for(var i = 0; i < numRows; i++){
        var num1 = Math.floor(Math.random()*10);
        var num2 = Math.floor(Math.random()*10);
        var bombs = [num1,num2]
        this.bombs.push(bombs)
        this.values[num1][num2] = "B"

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
      }
      console.log(board.values);

    },

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
           if (space !== "B"){
            board.values[a][b] += 1;
           }
        }
      }
    },
    turnRender: function(){

    },
    destroy: function(){
      $('.board').html("");
      console.log("is it working")
    },

    checkSquare: function()

    uncoverableSquares: function(clickedSquare){
      var x = clickedSquare.parent().index()
      var y = clickedSquare.index()
      var currentSpace = [x,y]
      //console.log(x, y)
      //find all the 0's in the space
      var findFarLeft = function(next, complete, x, y){
        //var complete  =[[0,0]]
        var neighbors = board.findNeighbors(x,y)
         //removes negative spaces from array
        for (var array in neighbors) {
          a = neighbors[array][0] 
          b = neighbors[array][1]
         if (a >= 0 && a < 10 && b >=0 && b < 10){
           next.push(neighbors[array])
         }
        }
       
        console.log(next)

        for (var index in next){
          for(var box in complete){
            //console.log("complete box")
            //console.log(complete[box])
            if (next[index][0] === complete[box][0] && next[index][1] === complete[box][1]){
              //console.log("delete me")
              //console.log('next index')
              //console.log(next)
              next.splice(index,1)
              index--
              complete.push([x,y])
              //console.log(next)
              //console.log("complete")
              //console.log(complete)

            }
          }
        }
        
        console.log("***STATS*****")
        console.log("next")
        console.log(next)
        console.log("complete")
        console.log(complete)
         console.log("next up")
        console.log(next[0])
      }
      var next =[]
      var complete =[[0,0]]
      findFarLeft(next, complete, x, y);
    },

    findNeighbors : function(x,y){
        var left         = [x     , y - 1]
        var upLeft       = [x - 1 , y - 1]
        var up           = [x - 1 , y    ]
        var upRight      = [x - 1 , y + 1]
        var right        = [x     , y + 1]
        var downRight    = [x + 1 , y + 1]
        var down         = [x + 1 , y    ]
        var downLeft     = [x + 1 , y - 1]
        var neighbors   = [left, upLeft, up, upRight, right, downRight,down, downLeft]
      return neighbors
    }




    
    

  }
 board.render()
 console.log(board.values)
console.log(board.bombSet(board.numRows))
console.log(board.bombs)
board.update();
board.bombCheck();



  var game = {
    turn: function(){
      board.destroy();
      board.createRows(board.numRows);
    }
  }
/**
Board Object

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



/**
      var value = this.values[x][y]
      var valueY = value
      console.log(value)
      var b = y
      while( b < 10 && b >=0 && valueY === 0 && valueY !== "B" ){
  // check up down on the column
        var a = x
          while( a < 10 && a >=0 && value === 0 && value !== "B" ){
            board.covered[a][b] = "uncovered"
            a++
            if(a < 10){
              value = board.values[a][b]
            }
          }
          console.log(board.covered)
  // check up on the column
        var a = x
        value = this.values[x][y]
          while( a < 10 && a >=0 && value === 0 && value !== "B" ){
            board.covered[a][b] = "uncovered"
            a--
            if(a > 0 ){
              value = board.values[a][b]
            }
          }
          console.log(board.covered)
        b++
        //valueY = this.values[x][y]
      }
      var b = y
      valueY = 0
      while( b < 10 && b >=0 && valueY === 0 && valueY !== "B" ){
  // check up down on the column
        var a = x
          while( a < 10 && a >=0 && value === 0 && value !== "B" ){
            board.covered[a][b] = "uncovered"
            a++
            if(a < 10){
              value = board.values[a][b]
            }
          }
          console.log(board.covered)
  // check up on the column
        var a = x
        value = this.values[x][y]
          while( a < 10 && a >=0 && value === 0 && value !== "B" ){
            board.covered[a][b] = "uncovered"
            a--
            if(a > 0 ){
              value = board.values[a][b]
            }
          }
          console.log(board.covered)
        b--
        a = x     //
      }
      **/