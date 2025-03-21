let x;
let y;
let w2h;

function setup() {
  createCanvas(800, 400);
  x=width/2;
  y=height/2;
  w2h=width/height;
  console.log(w2h);
  
}

function draw() {
  background(220);
  
//   update the position of the ball
  x+=1*w2h;
  y+=1;
  
  ellipse(x,y,50,50)
}