//NOTE: This example requires you to first
//download an mp3 and upload it into your
//sketch files.  To do this, click on the 
//small error just above and to the left
//of this comment, then click on the small
//arrow to the right of "Sketch Files,"
//then choose "Upload file" and drag your
//mp3 into the pop-up window.
let mySound;
let playCount = 0; // 播放计数器

function preload() {
  // 加载音频文件
  mySound = loadSound('0001.mp3');
}

function setup() {
  createCanvas(400, 200);
  textAlign(CENTER, CENTER);
  textSize(16);

  // 开始自动播放并每隔 5 秒切换左右声道
  setInterval(() => {
    if (mySound.isPlaying()) {
      mySound.stop(); // 停止当前播放
    }

    if (playCount % 2 === 0) {
      mySound.pan(-1); // 左声道（左扬声器）
      console.log("Playing on Left Speaker");
    } else {
      mySound.pan(1); // 右声道（右扬声器）
      console.log("Playing on Right Speaker");
    }

    mySound.play(); // 播放音频
    playCount++; // 增加播放计数
  }, 5000); // 每 5000 毫秒（5 秒）切换一次
}

function draw() {
  background(200);
  if (mySound.isPlaying()) {
    if (playCount % 2 === 1) {
      text('Playing on Left Speaker', width / 2, height / 2);
    } else {
      text('Playing on Right Speaker', width / 2, height / 2);
    }
  } else {
    text('Waiting to play...', width / 2, height / 2);
  }
}
