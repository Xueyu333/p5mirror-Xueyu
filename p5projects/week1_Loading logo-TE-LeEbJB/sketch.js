let x;
let yBase;
let amplitude;
let speed = 3;
let startPoint, endPoint;

function setup() {
  createCanvas(windowWidth, windowHeight);
  fill(0);
  noStroke();

  startPoint = width * 0.25;
  endPoint = width * 0.75;
  yBase = height * 0.5;
  amplitude = 30;

  x = startPoint;
}

function draw() {
  background(255, 10);

  let y = yBase + amplitude * sin(x * 0.05);

  circle(x, y, 15);

  x += speed; // move to right

  if (x > endPoint) {
    x = startPoint;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
