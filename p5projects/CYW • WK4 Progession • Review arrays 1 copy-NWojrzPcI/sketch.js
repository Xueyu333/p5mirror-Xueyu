let colors = ["red", "orange", "yellow", "green", "blue", "violet"];
let index=0;
function setup() {
  createCanvas(400, 400);
  // console.log(colors);
  // console.log(colors.length);
  // console.log(colors[0]);
  //  console.log(colors[1]);
}

function draw() {
 // background(colors[1]);
   background(colors[index]);
}

function mousePressed() {
  index=int(random(colors.length));
  
  
  //sequential
  //  index=index+1;
  // console.log(index);
  // if(index==colors.length){
  //   index=0;
  // }
}
