/*

Assemble and modify:
1. Unscramble and assemble the code to create something like this:
https://printablee.com/postpic/2015/04/free-printable-grid-paper_18888.png

2. Add some random variation, for example:

- Change some of the elements to be different from the others
- Or maybe all the elements are different from each other
- Or replace an element with an entirely new one

*/
let cellSize;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //take the smallest value between width/10 and height/10
  cellSize = min(width / 10, height / 10);
}
function draw() {

  background(255);
  noFill();
  strokeWeight(2);
  //The position of x keeps moving right by the length of cellsize
for (let x = 0; x < width; x += cellSize) {
  // The y position keeps moving downward by the length of cellsize
for (let y = 0; y < height; y += cellSize) {
  
  //draw squares：
  square(x, y, cellSize);}  
}
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);}



















