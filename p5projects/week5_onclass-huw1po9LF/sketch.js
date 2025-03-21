// Declare a variable for the horizontal position of the ball
let x;
let y;

// Declare a variable for the horizontal speed of the ball
let xspeed = 1;
let yspeed = 1;

function setup() {
  createCanvas(400, 400);
  // Initialize the position in the center
  x = width / 2;
  y = height / 2;
}

function draw() {
  background(220);
  move();
  direction();
  ball();
}



function move() {
  // Move the ball ball, either right or left
  x += xspeed * 3;
  y += yspeed * 5;
}

function direction() {
  // Simplified Version:
  // When the ball is at either left or right border
  if (x <= 0 || x >= width ) {
    // Flip the sign of the direction
    xspeed *= -1;
  }
  if (y <= 0 || y >= height) {
    yspeed *= -1;
  }
}

function ball() {
  // Draw the ball
  ellipse(x, y, 50, 50);
}
