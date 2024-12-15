const fs = require("fs");
const inputData = fs.readFileSync("day14Input.txt", 'utf8')
// console.log(inputData)
let robots = inputData.split('\n').map(robot => {
  const match = robot.match(/p=(\d+),(\d+)\s+v=(-?\d+),(-?\d+)/);
  if (match) {
    const [_, px, py, vx, vy] = match;
    return {
      p: { x: parseInt(px, 10), y: parseInt(py, 10) },
      v: { x: parseInt(vx, 10), y: parseInt(vy, 10) }
    };
  }
  return null; // Handle unexpected input format gracefully
}).filter(Boolean);


const rows = 103;
const cols = 101;

const area = Array.from({ length: rows }, () => Array(cols).fill(0));

function findAndUpdateFinalPosition(robot){
  const xmovement = 100*robot.v.x;
  const ymovement = 100*robot.v.y;
  const pix = robot.p.x;
  const piy = robot.p.y;
  let finalPositionx =  (xmovement+pix)%cols;
  if(finalPositionx < 0) finalPositionx += cols;

  let finalPositiony = (ymovement+piy)%rows;
  if(finalPositiony < 0) finalPositiony += rows;

  area[finalPositiony][finalPositionx]++;
}

function updateArea(robots){
  robots.forEach(robot => {
    findAndUpdateFinalPosition(robot);
  })
}
updateArea(robots)

// console.log(JSON.stringify(area));

function calculateScore(){
  let scoreQ1 = 0, scoreQ2 = 0, scoreQ3 = 0, scoreQ4 = 0;
  // let middleOnes = 0;
  let n = area.length, m = area[0].length;
  for(let i=0; i<=(n/2)-1; i++){
    for(let j=0; j<=(m/2)-1; j++){
      scoreQ1+=area[i][j];
    }
  }
  console.log("ScoreQ1: ", scoreQ1);
  for(let i=0; i<=Math.floor(n/2)-1; i++){
    for(let j=Math.floor(m/2)+1; j<m; j++){
      scoreQ2+=area[i][j];
      // console.log(area[i][j], i, j)
    }
  }
  console.log("ScoreQ2: ", scoreQ2); 
  for(let i=Math.floor(n/2)+1; i<n; i++){
    for(let j=0; j<=Math.floor(m/2)-1; j++){
      scoreQ3+=area[i][j];
    }
  }
  console.log("ScoreQ3: ", scoreQ3);
  for(let i=Math.floor(n/2)+1; i<n; i++){
    for(let j=Math.floor(m/2)+1; j<m; j++){
      scoreQ4+=area[i][j];
    }
  }
  console.log("ScoreQ4: ", scoreQ4);

  return scoreQ1 * scoreQ2 * scoreQ3 * scoreQ4;
}

let p1 = calculateScore();
console.log(p1)