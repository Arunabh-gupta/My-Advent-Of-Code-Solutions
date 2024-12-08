const fs = require("fs")
const inputData = fs.readFileSync("day8Input.txt", "utf8");

const areaMap = inputData.split("\n").map(line => line.split(''));

let antennas = [];

for(let i=0; i<areaMap.length; i++){
  for(let j=0; j<areaMap[0].length; j++){
    if(areaMap[i][j] !== '.') antennas.push({char: areaMap[i][j], row: i, col: j})
    }
}

// storing pairs of antennas
let pairs = []; 
let pairSet = new Set();
let uniqueAntinodes = new Set();
function searchIdenticalAntenna(areaMap, antenna){

  for(let i=0; i<areaMap.length; i++){
    for(let j=0; j<areaMap[0].length; j++){
        if(areaMap[i][j] === antenna.char && i != antenna.row && j != antenna.col){
          const sortedPair = [[antenna.row, antenna.col], [i, j]].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
 
          const pairKey = JSON.stringify(sortedPair);
          if (!pairSet.has(pairKey)) {
            pairSet.add(pairKey); 
            pairs.push(sortedPair); 
          }
        }
    }
  }
}

antennas.forEach(antenna => {
  searchIdenticalAntenna(areaMap, antenna)
})


// finding differece between like antennas
function findDifference(antennaPair){
  const antenna1 = antennaPair[0];
  const antenna2 = antennaPair[1];
  const rdiff = (antenna2[0]-antenna1[0])
  const cdiff = (antenna2[1]-antenna1[1])
  const slope = rdiff === 0 ? "INF" : cdiff / rdiff;
  // console.log("slope: "+slope)
  return {rdiff: Math.abs(antenna1[0]-antenna2[0]), 
          cdiff: Math.abs(antenna1[1]-antenna2[1]),
          slope: slope
        };
}

function checkBounds(areaMap, antinode){
  // console.log(antinode)
  const row = antinode[0];
  const col = antinode[1];
  return row < areaMap.length && row >= 0 && col < areaMap[0].length && col >= 0;
}

function countOfAntinodes(antennaPair){
  const antenna1 = antennaPair[0];
  const antenna2 = antennaPair[1];
  const diff = findDifference(antennaPair);
  let antinode1 = [], antinode2 = [];

  // console.log("Antenna Pair:", antenna1, antenna2);
  
  if (diff.slope === "INF") {
    antinode1 = [antenna1[0] - diff.rdiff, antenna1[1]];
    antinode2 = [antenna2[0] + diff.rdiff, antenna2[1]];
  } else if (diff.slope === 0) {
    antinode1 = [antenna1[0], antenna1[1] - diff.cdiff];
    antinode2 = [antenna2[0], antenna2[1] + diff.cdiff];
  } else if (diff.slope < 0) { // Positive slope
    antinode1 = [antenna1[0] - diff.rdiff, antenna1[1] + diff.cdiff];
    antinode2 = [antenna2[0] + diff.rdiff, antenna2[1] - diff.cdiff];
  } else if (diff.slope > 0) { // Negative slope
    antinode1 = [antenna1[0] - diff.rdiff, antenna1[1] - diff.cdiff];
    antinode2 = [antenna2[0] + diff.rdiff, antenna2[1] + diff.cdiff];
  }

  if (checkBounds(areaMap, antinode1)) {
    uniqueAntinodes.add(JSON.stringify(antinode1)); 
  }
  if (checkBounds(areaMap, antinode2)) {
    uniqueAntinodes.add(JSON.stringify(antinode2));
  }
}

function countOfMultiAnitnodes(antennaPair){
    const antenna1 = antennaPair[0];
    const antenna2 = antennaPair[1];
    const diff = findDifference(antennaPair);
    let antinode1 = [0,0], antinode2 = [0,0];
    let factor = 1;

    
    if (diff.slope === "INF") {
      factor = 1;
      while(true){
        antinode1 = [antenna1[0] - diff.rdiff * factor, antenna1[1]];
        if (checkBounds(areaMap, antinode1)) {
          uniqueAntinodes.add(JSON.stringify(antinode1));
        } else {
            break;
        }
    
        factor++;
      }
      factor = 1
      while(true){
        antinode2 = [antenna2[0] + diff.rdiff * factor, antenna2[1]];
        if (checkBounds(areaMap, antinode2)) {
          uniqueAntinodes.add(JSON.stringify(antinode2));
        } else {
            break;
        }
        factor++;
      }
    } else if (diff.slope === 0) {
      factor = 1;
      while(true){
        antinode1 = [antenna1[0], antenna1[1] - diff.cdiff * factor];
        if (checkBounds(areaMap, antinode1)) {
          uniqueAntinodes.add(JSON.stringify(antinode1));
        } else {
            break;
        }
        factor++;
      }
      factor = 1;
      while(true){
        antinode2 = [antenna2[0], antenna2[1] + diff.cdiff * factor];
        if (checkBounds(areaMap, antinode2)) {
          uniqueAntinodes.add(JSON.stringify(antinode2));
        } else {
            break;
        }
        factor++;
      }
    } else if (diff.slope < 0) { // Positive slope
      factor = 1;
      while(true){
        antinode1 = [antenna1[0] - diff.rdiff*factor, antenna1[1] + diff.cdiff*factor];
        if (checkBounds(areaMap, antinode1)) {
          uniqueAntinodes.add(JSON.stringify(antinode1));
        } else {
            break;
        }
        factor++;
    
      }
      factor = 1;
      while(checkBounds(areaMap, antinode2)){
        antinode2 = [antenna2[0] + diff.rdiff*factor, antenna2[1] - diff.cdiff*factor];
        if (checkBounds(areaMap, antinode2)) {
          uniqueAntinodes.add(JSON.stringify(antinode2));
        } else {
            break;
        }
        factor++; 
      }
      
    } else if (diff.slope > 0) { // Negative slope
      
      factor = 1;
      while(checkBounds(areaMap, antinode1)){
        antinode1 = [antenna1[0] - diff.rdiff*factor, antenna1[1] - diff.cdiff*factor];
        if (checkBounds(areaMap, antinode1)) {
          uniqueAntinodes.add(JSON.stringify(antinode1));
        } else {
            break;
        }
        factor++;
      }
      factor = 1;
      while(checkBounds(areaMap, antinode2)){
        antinode2 = [antenna2[0] + diff.rdiff*factor, antenna2[1] + diff.cdiff*factor];
        if (checkBounds(areaMap, antinode2)) {
          uniqueAntinodes.add(JSON.stringify(antinode2));
        } else {
            break;
        }
        factor++;
      }
    }
}

pairs.forEach(pair => {
  countOfAntinodes(pair);
})
let p1 = uniqueAntinodes.size;

pairs.forEach(pair => {
  countOfMultiAnitnodes(pair);
})

antennas.forEach(antenna => {
  let temp = [antenna.row, antenna.col]
  uniqueAntinodes.add(JSON.stringify(temp))
  
})

let p2 = uniqueAntinodes.size;
console.log(p1);
console.log(p2)