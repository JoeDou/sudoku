/* Gameboard class (psuedo-classical):
This class includes all the functionalities related to the game play.
-generate unique board with different levels of difficulty
-restart the board without generating new board
-give user assistance by giving supplying an answer to a input box
-create gameboard using jquery to attach to the DOM
*/
function Gameboard(){

  this.matrix =[]; //matrix used to store the problem set
  this.jmatrix = []; //matrix that maps to the input elements on DOM 
  this.solution = [];//matrix that contains the solution to the board

  this._rowHash = [];//store values that already exist in that particular row
  this._rowStack = [];//tracks the order of values that were set to that row
  this._colHash = [];//store values that already exist in that particular col
  this._colStack = [];//tracks the order of values that were set to that col
  this._secHash = {};//store values that already exist in that particular section
  this._secStack = {};//tracks the order of values that were set to that section
}

// initialize: this method will initialize the class variable
Gameboard.prototype.initialize = function(){
  this._rowHash = [];
  this._rowStack = [];
  this._colHash = [];
  this._colStack = [];
  this._secHash = {};
  this._secStack = {};

  for (var i=0; i<9; i++){
    this._rowHash.push({});
    this._rowStack.push([]);
    this._colHash.push({});
    this._colStack.push([]);
    var secString = ''+ Math.floor(i/3)+(i%3);
    this._secHash[secString] = {};
    this._secStack[secString]= [];
  }
};

// loadHashStack: will initailze first and then search through problem matrix
// and update the hash table and stack for each row, col and section
Gameboard.prototype.loadHashStack = function(){
  this.initialize();
  for (var row =0; row < 9; row++){
    for (var col=0; col < 9; col++){
      var value = this.matrix[row][col];
      if (value){
        this._rowHash[row][value] = true;
        this._colHash[col][value] = true;
        var secKey = determineSection(col,row);
        var key = ''+col+row;
        this._secHash[secKey][value] = true;
      }
    }
  }
};

/* findSolution: this method will find the solution of a board using backtrack 
algorithm. It will recurse through the board and input values from the given 
bucket of available values.  If there is a dead end, it will return to the previous
call and move to the next value.

This method is optimized by using hash table to determine whether a number exist in 
that row, col or section.  When a value appears for the first time it will be hashed
to the table.  This will have a constant time look up.  The second part of the 
optimization is the stack use to store the order of which the value is set. As the 
number is placed on the board, that number will be pushed on to the stack of each col, 
row and section.  When backtrack is required, the value will be popped out (constant time) 
and used as the key to the hash table for the col, row and section.
*/
Gameboard.prototype.findSolution = function(){
  var arr = findEmpty(this.solution);
  if (arr === null){
    return true;
  }
  var col = arr[0];
  var row = arr[1];

  var secKey = determineSection(col,row); // calculate the section key
  var possibleInput = createRandomInput(); // create a randomized list of possible inputs
  for (var i=0; i<possibleInput.length; i++){
    var val = possibleInput[i];
    // if value doesn't apear in that particular row, col or section
    if (!this._rowHash[row][val] && !this._colHash[col][val] && !this._secHash[secKey][val]){
      //update storage
      this.solution[row][col] = ''+val;
      this._rowHash[row][val] = true;
      this._rowStack[row].push(val);
      this._colHash[col][val] = true;
      this._colStack[col].push(val);
      this._secHash[secKey][val] = true;
      this._secStack[secKey].push(val);
      if (!this.findSolution(this.solution)){
        // remove the value from storage
        this.solution[row][col] = '';
        this._rowHash[row][this._rowStack[row].pop()] = false;
        this._colHash[col][this._colStack[col].pop()] = false;
        this._secHash[secKey][this._secStack[secKey].pop()] = false;
      } else{
        return true;
      }
    }
  }
  return false;
};

