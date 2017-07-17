
$(document).ready(function(){

});
//board object
  var board = {
  //indicates how many rows and columns the game should have
  	numRows : 10,
    //initalizes the boardValues Array
    initVals : function(numRows){
      array = [];      
      for (var j = 0; j < numRows; j++){
          newArray = [];
          array.push(newArray);
        for (var i = 0; i < numRows; i++){
          newArray.push(i);
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

    bombSet : function(){
      var num = Math.random(10);
      return num;
    }
  }
 board.render()
 console.log(board.values)
console.log(board.bombSet())



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