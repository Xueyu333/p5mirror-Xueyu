
/*
Inspired by Frieder Nake's ER56 / 264 (1963) and Vera Molnár's Du Cycle: Segments et leurs Croisements No. 9 (1973)
*/
//declare variables
let startX;
let startY;
let endX;
let endY;

// Declare a seed variable for controlling random number generation
let seed = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //stroke color
  stroke(255);
  //stroke thickness
  strokeWeight(2);
   console.log("Width :" + width);
}

function draw() {
  background(0);
  
  //Use a seed value to ensure the same random results
  randomSeed(seed)
  
  //draw 100 times
  for (let i = 0; i < 10; i++) {
    
    //startX and startY are randomly generated as starting coordinates, ensuring they do not exceed the border of the canvas
    startX = random(20, width - 20);
    startY = random(20, height - 20);

    //if the random number less than 1
    if (random(10) < 1) {
      
      let amount = random(5, 20);// Randomly determine the line length (between 5 and 20 pixels)
      
      endX += amount; // Move endX further horizontally 
      endY = startY + amount;  // Set endY based on startY
      
    
      
    } else {
      let amount = random(5, 20);
      
      endY += amount; // Move endY further vertically
      endX = startX + amount; // Set endX based on startX
    }
    
      console.log("endX :" + endX);
      console.log("endY :" + endY);
    
    //draw the line
    line(startX, startY, endX, endY);
    console.log("distanceX :" + abs(startX-endX));
    
noLoop();
  }

}

function mousePressed() {
  
  // allows each mouse click to generate a new random pattern.
  seed = random(1000);
}
