/*
Inspired and based on @b2renger's Noise et coordonnees polaires:
https://github.com/b2renger/p5js-designing-interactive-patterns?_x_tr_sl=auto&_x_tr_tl=en&_x_tr_hl=en&_x_tr_pto=wapp#noise-et-coordonnees-polaires

Coding Train video 3.4 Polar Coordinates (don't worry about vectors):
https://thecodingtrain.com/tracks/the-nature-of-code-2/noc/3-angles/4-polar-coordinates
*/

let tx = 0;
let ty = 1000;
let tz = 2000;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  stroke(255, 100);
  strokeWeight(0.2);
}

function draw() {
  let angle = noise(tx / 2) * TWO_PI * 4;
 
  let minDimension = min(width, height)
  let radius = noise(tx, ty, tz) * minDimension/2;
  
  let x = cos(angle) * radius + minDimension/2;
  let y = sin(angle) * radius + minDimension/4;

  let endX = width/2 + cos(tx) * 100;
  let endY = height/2 + sin(tx) * 100;
  
  line(x, y, endX, endY);
  
  tx += 0.005;
  ty += 0.005;
  tz += 0.005;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}
