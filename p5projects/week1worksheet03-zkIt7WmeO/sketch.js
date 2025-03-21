function setup() {
  createCanvas(400, 400);
}

function draw() {
  background("#00FFFF");

  stroke(255, 0, 0);
  strokeWeight(30);
  line(0, 0, width, height);

  // strokeWeight(0);
  noStroke()
  fill(0, 210, 0);
  ellipse(200, 200, 180, 130);

  fill(0, 0, 230);
  square(270, 180, 20);
  
}
