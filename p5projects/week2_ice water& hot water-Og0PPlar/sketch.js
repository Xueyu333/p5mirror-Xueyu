let from;
let to;
let t = 0;
let y1,y2,y3,y4,y5;
y1=y2=y3=y4=y5=300;

function setup() {
  createCanvas(400, 400);
  from = color("rgb(131,191,235)");
  to = color("rgb(224,70,70)");
}

function draw() {
  background(220);
  let interA = lerpColor(from, to, t);

  if (mouseIsPressed){
    t+=0.01;
            y1-=2;
            y2--;
            y3-=2;
            y4-=3;
            y5-=3;
           }
  else { y1=y2=y3=y4=y5=300;
    t=0;}
  
  fill(255,255,255);
  quad(100, 200, 300, 200, 270, 400, 130, 400);

  strokeWeight(0);
  fill(interA);
  quad(115, 300, 285, 300, 270, 400, 130, 400);
  
  let alpha = map(t, 0, 1, 0, 255);
  
  fill(224,70,70,alpha);
  circle(130,y1,30);
  circle(200,y2,30);
  circle(230,y3,30);
  circle(270,y4,30);
  circle(160,y5,30);
  
}
