let wind, bird, water, cricket, reverb;

function setup() {
  createCanvas(400, 400);

  // 创建混响效果
  reverb = new p5.Reverb();

  // 初始化风声
  wind = new p5.Noise('white');
  wind.amp(0); // 初始音量为0
  wind.start();
  let windFilter = new p5.LowPass();
  wind.disconnect();
  wind.connect(windFilter);
  windFilter.freq(500); // 柔和的低频风声
  reverb.process(wind, 3, 2); // 添加混响
  wind.amp(0.05, 10); // 10秒内逐渐加入风声

  // 15秒后加入鸟鸣
  setTimeout(() => {
    bird = new p5.Oscillator('sine');
    bird.start();
    bird.freq(800);
    bird.amp(0, 0.1); // 起始音量为0，逐渐变大
    reverb.process(bird, 2, 1); // 添加混响

    // 模拟鸟鸣的节奏
    setInterval(() => {
      bird.amp(0.2, 0.1); // 鸣叫时音量增强
      setTimeout(() => bird.amp(0, 0.1), 200); // 鸣叫结束后音量减弱
    }, 1500); // 每1.5秒鸣叫一次
  }, 15000); // 延迟15秒加入鸟鸣

  // 30秒后加入流水声
  setTimeout(() => {
    water = new p5.Noise('pink'); // 使用粉噪声模拟柔和的流水声
    water.amp(0); // 起始音量为0
    water.start();
    let waterFilter = new p5.HighPass();
    water.disconnect();
    water.connect(waterFilter);
    waterFilter.freq(1000); // 模拟高频流水声
    reverb.process(water, 4, 2); // 添加更长的混响
    water.amp(0.05, 10); // 10秒内逐渐加入流水声
  }, 30000); // 延迟30秒加入流水声

  // 45秒后加入虫鸣
  setTimeout(() => {
    cricket = new p5.Oscillator('triangle');
    cricket.freq(600); // 虫鸣的基本频率
    cricket.amp(0); // 初始音量为0
    cricket.start();
    reverb.process(cricket, 1.5, 1); // 添加混响

    // 模拟虫鸣的节奏
    setInterval(() => {
      cricket.amp(0.2, 0.1); // 每次虫鸣时音量增强
      cricket.freq(random(500, 700)); // 虫鸣的频率稍微随机变化
      setTimeout(() => cricket.amp(0, 0.1), 100); // 鸣叫结束后音量减弱
    }, 500); // 每500毫秒鸣叫一次
  }, 45000); // 延迟45秒加入虫鸣
}

function draw() {
  background(200);
  textAlign(CENTER, CENTER);
  textSize(20);
  fill(50);
  text("大自然协奏曲", width / 2, height / 2 - 20);
  textSize(16);
  text("声音渐进中，请耐心聆听...", width / 2, height / 2 + 20);
}
