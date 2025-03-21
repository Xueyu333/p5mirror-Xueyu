/*
Based on Alexander Miller’s video on Recreating Vintage Computer Art with Processing and inspired by John Whitney's work:
https://www.youtube.com/watch?v=LaarVR1AOvs&t=181s
*/

let t = 0;
let numLines = 40;

function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeWeight(2);
  stroke(255);
}

function draw() {
  background(0);
  translate(width / 2, height / 2);

  let amplitude = width / 3;

  for (let i = 0; i < numLines; i++) {
    
    // 运动方向是从左到右（顺时针）
    let x1 = sin((t + i) / 10) * amplitude;
    // 运动方向是从右到左（逆时针）
    // let y1 = cos((t + i) / 10) * amplitude + sin(((t + 1) / 5) * 50);
    let y1 = cos((t + i) / 10) * amplitude + sin(((t + 1) / 5) * 50);

    let x2 = sin((t + i) / 20) * (amplitude * 2) + cos(t + 1) * 10;
    let y2 = cos((t + i) / 10) * (amplitude * 2);
    // let y2 = cos((-t + i) / 10) * (amplitude * 2);



     let x3 = -sin((t + i) / 10) * amplitude;
     let y3 = -cos((t + i) / 10) * amplitude + sin(((t + 1) / 5) * 50);
 
     let x4 = -sin((t + i) / 20) * (amplitude * 2) + cos(t + 1) * 10;
     let y4 = -cos((t + i) / 10) * (amplitude * 2);

    line(x1, y1, x2, y2);
    line(x3, y3, x4, y4);
  }

  t += 0.2;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}


//当 x 坐标使用 sin(t) 而 y 坐标使用 cos(-t) 时，会创造出一种相反方向的运动
// 这种反向运动让图形产生更复杂的旋转效果
// 特别是在有多条线（numLines = 40）的情况下，会产生一种交错的视觉效果
//去掉-，所有线条会朝同一个方向运动，失去原来的交错效果。