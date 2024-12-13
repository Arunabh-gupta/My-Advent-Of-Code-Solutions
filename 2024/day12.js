const fs = require("fs");
const inputData = fs.readFileSync("day12Input.txt", "utf8");

let map = inputData.split('\n').map(line => line.split(''));

let regions = [];
let seen = new Set();
const dr = [1,0,-1,0];
const dc = [0,1,0,-1];

function checkBounds(r, c){
  return r>=0 && c>=0 && r<map.length && c<map[0].length;
}

function countRegions(){
    for(let i=0; i<map.length; i++){
      for(let j=0; j<map[0].length; j++){
        if(seen.has(JSON.stringify([i, j]))) continue;
        let queue = [];
        let region = new Set();
        queue.push([i, j]);
        seen.add(JSON.stringify([i, j]))
        region.add(JSON.stringify([i, j]))
        while(queue.length > 0){
          let [sr, sc] = queue.shift();
          for(let i=0; i<4; i++){
            let nr = sr+dr[i];
            let nc = sc+dc[i];
            if(checkBounds(nr, nc) && map[nr][nc] === map[sr][sc] && !seen.has(JSON.stringify([nr, nc]))){
              region.add(JSON.stringify([nr, nc]));
              seen.add(JSON.stringify([nr, nc]));
              queue.push([nr, nc]);
            }
          }
          
        }
        regions.push(region);
      }
    }
}

function countPerimeterAndScore(){
  let score = 0;
  regions.forEach(region => {
    let perimeter = 0;
    region.forEach(cell => {
      let [r, c] = JSON.parse(cell)
      let neighbours = 0;
      for(let i=0; i<4; i++){
        let nr = r+dr[i];
        let nc = c+dc[i];
        if(checkBounds(nr, nc) && map[nr][nc] === map[r][c]){
          neighbours++;
        } 
      }
      perimeter += 4-neighbours;
    })

    score += perimeter*region.size;
  })
  return score;
}

let pdr = [-0.5, 0.5, 0.5, -0.5]
let pdc = [-0.5, -0.5, 0.5, 0.5]

function countSidesAndScore(){
  let score = 0;
  regions.forEach(region =>{
    let totalCorners = 0;
    let corner_candidates = new Set();
    region.forEach(cell => {
      let [r, c] = JSON.parse(cell);
      for(let i=0; i<4; i++){
        corner_candidates.add(JSON.stringify([r+pdr[i], c+pdc[i]]));
      }
    })
    console.log(region)
    console.log(corner_candidates.size)
    let local_count = 0;
    corner_candidates.forEach(corner => {
      let [cr, cc] = JSON.parse(corner);
      let config = [true, true, true, true];
      for(let i=0; i<4; i++){
        let nr = cr+pdr[i];
        let nc = cc+pdc[i];
        config[i] = region.has(JSON.stringify([nr,nc]));
      }
      if (
        JSON.stringify(config) === JSON.stringify([true, false, true, false]) || 
        JSON.stringify(config) === JSON.stringify([false, true, false, true])
      ) {
        totalCorners += 2;
        local_count += 2;
      }
      if(config.filter(Boolean).length == 1 || config.filter(Boolean).length == 3){
        totalCorners += 1;
        local_count += 1
      }      
    })
    console.log("local_count",local_count)
    score += totalCorners * region.size;
  })
  return score;
}
countRegions();
let p1 = countPerimeterAndScore()
let p2 = countSidesAndScore()
console.log(p1);
console.log(p2);
