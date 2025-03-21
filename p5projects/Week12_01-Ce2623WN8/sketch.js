let str = "I wish to wash my Irish wristwatch.";

let x = 0;
let y = 0;

function setup() {
  createCanvas(800, 800);
  textSize(30);
}

function draw() {
  if (frameCount % 30 == 1) {
    let character = str.charAt(random(floor(str.length)));
    text(character, random(width), random(height));
  }
}
