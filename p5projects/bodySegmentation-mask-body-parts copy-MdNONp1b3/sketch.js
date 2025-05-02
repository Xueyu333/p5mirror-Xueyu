/*
 * 👋 Hello! This is an ml5.js example made and shared with ❤️.
 * Learn more about the ml5.js project: https://ml5js.org/
 * ml5.js license and Code of Conduct: https://github.com/ml5js/ml5-next-gen/blob/main/LICENSE.md
 *
 * This example demonstrates segmenting a person by body parts with ml5.bodySegmentation.
 
 */
let bodySegmentation;
let video;
let segmentation;

let options = {
  maskType: "person",
};

function preload() {
  bodySegmentation = ml5.bodySegmentation("BodyPix", options);
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  bodySegmentation.detectStart(video, gotResults);
}

function draw() {
  background(0); // 黑色背景

  image(video, 0, 0);

  if (segmentation) {
    image(segmentation.mask, 0, 0, width, height); // 直接显示分割后的人物图像
  }
}

function gotResults(result) {
  segmentation = result;
}
