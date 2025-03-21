let visible = false;
let mouseOver = false;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  if (mouseX < (width * 2) / 3 && mouseX > width / 3 && !mouseOver) {
    mouseOver = true;
    visible = !visible;
  } else if (mouseX > (width * 2) / 3 || mouseX < width / 3) {
    mouseOver = false;
  }

  if (visible) {
    rect(width / 3, 0, width / 3, height);
  }
}
