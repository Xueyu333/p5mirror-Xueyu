/*
Inspired by George Nees' Micro-Innovation Series (1966)
*/

//Declare variables(rectabgle's position, width,height)
let x;
let y;
let w;
let h;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  noFill();
  stroke(255);
  strokeWeight(2);
}

function draw() {
  background(0);

  for (let i = 0; i < 400; i++) {
    //if the random number(0-10) less than 8: width (5-25) < height (50-150)
    //if the random number(0-10) greater than 8:width (50-150) < height(5-25)
    if (random(10) < 8) {
      w = random(5, 25);
      h = random(50, 150);
    } else {
      w = random(50, 150);
      h = random(5, 25);
    }
    
    console.log("random value " + i + ": " + random(10));

    //Set rectangle position within the canvas, ensuring it stays within bounds
    x = random(w, width - w);
    y = random(h, height - h);
    
    //draw rectangles
    rect(x, y, w, h);
  }
  
  //draw only once
  noLoop();
}

//// When the mouse is pressed, re-run the draw() function to generate new rectangles
function mousePressed() {
  loop();
}