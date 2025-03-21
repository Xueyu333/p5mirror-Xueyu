let catImage;
let colors;
let colorIndex = 0;           // 当前目标颜色的索引
let bg = { r: 0, g: 0, b: 0 }; // 当前背景颜色
let bgspeed = { r: 0, g: 0, b: 0 }; // 背景颜色变化速度
let transitionDuration = 700;  // 控制过渡速度的变量

function preload() {
  catImage = loadImage('cats.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  colorMode(RGB);
  
  // 定义颜色渐变路径数组
  colors = [
    color(253, 94, 107),   // 粉红色
     color(253, 192, 102),  // 浅橙色
    color(252, 239, 123),  // 浅黄色（月亮）
    color(189, 214, 28),   // 浅绿色
   
    color(166, 221, 246),  // 浅蓝色
    color(194, 104, 216),  // 紫色
   
    color(35, 30, 75)      // 深蓝紫色（结束的天空）
  ];

  // 初始化背景颜色为第一个颜色
  bg.r = red(colors[0]);
  bg.g = green(colors[0]);
  bg.b = blue(colors[0]);
  
  // 设置初始速度
  setSpeedForNextColor();
}

function draw() {
  background(bg.r, bg.g, bg.b);

  // 计算图像绘制尺寸，保持 16:9 比例
  let imgWidth = width;
  let imgHeight = width * 9 / 16;
  if (imgHeight > height) { 
    imgHeight = height;
    imgWidth = height * 16 / 9;
  }

  // 绘制 PNG 图像
  image(catImage, width / 2, height / 2, imgWidth, imgHeight);

  // 更新背景颜色
  bg.r += bgspeed.r;
  bg.g += bgspeed.g;
  bg.b += bgspeed.b;

  // 检查是否接近目标颜色
  if (abs(bg.r - red(colors[colorIndex])) < 1 &&
      abs(bg.g - green(colors[colorIndex])) < 1 &&
      abs(bg.b - blue(colors[colorIndex])) < 1) {
    // 切换到下一个颜色
    colorIndex++;
    if (colorIndex >= colors.length) {
      colorIndex = colors.length - 1;
      noLoop(); // 停止循环在最后的天空颜色
    } else {
      // 设置下一段颜色过渡的速度
      setSpeedForNextColor();
    }
  }
}

// 设置 bgspeed 以逐步过渡到下一个颜色
function setSpeedForNextColor() {
  let nextColor = colors[colorIndex];
  // 使用 transitionDuration 控制速度
  bgspeed.r = (red(nextColor) - bg.r) / transitionDuration;
  bgspeed.g = (green(nextColor) - bg.g) / transitionDuration;
  bgspeed.b = (blue(nextColor) - bg.b) / transitionDuration;
}
