/*
Inspired by Colette and Charles J. Bangert's Complex Intersecting Line (1976) and Roman Verostko's Sketch (1987)
*/

//declare variables 
let startX;
let startY;
let endX;
let endY;

// Tracks the number of lines drawn
let num = 0;

// Total number of lines to be drawn
let total = 1000;

//Noise seed variables 
let tx = 0;
let ty = 1000;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  //white stroke
  stroke(255);
  //stroke thickness
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
    startX = endX; // Update start point to the previous end point
    startY = endY;
    getEndPoint();// Generate a new random end point
    num++;// Increase the counter by 1
  }
}

function getStartPoint() {
  // startX = map(noise(tx), 0, 1, 0, width);// Map noise value (0-1) to canvas width
  // startY = map(noise(ty), 0, 1, 0, height);// Map noise value (0-1) to canvas height
  

}

function getEndPoint() {
  endX = map(noise(tx), 0, 1, 0, width);
  endY = map(noise(ty), 0, 1, 0, height);

  

  // Increment the Perlin noise seed to ensure smooth movement
  tx += 0.01;
  ty += 0.01;
}