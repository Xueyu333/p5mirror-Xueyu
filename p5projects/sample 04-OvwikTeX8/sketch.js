let sound01, sound02, sound04, sound09;
let reverb; // 声明混响效果

function preload() {
  soundFormats('wav');
  sound01 = loadSound('sound01.wav');
  sound02 = loadSound('sound02.wav');
  sound04 = loadSound('sound04.wav');
  sound09 = loadSound('sound09.wav');
}

function setup() {
  createCanvas(400, 200);

  // 初始化混响效果
  reverb = new p5.Reverb();

  // 将09音频连接到混响
  reverb.process(sound09, 10, 10); 
// reverb.process(sound02, 10, 10); // 参数: 音频, 混响时间, 衰减率
  // 控制音频循环和播放时间
  sound01.loop();
  setTimeout(() => sound01.stop(), 48000);

  setTimeout(() => sound02.loop(), 4000);
  setTimeout(() => sound02.stop(), 60000);

  setTimeout(() => sound04.loop(), 22000);
  setTimeout(() => sound04.stop(), 60000);

  setTimeout(() => {
    sound09.loop(); // 从17秒开始循环播放
    setTimeout(() => sound09.stop(), 8000); // 25秒时停止
  }, 17000);
}

function draw() {
  background(200);
  textAlign(CENTER, CENTER);
  text('Music is playing', width / 2, height / 2);
}
