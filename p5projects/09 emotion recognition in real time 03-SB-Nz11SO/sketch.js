let capture;         // 用于笑容识别的摄像头
let backgroundImg;   // 背景图片
let captureWidth = 640;
let captureHeight = 480;
let faceapi;
let detections = [];
let numBlinds = 10;
let scales = Array(numBlinds).fill(1);
let smileThreshold = 0.5;
let animationSpeed = 0.1;

function preload() {
  // 预加载背景图片
  backgroundImg = loadImage('sky.jpg');
}

function setup() {
  createCanvas(captureWidth, captureHeight, WEBGL);
  
  // 创建摄像头捕获（仅用于识别，不显示）
  capture = createCapture(VIDEO);
  capture.size(captureWidth, captureHeight);
  capture.hide();
  
  // 设置人脸识别
  const faceOptions = { 
    withLandmarks: true, 
    withExpressions: true, 
    withDescriptors: false 
  };
  
  // 使用摄像头进行人脸识别
  faceapi = ml5.faceApi(capture, faceOptions, faceReady);
}

function faceReady() {
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
  
  // 绘制背景图片
  push();
  translate(-captureWidth/2, -captureHeight/2);
  image(backgroundImg, 0, 0, captureWidth, captureHeight);
  pop();
  
  // 获取笑容值并控制百叶窗
  let smileValue = detections.length > 0 ? detections[0].expressions.happy : 0;
  let targetScale = smileValue > smileThreshold ? 0 : 1;
  
  // 更新百叶窗缩放值
  for (let i = 0; i < numBlinds; i++) {
    scales[i] = lerp(scales[i], targetScale, animationSpeed);
  }
  
  // 绘制百叶窗
  drawBlinds();
}

function drawBlinds() {
  let blindWidth = captureWidth / numBlinds;
  
  for (let i = 0; i < numBlinds; i++) {
    let x = i * blindWidth - captureWidth/2 + blindWidth/2;
    let scaleFactor = scales[i];
    
    if (scaleFactor < 0.01) continue;
    
    push();
    translate(x, 0, 0);
    scale(scaleFactor, 1, 1);
    fill(50);
    // noStroke();
    rect(-blindWidth/2, -captureHeight/2, blindWidth, captureHeight);
    pop();
  }
}