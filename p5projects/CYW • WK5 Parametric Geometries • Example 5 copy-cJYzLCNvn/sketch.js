/*
Based on the lissajous curve example from Code as a Creative Medium
https://github.com/CodeAsCreativeMedium/exercises/blob/main/09_curves/06_lissajous/lissajous_js/lissajous_js.js

Lissajous curve:
https://en.wikipedia.org/wiki/Lissajous_curve
*/

let t = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  stroke(255);
  strokeWeight(8);
}

function draw() {
  background(0, 5);

  let minDimension = min(width, height);
  let radius = (minDimension * 3) / 8;


  x = cos((5 * t) / 10) * radius + width / 2;
  y = sin((10 * t) / 10) * radius + height / 2;


  point(x, y);

  t += 0.1;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}
