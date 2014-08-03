// JavaScript
$( document ).ready(function() {
  console.log( "ready!" );
  var board = new Gameboard();
  console.log('solution', board.solution);

  createTable(board.matrix);
  isComplete();

  $(document).keyup(function(evt){
    if ($(evt.target).hasClass('inputBox')){
      var location = $(evt.target).data();
      var value = $(evt.target).val();
      if (value > '0' && value <= '9'){
        if (board.solution[location.row][location.col] === value){
          console.log('correct value');
          $(evt.target).parent().removeClass('wrongAnswer');
          if (isComplete()){
            showMsg();
          }
        }else{
          console.log('try again');
          $(evt.target).parent().addClass('wrongAnswer');
        }
      }
    }
  });
});

var createTable = function(matrix) {
  var $td, $tr, $input;
  var $table = $('<table>');
  var $gameboard = $('.gameboard');
  var count = 0;

  // Go over rows
  for ( var i = 0; i < 9; i++ ) {
    $tr = $('<tr>');
    // Go over columns
    for ( var j = 0; j < 9; j++ ) {
      // Build the input
      $input = $('<input>')
        .attr('maxlength','1')
        .addClass('inputBox')
        .data('col', j)
        .data('row', i)
        .val(matrix[i][j]);

      if (matrix[i][j] === ''){
        count++;
      } else{
        $input.attr('readOnly', true);
      }


      $td = $('<td>').append($input);
      if ((Math.floor(i/3) + Math.floor(j/3))%2){
        $td.addClass('sectionOdd');
      }else{
        $td.addClass('sectionEven');
      }
      $tr.append($td);
    }
    $table.append($tr)
      .attr('align','center');
  }
  $gameboard.append($table);
  createMsg();
};

var createMsg = function(){
  $complete = $('<div>');
  $complete.addClass('complete');

  $text = $('<p>').text('You Win');

  $completeButton = $('<button>');
  $completeButton.text('Close')
    .click(function(){
      hideMsg();
    });

  $complete.append($text).append($completeButton).hide();

  $('.gameboard').append($complete);
};

var isComplete = function(){
  var count = 0;
  var arr = $('.inputBox').filter(function(){
    if ($(this).val() === ""){
      count++;
    }
  });
  count = count + $('.wrongAnswer').length;
  console.log('count', count);
  if (count > 0){
    return false;
  } else{
    return true;
  }
};

var showMsg = function(){
  $msg = $('.complete');
  $msg.show();
};

var hideMsg = function(){
  $msg = $('.complete');
  $msg.hide();
}