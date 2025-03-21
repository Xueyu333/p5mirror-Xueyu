let w;
function setup() {
  createCanvas(400, 400);
  w = width / 10;
  h = height / 10;
}

function draw() {
  background(255);
  for (let i = 0; i < 11; i++) {
    for (let a = 0; a < 11; a++) {
      if (
        mouseX > i * w &&
        mouseX < (i + 1) * w &&
        mouseY > a * h &&
        mouseY < (a + 1) * h
      ) {
        fill("red");
      } else {
        noFill();
      }
      rect(i * w, a * h, w, h);
    }
  }
}
