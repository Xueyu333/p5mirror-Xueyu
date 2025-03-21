let serial; // WebSerial 对象
let currentVideo = "life"; // 当前播放的视频
let lifeVideo, deathVideo; // 视频对象
let portButton;

function preload() {
  // 预加载视频
  lifeVideo = createVideo("life.mp4");
  deathVideo = createVideo("death.mp4");
}

function setup() {
  createCanvas(windowWidth, windowHeight); // 创建画布
  setupVideo(lifeVideo, true); // 默认播放 life 视频
  setupVideo(deathVideo, false); // 停止 death 视频

  // 初始化 WebSerial
  allSerialStuff();
}

function draw() {
  background(255); // 背景设置为黑色
}

// 接收串口事件
function serialEvent() {
  let inData = serial.readLine().trim(); // 读取数据
  console.log("Received data: ", inData); // 打印接收到的数据

  if (inData === "1" && currentVideo !== "death") {
    switchVideo(lifeVideo, deathVideo); // 切换到 death 视频
    currentVideo = "death";
  } else if (inData === "0" && currentVideo !== "life") {
    switchVideo(deathVideo, lifeVideo); // 切换到 life 视频
    currentVideo = "life";
  }
}

function setupVideo(video, isPlaying) {
  video.size(windowWidth, windowHeight); // 设置视频尺寸为窗口大小
  video.position(0, 0); // 设置视频位置
  video.style("z-index", "1"); // 设置视频在画布之上
  video.style("position", "absolute"); // 确保视频绝对定位
  video.hide();
  if (isPlaying) {
    video.loop();
    video.show();
  } else {
    video.stop(); // 停止另一个视频
  }
}

function switchVideo(current, next) {
  current.stop(); // 停止当前视频
  current.hide(); // 隐藏当前视频
  next.show(); // 显示下一个视频
  next.loop(); // 播放下一个视频
}

// 当窗口大小改变时调整视频和画布尺寸
function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 调整画布大小
  lifeVideo.size(windowWidth, windowHeight); // 调整 life 视频大小
  deathVideo.size(windowWidth, windowHeight); // 调整 death 视频大小
}

// WebSerial 的初始化
function allSerialStuff() {
  if (!navigator.serial) {
    alert("WebSerial is not supported in this browser. Try Chrome or MS Edge.");
    return;
  }

  serial = new p5.WebSerial();
  serial.getPorts(); // 获取串口端口列表
  serial.on("noport", makePortButton); // 没有选择端口时创建按钮
  serial.on("portavailable", openPort); // 打开可用端口
  serial.on("data", serialEvent); // 当有数据时触发
  serial.on("close", makePortButton); // 串口关闭时触发
  serial.on("error", portError); // 串口错误时触发

  navigator.serial.addEventListener("connect", portConnect); // 检测新设备连接
  navigator.serial.addEventListener("disconnect", portDisconnect); // 检测设备断开
}

function makePortButton() {
  portButton = createButton("Choose Port");
  portButton.position(10, 10);
  portButton.mousePressed(() => serial.requestPort());
}

function openPort() {
  serial.open().then(() => {
    console.log("Port Opened");
    if (portButton) portButton.hide();
  });
}

function portError(err) {
  console.error("Serial port error: ", err);
}

function portConnect() {
  console.log("Port connected");
  serial.getPorts();
}

function portDisconnect() {
  console.log("Port disconnected");
  serial.close();
}
