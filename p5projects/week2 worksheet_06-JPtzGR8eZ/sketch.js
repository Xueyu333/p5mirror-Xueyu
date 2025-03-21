let x1;
let x2;
let y1;
let y2;
let rectWidth;
let rectHeight;

function setup() {
  createCanvas(400, 400);
  rectWidth=width/2;
  rectHeight=height/2;
  
}

function draw() {
  background(220);
  x1= mouseX;
  x2= mouseX+rectWidth;
  y1= mouseY;
  y2= mouseY+rectHeight;
  
  line(x1,y1,x2,y1);
  line(x1,y2,x2,y2);
  line(x1,y1,x1,y2);
  line(x2,y1,x2,y2);
}