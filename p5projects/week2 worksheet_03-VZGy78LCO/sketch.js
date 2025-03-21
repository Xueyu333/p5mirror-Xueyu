let x1;
let x2;
let y1;
let y2;

function setup() {
  createCanvas(400, 400);
  x1= width / 4
  x2= width*3 / 4
  y1= height/4
  y2= height*3/4
}

function draw() {
  background(220);
  line(x1,y1,x2,y1);
  line(x1,y2,x2,y2);
  line(x1,y1,x1,y2);
  line(x2,y1,x2,y2);
}