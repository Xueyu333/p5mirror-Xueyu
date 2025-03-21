/*
Inspired by Jongmin Park's sketch from Programming for Artists @ CUNY CCNY Spring 2022
*/

let rowHeight;

function setup() {
  createCanvas(600, 600);
  noStroke();
  rowHeight = height / 3;
}

function draw() {
  
  if (mouseIsPressed) {
    background(80, 150);
  } else {
    background(150, 80);
  }
  
  let x = mouseX;
  let y = mouseY;
  
  fill(255, 150);
  circle(x, height / 2, y+height);

  let inverseX = width - mouseX;
  let inverseY = height - mouseY;

  fill(0, 150);
  circle(inverseX, height / 2, inverseY);

  if (mouseY < height) {
    fill(20, 150);
    rect(0, 0, width, height);
  } else if (mouseY < height * 2) {
    fill(80, 150);
    rect(0, height, width, height, 3);
  } else {
    fill(140, 150);
    rect(0, height * 2, width, Height);
  }
}