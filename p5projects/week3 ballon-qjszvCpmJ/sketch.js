let capture;
let capturewidth = 800;    
let captureheight = 800;
let faceapi;// Face detection using ml5.js face-api
let detections = [];// Store detected faces and their expressions
let balloon;
let balloonSize = 100;// Initial size of the balloon


// Constants for balloon behavior
const MIN_SIZE = 50;      // Minimum balloon size
const MAX_SIZE = 200;     // Maximum balloon size
const GROWTH_RATE = 2;    // Rate at which the balloon inflates
const SHRINK_RATE = 1;    // Rate at which the balloon deflates
const BASE_SIZE = 350;    // Size of the base supporting the balloon


function setup() {
  // Create a canvas with WebGL rendering mode
  createCanvas(capturewidth, captureheight, WEBGL);
  
   // Initialize webcam capture
  capture = createCapture(VIDEO);
  capture.size(capturewidth, captureheight);
  capture.hide();
  
  
    // Set up face detection options
  const faceOptions = {
     withLandmarks: true,  // Enable facial landmarks detection
    withExpressions: true, // Enable facial expression recognition
    withDescriptors: false // Disable face descriptors (not needed here)
  };
  
  
    // Initialize face-api with the webcam video
  faceapi = ml5.faceApi(capture, faceOptions, faceReady);
  
  
  // Initialize balloon properties
  balloon = {
   size: balloonSize,           // Initial size
    rotation: 0,                 // Rotation angle for oscillation
    oscillationSpeed: 0.02,      // Speed of side-to-side movement
    oscillationRange: PI / 4     // Maximum rotation angle
  };
}

// Callback when face-api is ready
function faceReady() {
  // Start detecting faces
  faceapi.detect(gotFaces);
}

function gotFaces(error, result) {
  if (error) {
    console.log(error);
    return;
  }
  detections = result;
  faceapi.detect(gotFaces);
}

function draw() {
  background(0);
  
  // 检测笑容
  let isSmiling = false;
  if (detections.length > 0) {
    let happyLevel = detections[0].expressions.happy; // Get smile intensity
    isSmiling = happyLevel > 0.5; // Consider smiling if happiness is above 0.5
  }
  
   // Adjust balloon size based on smile detection
  // 更新气球大小
  if (isSmiling) {
    balloon.size = min(balloon.size + GROWTH_RATE, MAX_SIZE); //Inflate
  } else {
    balloon.size = max(balloon.size - SHRINK_RATE, MIN_SIZE);//Deflate
  }
  
  // Make the balloon oscillate left and right
  // 左右振荡运动 
  balloon.rotation = sin(frameCount * balloon.oscillationSpeed) * balloon.oscillationRange;
  
  // 设置基础光照
  ambientLight(100);
  pointLight(255, 255, 255, 0, 0, 500);
  
  // 移动到场景位置
  push();
  translate(0, height/4, -200);
  
  // 绘制固定的支撑架
  push();
  noStroke();
  fill(80);
  // 向下移动半个正方体的高度，使其从顶部开始绘制
  translate(0, BASE_SIZE/2, 0);
  box(BASE_SIZE);
  pop();
  
  
  // Check if webcam is ready
  if (capture.loadedmetadata) {
    // 绘制旋转的气球
    push();
    rotateY(balloon.rotation);// Rotate the balloon left and right
    rotateY(PI); // Flip it to align correctly
    
    // 第一层：带视频纹理的球体
    // First layer: Balloon with webcam video texture
    push();
    noStroke();
    texture(capture);
    translate(0, -balloon.size, 0);
    sphere(balloon.size, 128, 128);
    pop();
    
  
  }
  
  pop();
  
//   // 显示调试信息
//   push();
//   translate(-width/2, -height/2, 0);
//   fill(255);
//   noStroke();
//   if (detections.length > 0) {
//     let happyLevel = detections[0].expressions.happy;
//     text("Smile Level: " + nf(happyLevel, 1, 2), 20, 30);
//     text("Balloon Size: " + int(balloon.size), 20, 50);
//   }
//   pop();
}

function windowResized() {
  resizeCanvas(capturewidth, captureheight);
}