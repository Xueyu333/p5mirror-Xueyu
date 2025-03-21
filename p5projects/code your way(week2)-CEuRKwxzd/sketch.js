/*
Inspired by Jongmin Park's sketch from Programming for Artists @ CUNY CCNY Spring 2022
*/

let rowHeight;

function setup() {
  createCanvas(600, 600);
  //no borders
  noStroke();
  //each row is 1/3 canvas height
  rowHeight = height / 3;
  //
}

function draw() {
  
    //if mouse is presses, background color change to (80,150); if not (150,80)
  if (mouseIsPressed) {
    
    //gray tone(saturation),transparency
    background(80, 150);
  } else {
    background(150, 80);
  }

  
  //a white transparent circle will move with mouse
  let x = mouseX;
  let y = mouseY;
  
  fill(255, 150);
  circle(x, height / 2, y);
//circle's x position will change based on mouseX's position;and the diameter will change based on mouseY

  // get inverse of mouse x position
  let inverseX = width - mouseX;
  let inverseY = height - mouseY;


  fill(0, 150);
  circle(inverseX, height / 2, inverseY);

  console.log("mouseX:" + x, "inverseX:" + inverseX);

  //update fill color of 3 rectangles base on the y position
  if (mouseY < rowHeight) {
    fill(20, 150);
    rect(0, 0, width, rowHeight);
  } else if (mouseY < rowHeight * 2) {
    fill(80, 150);
    rect(0, rowHeight, width, rowHeight);
  } else {
    fill(140, 150);
    rect(0, rowHeight * 2, width, rowHeight);
  }
}