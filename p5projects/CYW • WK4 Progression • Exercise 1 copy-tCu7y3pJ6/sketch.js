/*
Inspired by Georg Nees' Schotter

Based on a translation from Code as a Creative Medium:
https://github.com/CodeAsCreativeMedium/exercises/blob/main/02_iteration/15_recoding_schotter/schotter_js/schotter_js.js
*/

//set the initial angle to 0
let angle = 0;
// declare a variable for size of the square
let cellSize;

function setup() {
  
  createCanvas(windowWidth, windowHeight);
  noFill();
  strokeWeight(2);
}

function draw() {
  background(255);
  // determine the cellsize as the smaller value between 1/10th of the width or height
  cellSize = min(width / 10, height / 10);

  // loop through rows, starting from cellsize up to height - cellsize, with steps of cellSize
  for (let y = cellSize; y < height - cellSize; y += cellSize) {
    // loop through columns
    for (let x = cellSize; x < width - cellSize; x += cellSize) {
      
      push();//save the current transformation state
      
      //move the origin to the center of the current square
      translate(x + cellSize / 2, y + cellSize / 2);
      
      //generate a random rotation angle between -angle and angle
      rotateAmount = random(-angle, angle);
      //apply rotation to the square
      rotate(rotateAmount);
      
      
      square(-cellSize / 2, -cellSize / 2, cellSize/4);
      pop();
    }
    angle += 0.05;  //increment the angle value (in the y loop, when all squares in the current row are drawn (the inner x loop ends), angle += 0.05; is executed, and then the next row is entered.)
  }
  noLoop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  angle = 0;// Reset the angle
}
