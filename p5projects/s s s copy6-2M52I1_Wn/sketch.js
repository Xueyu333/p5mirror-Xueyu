let diaryInput = ""; // 玩家输入的日记内容
let currentScene = "input"; // 当前场景：输入或视觉
let isTextboxActive = false; // 文本框是否激活
let submittedDiary = ""; // 存储提交后的日记内容
let currentEmotion = ""; // 当前情绪：Sad、Calm、Happy 或 Stressed

let synth; // 合成器
let currentIndex = 0; // 当前处理的字母索引
let circles = []; // 存储所有圆的信息

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  // 初始化音频上下文
  userStartAudio();

  synth = new p5.PolySynth(); // 初始化合成器

  // 监听粘贴事件
  document.addEventListener("paste", handlePaste);
}

function draw() {
  // 根据当前场景绘制内容
  if (currentScene === "input") {
    drawInputScene();
  } else if (currentScene === "visual") {
    drawVisualScene();
  }
}

function drawInputScene() {
  background("rgb(247,247,247)"); // 确保覆盖所有内容

  textAlign(CENTER, CENTER);
  textFont("fontBold");
  textSize(60);
  fill("rgb(119,104,92)");
  text("Diary", width / 2, height * 0.15);

  // 绘制文本框
  let textboxX = width * 0.1;
  let textboxY = height * 0.2;
  let textboxWidth = width * 0.8;
  let textboxHeight = height * 0.4;

  fill(isTextboxActive ? 220 : 180); // 激活时背景更亮
  rect(textboxX, textboxY, textboxWidth, textboxHeight, 20);

  fill(0);
  textAlign(LEFT, TOP);
  textSize(18);

  // 自动换行显示文本内容
  let lines = wrapText(diaryInput, textboxWidth - 20);
  let lineHeight = 20;
  for (let i = 0; i < lines.length; i++) {
    text(lines[i], textboxX + 10, textboxY + 10 + i * lineHeight);
  }

  // 绘制提交按钮
  drawEmotionButton(width * 0.2, height * 0.7, "Sad", ["#29388D"]); // 深蓝
  drawEmotionButton(width * 0.35, height * 0.7, "Calm", ["#82BF3B"]); // 绿色
  drawEmotionButton(width * 0.5, height * 0.7, "Happy", ["rgb(255,227,8)"]); // 黄色
  drawEmotionButton(width * 0.65, height * 0.7, "Stressed", ["rgb(207,0,0)"]); // 红色
}

function drawEmotionButton(x, y, label, color) {
  let buttonWidth = width * 0.1;
  let buttonHeight = height * 0.08;

  fill(color);
  rect(x, y, buttonWidth, buttonHeight, 20);

  fill(255);
  textSize(20);
  textFont('fontBold');
  textAlign(CENTER, CENTER);
  text(label, x + buttonWidth / 2, y + buttonHeight / 2);
}

function drawVisualScene() {
  // 设置背景颜色根据当前情绪
  if (currentEmotion === "Sad") {
    background("rgb(64,64,141)"); // 蓝色
  } else if (currentEmotion === "Calm") {
    background(130, 191, 59); // 绿色
  } else if (currentEmotion === "Happy") {
    background(255, 227, 8); // 黄色
  } else if (currentEmotion === "Stressed") {
    background(207, 0, 0); // 红色
  }

  // 每 30 帧处理一个字母
  if (frameCount % 30 === 0 && currentIndex < submittedDiary.length) {
    processCharacter(submittedDiary[currentIndex]);
    currentIndex++;
  }

  // 更新和绘制所有圆
  for (let circle of circles) {
    drawBreathingCircle(circle);
  }
}

function processCharacter(char) {
  let lowerChar = char.toLowerCase();
  const notes = {
    a: ['C4', 'E4', 'G4'],
    b: ['D4', 'F4', 'A4'],
    c: ['E4', 'G4', 'B4'],
    d: ['F4', 'A4', 'C5'],
    e: ['G4', 'B4', 'D5'],
    f: ['A4', 'C5', 'E5'],
    g: ['B3', 'D4', 'F4'],
    h: ['C4', 'F4', 'G4'],
    i: ['D4', 'G4', 'A4'],
    j: ['E4', 'A4', 'B4'],
    k: ['F4', 'A4', 'D5'],
    l: ['G4', 'B4', 'E5'],
    m: ['A3', 'C4', 'E4', 'G4'],
    n: ['B3', 'D4', 'F4', 'A4'],
    o: ['C4', 'E4', 'G4', 'B4'],
    p: ['D4', 'F4', 'A4', 'C5'],
    q: ['E4', 'G4', 'B4', 'D5'],
    r: ['F4', 'A4', 'C5', 'E5'],
    s: ['G4', 'B4', 'D5', 'F5'],
    t: ['A4', 'C5', 'E5', 'G5'],
    u: ['B3', 'D4', 'F4', 'Ab4'],
    v: ['C4', 'D4', 'G4'],
    w: ['D4', 'E4', 'A4'],
    x: ['E4', 'F4', 'B4'],
    y: ['F4', 'G4', 'A4'],
    z: ['G4', 'A4', 'B4']
  };

  const colors = {
    a: [255, 102, 102],
    b: [255, 178, 102],
    c: [255, 255, 102],
    d: [178, 255, 102],
    e: [102, 255, 102],
    f: [102, 255, 178],
    g: [102, 255, 255],
    h: [102, 178, 255],
    i: [102, 102, 255],
    j: [178, 102, 255],
    k: [255, 102, 255],
    l: [255, 102, 178],
    m: [255, 153, 153],
    n: [255, 204, 153],
    o: [255, 255, 153],
    p: [204, 255, 153],
    q: [153, 255, 153],
    r: [153, 255, 204],
    s: [153, 255, 255],
    t: [153, 204, 255],
    u: [153, 153, 255],
    v: [204, 153, 255],
    w: [255, 153, 255],
    x: [255, 153, 204],
    y: [255, 204, 204],
    z: [204, 204, 255]
  };

  if (notes[lowerChar]) {
    let chord = notes[lowerChar];

    // 根据当前情绪调整音高
    if (currentEmotion === "Sad") { // Sad 模式
      chord = chord.map(note => note.replace(/\d/, n => parseInt(n) - 1)); // 降低一个八度
    } else if (currentEmotion === "Stressed") { // Stressed 模式
      chord = chord.map(note => note.replace(/\d/, n => parseInt(n) + 1)); // 提高一个八度
    }

    chord.forEach(note => synth.play(note, 0.5, 0, 0.5)); // 播放调整后的和弦

    addCircle(colors[lowerChar]);
  }
}

