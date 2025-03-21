let speed=3;
let x;
let color;
function setup() {
  createCanvas(400, 400);
  x=0;
  
}

function draw() {
  background(220);
  x+=speed;
  
  color=255 *(width-x)/ width;
  
  fill(color);
  console.log(color)
  circle(x,200,20)
  if(x<0 || x>width){
    speed*=-1;
  }
  
}