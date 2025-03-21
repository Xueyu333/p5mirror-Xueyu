let sound01, sound02, sound04, sound05, sound07, sound08;
let playCount01 = 0,
  playCount02 = 0,
  playCount04 = 0,
  playCount05 = 0,
  playCount07 = 0,
  playCount08 = 0;
let sound04Finished = false,
  sound05Finished = false;

let filter;
let delay;
let reverb;

function preload() {
  sound01 = loadSound("sound01.wav");
  sound02 = loadSound("sound02.wav");
  sound04 = loadSound("sound04.wav");
  sound05 = loadSound("sound05.wav");
  sound07 = loadSound("sound07.wav");
  sound08 = loadSound("sound08.wav");
}

function setup() {
  createCanvas(400, 400);
  playSoundSequence();
  
  reverb = new p5.Reverb(); // 创建混响效果
  delay = new p5.Delay(); // 创建 Delay 对象
  filter = new p5.LowPass(); // 创建低通滤波器
  sound01.disconnect(); // 断开默认输出
  filter.process(sound01); // 将 sound03 连接到滤波器
}

function draw() {
  background(220);
  textAlign(CENTER, CENTER);
  textSize(20);
  text("音频播放序列控制", width / 2, height / 2);
}

function playSoundSequence() {
  // 播放 sound01 和 sound02
  sound01.play();
  playCount01++;
  sound02.play();
  playCount02++;

  console.log("Sound01 和 Sound02 开始播放");

  // 设置 sound01 的结束回调
  sound01.onended(() => {
    console.log(`Sound01 播放结束，当前播放次数: ${playCount01}`);

    if (playCount01 === 2) {
      // sound01 播放第 2 次结束后，延迟 50ms 播放 sound04 和 sound05
      setTimeout(() => {
        console.log("Sound04 和 Sound05 开始播放");
        sound04.play();
        playCount04++;
        sound04.onended(handleSound04Ended);

        sound05.play();
        playCount05++;
        sound05.onended(handleSound05Ended);
      }, 100);
    }

    if (playCount01 < 9) {
      sound01.play(); // sound01 循环播放 9 次
      playCount01++;
    }
  });

  // 设置 sound02 的结束回调
  sound02.onended(() => {
    console.log(`Sound02 播放结束，当前播放次数: ${playCount02}`);

    if (playCount02 < 4) {
      sound02.play(); // sound02 循环播放 4 次
      playCount02++;
    } else {
      console.log("Sound02 播放结束，不再循环");
    }
  });
}

function handleSound04Ended() {
  console.log(`Sound04 播放结束，当前播放次数: ${playCount04}`);

  if (playCount04 < 3) {
    sound04.play(); // sound04 循环播放 3 次
    playCount04++;
  } else {
    sound04Finished = true;
    checkSound04And05Finished();
  }
}

function handleSound05Ended() {
  console.log(`Sound05 播放结束，当前播放次数: ${playCount05}`);

  if (playCount05 < 3) {
    sound05.play(); // sound05 循环播放 3 次
    playCount05++;
  } else {
    sound05Finished = true;
    checkSound04And05Finished();
  }
}

function checkSound04And05Finished() {
  if (sound04Finished && sound05Finished) {
    console.log("Sound07 和 Sound08 准备播放");

    // 延迟 50ms 后播放 sound07 和 sound08
    setTimeout(() => {
      console.log("Sound07 和 Sound08 开始播放");

      sound07.play();
      playCount07++;
      sound07.onended(handleSound07Ended);

      sound08.play();
      playCount08++;
      sound08.onended(handleSound08Ended);
    }, 50);
  }
}

function handleSound07Ended() {
  console.log(`Sound07 播放结束，当前播放次数: ${playCount07}`);

  if (playCount07 < 3) {
    sound07.play(); // sound07 循环播放 3 次
    playCount07++;
  }
}

function handleSound08Ended() {
  console.log(`Sound08 播放结束，当前播放次数: ${playCount08}`);

  if (playCount08 < 2) {
    sound08.play(); // sound08 循环播放 2 次
    playCount08++;
  }
}
