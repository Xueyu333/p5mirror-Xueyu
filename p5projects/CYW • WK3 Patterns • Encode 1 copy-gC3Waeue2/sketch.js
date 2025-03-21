/*
Inspired by "rectangular forms" by the Belfort Group
Published in Computer Graphics and Art, 1976, Vol. 1, No. 3 	
*/

let cellSize;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //all shapes do not have stroke
  noStroke();
}

function draw() {
  background(127);
  //take the smallest value between width / 10 and height / 10
  cellSize = min(width / 10, height / 10);

  //Update the x and y positions of the square
  for (let x = 0; x < width; x += cellSize) {
    for (let y = 0; y < height; y += cellSize) {
      // Generate a random number between 0 and 1
      let chance = random(1);
      //50% chance fill white
      if (chance < 0.1) {
        fill(255);
        //50% chance fill black
      } else {
        fill(0);
      }
      //draw square
      square(x, y, cellSize);
    }
  }
  noLoop();
}

// Restart the draw loop when the mouse is pressed.
function mousePressed() {
  loop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
