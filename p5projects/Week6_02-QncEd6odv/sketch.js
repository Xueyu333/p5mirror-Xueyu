let xs = [];
let ys = [];

let xspeed = [];
let yspeed = [];


function setup() {
  createCanvas(400, 400);
  
  for(let i=0; i<20;i++){
    xs[i]=random(width);
    ys[i]=random(height);
    xspeed[i]=random(-5,5);
    yspeed[i]=random(-5,5);
  }

}

function draw() {
  background(220);

  for(i=0;i<20;i++){
    xs[i]+= xspeed[i];
    ys[i]+= yspeed[i];
    
    if(xs[i]<=0 || xs[i] >= width){
       xspeed[i] *= -1;
    }
    
     if(ys[i]<=0 || ys[i] >= width){
       yspeed[i] *= -1;
    }
     ellipse(xs[i], ys[i], 50, 50);
    
  }
}
  
  
  
//   x1 += x1speed;
//   y1 += y1speed;

//   x2 += x2speed;
//   y2 += y2speed;
  
//   if (x1 <= 0 || x1 >= width) {
//     x1speed *= -1;
//   }

//   if (y1 <= 0 || y1 >= height) {
//     y1speed *= -1;
//   }

//   if (x2 <= 0 || x2 >= width) {
//     x2speed *= -1;
//   }

//   if (y2 <= 0 || y2 >= height) {
//     y2speed *= -1;
//   }

//   ellipse(x1, y1, 50, 50);
//   ellipse(x2, y2, 50, 50);
// }
