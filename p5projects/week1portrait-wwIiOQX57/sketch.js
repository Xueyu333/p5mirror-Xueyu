function setup() {
  createCanvas(800, 700);
}

function draw() {
  background(202, 156, 255);

  //   back hair
  fill(0, 0, 0);
  noStroke();
  ellipse(400, 300, 330, 380);
  rect(400, 290, 160, 250);
  rect(240, 290, 160, 250);

  //   neck
  push();
  rectMode(CENTER);
  fill(248, 199, 172);
  noStroke();
  rect(400, 470, 70, 100);
  pop();

  //   head
  fill(248, 199, 172);
  ellipse(400, 300, 300, 350);

  // front hair
  push();
  translate(330, 210);
  rotate(radians(45));
  fill(0, 0, 0);
  ellipse(0, 0, 100, 250);
  pop();

  push();
  translate(470, 210);
  rotate(radians(-45));
  fill(0, 0, 0);
  ellipse(0, 0, 100, 250);
  pop();

  //   eyes
  fill(0, 0, 0);
  circle(320, 320, 30);
  circle(470, 320, 30);

  //  nose
  stroke(207, 140, 93);
  strokeWeight(3);
  line(400, 330, 400, 380);

  //   mouth
  fill(244, 165, 130);
  noStroke();
  strokeWeight(0);
  arc(400, 400, 80, 80, 0, PI, CHORD);

  //   body
  push();
  rectMode(CENTER);
  noStroke();
  fill(248, 205, 224);
  rect(400, 640, 300, 300, 60, 60, 0, 0);
  pop();

  //   Eyebrow
  push();
  translate(310, 270);
  rotate(radians(-70));
  fill(0, 0, 0);
  noStroke();
  rect(0, 0, 10, 60, 10, 10);
  pop();

  push();
  translate(480, 260);
  rotate(radians(70));
  fill(0, 0, 0);
  noStroke();
  rect(0, 0, 10, 60, 10, 10);
  pop();

  //cheek
  fill(240, 140, 120);
  noStroke();
  circle(310, 380, 60);
  circle(490, 380, 60);

  //   ear
  fill(248, 199, 172);
  noStroke();
  circle(250, 330, 50);
  circle(550, 330, 50);
}
