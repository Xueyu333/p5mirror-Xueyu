/*

See classification.
https://learn.ml5js.org/#/reference/image-classifier

*/

let video;
let classifier;

let osc;
let BASE = 220;
let label = '';

function preload() {
  classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/hgaXz_OEQ/');
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  
  // Start classifying
  classifier.classify(video, gotResult);
  
  osc = new p5.Oscillator();
  osc.setType('sine');
  osc.freq(0);
  osc.start();
  osc.amp(1);
  
  textAlign(LEFT, TOP);
  textSize(36);
}


function draw() {
  background(220);
  image(video, 0, 0);
  text(label, 20, 20);
}

function gotResult(results){
  console.log(results[0].confidence);
  label = results[0].label
  if(label == "Nostrils") osc.freq(BASE);
  else if(label == "Smile") osc.freq(BASE*1.5);
  else if(label == "Eyebrows") osc.freq(BASE*2);
  
  // Get the next frame and classify that.
  classifier.classify(video.get(), gotResult);
}