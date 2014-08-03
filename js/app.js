// JavaScript
$( document ).ready(function() {
  console.log( "ready!" );
  var board = new Gameboard();
  board.startNewGame('easy');

  $(document).keyup(function(evt){
    if ($(evt.target).hasClass('inputBox')){
      var location = $(evt.target).data();
      var value = $(evt.target).val();
      board.removeHint();
      if (value > '0' && value <= '9'){
        if (board.solution[location.row][location.col] === value){
          $(evt.target).parent().removeClass('wrongAnswer');
          if (isComplete()){
            showMsg();
          }
        }else{
          $(evt.target).parent().addClass('wrongAnswer');
        }
      }
    }
  });

  $('.restart').on('click', function(){
    board.restart();
  });

  $('.hint').on('click', function(){
    board.hint();
  });

  $('.newGame').on('click', function(){
    showLevel();
  });

  $('.easy, .medium, .hard').on('click', function(){
    console.log($(this).text());
    $('.level').hide();
    board.startNewGame($(this).text());
  });
});

