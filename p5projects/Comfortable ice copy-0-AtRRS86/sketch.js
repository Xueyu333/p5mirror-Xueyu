// WebSerial变量
let port;
let writer;
let reader;
let isConnected = false;

// 摄像头和人脸识别变量
let capture;
let capturewidth = 640;    
let captureheight = 480;
let faceapi;
let detections = [];
let happyThreshold = 0.6; // 设定笑容阈值
let smileCounter = 0;     // 计数器
let smileCounterLimit = 10; // 连续检测10次以上才确认
let isSmiling = false;     // 当前状态
let lastCommand = ""; // 记录上一次发送的命令

// 等待DOM加载完成后添加事件监听
document.addEventListener('DOMContentLoaded', function() {
  // 连接按钮事件监听
  document.getElementById('connectButton').addEventListener('click', connectArduino);
});

// 连接Arduino函数
async function connectArduino() {
  try {
    // 请求串口并打开
    port = await navigator.serial.requestPort();
    await port.open({ baudRate: 9600 });
    
    // 设置写入器
    const textEncoder = new TextEncoder();
    writer = port.writable.getWriter();
    
    // 更新连接状态
    isConnected = true;
    document.getElementById('connectionStatus').textContent = '已连接';
    document.getElementById('connectButton').textContent = '断开连接';
    document.getElementById('connectButton').removeEventListener('click', connectArduino);
    document.getElementById('connectButton').addEventListener('click', disconnectArduino);
    
    console.log('Arduino连接成功');
  } catch (error) {
    console.error('Arduino连接失败:', error);
  }
}

// 断开连接函数
async function disconnectArduino() {
  if (writer) {
    writer.releaseLock();
  }
  if (port) {
    await port.close();
  }
  
  isConnected = false;
  document.getElementById('connectionStatus').textContent = '未连接';
  document.getElementById('connectButton').textContent = '连接Arduino';
  document.getElementById('connectButton').removeEventListener('click', disconnectArduino);
  document.getElementById('connectButton').addEventListener('click', connectArduino);
  
  console.log('Arduino已断开连接');
}

// 向Arduino发送命令
async function sendCommand(command) {
  // 避免重复发送相同命令
  if (command === lastCommand) {
    return;
  }
  
  if (isConnected && writer) {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(command + '\n'); // 添加换行符
      await writer.write(data);
      lastCommand = command;
      console.log('发送命令:', command);
    } catch (error) {
      console.error('发送命令失败:', error);
    }
  } else {
    console.log('Arduino未连接，无法发送命令');
  }
}

// p5.js 函数
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
  // 把视频画出来
  image(capture, 0, 0, width, height);
  
  // 显示连接状态
  textSize(16);
  noStroke();
  fill(255);
  text("Arduino state: " + (isConnected ? "connected" : "not connected"), 20, height - 20);
  
  if (detections.length > 0) {
    let happyLevel = detections[0].expressions.happy;
    
    // 根据happy值变颜色
    if (happyLevel > happyThreshold) {
      fill(0, 255, 0); // 绿色
    } else {
      fill(255, 0, 0); // 红色
    }
    
    // 显示笑容值
    textSize(24);
    text("Smile Value: " + nf(happyLevel, 1, 2), 20, 40);
    text("Smile Counter: " + smileCounter + "/" + smileCounterLimit, 20, 70);
    text("Current State: " + (isSmiling ? "smile face (open)" : "no smile (close)"), 20, 100);
    
    // 笑容检测逻辑
    if (happyLevel > happyThreshold) {
      smileCounter++;
      smileCounter = constrain(smileCounter, 0, smileCounterLimit + 10);
    } else {
      smileCounter--;
      smileCounter = constrain(smileCounter, 0, smileCounterLimit + 10);
    }
    
    // 状态切换并发送命令
    if (smileCounter > smileCounterLimit && !isSmiling) {
      console.log("detect smile: open paper");
      isSmiling = true;
      if (isConnected) {
        sendCommand("open");
      }
    }
    
    if (smileCounter < smileCounterLimit - 5 && isSmiling) { // 添加一点缓冲，避免频繁切换
      console.log("not detect smile: close paper");
      isSmiling = false;
      if (isConnected) {
        sendCommand("close");
      }
    }
    
    // 画出人脸框
    noFill();
    stroke(255);
    strokeWeight(2);
    const box = detections[0].alignedRect._box;
    rect(box._x, box._y, box._width, box._height);
  } else {
    // 无人脸时显示提示
    fill(255);
    textSize(24);
    text("not detect face", width/2 - 100, height/2);
  }
}