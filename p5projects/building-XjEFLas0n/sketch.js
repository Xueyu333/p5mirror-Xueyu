let img;
let redOffset = 0;
let greenOffset = 0;
let blueOffset = 0;
let lastChangeTime = 0;

function preload() {
  img = loadImage(' building.JPG');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1); // Set pixel density
  imageMode(CENTER); // Center the image
  frameRate(1);

  img.loadPixels();
  redOffset = random(255);
  greenOffset = random(255);
  blueOffset = random(255);
  lastChangeTime = millis();
}

function draw() {
  background(0);

  // Change color offsets every 2 seconds
  if (millis() - lastChangeTime >= 2000) {
    redOffset = random(255);
    greenOffset = random(255);
    blueOffset = random(255);
    lastChangeTime = millis();
  }

  // Process pixels
  img.loadPixels();
  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      let index = (x + y * img.width) * 4;
      let r = img.pixels[index];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];

      img.pixels[index] = (r + redOffset) % 256;
      img.pixels[index + 1] = (g + greenOffset) % 256;
      img.pixels[index + 2] = (b + blueOffset) % 256;
    }
  }
  img.updatePixels();

  // Scale and center the image
  let scaleFactor = min(windowWidth / img.width, windowHeight / img.height);
  translate(windowWidth / 2, windowHeight / 2);
  image(img, 0, 0, img.width * scaleFactor, img.height * scaleFactor);

  if (millis() > 60000) {
    noLoop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
