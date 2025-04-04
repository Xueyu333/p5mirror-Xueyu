//reference：https://openprocessing.org/sketch/1396740
//each time the squares shrink, the webcam takes a snapshot. So, every time the image is pieced together, it looks different.

let video;
let capturedFrame;
let tiles = [];
let angle = 0;

let captureInterval = 2000; 
let lastCaptureTime = 0;
let prevSin = 0; 
let my = {};

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide(); 
  capturedFrame = createGraphics(width, height);
  
  imageMode(CENTER);
  background(0);
  

  captureVideoFrame();
  

  setTimeout(function() {
    makeTiles(9);
  }, 1000);
  
  
  setup_fullScreenButton();
}




function captureVideoFrame() {
  capturedFrame.image(video, 0, 0, width, height);
  lastCaptureTime = millis();
}

function makeTiles(num) {
  
  tiles = [];
  let id = 50;
  

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
  
  let currentSin = sin(frameCount / 100);
  
  if (currentSin < prevSin && prevSin > 0.9) {
    captureVideoFrame();//captures a new video frame.
    console.log("Captured new frame - tiles reached minimum size");
  }
  
  
  prevSin = currentSin;  
  
  
  translate(width / 2, height / 2);
  // rotate(angle);
  
 background(0, 0);
  
  

  for (let t of tiles) {
    t.update(); 
    t.show();
    // if (frameCount > t.id) t.move();
  }
}


class Tile {
  constructor(x, y, srcX, srcY, width, height, id) {
    this.pos = createVector(x, y);
    // this.target = createVector(x, y);
    this.srcX = srcX;
    this.srcY = srcY;
    this.width = width;
    this.height = height;
    this.a = 0;
    this.id = id;
    this.img = createGraphics(this.width, this.height);
  }
  
  
 
  update() {
 
    this.img.image(capturedFrame, 0, 0, this.width, this.height, this.srcX, this.srcY, this.width, this.height);
  }
  
  
  
  show() {
  push();
  translate(this.pos.x, this.pos.y);
  

  let freq = this.id * 0.01; 
  let amplitude = 0.5 + sin(frameCount * 0.02) * 0.3; 
  let waveOffset = sin(frameCount * 0.05 + freq) * amplitude * 10;
  translate(0, waveOffset);
  
  rotate(this.a);
  
 
  let scaleFactor = (-this.a + PI/2) / TWO_PI;
  scaleFactor = constrain(scaleFactor, 0.2, 1);
  
  scale(scaleFactor);
  image(this.img, 0, 0);
  
  pop();
  
  this.a = sin(this.id / 300 + frameCount / 100) * TWO_PI;
}
  
   

//   move() {
//     this.pos.lerp(this.target, 0.01);
//   }
}

// set up the full-screen button.
function setup_fullScreenButton() {
  my.fullScreenButton = createButton("Full Screen");
  my.fullScreenButton.position(10, 10);
  my.fullScreenButton.mousePressed(fullScreen_action);
  my.fullScreenButton.style("font-size:24px");
}

function fullScreen_action() {
  // my.fullScreenButton.remove();
    my.fullScreenButton.style("display", "none");
  fullscreen(1);
  let delay = 3000;
  setTimeout(ui_present_window, delay);
  
    // Add a event listener
  document.addEventListener('fullscreenchange', function() {
    if (!document.fullscreenElement) {
      // Show the button when exiting fullscreen
      my.fullScreenButton.style("display", "block");
    }
  });
}

function ui_present_window() {
  resizeCanvas(windowWidth, windowHeight);
  
  //Adjusts the video size.
  video.size(width, height);
  
  // Recreates the capture buffer.
  capturedFrame = createGraphics(width, height);
 
  captureVideoFrame();
  
  //Recreates the tile grid.
  makeTiles(9);
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);

  video.size(width, height);
 
  capturedFrame = createGraphics(width, height);
  
  captureVideoFrame();

  makeTiles(9);
}


  