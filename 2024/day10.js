const { transcode } = require("buffer");
const fs = require("fs");
const inputData = fs.readFileSync("day10Input.txt", "utf8");

const map = inputData.split('\n').map(line => line.split('').map(char => Number(char)));
// const vis = new Array(map.length).fill(new Array(map[0].length).fill(0))
// console.log(vis)
console.log(map);
let trailends = new Set()

function withinBounds(r, c, map){
  return r<map.length && r>=0 && c<map[0].length && c>=0;
}
function countTrails(sr, sc, map, trailends){
  if(map[sr][sc] === 9 && !trailends.has(JSON.stringify([sr, sc]))){
    trailends.add(JSON.stringify([sr, sc]));
    return 1;
  } 
  const dr = [0, 1, 0, -1];
  const dc = [1, 0, -1, 0];
  let cnt = 0;
  for(let i=0; i<4; i++){
    const nr = sr+dr[i];
    const nc = sc+dc[i];
    if(withinBounds(nr, nc, map) && map[nr][nc] === map[sr][sc]+1){
      // console.log("Checking:", JSON.stringify([sr, sc]));
      cnt += countTrails(nr, nc, map, trailends);
    } 
  }
  return cnt;
}

function countRatings(sr, sc, map){
  if(map[sr][sc] === 9 ){
    return 1;
  } 
  const dr = [0, 1, 0, -1];
  const dc = [1, 0, -1, 0];
  let cnt = 0;
  for(let i=0; i<4; i++){
    const nr = sr+dr[i];
    const nc = sc+dc[i];
    if(withinBounds(nr, nc, map) && map[nr][nc] === map[sr][sc]+1){
      cnt += countRatings(nr, nc, map);
    } 
  }
  return cnt;
}

let p1 = 0, p2 = 0;
for(let i=0; i<map.length; i++){
  for(let j=0; j<map[0].length; j++){
    if(map[i][j] === 0){
      let score = countTrails(i, j, map, trailends);
      let rating = countRatings(i, j, map);
      trailends.clear();
      // console.log(rating)
      p1 += score;
      p2 += rating
    }
  }
}

console.log("p1:",p1)
console.log("p2:",p2)