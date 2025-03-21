/*
Adapted from source:
Aesthetic Programming by Winnie Soon & Geoff Cox
https://www.aesthetic-programming.net/pages/3-infinite-loops.html#setup-70191

LICENSE
[Aesthetic Programming] is an open access book, licensed under the Creative Commons Attribution By Attribution Share Alike License. Under this license, authors allow anyone to download, reuse, reprint, modify, distribute, and/or copy their work so long as the authors and source are cited and resulting derivative works are licensed under the same or similar license. No permission is required from the authors or the publisher. Statutory fair use and other rights are in no way affected by the above. Read more about the license at https://creativecommons.org/licenses/by-sa/4.0/

See Creative Commons License and MIT License here: https://creativecommons.org/licenses/by/4.0/ and https://opensource.org/licenses/MIT
*/

// Set the total number of circle positions (9 fixed positions)
let totalPositions = 9;

// Set the step for the first position to 0
let positionStep = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Set angleMode to use degrees
  angleMode(DEGREES);
  fill(255);
  noStroke();
}

function draw() {
  // Apply a black background with 5 transparency, continuously layering over the previous frame
  background(255, 165, 0, 5);

  // Move the origin to the center of the canvas
  translate(width / 2, height / 2);

  // Calculate the current rotation angle: 360 / totalPositions gives the angle step between each position, and positionStep tracks which position to rotate to
  let angle = (360 / totalPositions) * positionStep;

  // Rotate the entire coordinate system to place the circle at the corresponding angle around the canvas center
  rotate(angle);

  let minDimension = min(width, height);

  // Set the circle diameter
  let diam = minDimension * 0.05;

  // The center point of the drawn circle is offset from the origin. Since rotate(angle) affects the coordinate system, the circle will rotate to different fixed positions around the center

  circle(100, 0, diam);

  // Execute once every 30 frames
  if (frameCount % 30 === 0) {
    // Increment positionStep to move the circle to the next position
    positionStep++;

    // When positionStep reaches 9, reset it to 0 to create an infinite loop animation
    if (positionStep >= totalPositions) {
      positionStep = 0;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}
