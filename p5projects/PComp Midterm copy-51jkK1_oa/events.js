let strech = 1;
let zoom_grassland = 1;
let zoom_doll = 1;
let angle = 0;

function switchEvent(){
  if (lastEvent != "switch")
    switchNum += 1;
  switchAnimation(switchNum);
}

function failEvent(){
  image(sky, width / 2, height / 2, width, height);
  fill(200, 0, 10);
  textSize(width / 9);
  text("YOU FAIL !", width / 2, height / 2);
  image(doll1, random(0, width), random(0, height), width / 4, width / 3);
  image(doll2, random(0, width), random(0, height), width / 4, width / 3);
  resetState();
}

function startEvent(){
  image(doorstep, width / 2, height / 3, width, 5 * width / 4);
  fill(0);
  textSize(width / 50);
  text("Someone left two babies at your doorstep\nwith a note of nursing tips", width * 0.35, height / 4);
  fill(200, 0, 10);
  textSize(width / 40);
  text("Shake the cradle when you're ready", width * 0.6, height * 0.4);
  resetState();
}

function middleEvent(){
  image(sky, width / 2, height / 2, width, height);
  fill(200, 0, 10);
  textSize(width / 10);
  text(timeLeft, width / 2, height / 5);
  drawdolls();
}

function finalEvent(){
  background(0);
  fill(200, 0, 10);
  textSize(width / 10);
  text("You Can Never\nEscape Again", width / 2, height / 2);
  resetState();
}

function drawdolls(){
  image(doll1, width / 3, height / 2, width / 3, 4 * width / 9);
  image(doll2, 2 * width / 3, height / 2, width / 3, 4 * width / 9);
}

function switchAnimation(switchNum){
  if (switchNum == 0){
    image(sky, width / 2, height / 2, width, height);
    drawdolls();
  }
  if (switchNum == 1){
    image(sky, width / 2, height / 2, width, height);
    textSize(width * 0.05);
    for (let i = 0.04 * height; i <= height; i += height * 0.1){
      // fill(0);
      // text("Welcome to Our Playground!!!!!!!!!!!!!!!!!!!!!", width / 2, i);
      fill(200, 0, 10);
      text("Welcome to Our Playground !!!!!!!!!!!!!!!!!!!!!", width / 2, i);
    }
    drawdolls();
  }
  if (switchNum == 2){
    image(sky, width / 2, height / 2, width, height);
    push();  // 保存当前的变换状态
    scale(1, -1);  // 纵向翻转，y轴反转
    image(doll1, width / 3, - height / 2, width / 3, 4 * width / 9);
    image(doll2, 2 * width / 3, - height / 2, width / 3, 4 * width / 9);
    pop();  // 恢复到原始变换状态
  }
  if (switchNum == 3){
    image(sky, width / 2, height / 2, width, height);
    image(doll1, width / 3, height / 2, width / 3, strech * 4 * width / 9);
    image(doll2, 2 * width / 3, height / 2, width / 3, strech * 4 * width / 9);
    strech += 0.03;
  }
  if (switchNum == 4){
    image(sky, width / 2, height / 2, width, height);
    push();  // 保存当前变换状态
    translate(width / 3, height / 2);  // 将坐标系移到第一张图片的位置
    rotate(angle);  // 旋转图片1
    image(doll1, 0, 0, width / 3, 4 * width / 9);  // 绘制图片1，旋转围绕它的中心
    pop();  // 恢复变换状态
    push();  // 保存当前变换状态
    translate(2 * width / 3, height / 2);  // 将坐标系移到第二张图片的位置
    rotate(-angle);  // 旋转图片2
    image(doll2, 0, 0, width / 3, 4 * width / 9);  // 绘制图片2，旋转围绕它的中心
    pop();  // 恢复变换状态
    angle += 0.15;
  }
  if (switchNum == 5){
    image(sky, width / 2, height / 2, width, height);
    image(weirddoll1, width / 3, height / 2, width / 3, 4 * width / 9);
    image(weirddoll2, 2 * width / 3, height / 2, width / 3, 4 * width / 9);
  }
  if (switchNum == 6){
    image(grassland, width / 2, height / 2, zoom_grassland * width, zoom_grassland * width);
    fill(0);
    textSize(width * 0.03);
    text("Are You Here\nWith Us?", width / 2, height / 6);
    drawdolls();
    zoom_grassland += 0.001;
  }
  if (switchNum == 7){
    image(grassland, width / 2, height / 3, zoom_grassland * width * 2, zoom_grassland * width * 2);
    fill(0);
    textSize(width * 0.03);
    text("Let's\nGo Home", width / 2, height / 6);
    image(weirddoll1, width / 3, height / 2, width / 3, 4 * width / 9);
    image(weirddoll2, 2 * width / 3, height / 2, width / 3, 4 * width / 9);
    zoom_grassland += 0.002;
  }
  if (switchNum == 8){
    background(0);
    fill(200, 0, 10);
    textSize(width * 0.1);
    text("Don't Leave Us", width / 2, height / 8);
    image(weirddoll1, width / 4, 2 * height / 3, zoom_doll * width / 3, zoom_doll * 4 * width / 9);
    image(weirddoll2, 3 * width / 4, 2 * height / 3, zoom_doll * width / 3, zoom_doll * 4 * width / 9);
    zoom_doll += 0.003;
  }
}

function resetState(){
  switchNum = -1;
  strech = 1;
  zoom_grassland = 1;
  zoom_doll = 1;
  angle = 0;
}
