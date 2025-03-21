/*
Inspired by works from Frieder Nake's Matrix Multiplication Series
*/

let cellSize;
let sign;
let seed =10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //Set rectangle mode to center (draw from center point)
  rectMode(CENTER);
  //Set angle mode to degrees(no PI)
  angleMode(DEGREES);
  //only have strokes
  noFill();
  stroke(0);
  strokeWeight(2);
}

function draw() {
  background(255);
  //Set the random seed to ensure the same pattern is generated each time
  randomSeed(seed);

  //Determine the size of each cell，take smallest value
  cellSize = min(width / 10, height / 10);

  // placing squares in a grid pattern
  // Start from center of the first cell
  for (let x = cellSize / 2; x < width; x += cellSize) {
    for (let y = cellSize / 2; y < height; y += cellSize) {
      push(); // Save the current transformation state
      translate(x, y); // Move the origin to the center of the current cell

      //Generate a random number between 0 and 1
      let chance = random(1);

      // 50% chance sign=1
      if (chance < 0.5) {
        sign = 1;
      } else {
        sign = -1;
      }

      //Generate a random angle between 0 and -60 or 0 and 60 based on sign
      let angle = random(0, -60 * sign);
      rotate(angle);

      // If the angle is negative, draw a square with a random size between 50% and 100% of cellSize
      // Otherwise, draw a square of full cell size
      if (angle < 0) {
        square(0, 0, cellSize * random(0.1, 0.5));
      } else {
        square(0, 0, cellSize * 0.5);
      }

      pop(); // Restore the original transformation state
    }
  }
}

// When the mouse is pressed, update the random seed to generate a new pattern
function mousePressed() {
  seed = random(50000);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
