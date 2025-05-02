let video;
let videoColors = [];

function setup() {
  createCanvas(600, 600);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide(); // 不显示默认的视频

  // 初始化颜色滤镜
  for (let i = 0; i < 4; i++) {
    videoColors[i] = color(random(255), random(255), random(255));
  }
}

function draw() {
  background(255);

  let w = width / 2;
  let h = height / 2;

  // 画四个格子，每个用不同颜色 tint
  for (let i = 0; i < 4; i++) {
    tint(videoColors[i]);
    let x = (i % 2) * w;
    let y = int(i / 2) * h;
    image(video, x, y, w, h);
  }
}

function mousePressed() {
  // 点击后重新随机颜色
  for (let i = 0; i < 4; i++) {
    videoColors[i] = color(random(255), random(255), random(255));
    console.log(`格子 ${i + 1} 的颜色是：`, videoColors[i].toString());
  }
}
