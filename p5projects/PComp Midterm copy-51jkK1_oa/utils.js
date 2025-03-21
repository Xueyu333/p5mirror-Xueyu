function keyPressed() {
  if (key === 'f') {
    let fs = fullscreen();
    fullscreen(!fs); // 切换全屏状态
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function preload() {
  myFont = loadFont('assets/Minecraft.ttf');
  doll1 = loadImage('assets/doll1.png');
  doll2 = loadImage('assets/doll2.png');
  weirddoll1 = loadImage('assets/weirddoll1.png');
  weirddoll2 = loadImage('assets/weirddoll2.png');
  grassland = loadImage('assets/grassland.jpg');
  sky = loadImage('assets/sky.jpg');
  doorstep = loadImage('assets/doorstep.jpg');
}