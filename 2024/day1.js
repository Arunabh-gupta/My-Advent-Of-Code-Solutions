
const fs = require('fs');

// Read input from a file
const inputData = fs.readFileSync('input.txt', 'utf8');

// Unique value storage
const array1Set = new Set();
const array2Set = new Set();
let array1 = [];
let array2 = [];
inputData.trim().split('\n').forEach(line => {
    const [num1, num2] = line.split('   ').map(Number);
    // array1Set.add(num1);
    // array2Set.add(num2);
    array1.push(num1);
    array2.push(num2);
});

// let array1 = Array.from(array1Set);
// let array2 = Array.from(array2Set);


array1.sort();
array2.sort();
// console.log("Unique Array 1:", array1);
// console.log("Unique Array 2:", array2);
// if(array1.length > array2.length){
//   [array1, array2] = [array2, array1];
// }
let dis = 0;
// for(let i=0; i<array1.length; i++){
//   let x = Math.abs(array1[i]-array2[i]);
//   dis+=x;
// }
let countMap = {};

array2.forEach(element => {
  if (countMap[element] === undefined) {
    countMap[element] = 1;
  } else {
    countMap[element]++;
  }
});
console.log(countMap)
for(let i=0; i<array1.length; i++){
  let count = countMap[array1[i]] || 0;
  dis += array1[i] * count;
}
console.log(dis);