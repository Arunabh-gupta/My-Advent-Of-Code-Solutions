const fs = require("fs")
const inputData = fs.readFileSync("day7Input.txt", "utf8");

const lines = inputData.split("\n")
const results = []
const equations = [];
lines.forEach(line => {
  const [first , ...second] = line.split(": ")
  results.push(Number(first.trim()));
  equations.push(second[0].split(" ").map(elem => Number(elem)));
})
console.log(results);
console.log(equations);

function helper1(ind , sum, target, arr){
  if(ind === arr.length) return sum === target;

  let addRes = helper2(ind+1, sum+arr[ind], target, arr);
  let prodRes = helper2(ind+1, sum*arr[ind], target, arr);

  return addRes || prodRes;
}

function helper2(ind , sum, target, arr){
  if(ind === arr.length) return sum === target;

  let addRes = helper2(ind+1, sum+arr[ind], target, arr);
  let prodRes = helper2(ind+1, sum*arr[ind], target, arr);

  let concatVal = Number(String(sum) + String(arr[ind]));
  let concatRes = helper2(ind+1, concatVal, target, arr);

  return addRes || prodRes || concatRes;
}

let p1 = 0 , p2 = 0;
for(let i=0; i<results.length; i++){
  if(helper1(1, equations[i][0], results[i], equations[i])){
    p1+=results[i]
    console.log("results[i] : "+results[i]);
  } 
}
for(let i=0; i<results.length; i++){
  if(helper2(1, equations[i][0], results[i], equations[i])) p2+=results[i]
}


console.log(p1);
console.log(p2);