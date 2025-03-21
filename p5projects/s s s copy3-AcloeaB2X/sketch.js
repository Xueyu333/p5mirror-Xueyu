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

let diary = ""; // 日记内容
let synth; // 合成器
let currentIndex = 0; // 当前处理的字母索引
let circles = []; // 存储所有圆的信息

function preload() {
  diary = loadStrings('diary.txt'); // 载入文本文件作为日记内容
}

function setup() {
  createCanvas(800, 600);
  noStroke();
  synth = new p5.PolySynth(); // 初始化合成器
  diary = diary.join(""); // 合并文本为一行
}

function draw() {
  background(20, 20, 30, 10); // 半透明背景，保留部分残影

  // 每 30 帧处理一个字母
  if (frameCount % 30 === 0 && currentIndex < diary.length) {
    processCharacter(diary[currentIndex]);
    currentIndex++;
  }

  // 更新和绘制所有圆
  for (let circle of circles) {
    drawBreathingCircle(circle);
  }
}

function processCharacter(char) {
  let lowerChar = char.toLowerCase();
  if (notes[lowerChar]) {
    // 播放对应和弦
    let chord = notes[lowerChar];
    chord.forEach(note => synth.play(note, 0.5, 0, 0.5));

    // 添加新圆到数组
    addCircle(colors[lowerChar]);
  }
}

function addCircle(color) {
  let x = random(width); // 圆心位置 x
  let y = random(height); // 圆心位置 y
  let maxSize = random(50, 150); // 最大半径
  let breathingSpeed = random(0.002, 0.01); // 更慢的呼吸速度

  // 存储圆的初始状态
  circles.push({
    x: x,
    y: y,
    color: color,
    maxSize: maxSize,
    currentSize: maxSize * 0.8, // 初始半径稍小
    breathingSpeed: breathingSpeed,
    phase: random(TWO_PI) // 随机初始相位
  });
}
function drawBreathingCircle(circle) {
  // 更新当前大小
  circle.currentSize =
    circle.maxSize * 0.8 + sin(frameCount * circle.breathingSpeed + circle.phase) * circle.maxSize * 0.2;

  // 绘制羽化圆
  push();
  translate(circle.x, circle.y);
  for (let layer = 0; layer < 12; layer++) { // 增加层数
    let alpha = map(layer, 0, 12, 100, 5); // 更柔和的透明度渐变
    fill(circle.color[0], circle.color[1], circle.color[2], alpha);

    beginShape();
    let noiseSeedVal = circle.x + circle.y + layer; // 稳定的噪声种子
    for (let angle = 0; angle < 360; angle += 10) { // 不规则的顶点间隔
      let rad = radians(angle); // 当前顶点的角度
      let offset = noise(cos(rad) * 0.5 + noiseSeedVal, sin(rad) * 0.5, frameCount * 0.01) * 20; // 不规则噪声
      let r = circle.currentSize - layer * 5 + offset; // 半径加入噪声影响
      let px = cos(rad) * r; // x 坐标
      let py = sin(rad) * r; // y 坐标
      vertex(px, py);
    }
    endShape(CLOSE);
  }
  pop();
}

function mousePressed() {
  let newDiaryEntry = "这是新的一段内容！";
  saveStrings([newDiaryEntry], "new_diary.txt");
}
