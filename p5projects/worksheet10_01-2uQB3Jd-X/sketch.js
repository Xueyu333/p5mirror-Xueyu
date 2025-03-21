let music;
let button;

function preload() {
  music = loadSound('music01.mp3'); 
}

function setup() {
  createCanvas(400, 400);
  button=createButton('play');
  button.mousePressed(toggleMusic);
}

function draw() {
  background(220);
  if (music.isPlaying()) {
    button.html('Pause');
  } else {
    button.html('Play');
  }
} 

function toggleMusic() {
  if (music.isPlaying()) {
    music.pause();
  } else {
    music.play();
  }
}