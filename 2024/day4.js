const fs = require("fs")
const inputData = fs.readFileSync("test.txt", "utf8");
// console.log(inputData)


let arr = inputData.trim().split('\n').map(line => line.split(''));
// console.log(arr)

function XMASCount( row, col, arr) {
  let cnt = 0;
  let temp = ''
  // horizontal check
  for(let i=col; i<col+4 && i<arr[row].length; i++){
    temp += arr[row][i];
  }
  if(temp === 'XMAS') cnt++;
  temp = '';
  for(let i=col; i>col-4 && i>=0; i--){
    temp += arr[row][i];
  }
  if(temp === 'XMAS') cnt++;
  temp = '';
  
  
  // vertical check
  for(let j=row; j<row+4 && j<arr.length; j++){
    temp += arr[j][col];
  }
  if(temp === 'XMAS') cnt++;
  temp = '';
  for(let j=row; j>row-4 && j>=0; j--){
    temp += arr[j][col];
  }
  if(temp === 'XMAS') cnt++;
  temp = '';
  
  // diagonal check
  // right down
  let i = col, j = row;
  while(i<col+4 && i<arr[row].length && j<row+4 && j<arr.length){
    temp+=arr[j][i]
    i++;
    j++;
  }
  if(temp === 'XMAS') cnt++;
  temp = '';
  
  // right up
  i = col;
  j = row;
  while(i<col+4 && i<arr[row].length && j>row-4 && j>=0){
    temp+=arr[j][i]
    i++;
    j--;
  }
  console.log(temp);
  if(temp === 'XMAS') cnt++;
  temp = '';
  
  // left up
  i = col;
  j = row;
  while(i>col-4 && i>=0 && j>row-4 && j>=0){
    temp+=arr[j][i]
    i--;
    j--;
  }
  if(temp === 'XMAS') cnt++;
  temp = '';
  
  // left down
  i = col;
  j = row;
  while(i>col-4 && i>=0 && j<row+4 && j<arr.length){
    temp+=arr[j][i]
    i--;
    j++;
  }
  if(temp === 'XMAS') cnt++;
  temp = '';


  // return count of valid instances;
  return cnt;
}

function MASCount (row, col, arr){
  if(row < 1 || row > arr.length-2 || col < 1 || col > arr[0].length-2) return false;
  let temp1 = '', temp2 = '';
  // forming temp1 
  temp1 = arr[row-1][col-1] + arr[row][col] + arr[row+1][col+1];
  temp2 = arr[row+1][col-1] + arr[row][col] + arr[row-1][col+1];
  let revTemp1 = temp1.split("").reverse().join("");
  let revTemp2 = temp2.split("").reverse().join("");

  let mas = "MAS";
  if(temp1 === mas && temp2 === mas) return true;
  if(mas === revTemp1 && mas === temp2) return true;
  if(mas === revTemp1 && mas === revTemp2) return true;
  if(mas === temp1 && mas === revTemp2) return true;
  return false;
}
let p1 = 0;
let p2 = 0;
for(let i=0; i<arr.length; i++){
  for(let j=0; j<arr[i].length; j++){
    if(arr[i][j] === 'X'){
      p1 += XMASCount(i, j, arr);
    }
    if(arr[i][j] === 'A'){
      p2 += MASCount(i, j, arr);
    }
  }
}

console.log(p1);
console.log(p2);

