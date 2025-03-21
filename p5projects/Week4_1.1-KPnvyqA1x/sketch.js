let w;
function setup() {
  createCanvas(400, 400);

  w = width / 20;
}

function draw() {
  background(220);
  rect(0, 0, w, height);
  rect(w, 0, w, height);
  rect(2 * w, 0, w, height);
  rect(3 * w, 0, w, height);
  rect(4 * w, 0, w, height);
  rect(5 * w, 0, w, height);
  rect(6 * w, 0, w, height);
  rect(7 * w, 0, w, height);
  rect(8 * w, 0, w, height);
  rect(9 * w, 0, w, height);
  rect(10 * w, 0, w, height);
  rect(11 * w, 0, w, height);
  rect(12 * w, 0, w, height);
  rect(13 * w, 0, w, height);
  rect(14 * w, 0, w, height);
  rect(15 * w, 0, w, height);
  rect(16 * w, 0, w, height);
  rect(17 * w, 0, w, height);
  rect(18 * w, 0, w, height);
  rect(19 * w, 0, w, height);
  rect(20 * w, 0, w, height);

  push();
  if (mouseX <= w && mouseX > 0) {
    fill("red");
    rect(0, 0, w, height);
  }
  pop();

  push();
  if (mouseX <= 2 * w && mouseX > w) {
    fill("red");
    rect(w, 0, w, height);
  }
  pop();

  push();
  if (mouseX > 2 * w && mouseX <= 3 * w) {
    fill("red");
    rect(2 * w, 0, w, height);
  }
  pop();
  
  
  push();
  if (mouseX > 3 * w && mouseX <= 4 * w) {
    fill("red");
    rect(3 * w, 0, w, height);
  }
  pop();
  
   
  push();
  if (mouseX > 4 * w && mouseX <= 5 * w) {
    fill("red");
    rect(4 * w, 0, w, height);
  }
  pop();
  
  
  push();
  if (mouseX > 5 * w && mouseX <= 6 * w) {
    fill("red");
    rect(5 * w, 0, w, height);
  }
  pop();
  
  
  
  push();
  if (mouseX > 6 * w && mouseX <= 7 * w) {
    fill("red");
    rect(6 * w, 0, w, height);
  }
  pop();
  
  
    
  push();
  if (mouseX > 7 * w && mouseX <= 8 * w) {
    fill("red");
    rect(7 * w, 0, w, height);
  }
  pop();
  
  
      
  push();
  if (mouseX > 8 * w && mouseX <= 9 * w) {
    fill("red");
    rect(8 * w, 0, w, height);
  }
  pop();
  
  
      
  push();
  if (mouseX > 9 * w && mouseX <= 10 * w) {
    fill("red");
    rect(9 * w, 0, w, height);
  }
  pop();
  
  
      
  push();
  if (mouseX > 10 * w && mouseX <= 11 * w) {
    fill("red");
    rect(10 * w, 0, w, height);
  }
  pop();
  
  
  
    push();
  if (mouseX > 11 * w && mouseX <= 12 * w) {
    fill("red");
    rect(11 * w, 0, w, height);
  }
  pop();
  
  
    
    push();
  if (mouseX > 12 * w && mouseX <= 13 * w) {
    fill("red");
    rect(12 * w, 0, w, height);
  }
  pop();
  
  
   
    push();
  if (mouseX > 13 * w && mouseX <= 14 * w) {
    fill("red");
    rect(13 * w, 0, w, height);
  }
  pop();
  
  
    push();
  if (mouseX > 14 * w && mouseX <= 15 * w) {
    fill("red");
    rect(14 * w, 0, w, height);
  }
  pop();
  
  
   
    push();
  if (mouseX > 15 * w && mouseX <= 16 * w) {
    fill("red");
    rect(15 * w, 0, w, height);
  }
  pop();
  
    push();
  if (mouseX > 16 * w && mouseX <= 17 * w) {
    fill("red");
    rect(16 * w, 0, w, height);
  }
  pop();
  
  
    push();
  if (mouseX > 17 * w && mouseX <= 18 * w) {
    fill("red");
    rect(17 * w, 0, w, height);
  }
  pop();
  
  
  
   push();
  if (mouseX > 18 * w && mouseX <= 19 * w) {
    fill("red");
    rect(18 * w, 0, w, height);
  }
  pop();
  
  
     push();
  if (mouseX > 19 * w && mouseX <= 20 * w) {
    fill("red");
    rect(19 * w, 0, w, height);
  }
  pop();
  
  
  
}
