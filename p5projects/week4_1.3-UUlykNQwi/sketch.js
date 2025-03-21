let w;
function setup() {
  createCanvas(400, 400);
  w=width/20;
}

function draw() {
  background(220);
  
  let i=-1
  while(i<20){
    i ++;
  
     if(mouseX > i * w && mouseX < (i + 1) * w){
      fill("red")
    }else{fill("white");}
    rect(i*w,0,w,height);
  }
}