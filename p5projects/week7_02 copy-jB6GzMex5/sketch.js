let input;

function setup() {
  createCanvas(400, 400);

  input = createInput("type something");
  input.position(0, 400);
}

function draw() {
  background(220);
  let textType = input.value();
  text(textType, 5, 50);
}
function keyPressed() {
  if (keyCode === ENTER) {
    input.value("");
  }
}
