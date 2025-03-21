let text;

function setup() {
  createCanvas(400, 400, WEBGL);
  tex = createGraphics(400,400);
}

function draw() {
  orbitControl();
  background(200);
  tex.textSize(10);
  tex.text("hello",mouseX,mouseY);

  //torus
  push();
  noStroke();
  texture(tex);
  torus(30, 20);
  pop();
}

