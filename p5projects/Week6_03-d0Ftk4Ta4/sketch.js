let balls=[];

function setup() {
  createCanvas(400, 400);
 
}

function mousePressed() {
  let x = random(width);
  let y = random(height);
  let r = random(20,80);
  let b = new ball(mouseX,mouseY,r);
  balls.push(b);
}

function draw() {
 background(220);
 for (let ball of balls) {
  ball.move();
  ball.show();
  ball.bounce();
}
}
 
class ball {
  constructor(x,y,r){
    this.x = x; 
    this.y = y;
    this.r = r;
    this.xspeed = random(-5, 5); 
    this.yspeed = random(-5, 5); 
  }
  
  
  move() {
    this.x+= this.xspeed;
    this.y += this.yspeed ;
  }
  
  bounce(){
     if (this.x < 0 || this.x > width) {
      this.xspeed *= -1;
    }
    if (this.y < 0 || this.y > height) {
      this.yspeed *= -1;
    }
  }

  show() {
   
    ellipse(this.x, this.y, this.r );
  }
}
  

