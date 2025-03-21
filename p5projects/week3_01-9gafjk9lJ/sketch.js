function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  if (mouseX < width / 3) {
    rect(0, 0, width / 3, height);
  } else if (mouseX < (2 * width) / 3) {
    rect(width / 3, 0, width / 3, height);
  } else {
    rect((2 * width) / 3, 0, width / 3, height);
  }
}
