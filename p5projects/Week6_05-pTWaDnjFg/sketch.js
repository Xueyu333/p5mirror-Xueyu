let balls = [];

function setup() {
  createCanvas(400, 400);
}

function mousePressed() {
  let offsetX = random(-50, 50);
  let offsetY = random(-50, 50);
  let x = constrain(mouseX + offsetX, 0, width);
  let y = constrain(mouseY + offsetY, 0, height);
  let r = random(20, 80);
  let b = new ball(x, y, r);
  balls.push(b);
}

function draw() {
  background(220);
  for (let ball of balls) {
    ball.move();
    ball.show();
    ball.bounce();
    // ball.followMouse();
  }

  for (let i = balls.length - 1; i >= 0; i--) {
    if (balls[i].eraseBall()) {
      balls.splice(i, 1);
    }
  }
}

class ball {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.xspeed = random(-5, 5);
    this.yspeed = random(-5, 5);
  }

  move() {
    this.x += this.xspeed;
    this.y += this.yspeed;
  }

  bounce() {
    if (this.x < 0 || this.x > width) {
      this.xspeed *= -1;
    }
    if (this.y < 0 || this.y > height) {
      this.yspeed *= -1;
    }
  }

  followMouse() {
    let dx = mouseX - this.x;
    let dy = mouseY - this.y;

    let ratio = 0.1;

    this.x += dx * ratio;
    this.y += dy * ratio;
  }

  show() {
    ellipse(this.x, this.y, this.r);
  }

  eraseBall() {
    let d = dist(mouseX, mouseY, this.x, this.y);
    return d < this.r / 2;
  }
}
