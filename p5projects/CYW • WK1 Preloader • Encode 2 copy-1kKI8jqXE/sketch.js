/*
Based on p5.js demos by Matt DesLauriers
https://github.com/mattdesl/workshop-p5-intro

The MIT License (MIT) Copyright (c) 2019 Matt DesLauriers

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

//set the intitial angle to 0
let angle = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // circle has no fill color
  noFill();
  //circle's stroke color:white
  stroke(255);
}

function windowResized() {
  // Adjust the canvas size when the window resizes to fit the new dimensions
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  // Get the smaller value between width and height
  let minDimension = min(width, height);

  // Set the stroke weight for the ball
  strokeWeight(minDimension * 0.015);

  // Set the starting xposition: 25% of the canvas width
  let xStart = width * 0.25;

  // Set the ending xposition: 75% of the canvas width
  let xEnd = width * 0.75;

  // Move the circle back and forth between xStart and xEnd following a sine wave pattern
  let x = map(sin(angle), -1, 1, xStart, xEnd);

  // Set the yposition
  let y = height * 0.5;

  // Set the circle’s diameter as 30% of the smaller canvas dimension
  let diam = minDimension * (0.3 + 0.5 * sin(angle)); //modify

  //draw circle
  circle(x, y, diam);

  // Increase the angle to make the circle oscillate continuously and control speed
  angle += 0.05;
}
