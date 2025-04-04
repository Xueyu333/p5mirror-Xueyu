
let video;

//declares a variable capturedFrame to store the captured video frame as a graphics buffer.
let capturedFrame;

//initializes an empty array tiles to store all tile objects.
let tiles = [];
let angle = 0;

//(angular velocity) control rotation speed.
let av = 0;
let captureInterval = 2000; 
let lastCaptureTime = 0;//store the timestamp of the last frame capture.
let prevSin = 0; //store the previous sine value, used to detect wave trend changes.

// Declares an empty object my to store UI elements.
let my = {};

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  
  // Initializes video capture, capturing video from the user's webcam.
  video = createCapture(VIDEO);
  
  // Sets the video size to match the canvas dimensions.
  video.size(width, height);
  video.hide(); 
  
  // Creates a graphics buffer with the same dimensions as the canvas for storing captured video frames.
  capturedFrame = createGraphics(width, height);
  
  imageMode(CENTER);
  background(0);
  
  // Calls the function to immediately capture the current video frame.
  captureVideoFrame();
  
 // Wait for the video to initialize and then create the 9x9 tiles
  setTimeout(function() {
    makeTiles(9);
    
    // scrambles tiles
    // scrambleTiles();
  }, 1000);//This delay ensures the video is initialized.
  
  // Sets up the full-screen button.
  setup_fullScreenButton();
}



// Defines the captureVideoFrame function for capturing video frames.
function captureVideoFrame() {
  
  // Copies the current video frame to the capturedFrame graphics buffer.
  capturedFrame.image(video, 0, 0, width, height);
  
  // Records the current timestamp as the last capture time.
  lastCaptureTime = millis();
}

function makeTiles(num) {
  
  
  // Clears the tiles array to prepare for creating new tiles.
  tiles = [];
  
  let id = 50;
  
  
  // Outer loop to iterate through rows from bottom to top.
  for (let y = capturedFrame.height - capturedFrame.height / num; y >= 0; y -= capturedFrame.height / num) {
    
    // Inner loop to iterate through columns from right to left.
    for (let x = capturedFrame.width - capturedFrame.width / num; x >= 0; x -= capturedFrame.width / num) {
      
      
      // Calculates the x-coordinate of the tile on the canvas (relative to the canvas center).
      let sx = -(capturedFrame.width / 2) + x + capturedFrame.width / (2 * num);
      let sy = -(capturedFrame.height / 2) + y + capturedFrame.height / (2 * num);
      let tileWidth = capturedFrame.width / num;
      let tileHeight = capturedFrame.height / num;
      
      // Creates a new Tile object and adds it to the tiles array.
      tiles.push(new Tile(sx, sy, x, y, tileWidth, tileHeight, id));
      id += 1;
    }
  }
}

function draw() {
  // Calculates the current sine value based on the frame count, used for creating wave effects.
  let currentSin = sin(frameCount / 100);
  
// Checks if the sine wave has just reached its peak and is starting to descend.
  if (currentSin < prevSin && prevSin > 0.9) {
    captureVideoFrame();//captures a new video frame.
    console.log("Captured new frame - tiles reached minimum size");
  }
  
  // Saves the current sine value for comparison in the next frame.
  prevSin = currentSin;
  
  angle += av;//Updates the rotation angle based on the angular velocity.
  av *= 0.9;//Reduces the angular velocity by 10% each frame (creates a damping effect).
  angle *= 0.95;//Reduces the angle by 5% each frame (creates a damping effect).
  
  translate(width / 2, height / 2);
  rotate(angle);
  
  if (!keyIsDown(65)) background(0, 0);
  
  
  //Iterates through all tile objects.
  for (let t of tiles) {
    
    //Updates the tile's content 
    t.update(); 
    t.show();
    //If the current frame count exceeds the tile's ID, moves the tile (creates a sequential movement effect).
    if (frameCount > t.id) t.move();
  }
}

function keyPressed() {
  if (keyCode == 32) { //If the spacebar (ASCII code 32) is pressed.
    background(0);
    captureVideoFrame(); 
    scrambleTiles();    
  }
}

function scrambleTiles() {
  for (let t of tiles) {
    //Assigns a random x-coordinate to the tile.
    t.pos.x = random(-width / 2, width / 2);
    t.pos.y = random(-height / 2, height / 2);
  }
  angle = 0;
  av = 0;
}

//Defines the Tile class to represent a single tile.
class Tile {
  constructor(x, y, srcX, srcY, width, height, id) {
    this.pos = createVector(x, y);//Creates a position vector representing the tile's current position.
    this.target = createVector(x, y);//Creates a target vector representing the tile's destination position.
    this.srcX = srcX;//The x-coordinate in the original video frame.
    this.srcY = srcY;
    this.width = width;//The tile width.
    this.height = height;
    this.a = 0;
    this.id = id;
    this.img = createGraphics(this.width, this.height);
  }
  
  
  // refresh the tile's content.
  update() {
    //Copies the corresponding region from the captured video frame to the tile's graphics buffer.
    this.img.image(capturedFrame, 0, 0, this.width, this.height, this.srcX, this.srcY, this.width, this.height);
  }
  
  show() {
  push();
  translate(this.pos.x, this.pos.y);
  
//Calculates the frequency based on the tile's ID (each tile has a different frequency).
  let freq = this.id * 0.01; 
    
  //Calculates the amplitude that varies over time (between 0.2 and 0.8).
  let amplitude = 0.5 + sin(frameCount * 0.02) * 0.3; 
  
 //Calculates the wave offset based on time, frequency, and amplitude.
  let waveOffset = sin(frameCount * 0.05 + freq) * amplitude * 10;
  translate(0, waveOffset);
  
  rotate(this.a);
  
  //Calculates the scale factor based on the rotation angle.
  let scaleFactor = (-this.a + PI/2) / TWO_PI;
    
  //Constrains the scale factor between 0.2 and 1.
  scaleFactor = constrain(scaleFactor, 0.2, 1);
  
  scale(scaleFactor);
  
  //Draws the tile's image.
  image(this.img, 0, 0);
  
  pop();
  
  //Updates the tile's rotation angle based on its ID and time, creating periodic rotation.
  this.a = sin(this.id / 300 + frameCount / 100) * TWO_PI;
}
  
  
  
  //Uses linear interpolation (lerp) to smoothly move the current position 1% toward the target position, creating an easing effect.
  move() {
    this.pos.lerp(this.target, 0.01);
  }
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


  
//   show() {
//     push();
//     translate(this.pos.x, this.pos.y);
//     rotate(this.a);
    
//     // 关键修改：反转缩放逻辑
//     // 原来是 this.a 为正（逆时针旋转）时放大，为负（顺时针旋转）时缩小
//     // 现在我们要相反：this.a 为正时缩小，为负时放大
    
//     // 使用 -this.a 来反转缩放与旋转的关系
//     // 添加一个小的偏移确保不会缩放到0（完全消失）
//     let scaleFactor = (-this.a + PI/2) / TWO_PI;
    
//     // 确保缩放因子在合理范围内
//     scaleFactor = constrain(scaleFactor, 0.2, 1);
    
//     scale(scaleFactor);
//     image(this.img, 0, 0);
//     pop();
    
//     // 保持原来的旋转计算不变
//     this.a = sin(this.id / 300 + frameCount / 100) * TWO_PI;
//   }
  