const fs = require("fs")
const inputData = fs.readFileSync("day15Input.txt","utf8")

let [area, moves] = inputData.split("\n\n")

area = area.split("\n").map(line => line.split(""));
moves = moves.split('')
const moveConvention = {
  '<':0,
  '^':1,
  '>':2,
  'v':3
}
let dr = [0,-1,0,1];
let dc = [-1,0,1,0];
// console.log(area)

function findRoboPosition(){
  for(let i=0; i<area.length; i++){
    for(let j=0; j<area[0].length; j++){
      if(area[i][j] == '@') return {r: i, c: j}
    }
  }
}
let roboPos = findRoboPosition();

function checkMovableSpot(move){

  let r = dr[moveConvention[move]], c=dc[moveConvention[move]];
  for (
    let i = roboPos.r, j = roboPos.c; 
    i >= 0 && i < area.length && j >= 0 && j < area[0].length && area[i][j] !== "#"; 
    i += r, j += c
  ) {
    console.log(area[i][j], move, i, j);
    if (area[i][j] === ".") return { r: i, c: j };
  }
  return false;
}

function updateArea(move, finalPos){
  let c = finalPos['c'], r = finalPos['r'];
  if(move == '>'){
    for(let ind = c; ind >= roboPos.c; ind--){
      area[r][ind] = area[r][ind-1];
    }
    area[roboPos.r][roboPos.c] = '.';
    roboPos.c += 1;
  }
  if(move == '<'){
    for(let ind = c; ind <= roboPos.c; ind++){
      area[r][ind] = area[r][ind+1];
    }
    area[roboPos.r][roboPos.c] = '.';
    roboPos.c -= 1;
  }
  if(move == '^'){
    for(let ind = r; ind <= roboPos.r; ind++){
      area[ind][c] = area[ind+1][c];
    }
    area[roboPos.r][roboPos.c] = '.';
    roboPos.r -= 1;
  }
  if(move == 'v'){
    for(let ind = r; ind >= roboPos.r; ind--){
      area[ind][c] = area[ind-1][c];
    }
    area[roboPos.r][roboPos.c] = '.';
    roboPos.r += 1;
  }
}

function calculateScoreOfArea(){
  let score = 0;
  for(let i=0; i<area.length; i++){
    for(let j=0; j<area[0].length; j++){
      if(area[i][j] === 'O'){
        score+= 100*(i) + j;
      }
    }
  }
  return score;
}

function updateAreaForAllMoves(){
  moves.forEach(move => {
    if(checkMovableSpot(move) != false){
      let finalPos = checkMovableSpot(move);
      // console.log(finalPos);
      updateArea(move, finalPos);
    }
  });
}

updateAreaForAllMoves();
let p1 = calculateScoreOfArea()
console.log(p1);