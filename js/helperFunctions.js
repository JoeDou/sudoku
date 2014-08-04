// Helper function

/* InitializeMatrix: initialize a 9 by 9 matrix to empty string
if matrix hasn't been initialized before push empty array and empty
string
*/
function initializeMatrix (matrix){
  for (var i=0; i<9; i++){
    if(matrix[i] === undefined){
      matrix.push([]);
    }
    for (var j=0; j<9; j++){
      if(matrix[i][j] === undefined){
        matrix[i].push('');
      }else{
        matrix[i][j] = '';
      }
    }
  }
}

/* createRandomInput: create a array of values from 1 to 9 and randomize the
the order of the array
*/
function createRandomInput (){
  var array = [1,2,3,4,5,6,7,8,9];
  index = array.length;
  randomIndex = 0;
  tempValue = '';
  while(index > 0){
    randomIndex = Math.floor(Math.random() * index);
    index--;
    tempValue = array[index];
    array[index] = array[randomIndex];
    array[randomIndex] = tempValue;
  }
  return array;
}

/* isComplete: search through all inputBox class and determine if any class has
the value of an empty string
*/
function isComplete (){
  var count = 0;
  var arr = $('.inputBox').filter(function(){
    if ($(this).val() === ""){
      count++;
    }
  });
  count = count + $('.wrongAnswer').length;
  if (count > 0){
    return false;
  } else{
    return true;
  }
}

/* determineSection: convert coordinate in column and row of the 9x9 matrix 
and return a string of column section and row section
*/
function determineSection (col, row){
  var rowSec = Math.floor(row / 3);
  var colSec = Math.floor(col / 3);
  return "" + colSec + rowSec;
}

/* findEmpty: search through the matrix and return the row and column index of 
the first empty cell
*/
function findEmpty (matrix){
  for (var rowIndex=0; rowIndex < matrix.length; rowIndex++){
    for (var colIndex=0; colIndex < matrix[0].length; colIndex++){
      if (matrix[rowIndex][colIndex] === ''){
        return [colIndex, rowIndex];
      }
    }
  }
  return null;
}

// createMsg: create a message element using jquery.  Will be initially hidden when
// it's append to the DOM
function createMsg (){
  $complete = $('<div>');
  $complete.addClass('complete');

  $text = $('<p>').text('You Win');

  $completeButton = $('<button>');
  $completeButton.text('Close')
    .click(function(){
      $complete.hide();
    });

  $complete.append($text).append($completeButton).hide();

  $('.gameboard').append($complete);
}

// showMsg: show the complete message when called
function showMsg (){
  $msg = $('.complete');
  $msg.show();
}

/* createLevelSelection: create a level selection element using jquery.  Will be
initially hidden when it's append to the DOM
*/
function createLevelSelection(){
  $level = $('<div>');
  $level.addClass('level');

  $text = $('<p>').text('Select Level');
  $level.append($text);

  var arr = ['easy', 'medium', 'hard'];
  for (var i=0;i<arr.length; i++){
    var $button = $('<button>');
    $button.text(arr[i])
      .addClass(arr[i]);

    $level.append($button);
  }
  $level.hide();
  $('.gameboard').append($level);
}

// showLevel: show the level selection message when called
function showLevel (){
  $msg = $('.level');
  $msg.show();
}
