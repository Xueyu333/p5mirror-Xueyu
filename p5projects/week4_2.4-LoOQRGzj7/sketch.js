let w;


function setup() {
  createCanvas(400, 400);
  w = width / 20;
}

function draw() {
  background(220);
   
  for (let i = 0; i < 20; i++) {
    if (mouseX > i * w && mouseX < (i + 1) * w) {
      let randomcolor=color(i+50,i*12,i*13);
      fill(randomcolor);
    } else {
      fill("white");
    }
    rect(i * w, 0, w, height);
  }
}
