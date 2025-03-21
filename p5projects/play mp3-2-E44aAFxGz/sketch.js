//NOTE: This example requires you to first
//download an mp3 and upload it into your
//sketch files.  To do this, click on the 
//small error just above and to the left
//of this comment, then click on the small
//arrow to the right of "Sketch Files,"
//then choose "Upload file" and drag your
//mp3 into the pop-up window.
let mySound;

function preload() {
  // 加载立体声 MP3 音频文件
  mySound = loadSound('0001.mp3');
}

function setup() {
  createCanvas(400, 200);
  
  // 控制音频的左右声道播放
  let leftButton = createButton('Play on Left Speaker');
  leftButton.position(10, 50);
  leftButton.mousePressed(() => mySound.pan(-1));  // 将声音完全移到左声道
  
  let rightButton = createButton('Play on Right Speaker');
  rightButton.position(10, 100);
  rightButton.mousePressed(() => mySound.pan(1));  // 将声音完全移到右声道
  
  let bothButton = createButton('Play on Both Speakers');
  bothButton.position(10, 150);
  bothButton.mousePressed(() => mySound.pan(0));  // 声音均衡输出到左右声道
  
  // 播放音频
  mySound.play();
}

function draw() {
  background(200);
}
