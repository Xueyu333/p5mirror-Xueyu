let capture;
let captureWidth = 640;    
let captureHeight = 480;

let emotions = ["neutral", "happy", "sad", "angry", "fearful", "disgusted", "surprised"];

let faceapi;
let detections = [];

let numBlinds = 10; // 百叶窗数量
let rotations = Array(numBlinds).fill(0); // 记录每条百叶窗的旋转角度
let smileThreshold = 0.5; // 识别笑容的阈值
let animationSpeed = 3; // 旋转动画的速度

function setup() {
  createCanvas(captureWidth, captureHeight, WEBGL); // 开启3D模式
  
  capture = createCapture(VIDEO);
  capture.size(captureWidth, captureHeight);
  capture.hide();

  const faceOptions = {withLandmarks: true, withExpressions: true, withDescriptors: false};
  faceapi = ml5.faceApi(capture, faceOptions, faceReady);
}

function faceReady(){
  faceapi.detect(gotFaces);
}

function gotFaces(error, result){
  if (error){
    console.log(error);
    return;
  }
  detections = result;
  faceapi.detect(gotFaces);
}

function draw() {
  background(0);
  push();
  translate(-captureWidth / 2, -captureHeight / 2); // 调整视频对齐
  image(capture, 0, 0, captureWidth, captureHeight); // 显示摄像头视频
  pop();

  let smileValue = detections.length > 0 ? detections[0].expressions.happy : 0;

  // 控制百叶窗的旋转
  for (let i = 0; i < numBlinds; i++) {
    let targetRotation = smileValue > smileThreshold ? 90 : 0; // 目标角度
    let currentRotation = rotations[i];

    // 逐步增加/减少角度，模拟动画
    if (currentRotation < targetRotation) {
      rotations[i] = min(currentRotation + animationSpeed, targetRotation);
    } else if (currentRotation > targetRotation) {
      rotations[i] = max(currentRotation - animationSpeed, targetRotation);
    }
  }

  drawBlinds();
}

function drawBlinds() {
  let blindWidth = captureWidth / numBlinds; // 每条百叶窗的宽度

  for (let i = 0; i < numBlinds; i++) {
    let x = i * blindWidth - captureWidth / 2 + blindWidth / 2; // 计算 x 坐标
    let rotationAngle = radians(rotations[i]); // 角度转换为弧度

    push();
    translate(x, 0, 0); // 移动到适当位置（竖着排列）
    rotateY(rotationAngle); // 绕 Y 轴旋转

    fill(50); // 百叶窗颜色
    rect(-blindWidth / 2, -captureHeight / 2, blindWidth, captureHeight); // 竖向矩形
    pop();
  }

  
  
  
  
  
  
  
// function drawBlinds() {
//   let blindHeight = captureHeight / numBlinds;

//   for (let i = 0; i < numBlinds; i++) {
//     let y = i * blindHeight - captureHeight / 2 + blindHeight / 2; // 计算位置
//     let rotationAngle = radians(rotations[i]); // 角度转换为弧度

//     push();
//     translate(0, y, 0); // 移动到适当位置
//     rotateX(rotationAngle); // 旋转百叶窗

//     fill(255); // 百叶窗颜色
//     rect(-captureWidth / 2, -blindHeight / 2, captureWidth, blindHeight);
//     pop();
//   }
}
