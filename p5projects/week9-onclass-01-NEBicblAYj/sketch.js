let cam;
let a = 0;
let aspeed = 1;

function setup() {
  createCanvas(640, 480);
  cam = createCapture(VIDEO);
  cam.hide();
};

function draw() {
  background(220);
  image(cam, 0, 0);
  image(cam, width / 2, 0);
  push();
  scale(-1, 1);
  copy(cam, 0, 0, width / 2, height, -width, 0, width / 2, height);
  pop();

  tint(255, a);
  image(cam, 0, 0);
  a += aspeed;
  if (a < 0 || a > 255) {
    aspeed *= -1;
  }
}
