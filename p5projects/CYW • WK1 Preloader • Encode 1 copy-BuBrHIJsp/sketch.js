/*
Based on p5.js demos by Matt DesLauriers
https://github.com/mattdesl/workshop-p5-intro

The MIT License (MIT) Copyright (c) 2019 Matt DesLauriers

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

// Initialize the angle value
let angle = 0;

function setup() {
  //create window size canvas
  createCanvas(windowWidth, windowHeight);
  // Set angle mode to degrees（not PI）
  angleMode(DEGREES);
  //all shapes are white
  fill("pink");
}

function draw() {
  // Ensure the black background covers the previous frame to prevent 'DIFFERENCE' mode from affecting it
  blendMode(BLEND);
  //cover black background
  background("rgb(255,237,98)");

  //Calculate the interpolated color
  blendMode(DIFFERENCE);

  // Set x and y at the center of the canvas
  let x = width / 2;
  let y = height / 2;

  // Take the smaller value between width and height.
  let minDimension = min(width, height);

  // Set a fixed interval to ensure the drawn shapes stay within the canvas
  let spacing = minDimension / 8;

  // Draw a circle with its center shifted by "spacing" from the canvas center in both x and y directions, and a diameter of 1/2 of minDimension.
  circle(x + spacing, y + spacing, spacing * 4);

  // Offset the three points of the triangle relative to the canvas center.
  triangle(
    x - spacing,
    y - spacing * 3,
    x + spacing,
    y + spacing,
    x - spacing * 3,
    y + spacing
  );

  // Save the current coordinate system
  push();

  // Move the origin to the canvas center
  translate(x, y);

  // Rotate by a certain angle
  rotate(angle);

  // Set the square's drawing mode (center-based)
  rectMode(CENTER);

  // Draw a square
  square(0, 0, spacing * 4);

  // Increase the angle by 0.5 per frame
  angle += 0.5;

  // Restore the previously saved state
  pop();
}
