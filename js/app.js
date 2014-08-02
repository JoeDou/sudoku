// JavaScript
$( document ).ready(function() {
  console.log( "ready!" );
  var board = new Gameboard();

  createTable(board.matrix);

  $(document).keyup(function(evt){
    if ($(evt.target).hasClass('inputBox')){
      var location = $(evt.target).data();
      var value = $(evt.target).val();
      if (value > '0' && value < '9'){
        if (board.solution[location.row][location.col] === value){
          console.log('correct value');
        }else{
          console.log('try again');
        }
      }
    }
  });
});

var createTable = function(matrix) {
  var $td, $tr, $input;
  var $table = $('<table>');
  var $gameboard = $('.gameboard');

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
      if ((Math.floor(i/3) + Math.floor(j/3))%2){
        $input.addClass('sectionOdd');
      }

      $td = $('<td>').append($input);
      if ((Math.floor(i/3) + Math.floor(j/3))%2){
        $td.addClass('sectionOdd');
      }else{
        $td.addClass('sectionEven');
      }
      $tr.append($td);
    }
    $table.append($tr);
  }
  $gameboard.append($table);
};