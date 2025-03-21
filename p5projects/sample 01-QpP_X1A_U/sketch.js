let sound01, sound02, sound03, sound04, sound05, sound06, sound07, sound08;
let playCount01 = 0,
  playCount02 = 0,
  playCount03 = 0;
let playCount04 = 0,
  playCount05 = 0,
  playCount07 = 0;
let sound04Finished = false,
  sound05Finished = false;

let filter;
let delay;
let reverb;

function preload() {
  sound01 = loadSound("sound01.wav");
  sound02 = loadSound("sound02.wav");
  sound03 = loadSound("sound03.wav");
  sound04 = loadSound("sound04.wav");
  sound05 = loadSound("sound05.wav");
  sound06 = loadSound("sound06.wav");
  sound07 = loadSound("sound07.wav");
  sound08 = loadSound("sound08.wav");
}

function setup() {
  createCanvas(400, 400);

  reverb = new p5.Reverb(); // 创建混响效果
  delay = new p5.Delay(); // 创建 Delay 对象
  filter = new p5.LowPass(); // 创建低通滤波器
  sound01.disconnect(); // 断开默认输出
  filter.process(sound01); // 将 sound03 连接到滤波器

  playSoundSequence();
}

function draw() {
  background(220);
  textAlign(CENTER, CENTER);
  textSize(20);
  text("音频播放序列控制", width / 2, height / 2);
}

function playSoundSequence() {
  // 1. 播放 sound01 和 sound02
  sound01.play();
  // 设置滤波器参数（第一次播放）
  filter.freq(1000); // 截止频率 800Hz
  filter.res(15); // 共振强度 15
  playCount01++;

  sound02.play();
  reverb.process(sound02, 10, 10); // 混响 3 秒，衰减 2 秒
  playCount02++;

  // 设置 sound01 的结束回调
  sound01.onended(() => {
    if (playCount01 === 1) {
      // 在 sound01 第一次结束后，加入 50ms 延迟再播放 sound03
      setTimeout(() => {
        console.log("Sound03 开始播放");

        sound03.play();
        sound03.setVolume(0); // 开始时音量为 0
        sound03.rate(1.1); // 播放速度
        sound03.amp(0.5);
        sound03.amp(1, 0, 5); // 在 2 秒内音量渐入
        delay.process(sound03, 0.5, 0.6, 2300); // 延迟效果
        playCount03++;

        sound03.onended(() => {
          if (playCount03 === 1) {
            setTimeout(() => {
              console.log("Sound04 和 Sound05 开始播放");

              // 同时播放 sound04 和 sound05

              sound04.play();
              sound05.play();
            
              playCount04++;
              playCount05++;

              sound04.onended(handleSound04Ended);
              sound05.onended(handleSound05Ended);
            }, 600); // 2 秒延迟
          }

          // 如果 playCount03 小于 2，继续播放 sound03
          if (playCount03 < 2) {
            sound03.play();
            sound03.rate(1.1);
            reverb.process(sound03, 10, 10); // 混响 3 秒，衰减 2 秒
            // delay.process(sound03, 0.5, 0.6, 2300); // 延迟效果
            playCount03++;
          }
        });
      }, 790);
    }

    if (playCount01 < 10) {
      sound01.play();
      playCount01++;
    }
  });

  // 设置 sound02 的结束回调
  sound02.onended(() => {
    if (playCount02 < 4) {
      sound02.play();
      playCount02++;
    } else {
      console.log("Sound02 停止播放");
      sound02.stop(); // 停止 sound02 的播放
    }
  });
}

function handleSound04Ended() {
  if (playCount04 < 3) {
    sound04.play();
    playCount04++;
  } else {
    sound04Finished = true;
    checkSound04And05Finished();
  }
}

function handleSound05Ended() {
  if (playCount05 < 3) {
    sound05.play();
    playCount05++;
  } else {
    sound05Finished = true;
    checkSound04And05Finished();
  }
}

function checkSound04And05Finished() {
  if (sound04Finished && sound05Finished) {
    console.log("Sound07 和 Sound08 开始播放");
    // 4. 当 sound04 和 sound05 完成 3 次循环后，播放 sound07 和 sound08
    sound07.play();
    sound07.amp(1);
    playCount07++;
    sound07.onended(handleSound07Ended);

    sound08.play(); // sound08 只播放一次，无需循环
    sound08.amp(1);
  }
}

function handleSound07Ended() {
  if (playCount07 < 2) {
    sound07.play();

    playCount07++;
  } else {
    console.log("Sound07 和 Sound08 结束，恢复到 Sound01");
    // 5. 恢复到只播放 sound01，直到完成 9 次
    if (playCount01 < 9) {
      sound01.play();
      playCount01++;
    }
  }
}
