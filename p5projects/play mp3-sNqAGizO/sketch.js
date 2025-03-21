//NOTE: This example requires you to first
//download an mp3 and upload it into your
//sketch files.  To do this, click on the 
//small error just above and to the left
//of this comment, then click on the small
//arrow to the right of "Sketch Files,"
//then choose "Upload file" and drag your
//mp3 into the pop-up window.

let mySound;

function preload() {
  soundFormats('mp3');
  rooster = loadSound('0001.mp3');
}

function setup() {
  createCanvas(300, 300);
  background(220);
}

function mousePressed() {
  rooster.play();
}