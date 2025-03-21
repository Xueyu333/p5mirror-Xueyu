

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  noFill();
  
// set xstart posint random from 0-10
  let xstart = random(10);
  let ty = random(10);

  //translate the origin to the center of canvas
  translate(width / 2, height / 2);

 
  // loop through y positions from -height/8 to height/8, increasing by 3 each step
  for (let y = -height / 8; y <= height / 8; y += 9) {
    
    // increment ty to change the Perlin noise input for y-direction
    ty += 0.02;
    
     //set initial x-value for Perlin noise
    let tx = xstart;
    for (let x = -width / 8; x <= width / 8; x += 9) {
      
      // increment tx to change the Perlin noise input for x-direction
      tx += 0.02
      
      
    //generate a noise factor based on Perlin noise function;
      let noiseFactor = noise(tx, ty);
      
      
      
      // call function to draw circles at (x, y) with noise-based transformation
      drawCircle(x, y, noiseFactor);
    }
  }
}
  
function draw() {}// empty draw function since everything is drawn once in setup()

  
function drawCircle(newX, newY, newNoise) {
  push();
  // move the circle's position based on the noise factor
  translate(newX * newNoise * 7, newY * newNoise * 7);
  
   //draw a circle at the transformed position with a size based on noise
  circle(0, 0, newNoise * 10);
  pop();
}
  