const fs = require("fs")
const inputData = fs.readFileSync("day5Input.txt", "utf8");

const [segment1, segment2] = inputData.split("\n\n")

const rules = segment1.split("\n");
const orders = segment2.split("\n");

const Orders = orders.map(order => {
  return order.split(",")
})

let map = {};
rules.forEach(rule => {
  const [before, after] = rule.split('|');
  if(before in map){
    map[before].push(after);
  }
  else{
    map[before] = new Array();
    map[before].push(after);
  }
})

let p1 = 0;
let p2 = 0;

function correctPageOrder(order) {
  console.log("before: "+order)
  for(let i=0; i<order.length; i++){
    for(let j = 0; j<order.length-1; j++){
      if(map[order[j]].includes(order[j+1]) === false) {
        [order[j], order[j+1]] = [order[j+1], order[j]];
      }
    }
  }
  console.log("after: "+order)
  return order;
}

Orders.forEach(order => {
  let valid = true;
  for(let i=0; i<order.length; i++){
    let arr = Array.from(order.slice(i+1));
    if(!map[order[i]]){
      map[order[i]] = new Array(0);
    }
    valid = arr.every(page => map[order[i]].includes(page));
    if(valid == false) break;
  }
  if(valid){
    p1 += Number(order[Math.floor(order.length / 2)]);
  }
  else{
    order = correctPageOrder(order);
    p2 += order.length >= 1 ? Number(order[Math.floor(order.length / 2)]) : 0;
  }
})

console.log(p1)
console.log(p2)

//97,13,75,29,47
//97,75,29,47,13
//97,75,47,29,13         