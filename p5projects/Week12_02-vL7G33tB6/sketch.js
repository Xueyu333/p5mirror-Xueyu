let words = [];
let str = "";

function preload() {
  loadStrings("poem.txt", process);
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  if (frameCount % 30 == 1) {
    str += random(words) + " ";
  }

  textSize(16);
  fill(0);
  text(str, 10, 30, width - 20);
}

function process(lines) {
  for (let line of lines) {
    let tokens = splitTokens(line);
    words = words.concat(tokens);
  }

  for (let w = words.length - 1; w >= 0; w--) {
    let word = words[w];
    word = word.replace(/[-_:;.,!?()]/g, "");
    word = word.toLowerCase();
    word = word.trim();
    if (word.length < 1) words.splice(w, 1);
    else words[w] = word;
  }
}
