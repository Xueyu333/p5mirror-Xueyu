//use more clear, descriptive variable and function names
//before
// let r=50;
// let x=25;
// let angle=0;

//after
let GRID_COUNT = 6;
let CELL_SIZE = 100;
let ROTATION_SPEED = 0.05;
let ARC_RADIUS = 50;
let ARC_OFFSET = 25;

// Colors
let topLeftColor, bottomRightColor;
let backColor1, backColor2;
let angle = 0;

function setup() {
  //before
  //   createCanvas(600, 600);
  //    topLeftColor = color(255, 0, 0);
  //    bottomRightColor = color(0, 0, 255);

  //   backColor1 = color (0, 0, 255);
  //   backColor2 = color (255, 0, 0);

  //after
  createCanvas(600, 600);
  initializeColors();
}

function initializeColors() {
  topLeftColor = color(255, 0, 0);
  bottomRightColor = color(0, 0, 255);
  backColor1 = color(0, 0, 255);
  backColor2 = color(255, 0, 0);
}

function draw() {
  //before
  //    for (let y = 0; y < height; y++) {
  //     let interFactor = y / height;
  //     let backgroundColor = lerpColor(backColor1, backColor2, interFactor);
  //     stroke(backgroundColor);
  //     fill(backgroundColor);
  //     rect(0, y, width, 1);
  //   }

  //   for (let i = 0; i < 6; i++) {
  //     for (let j = 0; j < 6; j++) {
  //       let offsetX = i * 100;
  //       let offsetY = j * 100;

  //         push();
  //       translate(offsetX + 50, offsetY + 50);
  //        rotate(angle);

  //       let interFactor = (i + j) / 10;
  //       let currentColor = lerpColor(topLeftColor, bottomRightColor, interFactor);

  //   fill(currentColor);
  //   arc(0, -25,  r,  r, PI*3/2, PI/2, CHORD);//top arc
  //   fill(currentColor);
  //   arc(25, 0,  r,  r, 0, PI, CHORD);// right arc
  //   fill(currentColor);
  //   arc(0, 25,  r,  r, PI/2, PI*3/2, CHORD);//bottom arc
  //   fill(currentColor);
  //   arc(-25, 0,  r,  r, PI, 0, CHORD);//left arc
  //   pop();
  //     }

  // }

  
  //after（split the code into smaller, focused functions that each handle one specific task）
  drawGradientBackground();
  drawFlowerGrid();
}

 //before
  //    for (let y = 0; y < height; y++) {
  //     let interFactor = y / height;
  //     let backgroundColor = lerpColor(backColor1, backColor2, interFactor);
  //     stroke(backgroundColor);
  //     fill(backgroundColor);
  //     rect(0, y, width, 1);
  //   }

//after：handles the background gradient
function drawGradientBackground() {
  for (let y = 0; y < height; y++) {
    let interFactor = y / height;
    let backgroundColor = lerpColor(backColor1, backColor2, interFactor);
    stroke(backgroundColor);
    fill(backgroundColor);
    rect(0, y, width, 1);
  }
}


//manages the grid of flowers
function drawFlowerGrid() {
  for (let i = 0; i < GRID_COUNT; i++) {
    for (let j = 0; j < GRID_COUNT; j++) {
      drawFlower(i, j);
    }
  }
}

//handles individual flower placement and transformation
function drawFlower(i, j) {
  let offsetX = i * CELL_SIZE + CELL_SIZE / 2;
  let offsetY = j * CELL_SIZE + CELL_SIZE / 2;
  let interFactor = (i + j) / 10;
  let currentColor = lerpColor(topLeftColor, bottomRightColor, interFactor);

  push();
  translate(offsetX, offsetY);
  rotate(angle);
  drawFlowerPetals(currentColor);
  pop();
}

//drawing the actual flower shape
function drawFlowerPetals(petalColor) {
  fill(petalColor);
  // Draw four arcs to create the flower pattern
  arc(0, -ARC_OFFSET, ARC_RADIUS, ARC_RADIUS, (PI * 3) / 2, PI / 2, CHORD); // top
  arc(ARC_OFFSET, 0, ARC_RADIUS, ARC_RADIUS, 0, PI, CHORD); // right
  arc(0, ARC_OFFSET, ARC_RADIUS, ARC_RADIUS, PI / 2, (PI * 3) / 2, CHORD); // bottom
  arc(-ARC_OFFSET, 0, ARC_RADIUS, ARC_RADIUS, PI, 0, CHORD); // left
}


//before
// function mouseMoved() {
//   angle += 0.05;
//   // redraw();
// }

//after
function mouseMoved() {
  angle += ROTATION_SPEED;
}
