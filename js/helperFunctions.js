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
};


function determineSection (col, row){
  var rowSec = Math.floor(row / 3);
  var colSec = Math.floor(col / 3);
  return "" + colSec + rowSec;
}

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