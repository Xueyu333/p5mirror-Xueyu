let cellSize;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  strokeWeight(2);
}

function draw() {
  background(255);

  cellSize = min(width / 10, height / 10);

  for (let x = 0; x < width; x += cellSize) {
    for (let y = 0; y < height; y += cellSize) {
      drawPinwheel(x, y, 0.01);
    }
  }
}


function drawPinwheel(x, y, spd) {
  push();
  translate(x, y);
  rotate(frameCount * spd);
  ellipse(0, 0, 100, 20);
  ellipse(0, 0, 20, 100);
  pop();
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


