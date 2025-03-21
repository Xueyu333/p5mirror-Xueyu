let x1speed = 1;
let y1speed = 1.2;

let x2speed = 1;
let y2speed = 2;

function setup() {
  createCanvas(400, 400);
  
  x1 = width / 2;
  y1 = height / 2;

  x2 = width / 4;
  y2 = height / 4;
}

function draw() {
  background(220);

  x1 += x1speed;
  y1 += y1speed;

  x2 += x2speed;
  y2 += y2speed;
  
  if (x1 <= 0 || x1 >= width) {
    x1speed *= -1;
  }

  if (y1 <= 0 || y1 >= height) {
    y1speed *= -1;
  }

  if (x2 <= 0 || x2 >= width) {
    x2speed *= -1;
  }

  if (y2 <= 0 || y2 >= height) {
    y2speed *= -1;
  }

  ellipse(x1, y1, 50, 50);
  ellipse(x2, y2, 50, 50);
}
