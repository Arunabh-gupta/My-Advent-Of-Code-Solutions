const fs = require('fs');
const inputData = fs.readFileSync('day3input.txt', 'utf8');

const regexMUL = /mul\((-?\d+),(-?\d+)\)/g;
const regexRES = /do\(\)|don't\(\)/g;
const combinedRegex = /mul\((-?\d+),(-?\d+)\)|do\(\)|don't\(\)/g;
// const matchesRES = Array.from(inputData.matchAll(regexRES));
// const matchesMUL = Array.from(inputData.matchAll(regexMUL));

// matchesRES.forEach((match, index)=>{
//   console.log(match[0] + " index: "+ )
// })
// let ans = 0;
// matchesMUL.forEach(match => {
//   ans += match[1]*match[2];
// })
// // console.log(matches);
const matches = Array.from(inputData.matchAll(combinedRegex));
console.log(matches);
let ans = 0;
let flag = true;
matches.forEach(match => {
  if(flag && (match[1] || match[2])){
    ans += match[1] * match[2];
    // console.log(match[0]);
  }
  if(match[0].toString() === "do()"){
    flag = true;
  }
  if(match[0].toString() === "don't()"){
    flag = false;
  }
  // console.log(typeof(match[0]))
})
console.log(ans);

