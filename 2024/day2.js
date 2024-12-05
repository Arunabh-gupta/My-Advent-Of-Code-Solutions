const { reverse } = require('dns');
const fs = require('fs');
const inputData = fs.readFileSync('reports.txt', 'utf8');

let reports = [];
inputData.trim().split('\n').forEach(line => {
  const level = line.split(' ').map(Number);
  reports.push(level);
})
// console.log(reports)

const compareArrays = (a, b) => {
  return a.toString() === b.toString();
};

function incORdec(arr) {
  const ascending = [...arr].sort((a, b) => a - b); // Create a sorted copy
  const descending = [...arr].sort((a, b) => b - a); // Create a reverse-sorted copy

  // console.log("Original:", arr);
  // console.log("Descending:", descending);
  // console.log("Ascending:", ascending);
  
  if (compareArrays(arr, ascending)) return true; // Check ascending
  if (compareArrays(arr, descending)) return true; // Check descending

  return false; // Explicitly return false if neither condition is met
}
function check(arr){
  for(let i=0; i<arr.length-1; i++){
    if(Math.abs(arr[i]-arr[i+1]) > 3 || Math.abs(arr[i]-arr[i+1]) < 1){
      return false;
    } 
  }
  return true;
}
let p1 = 0;
let p2 = 0;
reports.forEach(report => {
  let inc_or_dec = incORdec(report);
  // if(inc_or_dec == false) return;
  let valid = check(report);
  
  if(valid && inc_or_dec){
    p1++;
    p2++;
  } 
  else{
    for(let i=0; i<report.length; i++){
      // console.log(report)
      const arr = [...report.slice(0, i), ...report.slice(i+1, report.length)];
      // console.log(arr);
      if(incORdec(arr) && check(arr)){
        p2++;
        break;
      } 
    }
    
  }
})


// reports.forEach(report => {
//   for(let i=0; i<report.length; i++){
//     const inc_or_dec = incORdec(report);
//     const valid = check(report)
//     const arr = [...report.slice(0, i) + [...report.slice(i+1, report.length)]];
//     if(valid && inc_or_dec){
//       p2++;
//       break;
//     } 
//   }
// })

console.log(p1)
console.log(p2)