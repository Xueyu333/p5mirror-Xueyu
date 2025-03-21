/*
Inspired by Vera Molnár's Dispersion and simliar works
*/

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  stroke(0);
  strokeWeight(2);
}

function draw() {
  background(255);

  //Set the columnWidth, take smallest value 
  let columnWidth = min(width / 20, height / 20);
  let rowHeight = height / 3;// Set the row height to 1/3 of the screen height

  for (let x = 0; x < width; x+= columnWidth) {
    for (let y = 0; y < height; y+= rowHeight) {
      
      y += 20 + random(-20, 20);// Add a random offset to y, making the grid arrangement less uniform
      
     //distance between y1 and y2: rowHeight + 20 + random(-20, 20)
      
      rect(x, y, columnWidth * 0.1, rowHeight * 0.1);    // Draw a rectangle with 70% of the column width and 80% of the row height
      
      
       
    }
  }
  
  
  
 noLoop();
}

function mousePressed() {
  loop();// When the mouse is pressed, restart draw() to generate a new random layout
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
