let ratioX = 0.8;
let ratioY = 0.6;
let sizeX = 20;
let sizeY = 10;

function setup() {
  createCanvas(800, 400);
  rectMode(CENTER);
}

function draw() {
  background(220);

  //size
  //location
  rect(width * ratioX, height * ratioY, sizeX, sizeY);

  // line(width/4,height/4,width/4,3*height/4)
  // line(3*width/4,height/4,3*width/4,3*height/4)
  // line(width/4,height/4,3*width/4,height/4)
  // line(width/4,3*height/4,3*width/4,3*height/4)
}
