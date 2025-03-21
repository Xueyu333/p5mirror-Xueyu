let catImage;
let colors;
let colorIndex = 0;         // 当前目标颜色的索引
let bg;                     // 当前背景颜色
let progress = 0;           // 颜色过渡的进度（从 0 到 1）
let transitionSpeed = 0.007; // 控制颜色渐变的速度
let pauseTimer = 0;         // 暂停计时器
let pauseDuration = 120;    // 停留时间，2 秒（假设帧率为 60）

function preload() {
  // 加载带透明背景的彩色猫咪图片
  catImage = loadImage('cats.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  colorMode(RGB);

  // 定义颜色渐变路径数组
  colors = [
    color(253, 94, 109),   // 粉红色
    color(253, 192, 102),  // 浅橙色
    color(252, 239, 123),  // 浅黄色（月亮）
    color(189, 214, 28),   // 浅绿色
    color(166, 221, 246),  // 浅蓝色
    color(194, 104, 216),  // 紫色
    color(35, 30, 75)      // 深蓝紫色（结束的天空）
  ];

  // 初始化背景颜色为第一个颜色
  bg = colors[0];
}

function draw() {
  // 获取当前的起始颜色和目标颜色
  let startColor = colors[colorIndex];
  let targetColor;

  // 如果到达最后一个颜色，设置目标颜色为第一个颜色，实现循环过渡
  if (colorIndex === colors.length - 1) {
    targetColor = colors[0];
  } else {
    targetColor = colors[colorIndex + 1];
  }

  // 处理暂停计时
  if (pauseTimer > 0) {
    pauseTimer--;
    background(bg);  // 停留在当前颜色
  } else {
    // 使用 `lerpColor` 根据进度平滑过渡到目标颜色
    bg = lerpColor(startColor, targetColor, progress);
    background(bg);

    // 增加进度
    progress += transitionSpeed;

    // 当进度达到 1 时，重置进度并设置暂停计时器
    if (progress >= 1) {
      progress = 0;               // 重置进度
      pauseTimer = pauseDuration; // 设置暂停时间
      colorIndex++;               // 切换到下一个颜色

      // 如果达到最后一个颜色，重置 colorIndex 为 0
      if (colorIndex >= colors.length) {
        colorIndex = 0;
      }
    }
  }

  // 计算图像绘制尺寸，保持 16:9 比例
  let imgWidth = width;
  let imgHeight = width * 9 / 16;
  if (imgHeight > height) { 
    imgHeight = height;
    imgWidth = height * 16 / 9;
  }

  // 绘制 PNG 图像
  image(catImage, width / 2, height / 2, imgWidth, imgHeight);
}
