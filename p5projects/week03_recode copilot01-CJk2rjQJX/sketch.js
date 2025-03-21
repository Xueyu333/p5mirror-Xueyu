let startRadius = 50;
let radiusIncrement = 60; // each circle is 60 pixels larger than the previous circle.
let barWidth = 20; // rectangle width
let spacing = 10; // the rectangles are spaced 10 pixels apart
let seed = 100;
let t = 0; // 添加时间变量

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100); 
}

function draw() {
  background(250);
  randomSeed(seed);
  translate(width / 2, height / 2);

  // caculate how many circles can fill the canvas
  let maxRadius = max(width, height) / 2;
  let numCircles = floor((maxRadius - startRadius) / radiusIncrement);

  //loop：draw each circle
  for (let circle = 0; circle < numCircles; circle++) {
    let radius = startRadius + circle * radiusIncrement;

    // Calculate the circumference of the current circle
    let circumference = 2 * PI * radius;
    
    // Calculate how many rectangles can fit in this circle
    let barsPerCircle = floor(circumference / (barWidth + spacing));
 
    // draw rectangle
    for (let i = 0; i < barsPerCircle; i++) {
      
      push();
      // Calculate the angle of each rectangle
      let angle = (360 / barsPerCircle) * i;

      let minLength = 20; // minimum length of rectangle
      let maxLength = min(40, radius); // maximum length of rectangle
      let noiseVal = noise(circle * 0.5, i * 0.1, t * 0.005);
      let barLength = map(noiseVal, 0, 1, minLength, maxLength);
      // generate random length

      // rotate and move to the correct position
      rotate(angle);
      translate(radius, 0);
      
      let hue = map(radius, startRadius, maxRadius, 0, 200);
      fill(hue, 80, 90);
      
       // fill(random(100,250), 80, 90);  

      //draw rectangle
    
      noStroke();
      rectMode(CENTER);
      rect(0, 0, barLength, barWidth);

      pop();
    }
  }
  
  t++; // 更新时间变量
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  seed = random(50000);
}
