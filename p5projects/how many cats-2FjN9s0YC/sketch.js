let catImage;
let colors;
let colorIndex = 0; // 当前目标颜色的索引
let transitionFrames = 500; // 每个颜色的渐变时长（帧数）
let frameCounter = 0; // 计数器，用于控制渐变的时间
let startColor; // 当前渐变的起始颜色
let targetColor; // 当前渐变的目标颜色

function preload() {
  // 加载带透明背景的彩色猫咪图片
  catImage = loadImage('cats.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  colorMode(RGB);

  // 定义颜色渐变路径数组，从浅色到深色
  colors = [
    color(252, 239, 123),  // 浅黄色（月亮）
    color(253, 192, 102),  // 浅橙色
    color(253, 94, 107),   // 粉红色
    color(166, 221, 246),  // 浅蓝色
    color(194, 104, 216),  // 紫色
    color(189, 214, 28),   // 浅绿色
    color(35, 30, 75)      // 深蓝紫色（结束的天空）
  ];

  // 初始化起始颜色和目标颜色
  startColor = colors[0];
  targetColor = colors[1];
}

function draw() {
  // 线性插值当前的背景颜色
  let lerpAmt = frameCounter / transitionFrames;
  let backgroundColor = lerpColor(startColor, targetColor, lerpAmt);
  background(backgroundColor); // 设置背景颜色

  // 计算图像绘制尺寸，保持 16:9 比例
  let imgWidth = width;
  let imgHeight = width * 9 / 16;
  if (imgHeight > height) { 
    imgHeight = height;
    imgWidth = height * 16 / 9;
  }

  // 绘制 PNG 图像
  image(catImage, width / 2, height / 2, imgWidth, imgHeight);

  // 增加计数器
  frameCounter++;

  // 当计数器达到过渡时长时，切换到下一个颜色
  if (frameCounter >= transitionFrames) {
    colorIndex++;
    if (colorIndex >= colors.length - 1) {
      noLoop(); // 停止循环，保持在最终的天空颜色
      return;
    }
    // 更新起始颜色和目标颜色，重置计数器
    startColor = colors[colorIndex];
    targetColor = colors[colorIndex + 1];
    frameCounter = 0;
  }
}
