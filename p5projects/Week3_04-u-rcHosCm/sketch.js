let interval = 500;
let lastTime = 0;
let visible = false;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  let currentTime = millis();

  if (currentTime - lastTime >= interval) {
    visible = !visible;
    lastTime = currentTime;
  }
  if (visible === true) {
    rect(200, 200, 100, 50);
  }
}
