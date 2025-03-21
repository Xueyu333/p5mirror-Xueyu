/*
Inspired by William Kolomyjec’s Random Squares

Based on a translation from Nick Santaniello:
http://recodeproject.com/translation/nick-santaniello-direct-untitled-1-various
*/

let total; //stores the total number of rows and columns in the grid
let sqSize; //the size of each square
let sizeDifference; //the size difference between nested squares

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  rectMode(CENTER); // Set rectangle drawing mode to CENTER
  strokeWeight(2);
  noFill();

  let minDimension = min(width, height);

  //calculate the total number of squares along one axis
  total = minDimension / 90;

  // determine the size of each square
  sqSize = width / total;

  //determines how much smaller each nested square is compared to the previous one； each nested square is 1/6th smaller than the original square.
  sizeDifference = sqSize / 4;
}

function draw() {
  translate(sqSize / 2, sqSize / 2);

  // loop through rows
  for (let r = 0; r < total; r++) {
    // loop through columns
    for (let c = 0; c < total; c++) {
      // calculate the x and y position for the main square
      let x = r * sqSize;
      let y = c * sqSize;
      square(x, y, sqSize);

      // generate a small random offset for nested squares
      let offsetX = random(-5, 5);
      let offsetY = random(-5, 5);

      // loop to draw nested squares with decreasing size
      for (let i = 1; i < 6; i++) {
        //calculate the new position for the nested square
        let newX = c * sqSize + i * offsetX;
        let newY = r * sqSize + i * offsetY;
        
        // calculate the new size for the nested square
        let newSize = sqSize - i * sizeDifference;

        rect(newX, newY, newSize);
      }
    }
  }
  noLoop();
}
