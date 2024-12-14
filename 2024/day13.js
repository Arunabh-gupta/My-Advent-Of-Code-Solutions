const fs = require("fs");
const inputData = fs.readFileSync("day13Input.txt", "utf8");

let rules = inputData.split("\n\n").map(rule => {
  return rule.split('\n').map(input => {
    const match = input.match(/(Button\s(\w)|Prize):\sX[+=](\d+),\sY[+=](\d+)/);

    if (match) { // Check if the match is successful
      const [_, type, button, x, y] = match;

      // Determine the key
      const key = type === 'Prize' ? 'p' : button;

      // Return the desired object format'
      
      return {[key]: { x: JSON.parse(x), y: JSON.parse(y) }} ;
    }

    return null; // Handle invalid lines gracefully
  }).filter(Boolean); // Remove `null` entries
});

function checkPossibleToWin(rule){
  let a = rule[0].A.x;
  let b = rule[1].B.x;
  let c = rule[0].A.y;
  let d = rule[1].B.y;

  const determinant = (a*d) - (c*b);
  if(determinant === 0) return false;
  return true;
}
function calculateButtonPushes(rule) {
  let a = rule[0].A.x;
  let b = rule[1].B.x;
  let c = rule[0].A.y;
  let d = rule[1].B.y;
  let c1 = rule[2].p.x;
  let c2 = rule[2].p.y;

  // console.log("a: ",a,"b:",b,"c:",c,"d:",d,"c1:",c1,"c2:",c2)
  const denominator = ((a * d) - (b * c));

  // Check if the denominator is 0 (which means the system has no unique solution)
  if (denominator === 0) {
    throw new Error("The system has no unique solution.");
  }
  const num1 = (c1 * d - (c2 * b))
  const x = num1 / denominator;
  const y = ((a * c2) - (c * c1)) / denominator;

  return [x, y];
}
function calculateButtonPushesAdvanced(rule) {
  let a = rule[0].A.x;
  let b = rule[1].B.x;
  let c = rule[0].A.y;
  let d = rule[1].B.y;
  let c1 = rule[2].p.x + 10000000000000;
  let c2 = rule[2].p.y + 10000000000000;

  // console.log("a: ",a,"b:",b,"c:",c,"d:",d,"c1:",c1,"c2:",c2)
  const denominator = ((a * d) - (b * c));

  // Check if the denominator is 0 (which means the system has no unique solution)
  if (denominator === 0) {
    throw new Error("The system has no unique solution.");
  }
  const num1 = (c1 * d - (c2 * b))
  const x = num1 / denominator;
  const y = ((a * c2) - (c * c1)) / denominator;

  return [x, y];
}

function countTokens(){
  let tokens = 0;
  let tokensAdvanced = 0;
  rules.forEach(rule => {
    const [A, B] = calculateButtonPushes(rule);
    const [aA, aB] = calculateButtonPushesAdvanced(rule);
    if(Math.floor(A) === A && Math.floor(B) === B){
      tokens += A*3;
      tokens += B;
    }
    if(Math.floor(aA) === aA && Math.floor(aB) === aB){
      tokensAdvanced += aA*3;
      tokensAdvanced += aB;
    }

  })
  return [tokens, tokensAdvanced]
}

let [p1, p2] = countTokens()
console.log(p1);
console.log(p2);
