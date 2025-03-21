let startRadius = 50;
let radiusIncrement = 60;
let barWidth = 20;
let spacing = 10;
let seed = 100;
let t = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100);
}

function draw() {
  background(250);
  translate(width / 2, height / 2);

  let maxRadius = max(width, height) / 2;
  let numCircles = floor((maxRadius - startRadius) / radiusIncrement);

  for (let circle = 0; circle < numCircles; circle++) {
    let radius = startRadius + circle * radiusIncrement;
    let circumference = 2 * PI * radius;
    let barsPerCircle = floor(circumference / (barWidth + spacing));
 
    for (let i = 0; i < barsPerCircle; i++) {
      push();
      let angle = (360 / barsPerCircle) * i;
      
      // 为每个长方形设置不同的最小和最大长度
      let minLength = 10;
      let maxLength = min(80, radius); // 增加最大长度以产生更大的差异
      
      // 为每个长方形添加独特的噪声偏移
      let offset = i * 1000 + circle * 500; // 添加大的偏移值使每个长方形都不同
      let noiseVal = noise(offset * 0.01, t * 0.005);
      let barLength = map(noiseVal, 0, 1, minLength, maxLength);

      rotate(angle);
      translate(radius, 0);
      
      let hue = map(radius, startRadius, maxRadius, 0, 200);
      fill(hue, 80, 90);
      
      noStroke();
      rectMode(CENTER);
      rect(0, 0, barLength, barWidth);
      pop();
    }
  }
  
  t += 0.5; // 降低动画速度
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  seed = random(50000);
}