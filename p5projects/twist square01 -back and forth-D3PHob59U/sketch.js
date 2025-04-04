let video;
let capturedFrame;
let tiles = [];
let angle = 0;
let av = 0;
let captureInterval = 3000; // 捕获间隔（毫秒）
let lastCaptureTime = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // 创建视频捕获
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide(); // 隐藏原始视频元素
  
  // 创建一个图像缓冲区用于存储捕获的画面
  capturedFrame = createGraphics(width, height);
  
  imageMode(CENTER);
  background(0);
  
  // 立即进行第一次捕获
  captureVideoFrame();
  
  // 等待视频初始化后创建拼贴
  setTimeout(makeTiles, 1000, 16);
}

function captureVideoFrame() {
  // 将当前视频帧复制到捕获缓冲区
  capturedFrame.image(video, 0, 0, width, height);
  lastCaptureTime = millis();
}

function makeTiles(num) {
  // 清除已存在的拼贴块
  tiles = [];
  
  let id = 30;
  for (let y = capturedFrame.height - capturedFrame.height / num; y >= 0; y -= capturedFrame.height / num) {
    for (let x = capturedFrame.width - capturedFrame.width / num; x >= 0; x -= capturedFrame.width / num) {
      let sx = -(capturedFrame.width / 2) + x + capturedFrame.width / (2 * num);
      let sy = -(capturedFrame.height / 2) + y + capturedFrame.height / (2 * num);
      let tileWidth = capturedFrame.width / num;
      let tileHeight = capturedFrame.height / num;
      
      tiles.push(new Tile(sx, sy, x, y, tileWidth, tileHeight, id));
      id += 1;
    }
  }
}

function draw() {
  // 检查是否需要更新捕获的帧
  if (millis() - lastCaptureTime > captureInterval) {
    captureVideoFrame();
    // 当捕获新帧时，可以选择是否重新打乱拼贴
    // 取消下面的注释可以在每次捕获新帧时自动打乱拼贴
    // scrambleTiles();
  }
  
  angle += av;
  av *= 0.9;
  angle *= 0.95;
  
  translate(width / 2, height / 2);
  rotate(angle);
  
  if (!keyIsDown(65)) background(0, 12);
  
  for (let t of tiles) {
    t.update(); // 更新拼贴块的内容
    t.show();
    if (frameCount > t.id) t.move();
  }
}

function keyPressed() {
  if (keyCode == 32) {  // 空格键
    background(0);
    captureVideoFrame(); // 按空格键时捕获新的画面
    scrambleTiles();     // 并打乱拼贴
  } else if (keyCode == 67) { // C键 - 仅捕获新画面而不打乱
    captureVideoFrame();
  }
}

function scrambleTiles() {
  for (let t of tiles) {
    t.pos.x = random(-width / 2, width / 2);
    t.pos.y = random(-height / 2, height / 2);
  }
  angle = 0;
  av = 0;
}

function mousePressed() {
  background(0);
  for (let t of tiles) {
    t.pos.x = mouseX - width/2;
    t.pos.y = mouseY - height/2;
  }
}



class Tile {
  constructor(x, y, srcX, srcY, width, height, id) {
    this.pos = createVector(x, y);
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
    // 从捕获的画面更新拼贴块
    this.img.image(capturedFrame, 0, 0, this.width, this.height, this.srcX, this.srcY, this.width, this.height);
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