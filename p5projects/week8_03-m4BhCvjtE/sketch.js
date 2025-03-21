let video;
let vScale = 20;

function setup() {
  createCanvas(640, 480);
  pixelDensity(1);

  colorMode(HSB);

  video = createCapture(VIDEO);
  video.size(width / vScale, height / vScale);
}

function draw() {
  background(0);

  video.loadPixels();

  for (let y = 0; y < video.height; y++) {
    for (let x = 0; x < video.width; x++) {
      let i = (x + y * video.width) * 4;

      let r = video.pixels[i];
      let g = video.pixels[i + 1];
      let b = video.pixels[i + 2];

      let c = color(r, g, b);
      let brightValue = brightness(c);

      let colorValue = brightValue > 50 ? 255 : 0;

      fill(colorValue);
      noStroke();
      rect(x * vScale, y * vScale, vScale, vScale);
    }
  }
}
