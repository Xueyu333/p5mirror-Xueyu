function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  rect(100,100,100,100);
  
  push();
  scale(2,1);
  // scale(-1,1);
  rect(100,100,100,100);
   // rect(-100,100,100,100);
  pop();
}