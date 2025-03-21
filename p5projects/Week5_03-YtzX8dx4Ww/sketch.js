function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  number(3,3);
  print(sum);
  textSize(20);
  text(sum,200,200);
  
}

function number(x,y){
 sum = x+y;
  return (sum);
}
