// User interface
// Create interface from DOM to gameplay.  Entry point to the game.
$( document ).ready(function() {
  console.log( "ready!" );

  // create a new instance of the game and set the starting level to easy
  var board = new Gameboard();
  board.startNewGame('easy');

  // listen for keyup event to indicate user input on the game board
  $(document).keyup(function(evt){
    // if the keyup event is on the inputbox class. Next, determine if the value entered
    // is a number, if so, check with the solution to see if the values match.
    if ($(evt.target).hasClass('inputBox')){
      var location = $(evt.target).data();
      var value = $(evt.target).val();
      // remove hint class if exist
      board.removeHint();
      if (value > '0' && value <= '9'){
        if (board.solution[location.row][location.col] === value){
          // if the answer is correct remove the wrongAnswer class
          $(evt.target).parent().removeClass('wrongAnswer');
          if (isComplete()){
            showMsg();
          }
        }else{
          // notify user when the input is incorrect
          $(evt.target).parent().addClass('wrongAnswer');
        }
      }
    }
  });

  // restart button to restart the game board 
  $('.restart').on('click', function(){
    board.restart();
  });

  // hint button to reveal a random correct cell
  $('.hint').on('click', function(){
    board.hint();
  });

  // start a new game, generate a brand new board by calling the level selection message
  $('.newGame').on('click', function(){
    showLevel();
  });

  // level button to select difficulty level and start a new game
  $('.easy, .medium, .hard').on('click', function(){
    $('.level').hide();
    board.startNewGame($(this).text());
  });
});

