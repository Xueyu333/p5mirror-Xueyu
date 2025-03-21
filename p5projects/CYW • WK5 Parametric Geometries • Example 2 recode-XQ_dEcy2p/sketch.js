let t = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeWeight(3);

  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  background(0, 0, 180, 5);
  translate(width / 2, height / 2);


  let amplitude = min(windowWidth, windowHeight) / 4;

  let x1 = sin(t / 2) * amplitude;
  let y1 = cos(t / 12) * amplitude;

  let x2 = sin(t /2) * amplitude * 1.3;
  let y2 = cos(t / 12) * amplitude * 1.3;
  
  // let x3 = sin(t / 2) * -amplitude;
  // let y3 = cos(t / 12) * amplitude;

  // let x4 = sin(t /2) * -amplitude * 1.5;
  // let y4 = cos(t / 12) * amplitude * 1.5;



  // 对称的图形（-t反向运动）
  let x5 = sin(-t / 2) * amplitude;
  let y5 = cos(-t / 12) * -amplitude;
  let x6 = sin(-t / 2) * amplitude * 1.3;
  let y6 = cos(-t / 12) * -amplitude * 1.3;
  // let x7 = sin(-t / 2) * -amplitude;
  // let y7 = cos(-t / 12) * -amplitude;
  // let x8 = sin(-t / 2) * -amplitude * 1.5;
  // let y8 = cos(-t / 12) * -amplitude * 1.5;

  let hue = map(frameCount % 180, 0, 180, 180, 360);
  // let hue = frameCount % 360;
  stroke(hue, 100, 100);

  line(x1, y1, x2, y2);
  // line(x3, y3, x4, y4);


   line(x5, y5, x6, y6);
  //  line(x7, y7, x8, y8);
  fill(hue,100,100);  

  t += 0.1;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}

