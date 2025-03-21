let num =36;
let swWidth;
let slice =360/num ;
let off=0;


function setup() {
  createCanvas(400, 400);
  colorMode(HSB,360,100,100);
  swWidth=width/num;
  noStroke();
}

function draw() {
  background(220);
  
  
  off++;
  for(let sw =0; sw<num; sw++){
    let h= sw*slice+off;
    // if(h>360)h = 0;
    h%=360;
    let x = sw * width/36;
    fill(h,100,100);
    rect(x,0,width/36,height);
  }
}