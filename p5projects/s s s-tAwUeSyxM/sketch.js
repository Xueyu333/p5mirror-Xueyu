let ripples = [];
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
  a: [255, 150, 200], 
  b: [150, 255, 200], 
  c: [200, 150, 255] 
}; // 字母对应渐变颜色
let diary = "";
let synth;
let currentIndex = 0; // 当前处理到的字母索引

function preload() {
  diary = loadStrings('diary.txt'); // 读取diary.txt
}

function setup() {
  createCanvas(800, 600);
  synth = new p5.PolySynth();
  noStroke();

  // 将读取的内容合并为一行字符串
  diary = diary.join(""); // 如果有多行内容，会拼接成一行
}

function draw() {
  background(20, 20, 30, 20); // 深色背景，带透明度
  for (let ripple of ripples) {
    push();
    translate(ripple.x, ripple.y);
    rotate(ripple.angle);
    fill(
      lerpColor(
        color(ripple.color[0], ripple.color[1], ripple.color[2]),
        color(0, 0, 0),
        ripple.alpha / 255
      )
    );
    ellipse(0, 0, ripple.size, ripple.size * 1.5);
    pop();

    ripple.size += ripple.growth; // 动态增长
    ripple.angle += ripple.rotation; // 动态旋转
    ripple.alpha -= ripple.fadeSpeed; // 渐变消失
  }
  ripples = ripples.filter(ripple => ripple.alpha > 0); // 删除透明波纹

  // 自动处理下一字符
  if (frameCount % 60 === 0 && currentIndex < diary.length) {
    processCharacter(diary[currentIndex]);
    currentIndex++;
  }
}

function processCharacter(char) {
  // 将字母统一转换为小写
  let lowerChar = char.toLowerCase();
  if (notes[lowerChar]) {
    // 播放对应和弦
    let chord = notes[lowerChar];
    chord.forEach(note => synth.play(note, 0.5, 0, 0.5));

    // 添加新的波纹
    let ripple = {
      x: random(width),
      y: random(height),
      size: random(20, 40),
      growth: random(1, 3),
      rotation: random(0.01, 0.05),
      alpha: 255,
      fadeSpeed: random(1, 3),
      color: colors[lowerChar] || [255, 255, 255],
      angle: random(TWO_PI)
    };
    ripples.push(ripple);
  }
}

function mousePressed() {
  // 保存新的字符串
  let newDiaryEntry = "这是新的一段内容！"; // 示例，可以根据需求替换
  saveStrings([newDiaryEntry], "new_diary.txt");
}
