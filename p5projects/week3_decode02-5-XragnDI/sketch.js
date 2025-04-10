/*
Inspired by Zdeněk Sýkora's Red-Green Structure 1, 1968, and based onb2renger's offscreen graphics 6:
https://b2renger.github.io/p5js_patterns/pg_6/
*/

//declare variables
let cellSize;
let pg;
let seed = 100;


function setup() {
  createCanvas(windowWidth, windowHeight);
  //set the imagemode to center(draw from center point)
  imageMode(CENTER);
  
  //Generate the tile design
  makeTileDesign();
}

function draw() {
  background(255);
  randomSeed(seed);
  
   //loop through the canvas to place the tile pattern in a grid
  
  for (let x = cellSize/2; x <= width; x += cellSize) {
    for (let y = cellSize/2; y <= height; y += cellSize) {
      push();
      translate(x, y);
      let angle = (TWO_PI * round(random(1, 5))) / 4;
      rotate(angle); //rotate the tile by the chosen angle
      // draw the off-screen pixel graphics onto the canvas
      // just like an image file
      image(pg, 0, 0);
      pop();
    }
  }
}

function makeTileDesign() {
  cellSize = min(width / 5, height / 5);
  
  // create an extra buffer of pixels "off screen"
  // on which to draw shapes (just like drawing on the canvas)
  // it needs a width and height (just like the canvas)
  pg = createGraphics(cellSize, cellSize);
  // draw a shape on it
  pg.noFill(0);
  pg.strokeWeight(2)
  pg.square(0, 0, cellSize);
  // draw another shape on it
  pg.fill(0);
  pg.circle(0, pg.height / 2, pg.width);

}

function mousePressed() {
  seed = random(50000);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  makeTileDesign();
}