let startRadius = 50; // Radius of the innermost circle
let radiusIncrement = 60; // Distance between each circular ring
let barWidth = 20; // Width of each rectangle (bar)
let spacing = 10; // Space between rectangles in each ring
let seed = 100; // Random seed for variation
let t = 0; // Time variable for animation
let avoidanceRadius = 100; // Radius around the mouse that affects rectangles
let maxAvoidance = 30; // Maximum displacement when rectangles avoid the mouse

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES); // degree mode
  colorMode(HSB, 360, 100, 100); // colormode hue saturation brightness
}

function draw() {
  background(255);
  translate(width / 2, height / 2); // 将坐标原点移到画布中心

  // Mouse Position Relative to the Center
  let mx = mouseX - width / 2;
  let my = mouseY - height / 2;

  // 计算可以绘制的最大半径和圆环数量
  let maxRadius = max(width, height) / 2;
  let numCircles = floor((maxRadius - startRadius) / radiusIncrement);

  // 第一层循环：绘制每个圆环
  for (let circle = 0; circle < numCircles; circle++) {
    let radius = startRadius + circle * radiusIncrement; // 计算当前圆环的半径
    let circumference = 2 * PI * radius; // 计算当前圆环的周长
    let barsPerCircle = floor(circumference / (barWidth + spacing)); // 计算当前圆环可以放置的长方形数量

    // 第二层循环：在当前圆环上绘制长方形
    for (let i = 0; i < barsPerCircle; i++) {
      push(); // 保存当前变换状态
      let angle = (360 / barsPerCircle) * i; // 计算当前长方形的角度

    
      let rectX = cos(angle) * radius;//Finds the x-position along the circle.
      let rectY = sin(angle) * radius;//Finds the y-position along the circle.

      // 计算长方形中心到鼠标的距离
      let d = dist(rectX, rectY, mx, my);

      // 计算长方形需要避开鼠标的距离
      let avoidance = 0;

      // If d < avoidanceRadius, the rectangle is pushed away from the mouse.
      if (d < avoidanceRadius) {
        
        // 根据距离计算避开的程度
        // d = 0: The rectangle is right on the mouse → Avoidance is maxAvoidance.
        // d = avoidanceRadius: The rectangle is at the edge of the effect area → Avoidance is 0.
        avoidance = map(d, 0, avoidanceRadius, maxAvoidance, 0);
        
        
        // 计算避开的方向角度
        let angle2Mouse = atan2(rectY - my, rectX - mx);
        
        // 更新长方形的位置，使其避开鼠标
        rectX += cos(angle2Mouse) * avoidance;
        rectY += sin(angle2Mouse) * avoidance;
      }

      // 设置长方形的长度范围
      let minLength = 10; // 最小长度
      let maxLength = min(80, radius); // 最大长度

      // Uses Perlin noise to create smooth random variations in rectangle length.
      let offset = i * 1000 + circle * 500; // 为每个长方形创建唯一的偏移值
      let noiseVal = noise(offset * 0.01, t * 0.005); // 生成噪声值
      let barLength = map(noiseVal, 0, 1, minLength, maxLength); // 映射噪声值到长度范围

      // Recalculating the Correct Placement
      
      let drawAngle = atan2(rectY, rectX); // Finds the angle from the center of the canvas to the rectangle’s new position.
      
      let drawRadius = dist(0, 0, rectX, rectY); //  Finds the new distance (radius) of the rectangle from the center of the canvas.


      rotate(drawAngle); // 旋转到正确的角度
      translate(drawRadius, 0); // 移动到正确的位置

      // 根据半径设置颜色
      let hue = map(radius, startRadius, maxRadius, 0, 200);
      fill(hue, 80, 90); // 设置填充颜色

      noStroke(); // 移除描边
      rectMode(CENTER); // 设置矩形绘制模式为中心点
      rect(0, 0, barLength, barWidth); // 绘制长方形
      pop(); // 恢复之前的变换状态
    }
  }

  t += 0.5; // 更新时间变量，用于动画效果
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 当窗口大小改变时，调整画布大小
}

function mousePressed() {
  seed = random(50000); // 鼠标点击时生成新的随机种子
}
