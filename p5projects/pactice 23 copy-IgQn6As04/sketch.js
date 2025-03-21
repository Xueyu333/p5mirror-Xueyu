
let rowHeight;


function setup() {
  createCanvas(600, 600);
  noStroke();
  // variable for dividing the canvas to 3 pieces horizontally
  rowHeight = height / 3;
}
function draw() {
  // when the mouse is pressed it will invert the color of background
  if (mouseIsPressed) {
    background(80, 150);
  } else {
    background(150, 80);
  }
  let x = mouseX;
  let y = mouseY;

  // Circle will move based on X value in mouse and will get bigger in Y value
  fill(255, 150);
  circle(x, height / 2, y);
  // Variables to invert the mouse movements
  let inverseX = width - mouseX;
  let inverseY = height - mouseY;
  
 // Another circle that is mirrored 
  fill(0, 150);
  circle(inverseX, height / 2, inverseY);
// Based on the mouse movement between the rows it changes the background color of rectangles
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