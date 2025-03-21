//https://archive.p5js.org/reference/#/p5.AudioIn

let mic;
let level;

function setup() {
  createCanvas(400, 400);
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  background(0);
  level = mic.getLevel();

  let ellipseSize = map(level, 0, 1, 10, 300);

  let thresholds = 0.1;

  if (level > thresholds) {
    background(random(255), random(255), random(255));
  } else {
    background(0);
  }

  fill("white");
  noStroke();
  ellipse(width / 2, height / 2, ellipseSize, ellipseSize);
}
