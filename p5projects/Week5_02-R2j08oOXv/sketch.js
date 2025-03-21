function setup() {
  // Create drawing canvas
  createCanvas(400, 400);

  // Dark gray background
  background(120);
  face(200,200,150,200);
  eyes(150,150,70,40);
  eyes(250,150,40,60);
  pupils(170, 150, 20, 20);
  pupils(270, 150, 10, 10);
  eyebrowsWeight(40);
  eyebrows(130, 110, 170, 120);       
  eyebrows(230, 105, 270, 100);
  Antenna(200, 125, 200, 50);
  mouth(200, 250, 50, 20);
  arms(150, 350, 300, 300);
  body(150, 275, 100, 200);
}

function face(x,y,diameter1,diameter2,) {
  // Purple face
  fill(127, 0, 127);
  ellipse(x, y, diameter1, diameter2);
}

function eyes(x,y,diameter1,diameter2) {
  // Green eyes
  fill(0, 200, 127);
  ellipse(x, y,diameter1, diameter2);
}

function pupils(x,y,diameter1,diameter2){
  // Black pupils
  fill(0);
  ellipse(x,y,diameter1,diameter2);
 
}
function eyebrowsWeight(weight){
  strokeWeight(weight);
}
function eyebrows(x,y,x1,y1) {
  // Orange eyebrows
  stroke(255, 100, 100);
  
  line(x,y,x1,y1);
  
}

function Antenna(x,y,x1,y1) {
  // Antenna
  stroke(255);
  strokeWeight(5);
  line(x,y,x1,y1);

  // No fill
  noFill();
  ellipse(200, 40, 20, 20);
}

function mouth(x,y,x1,y1) {
  // No stroke
  noStroke();
  // Pink mouth
  fill(255, 0, 127);
  ellipse(x,y,x1,y1);
}

function arms(x,y,x1,y1) {
  // Black arms
  stroke(0);
  strokeWeight(30);
  line(x,y,x1,y1);
}

function body(x,y,rectWidth,rectHeight) {
  // No stroke
  noStroke();

  // Yellow body
  fill(255, 255, 0);
  rect(x,y,rectWidth,rectHeight);
}
