/*
Inspired by Frieder Nake's Zufälliger Polygonzug – 13/9/65 Nr. 7 (Random Polygon (1965) and A. Michael Noll's Gaussian-Quadratic (1963)
*/

//declare variables
let startX;
let startY;
let endX;
let endY;

// Tracks the number of lines drawn
let num = 0;

// Total number of lines to be drawn
let total = 40;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  stroke(255);
  strokeWeight(2);
  // Initialize the starting and ending point of the first line
  getStartPoint();
  getEndPoint();
}

function draw() {
  
  // Use a while loop to draw lines until the total count is reached
  while (num < total) {  
    // Draw a line from the start point to the end point
    line(startX, startY, endX, endY);
    startX = endX;// Update start point to the previous end point
    startY = endY;
   
    getEndPoint();// Generate a new random end point
    num++; // Increase the counter by 1
    
    console.log("startX:"+ startX);
    console.log("endX:"+ endX);
  }
}

function getStartPoint() {
  // Generate a random starting position within the canvas boundaries
  startX = random(10, width - 10);
  startY = random(10, height - 10);
}

function getEndPoint() {
  // Generate a random ending position within the canvas boundaries
  endX = random(10, width - 10);
  endY = random(10, height - 10);
}