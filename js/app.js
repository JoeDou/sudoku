// JavaScript
$( document ).ready(function() {
    console.log( "ready!" );
    var board = new Gameboard();
    createTable(board.matrix);
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
        .val(matrix[i][j]);
      $td = $('<td>').append($input);
      $tr.append($td);
    }
    $table.append($tr);
  }
  $gameboard.append($table);
};