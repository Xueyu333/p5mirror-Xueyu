let video;
let tiles = [];
let angle = 0;
let av = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Create video capture
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide(); // Hide the original video element
  
  imageMode(CENTER);
  background(0);
  
  // Wait a bit for video to initialize before making tiles
  setTimeout(makeTiles, 1000, 16);
}

function makeTiles(num) {
  // Clear any existing tiles
  tiles = [];
  
  let id = 30;
  for (let y = video.height - video.height / num; y >= 0; y -= video.height / num) {
    for (let x = video.width - video.width / num; x >= 0; x -= video.width / num) {
      let sx = -(video.width / 2) + x + video.width / (2 * num);
      let sy = -(video.height / 2) + y + video.height / (2 * num);
      let tileWidth = video.width / num;
      let tileHeight = video.height / num;
      
      tiles.push(new Tile(sx, sy, x, y, tileWidth, tileHeight, id));
      id += 1;
    }
  }
}

function draw() {
  angle += av;
  av *= 0.9;
  angle *= 0.95;
  
  translate(width / 2, height / 2);
  rotate(angle);
  
  if (!keyIsDown(65)) background(0, 12);
  
  for (let t of tiles) {
    t.update(); // Update the tile's video frame
    t.show();
    if (frameCount > t.id) t.move();
  }
  
  checkKeys();
}

function mousePressed() {
  background(0);
  for (let t of tiles) {
    t.pos.x = mouseX - width/2;
    t.pos.y = mouseY - height/2;
  }
}

function keyPressed() {
  if (keyCode == 32) {
    background(0);
    for (let t of tiles) {
      t.pos.x = random(-width / 2, width / 2);
      t.pos.y = random(-height / 2, height / 2);
      angle = 0;
      av = 0;
    }
  }
}

function checkKeys() {
  if (keyIsDown(RIGHT_ARROW)) {
    for (let t of tiles) {
      t.target.x += 20;
    }
  }
  if (keyIsDown(LEFT_ARROW)) {
    for (let t of tiles) {
      t.target.x -= 20;
    }
  }
  if (keyIsDown(UP_ARROW)) {
    av += 0.01;
  }
  if (keyIsDown(DOWN_ARROW)) {
    av -= 0.01;
  }
}

class Tile {
  constructor(x, y, srcX, srcY, width, height, id) {
    this.pos = createVector(random(-width/2, width/2), random(-height/2, height/2));
    this.target = createVector(x, y);
    this.srcX = srcX;
    this.srcY = srcY;
    this.width = width;
    this.height = height;
    this.a = 0;
    this.id = id;
    this.img = createGraphics(this.width, this.height);
  }
  
  update() {
    // Update the tile's image with the current video frame
    this.img.image(video, 0, 0, this.width, this.height, this.srcX, this.srcY, this.width, this.height);
  }
  
  show() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.a);
    scale(this.a / TWO_PI);
    image(this.img, 0, 0);
    pop();
    this.a = sin(this.id / 300 + frameCount / 100) * TWO_PI;
  }
  
  move() {
    this.pos.lerp(this.target, 0.01);
  }
}