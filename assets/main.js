
$(document).ready(function(){
  $('.board').on("click", 'div', function(event){
    //collect the target event and pass it to the function
    $selection = $(event.target);
    event.stopPropagation();
    //console.log($selection.parent().index())
    var x = $selection.parent().index();
    var y = $selection.index();
    console.log(x,y);
    board.checkSquare(x,y);
  })
});

  

//[[{value: 0, 1, 2, 3, 4, isBomb: false or true, beenChecked: true or false, markedAsSafe: true or false }],[],[]]
//board object
  var board = {
    
  //indicates how many rows and columns the game should have
  	numRows : 10,
    tiles : [],
    //initalizes the boardValues Array
    initVals : function(){
      for (var j = 0; j < board.numRows; j++){
          newArray = [];        
          board.tiles.push(newArray);         
        for (var i = 0; i < board.numRows; i++){
          newArray.push({value:0, isCovered: true, isBomb: false, safe: false});
        }
      }

    },
  //renders the board
    render : function(){
      this.initVals();
      this.createRows();
      this.bombSet();
    },
  //creates rows and columns of the board
    createRows: function(){
      for(var x = 0; x < board.numRows; x++){
        $(".board").append("<div class = 'boardRow" + x + " wip' ></div>")
        for (var y = 0; y < board.numRows; y++){
          //<div id="01 or 11 or 99"
          $(".boardRow" + x).append("<div id='"+x+""+y+"' class = 'block "+(board.tiles[x][y].isCovered ? 'covered' : '') +" wip' >"+ board.tiles[x][y].value + "</div>");
        }
     }
    },

    bombSet : function(){
      for(var i = 0; i < board.numRows; i++){
        var x = Math.floor(Math.random()*10);
        var y = Math.floor(Math.random()*10);
        //check if the tile is already a bomb if it is i-- and contiue;
        if(board.tiles[x][y].isBomb){
          i--;
          continue;
        }
        board.tiles[x][y].isBomb = true;
        board.tiles[x][y].value = "B" ;
        board.updateTileHTML(x,y); 

        board.increaseBombCount(x, y-1);
          board.increaseBombCount(x-1, y-1);
          board.increaseBombCount(x-1, y);
          board.increaseBombCount(x-1, y+1);
          board.increaseBombCount(x, y+1);
          board.increaseBombCount(x+1, y+1);
          board.increaseBombCount(x+1, y);
          board.increaseBombCount(x+1, y-1);

       $row = $('[class^="boardRow"]').eq(x);
       $block = $row.children().eq(y);
       $block.addClass('bomb')
      }
    },


    increaseBombCount: function(x,y){
        if(x < 0 || y < 0 || y > board.numRows -1 || x > board.numRows -1) {return;}
        var tile = board.tiles[x][y];
        if(tile.isBomb) {return;}
        tile.value ++;  
        board.updateTileHTML(x,y);  
    },






//{value: {isBomb : true}}
    checkSquare: function(x, y){

      if(x < 0 || y < 0 || y > board.numRows -1 || x > board.numRows -1){
        return;
      }

        //see if the square is uncovered or already checked?
        var tile = board.tiles[x][y];
       if(tile.isCovered == false){
        //ignore and return
          return;
       }

       
        //if its a bomb the game is over uncover the whole board
        if (tile.isBomb === true){
          //TODO: call end game;
          return;
        }
        //else if it's value is greater then 0, uncover just this square
         if (tile.value > 0){
          tile.isCovered = false;
          this.updateTileHTML(x,y) 
          return
         }

        //else it's value is 0
        if (tile.value === 0) {
          tile.isCovered = false;
          //call an uncover function to show the html 
          this.updateTileHTML(x,y)
          board.checkSquare(x , y-1);
          board.checkSquare(x-1, y-1);
          board.checkSquare(x-1, y);
          board.checkSquare(x-1, y+1);
          board.checkSquare(x, y+1);
          board.checkSquare(x+1, y+1);
          board.checkSquare(x+1, y);
          board.checkSquare(x+1, y-1);  
        }
              //mark it's set as checked
              //uncover this square and check the neighbors
    },

    updateTileHTML : function(x,y){
      var tile = board.tiles[x][y];
      var tileHtml = $("#"+x+""+y);
      if(tile.isCovered == false){
          tileHtml.removeClass('covered');
      }
      
      tileHtml.html(tile.value);
    }
  };


 board.render();



  var game = {
    turn: function(){
      board.createRows(board.numRows);
    }
  };
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