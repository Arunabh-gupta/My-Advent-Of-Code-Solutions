const fs = require("fs");
const inputData = fs.readFileSync("day11Input.txt", "utf8");

let line = inputData.split(" ").map(num => Number(num));
let cache = new Map();
console.log(line)

function applyRules(val){
  if(val === 0) return [1];
  if(JSON.stringify(val).length % 2 === 0){
    let valString = JSON.stringify(val);
    let num1 = valString.slice(0, valString.length/2);
    let num2 = valString.slice(valString.length/2);
    return [Number(num1), Number(num2)];
  }
  return [val*2024];

}

function helper(arr, level, targetLevel){
  if(level === targetLevel) return 1;
  let cnt = 0;
  if(cache.has(JSON.stringify([arr, level]))) {
    return cache.get(JSON.stringify([arr, level]));
  }
  arr.forEach(element => {
    let resultArr = applyRules(element);
    cnt += helper(resultArr, level+1, targetLevel);
    cache.set(JSON.stringify([arr, level]), cnt);
  });
  return cnt;
}
let blinks1 = 26;
let blinks2 = 76;

// just replace blinks1 with blinks2 to get ans for 2nd part
let ans = helper(line, 0, blinks1)
console.log(ans)