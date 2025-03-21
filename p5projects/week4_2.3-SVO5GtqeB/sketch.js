let w;

function setup() {
  createCanvas(400, 400);
  w = width / 20;
}
function draw() {
  background(220);
  for (let i = 0; i < 20; i++) {
    if (mouseX > i * w && mouseX < (i + 1) * w) {
      fill("white");
    }
    rect(i * w, 0, w, height);
  }

  for (let i = 0; i < 21; i += 2) {
    if (mouseX > i * w && mouseX < (i + 1) * w && mouseX < width) {
      fill("blue");
    } else fill("white");
    rect(i * w, 0, w, height);
  }
}
