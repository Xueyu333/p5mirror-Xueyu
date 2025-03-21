/*
Inspired by Vera Molnár's Un, deux, trois

Based on a translation from Generative Artistry:
https://generativeartistry.com/tutorials/un-deux-trois/
*/

function setup() {
  createCanvas(windowWidth, windowHeight);
  //set the stroke cap style to ROUND
  strokeCap(ROUND);
  strokeWeight(4);
}

function draw() {
  background(255);

  //determine the step size for the grid
  let step = min(width / 15, height / 15);

  //loop through the grid positions based on step size
  for (let y = step; y < height - step; y += step) {
    for (let x = step; x < width - step; x += step) {
      
      
      //define different line positions based on the vertical region of the canvas
      if (y < height / 3) {
        
        // top third: Only one line in the middle
        drawLine(x, y, step, [0.5]);
      } else if (y < (height / 3) * 2) {
        
        // middle third: Two lines at 20% and 80% of the step
        drawLine(x, y, step, [0.2, 0.8]);
      } else {
        //bottom third: Three lines at 10%, 50%, and 90% of the step
        drawLine(x, y, step, [0.1, 0.5, 0.9]);
      }
    }
  }
  noLoop();
}

//function to draw vertical lines at specified positions within a square grid cell
function drawLine(_x, _y, _step, positions) {
  push();
  
  //move to the center of the current grid cell
  translate(_x + _step / 2, _y + _step / 2);
  rotate(random(5));
  
  //move the origin back to the top-left corner of the grid cell
  translate(-_step / 2, -_step / 2);
  
  // loop through the positions array to draw lines at different places within the square
  for (let i = 0; i <= positions.length; i++) {
    
    // the starting y-position is always at the top of the grid cell.
    line(positions[i] * _step, 0, positions[i] * _step, _step);
  }
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
