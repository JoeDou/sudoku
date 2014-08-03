function Gameboard(){

  this.matrix =[];
  this.jmatrix = [];
  this.solution = [];
  this._rowHash = [];
  this._rowStack = [];
  this._colHash = [];
  this._colStack = [];
  this._secHash = {};
  this._secStack = {};
}

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

Gameboard.prototype.findSolution = function(){
  var arr = findEmpty(this.solution);
  if (arr === null){
    return true;
  }
  var col = arr[0];
  var row = arr[1];

  var secKey = determineSection(col,row);
  var possibleInput = createRandomInput();
  for (var i=0; i<possibleInput.length; i++){
    var val = possibleInput[i];
    if (!this._rowHash[row][val] && !this._colHash[col][val] && !this._secHash[secKey][val]){
      this.solution[row][col] = ''+val;
      this._rowHash[row][val] = true;
      this._rowStack[row].push(val);
      this._colHash[col][val] = true;
      this._colStack[col].push(val);
      this._secHash[secKey][val] = true;
      this._secStack[secKey].push(val);
      if (!this.findSolution(this.solution)){
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

Gameboard.prototype.createTable = function() {
  var $td, $tr, $input;
  var $table = $('<table>');
  var $gameboard = $('.gameboard');

  for ( var i = 0; i < 9; i++ ) {
    $tr = $('<tr>');
    var tempArr =[];
    for ( var j = 0; j < 9; j++ ) {
      $input = $('<input>')
        .attr('maxlength','1')
        .addClass('inputBox')
        .data('col', j)
        .data('row', i)
        .val(this.matrix[i][j]);

      if (this.matrix[i][j] !== ''){
        $input.attr('readOnly', true);
      }

      tempArr.push($input);

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
    this.jmatrix.push(tempArr);
  }
  $gameboard.append($table);
  createMsg();
  createLevelSelection();
};

Gameboard.prototype.hint = function() {
  this.removeHint();
  var arr = $('.inputBox');
  var tempArr = [];
  for (var i =0; i< arr.length; i++){
    if ($(arr[i]).val() === ''){
      tempArr.push($(arr[i]));
    }
  }
  if (tempArr.length < 1){
    return;
  }
  var index = Math.floor(Math.random()*tempArr.length);
  var pos = tempArr[index].data();
  tempArr[index].val(this.solution[pos.row][pos.col])
    .parent().addClass('hint');

  if(isComplete()){
    showMsg();
  }
};

Gameboard.prototype.removeHint = function() {
  $('.hint').removeClass('hint');
};

Gameboard.prototype.createSolution = function() {
  initializeMatrix(this.solution);
  this.initialize();
  this.findSolution(this.solution);
};

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

Gameboard.prototype.startNewGame = function(level){
  this.createSolution();
  this.createProblem(level);
  if (this.jmatrix.length === 0){
    this.createTable();
  }
  this.restart();
};

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


