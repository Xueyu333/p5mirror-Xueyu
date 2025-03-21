let x,y,x1,y1,x2,y2,x3,y3;
let x4,y4,x5,y5,x6,y6,x7,y7;
let w2h;
let xspeed;
let yspeed=10;

function setup() {
  createCanvas(800, 400);
  x = width / 2;
  y = height / 2;
  x1 = width / 2;
  y1 = height / 2;
  x2 = width / 2;
  y2 = height / 2;
  x3 = width / 2;
  y3 = height / 2;
  x4=x5=x6=x7=width/2;
  y4=y5=y6=y7=height/2;
  
  w2h=width/height;
  xspeed = yspeed * w2h;
}

function draw() {
  background(220);
  // up down left right
  circle(x, y, 30);
  x++;

  circle(x1, y1, 30);
  x1--;

  circle(x2, y2, 30);
  y2++;

  circle(x3, y3, 30);
  y3--;
  
  //to corner
  circle(x4,y4,30)
  x4+=1*w2h;
  y4+=1;
  
  circle(x5,y5,30)
   x5-=1*w2h;
   y5+=1;
  
  circle(x6,y6,30)
   x6-=1*w2h;
   y6-=1;
  
  //change speed
   circle(x7,y7,30)
   x7+=xspeed;
   y7-=yspeed;
  
  
}
