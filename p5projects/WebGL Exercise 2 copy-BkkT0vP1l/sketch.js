function setup() {
  createCanvas(400, 400, WEBGL);
}

function draw() {
  background(255);

  let angleX = map(mouseY, 0, height, -PI, PI); // Rotate based on mouse Y
  let angleY = map(mouseX, 0, width, -PI, PI);  // Rotate based on mouse X
  
  let torusSize = map(mouseY, height, 0, 40, 120); // Scale up when mouse moves up

  let posX = map(mouseX, 0, width, -100, 100); // Move torus left/right
  let posY = map(mouseY, 0, height, -100, 100); // Move torus up/down

  translate(posX, posY); // Apply movement
  rotateX(angleX);
  rotateY(angleY);

  stroke(20);
  noFill();
  torus (torusSize, 40); // Torus with variable size
}

