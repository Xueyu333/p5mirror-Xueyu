let x1, x2, y1, y2;

x1 = 320;
y1 = 320;
x2 = 470;
y2 = 320;

//   mouth
let mouthx = 400;
let mouthy = 400;
let mouthSize = 80;
let maxMouthSize = 200;
let mouthGrowSpeed = 1;

//cheekcolor
let from;
let to;
let t = 0;

function setup() {
  createCanvas(800, 700);
}

function draw() {
  // background(202, 156, 255);
 changeBackground();
  hair();
  neck();
  head();
  frontHair();
  eyes();
  nose();
  body();
  eyebrow();
  cheek();
  mouth();
  ear();
}


///////////////////funciton define
function changeBackground(){
  if(mouseIsPressed){
    background(random(255),random(255),random(255));
  }

}

function hair() {
  //   back hair
  fill(0, 0, 0);
  noStroke();
  ellipse(400, 300, 330, 380);
  rect(400, 290, 160, 250);
  rect(240, 290, 160, 250);
}
/////////
function neck() {
  //   neck
  push();
  rectMode(CENTER);
  fill(248, 199, 172);
  noStroke();
  rect(400, 470, 70, 100);
  pop();
}
/////
function head() {
  //   head
  fill(248, 199, 172);
  ellipse(400, 300, 300, 350);
}
///////
function frontHair() {
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
}
//////
function eyes() {
  //   eyes
  fill(0, 0, 0);
  if (mouseX < 600 && mouseX > 200 && mouseY > 200 && mouseY < 400) {
    ellipse(x1, y1, mouseX / 20, mouseY / 20);
    ellipse(x2, y2, mouseX / 20, mouseY / 20);
    // }else{ellipse(320, 320, 25,25);
    // ellipse(470, 320, 25,25);}
  }
  if (mouseX < 200 && mouseY < 400 && mouseY > 200) {
    ellipse(x1 - 20, y1, 25, 25);
    ellipse(x2 - 20, y2, 25, 25);
  }

  if (mouseX > 600 && mouseY < 400 && mouseY > 200) {
    ellipse(x1 + 20, y1, 25, 25);
    ellipse(x2 + 20, y2, 25, 25);
  }

  if (mouseY < 200) {
    ellipse(x1, y1 - 20, 25, 25);
    ellipse(x2, y2 - 20, 25, 25);
  }

  if (mouseY > 400) {
    ellipse(x1, y1 + 20, 25, 25);
    ellipse(x2, y2 + 20, 25, 25);
  }
}
//////
function nose() {
  //  nose
  stroke(207, 140, 93);
  strokeWeight(3);
  line(400, 330, 400, 380);
}
//////
function body() {
  //   body
  push();
  rectMode(CENTER);
  noStroke();
  fill(248, 205, 224);
  rect(400, 640, 300, 300, 60, 60, 0, 0);
  pop();
}
//////
function eyebrow() {
  //   Eyebrow
  push();

  if (mouseY > 400) {
    translate(310, 310);
    rotate(radians(-90));
    // rect(0, 0, 10, 60, 10, 10);
  } else {
    translate(310, 270);
    rotate(radians(-70));
  }

  fill(0, 0, 0);
  noStroke();
  rect(0, 0, 10, 60, 10, 10);
  pop();

  push();
  if (mouseY > 400) {
    translate(480, 300);
    rotate(radians(90));
  } else {
    translate(480, 260);
    rotate(radians(70));
  }

  fill(0, 0, 0);
  noStroke();
  rect(0, 0, 10, 60, 10, 10);
  pop();
}
/////
function cheek() {
  //cheek

  //cheek color
  from = color(248, 199, 172);
  to = color("rgb(241,61,61)");
  let interA = lerpColor(from, to, t);

  if (
    (mouseX < 340 && mouseX > 270 && mouseY > 350 && mouseY < 410) ||
    (mouseX > 460 && mouseX < 520 && mouseY > 350 && mouseY < 410)
  ) {
    if (t < 1) {
      t += 0.01;
    }
  } else if (t > 0) {
    t -= 0.01;
  }

  fill(interA);
  noStroke();
  circle(310, 380, 60);
  circle(490, 380, 60);
}
///////
function mouth() {
  //   mouth

  if (mouseIsPressed) {
    mouthSize += mouthGrowSpeed;
    if (mouthSize > maxMouthSize) {
      mouthSize = maxMouthSize;
    }
  } else {
    mouthSize = 80;
  }

  fill(244, 165, 130);
  noStroke();
  strokeWeight(0);
  arc(mouthx, mouthy, mouthSize, mouthSize, 0, PI, CHORD);
}
/////////
function ear() {
  //   ear
  fill(248, 199, 172);
  noStroke();
  circle(250, 330, 50);
  circle(550, 330, 50);
}