function addCircle(color) {
  let x = random(width);
  let y = random(height);
  let maxSize = random(50, 150);
  let breathingSpeed = random(0.002, 0.01);

  circles.push({
    x,
    y,
    color,
    maxSize,
    currentSize: maxSize * 0.8,
    breathingSpeed,
    phase: random(TWO_PI)
  });
}
function drawBreathingCircle(circle) {
  let adjustedColor;

  // 根据当前情绪调整滤镜
  if (currentEmotion === "Sad") {
    adjustedColor = [
      (circle.color[0] + 10) / 2,
      (circle.color[1] + 10) / 2,
      (circle.color[2] + 80) / 2
    ]; // 深蓝滤镜
  } else if (currentEmotion === "Calm") {
    adjustedColor = [
      (circle.color[0] + 50) / 2,
      (circle.color[1] + 200) / 2,
      (circle.color[2] + 50) / 2
    ]; // 绿色滤镜
  } else if (currentEmotion === "Stressed") {
    adjustedColor = [
      (circle.color[0] + 200) / 2,
      (circle.color[1] + 50) / 2,
      (circle.color[2] + 50) / 2
    ]; // 红色滤镜
  } else {
    // Happy mode 或默认，直接使用原色
    adjustedColor = circle.color;
  }

  circle.currentSize =
    circle.maxSize * 0.8 +
    sin(frameCount * circle.breathingSpeed + circle.phase) * circle.maxSize * 0.2;

  push();
  translate(circle.x, circle.y);
  for (let layer = 0; layer < 12; layer++) {
    let alpha = map(layer, 0, 12, 100, 5);
    fill(adjustedColor[0], adjustedColor[1], adjustedColor[2], alpha);
    ellipse(0, 0, circle.currentSize - layer * 5);
  }
  pop();
}


function mousePressed() {
  if (currentScene === "input") {
    let textboxX = width * 0.1;
    let textboxY = height * 0.2;
    let textboxWidth = width * 0.8;
    let textboxHeight = height * 0.4;

    if (mouseX > textboxX && mouseX < textboxX + textboxWidth && mouseY > textboxY && mouseY < textboxY + textboxHeight) {
      isTextboxActive = true;
    } else {
      isTextboxActive = false;
    }

    let buttonWidth = width * 0.1;
    let buttonHeight = height * 0.08;

    if (mouseY > height * 0.7 && mouseY < height * 0.7 + buttonHeight) {
      if (mouseX > width * 0.2 && mouseX < width * 0.3) {
        currentEmotion = "Sad"; // 切换到 Sad 模式
      } else if (mouseX > width * 0.35 && mouseX < width * 0.45) {
        currentEmotion = "Calm"; // 切换到 Calm 模式
      } else if (mouseX > width * 0.5 && mouseX < width * 0.6) {
        currentEmotion = "Happy"; // 切换到 Happy 模式
      } else if (mouseX > width * 0.65 && mouseX < width * 0.75) {
        currentEmotion = "Stressed"; // 切换到 Stressed 模式
      }

      submittedDiary = diaryInput;
      diaryInput = "";
      isTextboxActive = false;
      currentScene = "visual";
    }
  }
}

function keyTyped() {
  if (currentScene === "input" && isTextboxActive) {
    if (key.length === 1) {
      diaryInput += key;
    }
  }
}

function keyPressed() {
  if (currentScene === "input" && isTextboxActive) {
    if (keyCode === BACKSPACE) {
      diaryInput = diaryInput.slice(0, -1);
    }
  }
}

function handlePaste(event) {
  if (isTextboxActive && currentScene === "input") {
    let pasteData = event.clipboardData.getData("text");
    diaryInput += pasteData;
  }
}

function wrapText(text, maxWidth) {
  let words = text.split(" ");
  let lines = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    let testLine = currentLine + " " + words[i];
    if (textWidth(testLine) < maxWidth) {
      currentLine = testLine;
    } else {
      lines.push(currentLine);
      currentLine = words[i];
    }
  }
  lines.push(currentLine);
  return lines;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
