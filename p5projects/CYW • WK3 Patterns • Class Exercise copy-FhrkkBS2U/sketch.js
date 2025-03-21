/*
Part 1
1. Do some debugging. Unscramble the code to create what you see on the screen. One thing at a time. Start with what you recognize.

2. (Extra) Add color in some way
*/

let total = 20;
let columnWidth;


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  // noFill();
  stroke(0);
  columnWidth = width / total;
  let colHeight = height / 3;
  strokeWeight(2);

  for (let counter = 0; counter < total; counter++) {
    let x = counter * columnWidth;
    let y = height / 4;
    
    fill(random(15,100));
    rect(x, y, columnWidth, colHeight);
  }
}
