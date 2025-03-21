
const notes = {
  a: ['C4', 'E4', 'G4'], // C大三和弦
  b: ['D4', 'F4', 'A4'], // D小三和弦
  c: ['E4', 'G4', 'B4'], // E小三和弦
  d: ['F4', 'A4', 'C5'], // F大三和弦
  e: ['G4', 'B4', 'D5'], // G大三和弦
  f: ['A4', 'C5', 'E5'], // A小三和弦
  g: ['B3', 'D4', 'F4'], // B减三和弦
  h: ['C4', 'F4', 'G4'], // C挂留和弦（sus4）
  i: ['D4', 'G4', 'A4'], // D挂留和弦（sus4）
  j: ['E4', 'A4', 'B4'], // E挂留和弦（sus4）
  k: ['F4', 'A4', 'D5'], // F六和弦
  l: ['G4', 'B4', 'E5'], // G六和弦
  m: ['A3', 'C4', 'E4', 'G4'], // A小七和弦
  n: ['B3', 'D4', 'F4', 'A4'], // B半减七和弦
  o: ['C4', 'E4', 'G4', 'B4'], // C大七和弦
  p: ['D4', 'F4', 'A4', 'C5'], // D小七和弦
  q: ['E4', 'G4', 'B4', 'D5'], // E小七和弦
  r: ['F4', 'A4', 'C5', 'E5'], // F大七和弦
  s: ['G4', 'B4', 'D5', 'F5'], // G属七和弦
  t: ['A4', 'C5', 'E5', 'G5'], // A小七和弦
  u: ['B3', 'D4', 'F4', 'Ab4'], // B减七和弦
  v: ['C4', 'D4', 'G4'], // C挂留二和弦（sus2）
  w: ['D4', 'E4', 'A4'], // D挂留二和弦（sus2）
  x: ['E4', 'F4', 'B4'], // E挂留二和弦（sus2）
  y: ['F4', 'G4', 'A4'], // F增三和弦
  z: ['G4', 'A4', 'B4'] // G增三和弦
};

const colors = {
  a: ["rgb(248,122,122)"],  // 红
  b: [255, 178, 102],  // 橙
  c: [255, 255, 102],  // 黄
  d: [178, 255, 102],  // 浅绿
  e: [102, 255, 102],  // 绿
  f: [102, 255, 178],  // 青绿
  g: [102, 255, 255],  // 青
  h: [102, 178, 255],  // 浅蓝
  i: [102, 102, 255],  // 蓝
  j: [178, 102, 255],  // 紫
  k: [255, 102, 255],  // 粉紫
  l: [255, 102, 178],  // 浅粉
  m: [255, 153, 153],  // 浅红
  n: [255, 204, 153],  // 浅橙
  o: [255, 255, 153],  // 浅黄
  p: [204, 255, 153],  // 浅绿
  q: [153, 255, 153],  // 草绿
  r: [153, 255, 204],  // 薄荷绿
  s: [153, 255, 255],  // 浅青
  t: [153, 204, 255],  // 天蓝
  u: [153, 153, 255],  // 浅蓝紫
  v: [204, 153, 255],  // 浅紫
  w: [255, 153, 255],  // 浅粉紫
  x: [255, 153, 204],  // 浅桃粉
  y: [255, 204, 204],  // 肉粉
  z: [204, 204, 255]   // 淡蓝紫
};

let diary = "";
let synth;
let currentIndex = 0;

function preload() {
  diary = loadStrings('diary.txt');
}

function setup() {
  createCanvas(800, 600);
  synth = new p5.PolySynth();
  noStroke();
  diary = diary.join("");
}

function draw() {
  if (frameCount % 30 === 0 && currentIndex < diary.length) {
    processCharacter(diary[currentIndex]);
    currentIndex++;
  }
}

function processCharacter(char) {
  let lowerChar = char.toLowerCase();
  if (notes[lowerChar]) {
    let chord = notes[lowerChar];
    chord.forEach(note => synth.play(note, 0.5, 0, 0.5));

    // 绘制不规则的羽化圆形
    drawWaterInkCircle(lowerChar);
  }
}

function drawWaterInkCircle(char) {
  // 获取颜色
  let col = colors[char] || [random(255), random(255), random(255)];
  let x = random(width);
  let y = random(height);
  let maxSize = random(50, 150); // 圆形的最大尺寸

  push();
  translate(x, y);

  for (let i = 0; i < 10; i++) {
    let alpha = map(i, 0, 10, 50, 5); // 渐变透明度
    fill(col[0], col[1], col[2], alpha);

    beginShape();
    for (let angle = 0; angle < TWO_PI; angle += radians(10)) {
      let rad = maxSize * (1 - i / 10); // 尺寸逐渐变小
      let r = rad + noise(cos(angle) * 0.5, sin(angle) * 0.5, frameCount * 0.01) * 20;
      let px = cos(angle) * r;
      let py = sin(angle) * r;
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