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

var rowData = [];
var colData = [];
var secData = {};

var determineSection = function(col, row){
  rowSec = Math.floor(row / 3);
  colSec = Math.floor(col / 3);
  return [colSec, rowSec];
};

var initialize = function(){
  for (var i=0; i<9; i++){
    rowData.push([]);
    colData.push([]);
    var secString = ''+ Math.floor(i/3)+(i%3);
    secData[secString]=[];
  }
  for (var row =0; row < 9; row++){
    for (var col=0; col < 9; col++){
      if (matrix[row][col]){
        rowData[row].push(matrix[row][col]);
        colData[col].push(matrix[row][col]);
        var arr = determineSection(col,row);
        var string = ''+arr[0]+arr[1];
        secData[string].push(matrix[row][col]);
      }
    }
  }
};




