let capture;
let capturewidth = 640;    
let captureheight = 480;

let faceapi;
let detections = [];

let happyThreshold = 0.6; // 设定笑容阈值
let smileCounter = 0;     // 计数器
let smileCounterLimit = 10; // 连续检测 10 次以上才确认
let isSmiling = false;     // 当前状态

function setup() {
  createCanvas(capturewidth, captureheight);
  
  capture = createCapture(VIDEO);
  capture.size(capturewidth, captureheight);
  capture.hide();
  
  const faceOptions = { withLandmarks: true, withExpressions: true, withDescriptors: false };
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
  faceapi.detect(gotFaces); // 持续检测
}

function draw() {
  background(0);

  // 🔥 把视频画出来
  image(capture, 0, 0, width, height);

  if (detections.length > 0) {
    let happyLevel = detections[0].expressions.happy;

    // 🔥 根据 happy 值变颜色
    if (happyLevel > happyThreshold) {
      fill(255, 0, 0); // 红色
    } else {
      fill(255); // 白色
    }
    textSize(24);
    text("Happy: " + nf(happyLevel, 1, 2), 20, 40);

    // 笑容检测逻辑
    if (happyLevel > happyThreshold) {
      smileCounter++;
      smileCounter = constrain(smileCounter, 0, 20);
    } else {
      smileCounter--;
      smileCounter = constrain(smileCounter, 0, 20);
    }

    if (smileCounter > smileCounterLimit && !isSmiling) {
      console.log("SMILE DETECTED: OPEN PAPER");
      isSmiling = true;
     
    }

    if (smileCounter == 0 && isSmiling) {
      console.log("NO SMILE DETECTED: CLOSE PAPER");
      isSmiling = false;
     
    }
  }
}

