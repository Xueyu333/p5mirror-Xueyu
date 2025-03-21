let sliderValue = 100;

function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(sliderValue, sliderValue + 10, sliderValue + 20);

  //slider
  fill(255, 255, 255);
  noStroke();
  rect(100, height / 2 - 10, 600, 20);

  //slider change color
  fill("#FF7A70");
  rect(100, height / 2 - 10, sliderValue - 100, 20);

  circle(sliderValue, height / 2, 50);

  if (mouseIsPressed) {
    if (mouseX > 100 && mouseX < width - 100) {
      sliderValue = mouseX;
    }
  }
}
