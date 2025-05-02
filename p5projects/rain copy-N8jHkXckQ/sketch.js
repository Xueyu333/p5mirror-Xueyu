//Prompt (for GPT+Claude):

// Have the text fall from the top of the screen, with each word or character in random sizes. As they land in the center of the screen, their sizes become uniform. Each line of the poem should align horizontally, and all lines should appear in the correct order to form a complete poem.



let sentence = "The rain falls gently on the ground\nNature's music, a calming sound";
let letters = [];
let finalFontSize = 32;
let dropHeight = 300;
let transitionPoint = 50; // 距离目标位置多远开始过渡字体大小

function setup() {
  createCanvas(900, 900);
  textFont('Georgia');
  textAlign(LEFT, BASELINE); // 使用BASELINE对齐
  fill(0);
  
  // 计算基于最终字体大小的位置
  textSize(finalFontSize);
  let lines = sentence.split('\n');
  let lineHeight = finalFontSize * 1.5;
  // 计算文本块的中心位置
  let startY = height / 2 - ((lines.length - 1) * lineHeight) / 2 + finalFontSize/2;
  
  // 处理每一行
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    let lineWidth = textWidth(line);
    let startX = (width - lineWidth) / 2;
    // 每一行所有字母共享相同的基线y坐标
    let y = startY + i * lineHeight;
    
    // 为这一行创建字母对象
    for (let j = 0; j < line.length; j++) {
      let ch = line[j];
      let chWidth = textWidth(ch);
      
      letters.push({
        char: ch,
        x: startX,
        y: y - dropHeight - random(50, 200),
        targetX: startX,
        targetY: y,
        size: random(10, 40), // 随机初始大小
        targetSize: finalFontSize,
        speed: random(1, 4),
        settled: false,
        transitioning: false // 新增状态，标记是否正在过渡大小
      });
      
      startX += chWidth;
    }
  }
}

function draw() {
  background(230, 235, 245);
  
  // 绘制每个字母
  for (let letter of letters) {
    // 设置当前字母的大小
    textSize(letter.size);
    
    if (!letter.settled) {
      // 下落过程 - 每个字母垂直下落
      letter.y += letter.speed;
      
      // 检查是否应该开始大小过渡
      if (!letter.transitioning && letter.targetY - letter.y < transitionPoint) {
        letter.transitioning = true;
      }
      
      // 如果正在过渡大小，逐渐将大小调整为目标大小
      if (letter.transitioning) {
        letter.size = lerp(letter.size, letter.targetSize, 0.1);
      }
      
      // 当字母到达或超过其目标Y位置时
      if (letter.y >= letter.targetY) {
        // 直接定位到目标位置
        letter.y = letter.targetY;
        letter.size = letter.targetSize; // 确保大小准确
        letter.settled = true;
      }
    }
    
    // 绘制字母
    text(letter.char, letter.x, letter.y);
  }
  
  // 检查动画是否完成（可选）
  // let allSettled = letters.every(l => l.settled);
  // if (allSettled) {
  //   // 可以在这里添加动画完成后的效果
  // }
}