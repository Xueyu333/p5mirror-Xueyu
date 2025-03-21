/*
Based on p5.js demos by Matt DesLauriers
https://github.com/mattdesl/workshop-p5-intro

The MIT License (MIT) Copyright (c) 2019 Matt DesLauriers

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

//set intitial angle is 0
let angle = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  stroke(255);
}

function windowResized() {
  //resize the canvas if the window size changes
  resizeCanvas(windowWidth, windowHeight);
  //black background
  background(0);
}

function draw() {
  // Apply a black background with 25 transparency to gradually fade the previous frame,  creating an afterimage effect that makes the motion trail visible
  background(0, 60);

  // Move the origin to the canvas center
  translate(width / 2, height / 2);

  let minDimension = min(width, height);

  // Set the stroke weight of the circle, adjusting it based on canvas size
  strokeWeight(minDimension * 0.015);

  // Set the radius of the circle
  let radius = minDimension * 0.25;

  // Circle motion: rotating around the canvas center
  // x moves left and right with a fixed radius
  let x = cos(angle) * radius;

  // y moves up and down with a fixed radius
  let y = sin(angle) * radius;
  // Combining x and y creates a circular rotation around the canvas center

  // Draw the circle
  circle(x, y, radius * 0.75);
  
  
  // The angle controls the results of cos(angle) and sin(angle), increasing by 0.02 per frame to make the small circle rotate smoothly in a clockwise motion
  angle += 0.02;
}
