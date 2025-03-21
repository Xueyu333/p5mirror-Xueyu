let input;

function setup() {
  createCanvas(400, 400);

  input = createInput("");
  input.position(0, 400);
}

function draw() {
  background(220);
  let textType = input.value();

  text("type something", 100, 200);
  text(textType, 5, 50);
}
function keyPressed() {
  if (keyCode === ENTER) {
    input.value("");
  }
}
