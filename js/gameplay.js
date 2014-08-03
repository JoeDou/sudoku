  // [[5, 3, 4, 6, 7, 8, 9, 1, 2],
  // [6, 7, 2, 1, 9, 5, 3, 4, 8],
  // [1, 9, 8, 3, 4, 2, 5, 6, 7],
  // [8, 5, 9, 7, 6, 1, 4, 2, 3],
  // [4, 2, 6, 8, 5, 3, 7, 9, 1],
  // [7, 1, 3, 9, 2, 4, 8, 5, 6],
  // [9, 6, 1, 5, 3, 7, 2, 8, 4],
  // [2, 8, 7, 4, 1, 9, 6, 3, 5],
  // [3, 4, 5, 2, 8, 6, 1, 7, 9]];
function Gameboard(){

  // this.matrix =
  //  [['5', '3', '', '', '7', '', '', '', ''],
  //   ['6', '', '', '1', '9', '5', '', '', ''],
  //   ['1', '9', '8', '', '', '', '', '6', ''],
  //   ['8', '', '', '', '6', '', '', '', '3'],
  //   ['4', '', '', '8', '', '3', '', '', '1'],
  //   ['7', '', '', '', '2', '', '', '', '6'],
  //   ['', '6', '', '', '', '', '2', '8', ''],
  //   ['', '', '', '4', '1', '9', '', '', '5'],
  //   ['', '', '', '', '8', '', '', '7', '9']];

  this.matrix =
   [['5', '3', '4', '6', '7', '8', '9', '1', '2'],
    ['6', '7', '2', '1', '9', '5', '3', '4', '8'],
    ['1', '9', '8', '3', '4', '2', '5', '6', '7'],
    ['8', '5', '9', '7', '6', '1', '4', '2', '3'],
    ['4', '2', '6', '8', '5', '3', '7', '9', '1'],
    ['7', '1', '3', '9', '2', '4', '8', '5', '6'],
    ['9', '6', '1', '5', '3', '7', '2', '8', '4'],
    ['2', '8', '7', '4', '1', '9', '6', '3', '5'],
    ['3', '4', '5', '2', '8', '6', '', '7', '9']];

  this.solution = $.extend(true,[],this.matrix);
  
  this._rowHash = [];
  this._rowStack = [];
  this._colHash = [];
  this._colStack = [];
  this._secHash = {};
  this._secStack = {};


  this.initialize();
  this.findSolution(this.solution);

}

Gameboard.prototype.determineSection = function(col, row){
  var rowSec = Math.floor(row / 3);
  var colSec = Math.floor(col / 3);
  return "" + colSec + rowSec;
};

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
  for (var row =0; row < 9; row++){
    for (var col=0; col < 9; col++){
      var value = this.matrix[row][col];
      if (value){
        this._rowHash[row][value] = true;
        this._colHash[col][value] = true;
        var secKey = this.determineSection(col,row);
        var key = ''+col+row;
        this._secHash[secKey][value] = true;
      }
    }
  }
};

Gameboard.prototype.findEmpty = function(matrix){
  for (var rowIndex=0; rowIndex < matrix.length; rowIndex++){
    for (var colIndex=0; colIndex < matrix[0].length; colIndex++){
      if (matrix[rowIndex][colIndex] === ''){
        return [colIndex, rowIndex];
      }
    }
  }
  return null;
};

Gameboard.prototype.findSolution = function(matrix){
  var arr = this.findEmpty(matrix);
  if (arr === null){
    return true;
  }
  var col = arr[0];
  var row = arr[1];

  var secKey = this.determineSection(col,row);
  for (var i=1; i<10; i++){
    if (!this._rowHash[row][i] && !this._colHash[col][i] && !this._secHash[secKey][i]){
      matrix[row][col] = ''+i;
      this._rowHash[row][i] = true;
      this._rowStack[row].push(i);
      this._colHash[col][i] = true;
      this._colStack[col].push(i);
      this._secHash[secKey][i] = true;
      this._secStack[secKey].push(i);
      if (!this.findSolution(matrix)){
        matrix[row][col] = '';
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





