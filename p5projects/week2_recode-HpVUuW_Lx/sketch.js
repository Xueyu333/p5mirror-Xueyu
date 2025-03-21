let inc = 0.01;
let start = 0;
let colorStart = 100;// Initial offset for the wave colors
let bgColorStart = 3000; // Initial offset for the background colors

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  // Draw background
  noStroke();
  for (let x = 0; x < width; x++) {
    
   // Hue changes from right to left with noise variation
    let hue = ((width - x) / width * 180) + noise(bgColorStart) * 180;//max360
    let saturation = 30+noise(bgColorStart + 5) * 70;//max 100
    let brightness = 60+noise(bgColorStart + 10) * 40;//max100
    
    fill(hue, saturation, brightness);
    
   // Draw a vertical line at x to form the gradient
    rect(x, 0, 1, height);
  }
  
  // Draw wave
  noStroke();
  let xoff = start;// Start Perlin noise offset for the wave
  
  
  for (let x = 0; x < width; x++) {
    let hue =(x / width * 180)+ noise(colorStart) * 180;//max360
    let saturation = 60 + noise(colorStart + 5) * 40;//max 100
    let brightness = 70 + noise(colorStart + 10) * 30;//max 100
    
    fill(hue, saturation, brightness, 80);
    
    beginShape();
    let y = noise(xoff) * height;//Calculate the y position of the wave using noise
    vertex(x, height);
    vertex(x, y);
    vertex(x+1, y);
    vertex(x+1, height);
    endShape(CLOSE);
    
    xoff += inc;// Increment the Perlin noise offset for the next point
  }
  
  start += inc;// Move the wave offset for continuous animation
  colorStart += inc * 0.3;// Slowly change the wave colors
  bgColorStart += inc * 0.5; // Slowly change the background gradient colors
}