// createTable: This method will create the game board table and append to the DOM
Gameboard.prototype.createTable = function() {
  var $td, $tr, $input;
  var $table = $('<table>');
  var $gameboard = $('.gameboard');

  for ( var i = 0; i < 9; i++ ) {
    $tr = $('<tr>');
    var tempArr =[]; //tempary Array to be pushed into jmatrix
    for ( var j = 0; j < 9; j++ ) {
      $input = $('<input>') 
        .attr('maxlength','1') // add attribute maxlength of 1 for only 1 input
        .addClass('inputBox') // add inputbox class
        .data('col', j) // store col and row data for eash future access
        .data('row', i) 
        .val(this.matrix[i][j]); //set value to the corresponding cell of the problem matrix

      if (this.matrix[i][j] !== ''){
        $input.attr('readOnly', true); //if the cell has info make the input read only
      }

      tempArr.push($input);

      $td = $('<td>').append($input);
      //determines even or odd section
      if ((Math.floor(i/3) + Math.floor(j/3))%2){
        $td.addClass('sectionOdd');
      }else{
        $td.addClass('sectionEven');
      }
      $tr.append($td);
    }
    $table.append($tr)
      .attr('align','center');
    this.jmatrix.push(tempArr);
  }
  $gameboard.append($table);
  // After the gameboard is created and appended to the DOM create message and level
  // selection
  createMsg();
  createLevelSelection();
};

// hint: determine all the empty cells and randomly pick one and determine the answer
// to update the gameboard
Gameboard.prototype.hint = function() {
  this.removeHint();
  var arr = $('.inputBox'); //use jquery to get a list of all the input box
  var tempArr = [];
  for (var i =0; i< arr.length; i++){ //loop through each input box to determine empty cell
    if ($(arr[i]).val() === ''){
      tempArr.push($(arr[i]));
    }
  }
  if (tempArr.length < 1){
    return;
  }
 
  var index = Math.floor(Math.random()*tempArr.length);// radomly pick an index
  var pos = tempArr[index].data();
  tempArr[index].val(this.solution[pos.row][pos.col]) // input correct solution and update class
    .parent().addClass('hint');

  if(isComplete()){
    showMsg();
  }
};

// removeHint: remove hint class using jquery
Gameboard.prototype.removeHint = function() {
  $('.hint').removeClass('hint');
};

// createSolution: generate a unique game board solution 
Gameboard.prototype.createSolution = function() {
  initializeMatrix(this.solution);
  this.initialize();
  this.findSolution(this.solution);
};

// createProblem: taking the solution and making a copy and remove random cells.  Takes
//difficult as an input
Gameboard.prototype.createProblem = function(level){
  this.matrix = $.extend(true,[],this.solution);
  var selection = {
    easy: 25,
    medium: 40,
    hard: 55
  };
  var remove = selection[level];
  console.log('removed', remove);

  while( remove > 0 ) {
    var row = Math.floor( Math.random() * 9 );
    var col = Math.floor( Math.random() * 9 );
    this.matrix[row][col] = '';
    remove--;
  }
};

// startNewGame: start a new game by generating a solution and taking the solution to create
// the problem.
Gameboard.prototype.startNewGame = function(level){
  this.createSolution();
  this.createProblem(level);
  if (this.jmatrix.length === 0){
    this.createTable();
  }
  this.restart();
};

// restart: restart a game by matching the input element cell with the problem matrix cell
Gameboard.prototype.restart = function() {
  this.initialize();
  this.loadHashStack();
  for (var row=0; row<9; row++){
    for (var col=0; col<9; col++){
      this.jmatrix[row][col].val(this.matrix[row][col]);
      this.jmatrix[row][col].parent().removeClass('wrongAnswer');
      this.jmatrix[row][col].parent().removeClass('hint');
      if (this.matrix[row][col] === ''){
        this.jmatrix[row][col].attr('readOnly', false);
      }else{
        this.jmatrix[row][col].attr('readOnly', true);
      }
    }
  }
};


