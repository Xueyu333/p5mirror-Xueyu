// Coding Train / Daniel Shiffman
// http://thecodingtrain.com

// Code for: https://youtu.be/Pn1g1wjxl_0

// "Just Like a Rainbow by the Columbians" (rainbow.mp3)
// can be downloaded @ https://github.com/CodingTrain/website-archive/blob/main/Tutorials/P5JS/p5.js_sound/17.1_playSong/rainbow.mp3

let song;
let sliderRate;
let sliderPan;

// function preload() {
//   song = loadSound('this-dot-kp.mp3');
// }

function setup() {
  createCanvas(200, 200);
  song = loadSound('this-dot-kp.mp3', loaded);
  song.setVolume(0.5);
  sliderRate = createSlider(0, 1.5, 1, 0.01);
  sliderPan = createSlider(-1, 1, 0, 0.01);
}

function loaded() {
  song.play();
}

function draw() {
  background(random(255));
  song.pan(sliderPan.value());
  song.rate(sliderRate.value());
}