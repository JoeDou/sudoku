  // [[5, 3, 4, 6, 7, 8, 9, 1, 2],
  // [6, 7, 2, 1, 9, 5, 3, 4, 8],
  // [1, 9, 8, 3, 4, 2, 5, 6, 7],
  // [8, 5, 9, 7, 6, 1, 4, 2, 3],
  // [4, 2, 6, 8, 5, 3, 7, 9, 1],
  // [7, 1, 3, 9, 2, 4, 8, 5, 6],
  // [9, 6, 1, 5, 3, 7, 2, 8, 4],
  // [2, 8, 7, 4, 1, 9, 6, 3, 5],
  // [3, 4, 5, 2, 8, 6, 1, 7, 9]];


var matrix =
 [[5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [1, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9]];

var rowHash = [];
var rowStack = [];
var colHash = [];
var colStack = [];
var secHash = {};
var secStack = {};

var determineSection = function(col, row){
  rowSec = Math.floor(row / 3);
  colSec = Math.floor(col / 3);
  return "" + colSec + rowSec;
};

var initialize = function(){
  for (var i=0; i<9; i++){
    rowHash.push({});
    rowStack.push([]);
    colHash.push({});
    colStack.push([]);
    var secString = ''+ Math.floor(i/3)+(i%3);
    secHash[secString] = {};
    secStack[secString]= [];
  }
  for (var row =0; row < 9; row++){
    for (var col=0; col < 9; col++){
      var value = matrix[row][col];
      if (value){
        rowHash[row][value] = true;
        colHash[col][value] = true;
        var secKey = determineSection(col,row);
        var key = ''+col+row;
        secHash[secKey][value] = true;
      }
    }
  }
};

var findEmpty = function(matrix){
  for (var rowIndex=0; rowIndex < 9; rowIndex++){
    for (var colIndex=0; colIndex<9; colIndex++){
      if (matrix[rowIndex][colIndex] === 0){
        return [colIndex, rowIndex];
      }
    }
  }
  return null;
};

var traverse = function(maxtrix){
  var arr = findEmpty(maxtrix);
  if (arr === null){
    return true;
  }
  var col = arr[0];
  var row = arr[1];

  var secKey = determineSection(col,row);
  for (var i=1; i<10; i++){
    if (!rowHash[row][i] && !colHash[col][i] && !secHash[secKey][i]){
      matrix[row][col] = i;
      rowHash[row][i] = true;
      rowStack[row].push(i);
      colHash[col][i] = true;
      colStack[col].push(i);
      secHash[secKey][i] = true;
      secStack[secKey].push(i);
      if (!traverse(matrix)){
        matrix[row][col] = 0;
        rowHash[row][rowStack[row].pop()] = false;
        colHash[col][colStack[col].pop()] = false;
        secHash[secKey][secStack[secKey].pop()] = false;
      } else{
        return true;
      }
    }
  }
  return false;
};

initialize();
traverse(matrix);




