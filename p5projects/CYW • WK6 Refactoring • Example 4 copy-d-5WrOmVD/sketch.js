/*
Inspired by the classic Windows Mystify screensaver

Based on code translation from Chris DeLeon's Programming in 5 minutes: remaking “Mystify Your Mind” Windows 95-style screensaver effect
https://www.youtube.com/watch?v=-X_A1Hqj-qA
*/


// let x1a;
// let y1a;
// let x1b;
// let y1b;

// let x1a_speed;
// let y1a_speed;
// let x1b_speed;
// let y1b_speed;

// let x2a;
// let y2a;
// let x2b;
// let y2b;

// let x2a_speed;
// let y2a_speed;
// let x2b_speed;
// let y2b_speed;

let mystify;


function setup() {
  createCanvas(windowWidth, windowHeight);
  stroke(255);
  strokeWeight(2);

  //constructor(_x1)
  // let x1=random(width);
  // mystify= new Mystify(x1);
  
  for(i=0;i<10;i++){
     mystify= new Mystify();
    
  }
  
  
//   x1a = random(width);
//   y1a = random(height);
//   x1b = random(width);
//   y1b = random(height);

//   x1a_speed = random(-10, 10);
//   y1a_speed = random(-10, 10);
//   x1b_speed = random(-10, 10);
//   y1b_speed = random(-10, 10);
  
//   x2a = random(width);
//   y2a = random(height);
//   x2b = random(width);
//   y2b = random(height);

//   x2a_speed = random(-10, 10);
//   y2a_speed = random(-10, 10);
//   x2b_speed = random(-10, 10);
//   y2b_speed = random(-10, 10);
}

function draw() {
  background(0, 10);
  mystify.show();
  mystify.move();
    mystify.bounce();
  
  
//   line(x1a, y1a, x1a, y1b);

//   x1a += x1a_speed;
//   y1a += y1a_speed;
//   x1b += x1b_speed;
//   y1b += y1b_speed;

//   if (x1a < 0 || x1a > width) x1a_speed *= -1;
//   if (y1a < 0 || y1a > height) y1a_speed *= -1;
//   if (x1a < 0 || x1b > width) x1b_speed *= -1;
//   if (y1b < 0 || y1b > height) y1b_speed *= -1;
//   //draw a line
//   line(x2a, y2a, x2a, y2b);
// //move the line
//   x2a += x2a_speed;
//   y2a += y2a_speed;
//   x2b += x2b_speed;
//   y2b += y2b_speed;
// //bounce the line
//   if (x2a < 0 || x2a > width) x2a_speed *= -1;
//   if (y2a < 0 || y2a > height) y2a_speed *= -1;
//   if (x2a < 0 || x2b > width) x2b_speed *= -1;
//   if (y2b < 0 || y2b > height) y2b_speed *= -1;
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}

class Mystify{
  constructor(){
    this.x1 = random(width)
    this.y1 = random(height)
    this.x1speed = random(-10,10)
    this.y1speed = random(-10,10)
    this.x2 = random(width)
    this.y2 = random(height)
    this.x2speed = random(-10,10)
    this.y2speed = random(-10,10)
    
  }
  show(){
    line(this.x1,this.y1,this.x2,this.y2);
  }
  
  move(){
  this.x1 += this.x1speed;
   this.y1 += this.y1speed;
 this.x2 += this.x2speed;
   this.y2 += this.y2speed;
  }
  
  
  bounce(){
  if (this.x1 < 0 || this.x1 > width) this.x1speed *= -1;
  if (this.y1 < 0 || this.y1 > height) this.y1speed *= -1;
  if (this.x2 < 0 || this.x2 > width) this.x2speed *= -1;
  if (this.y2 < 0 || this.y2 > height) this.y2speed *= -1;
  }
}










