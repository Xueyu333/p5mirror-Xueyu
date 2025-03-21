/*
Based on p5.js demos by Matt DesLauriers
https://github.com/mattdesl/workshop-p5-intro

The MIT License (MIT) Copyright (c) 2019 Matt DesLauriers

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

//set initial angle to 0
let angle = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //circle is nofill
  noFill();
  //stroke's color
  stroke(255);
}

function windowResized() {
  //resizecanvas when window size changes
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  // Get the smaller value between width and height
  let minDimension = min(width, height);

  // Control the dynamic change of strokeWeight.
  // sin(angle)/2 ranges from -0.5 to 0.5, creating a smooth wave effect that makes the circle's strokeWeight change over time.
  let amount = sin(angle) / 2 + 0.6;

  // Set the stroke thickness variation and apply it
  let thickness = (minDimension / 20) * amount;
  strokeWeight(thickness);

  // Set the circle’s diameter (half of the canvas size) and draw the circle
  let diam = minDimension / 2;
  circle(width / 2, height / 2, diam);

  // Increase the angle by 0.08 per frame to control the speed of sin(angle) variation
  angle += 0.08;
}
