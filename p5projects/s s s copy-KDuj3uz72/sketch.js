const notes = {
  a: 'C4',
  b: 'D4',
  c: 'E4',
  d: 'F4',
  e: 'G4',
  f: 'A4',
  g: 'B4',
  h: 'C#4',
  i: 'D#4',
  j: 'F#4',
  k: 'G#4',
  l: 'A#4',
  m: 'C5',
  n: 'D5',
  o: 'E5',
  p: 'F5',
  q: 'G5',
  r: 'A5',
  s: 'B5',
  t: 'C#5',
  u: 'D#5',
  v: 'F#5',
  w: 'G#5',
  x: 'A#5',
  y: 'C6',
  z: 'D6'
};

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
  background(0); // 黑色背景
}

function draw() {
  background(0, 0, 0, 20); // 深色背景，带透明度

  // 自动处理下一字符
  if (frameCount % 30 === 0 && currentIndex < diary.length) {
    processCharacter(diary[currentIndex]);
    currentIndex++;
  }
}

function processCharacter(char) {
  let lowerChar = char.toLowerCase();
  if (notes[lowerChar]) {
    // 播放对应音符
    let note = notes[lowerChar];
    synth.play(note, 0.5, 0, 0.5); // 播放单个音符

    console.log(`Playing note: ${note}`); // 输出调试信息
  } else {
    console.warn(`Character ${char} has no corresponding note.`);
  }
}

function mousePressed() {
  // 保存新的字符串
  let newDiaryEntry = "这是新的一段内容！"; // 示例，可以根据需求替换
  saveStrings([newDiaryEntry], "new_diary.txt");
}
