// use one finger to take a snapshot, and adds a poetic line next to it
//five fingers to clear all images
//https://docs.ml5js.org/#/
//created with GPT's support

//github
//https://xueyu333.github.io/ims-2025-shane/week3_HandposeSnapshot/
let video; 
let faceapi; // ml5 faceApi model
let handpose; // ml5 handpose model
let detections = []; //store face detection results
let predictions = []; //store handpose predictions
let lastGesture = null; //track last gesture to avoid duplicates
let gestureTimeout = null; //timer to avoid repeating the same gesture too quickly
let debugMode = true; // If true, show visual debug info

let confidenceThreshold = 0.9; //Only use hand detections above this confidence level

let snapshots = []; //stores face snapshots with their positions and labels
let phrases = []; //will be loaded from an external JSON file

let showInstructions = true; // Control whether to show the hint texts on screen



function preload() {
  // Load text labels for snapshots from a JSON file
  loadJSON('phrases.json', data => {
    phrases = data.phrases;
    console.log("Successfully loaded " + phrases.length + " phrases");
  });
}



function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO); 
  video.hide(); 

  // Face detection options
  const faceOptions = {
    withLandmarks: true, // Include facial landmarks
    withDescriptors: false // No need for face comparison features
  };
  faceapi = ml5.faceApi(video, faceOptions, faceModelReady); //Load faceApi model

  // Load handpose model with flip for mirrored video
  handpose = ml5.handpose(video, {
    flipHorizontal: true // Flip video so it mirrors user’s movement
  }, handposeModelReady);

  // Filter handpose results by confidence
  handpose.on('predict', results => {
    predictions = results.filter(hand => hand.handInViewConfidence > confidenceThreshold);
  });

  textFont('sans-serif'); // Use a clean font
}




function windowResized() {
  // Resize canvas when window is resized
  resizeCanvas(windowWidth, windowHeight);
}

function faceModelReady() {
  console.log("FaceAPI model ready!");
  faceapi.detect(gotFaces); // Start face detection loop
}

function handposeModelReady() {
  console.log("Handpose model ready!");
}

function gotFaces(err, result) {
  if (err) {
    console.error(err);
    return;
  }
  detections = result; // Update face detection result
  faceapi.detect(gotFaces); // Loop detection
}



function draw() {
  background(0); // Set background black

  // Calculate best-fit video dimensions
  let vidW, vidH;
  let videoRatio = video.width / video.height;
  let windowRatio = windowWidth / windowHeight;

  if (windowRatio > videoRatio) {
    vidW = windowWidth;
    vidH = vidW / videoRatio;
  } else {
    vidH = windowHeight;
    vidW = vidH * videoRatio;
  }

  // Center video within the canvas
  let xOffset = (windowWidth - vidW) / 2;
  let yOffset = (windowHeight - vidH) / 2;

  // Draw mirrored webcam video
  push();
  translate(windowWidth, 0);
  scale(-1, 1);
  image(video, xOffset, yOffset, vidW, vidH);
  pop();

  checkGestures(); // Check for gestures and respond


  // Display all saved snapshots
  for (let s of snapshots) {
    image(s.img, s.x, s.y, 100, 100);
    noStroke();
    fill(255);
    textSize(12);
    textAlign(CENTER);
    text(s.label, s.x + 50, s.y + 110);
  }

  // Display gesture and detection status text
  fill(255);
  textSize(16);
  textAlign(LEFT);
  text("Current Gesture: " + (lastGesture || "None"), 10, 30);
  text("Hand Detection: " + (predictions.length > 0 ? "Detected" : "Not Detected"), 10, 50);

  
  
  // If debug mode is on, draw hand details
  if (debugMode && predictions.length > 0) {
    const hand = predictions[0];
    text("Hand Confidence: " + nf(hand.handInViewConfidence, 1, 2), 10, 70);
    const { highestFinger, allFingers } = analyzeHand(hand.annotations);
    text("Number of Detected Fingers: " + allFingers, 10, 90);

    let scaleX = vidW / video.width;
    let scaleY = vidH / video.height;
    drawHandLandmarks(hand, xOffset, yOffset, scaleX, scaleY);

    if (highestFinger) {
      const fingerTip = hand.annotations[highestFinger][3];
      const tipX = fingerTip[0] * scaleX + xOffset;
      const tipY = fingerTip[1] * scaleY + yOffset;
      fill(0, 255, 0);
      ellipse(tipX, tipY, 15, 15);
      text("Fingertip Position", tipX + 20, tipY);
      text("Current Fingertip: " + highestFinger, 10, 110);
    }
  }

  
  
  //show instruction hints at the top
  if (showInstructions) {
    fill(255, 255, 200);
    textSize(18);
    textAlign(CENTER);
    text("Point with one finger to capture images, open all five fingers to clear all images", windowWidth/2, windowHeight - 60);
    textSize(14);
    text("Keep gesture stable for 1 second to confirm action", windowWidth/2, windowHeight - 30);
  }
}


function drawHandLandmarks(hand, xOffset, yOffset, scaleX, scaleY) {
  //show green circle on highest fingertip only (for debug)
  const { highestFinger } = analyzeHand(hand.annotations);
  if (highestFinger) {
    const fingerTip = hand.annotations[highestFinger][3];
    const x = fingerTip[0] * scaleX + xOffset;
    const y = fingerTip[1] * scaleY + yOffset;
    // Visual debug is drawn inside draw()
  }
}



 //Analyze finger positions to detect gestures
function analyzeHand(annotations) {
 

  //get the position of the palm base (used as a reference for finger height)
  const palmBase = annotations.palmBase[0];

  let highestFinger = null;   // Will store the name of the highest raised finger
  let highestY = palmBase[1]; // Start with palm base Y position
  let extendedFingers = 0;    // Count how many fingers are extended

  //check the thumb first
  const thumbTip = annotations.thumb[3];  // Fingertip of thumb
  const thumbBase = annotations.thumb[0]; // Base of thumb

  // If thumb is far enough from its base, count it as extended
  if (dist(thumbTip[0], thumbTip[1], thumbBase[0], thumbBase[1]) > 50) {
    extendedFingers++;
  }

  //names of the other fingers
  const fingerNames = ["indexFinger", "middleFinger", "ringFinger", "pinky"];

  // Loop through each finger
  for (let finger of fingerNames) {
    const fingerTip = annotations[finger][3];  // Fingertip
    const fingerBase = annotations[finger][0]; // Finger base

    //if tip is at least 25 pixels above base (on Y-axis), it's extended
    if (fingerTip[1] < fingerBase[1] - 25) {
      extendedFingers++;

      // Check if it's the highest finger so far
      if (fingerTip[1] < highestY) {
        highestY = fingerTip[1];
        highestFinger = finger;
      }
    }
  }

  // Return both the name of the highest finger and how many fingers are extended
  return {
    highestFinger: highestFinger,
    allFingers: extendedFingers
  };
}




function checkGestures() {
  if (predictions.length === 0) return; // No hands detected

  const hand = predictions[0];
  const { highestFinger, allFingers } = analyzeHand(hand.annotations);

  // Recalculate video transform and offsets for accuracy
  let videoRatio = video.width / video.height;
  let windowRatio = windowWidth / windowHeight;
  let vidW, vidH, xOffset, yOffset;

  if (windowRatio > videoRatio) {
    vidW = windowWidth;
    vidH = vidW / videoRatio;
    xOffset = 0;
    yOffset = (windowHeight - vidH) / 2;
  } else {
    vidH = windowHeight;
    vidW = vidH * videoRatio;
    xOffset = (windowWidth - vidW) / 2;
    yOffset = 0;
  }

  let scaleX = vidW / video.width;
  let scaleY = vidH / video.height;

  
  // If only one finger is extended (pointing)
  if (highestFinger && allFingers < 3 && lastGesture !== "pointing") {
    lastGesture = "pointing";
    console.log("Detected pointing gesture using " + highestFinger);

    const fingerTip = hand.annotations[highestFinger][3];
    const tipX = fingerTip[0] * scaleX + xOffset;
    const tipY = fingerTip[1] * scaleY + yOffset;
    captureSnapshot(tipX, tipY); // Take snapshot at finger tip position
    showInstructions = true; // Re-show hint

    clearTimeout(gestureTimeout);
    gestureTimeout = setTimeout(() => {
      lastGesture = null;
    }, 1000);
  }
  
  
  
  // If all 5 fingers extended (open palm)
  else if (allFingers === 5 && lastGesture !== "open_hand" && lastGesture !== "open_hand_confirm") {
    lastGesture = "open_hand_confirm";
    console.log("Open hand detected, please hold 1s to confirm clear");

    clearTimeout(gestureTimeout);
    gestureTimeout = setTimeout(() => {
      if (lastGesture === "open_hand_confirm") {
        console.log("Confirmed, clearing all snapshots");
        snapshots = [];
        showInstructions = false;
        lastGesture = "open_hand";

        setTimeout(() => {
          lastGesture = null;
        }, 1000);
      }
    }, 1000);
  }
  
  
  
  
  // If no fingers extended (fist)
  else if (allFingers === 0 && lastGesture !== "fist") {
    lastGesture = "fist";
    console.log("Fist gesture detected");
    clearTimeout(gestureTimeout);
    gestureTimeout = setTimeout(() => {
      lastGesture = null;
    }, 1000);
  }
  // If open palm interrupted
  else if (allFingers < 5 && lastGesture === "open_hand_confirm") {
    console.log("Open palm confirmation canceled");
    lastGesture = "other";
    clearTimeout(gestureTimeout);
    gestureTimeout = setTimeout(() => {
      lastGesture = null;
    }, 500);
  }
}




function captureSnapshot(x, y) {
  if (detections.length > 0) {
    let { _x, _y, _width, _height } = detections[0].alignedRect._box;

    // Same transform logic as before
    let videoRatio = video.width / video.height;
    let windowRatio = windowWidth / windowHeight;
    let vidW, vidH, xOffset, yOffset;

    if (windowRatio > videoRatio) {
      vidW = windowWidth;
      vidH = vidW / videoRatio;
      xOffset = 0;
      yOffset = (windowHeight - vidH) / 2;
    } else {
      vidH = windowHeight;
      vidW = vidH * videoRatio;
      xOffset = (windowWidth - vidW) / 2;
      yOffset = 0;
    }

    let scaleX = vidW / video.width;
    let scaleY = vidH / video.height;

    // Get face image
    let faceImg = video.get(_x, _y, _width, _height);

    // Mirror manually
    let mirroredFace = createImage(_width, _height);
    mirroredFace.copy(faceImg, 0, 0, _width, _height, 0, 0, _width, _height);
    mirroredFace.loadPixels();
    for (let y = 0; y < _height; y++) {
      for (let x = 0; x < _width / 2; x++) {
        let i1 = 4 * (y * _width + x);
        let i2 = 4 * (y * _width + (_width - 1 - x));
        for (let i = 0; i < 4; i++) {
          let tmp = mirroredFace.pixels[i1 + i];
          mirroredFace.pixels[i1 + i] = mirroredFace.pixels[i2 + i];
          mirroredFace.pixels[i2 + i] = tmp;
        }
      }
    }
    mirroredFace.updatePixels();

    let label = random(phrases); // Choose a random label
    let snapX = constrain(x - 30, 0, windowWidth - 60);
    let snapY = constrain(y - 30, 0, windowHeight - 80);

    snapshots.push({ img: mirroredFace, x: snapX, y: snapY, label });
    showInstructions = true;
  }
}






function keyPressed() {
  if (key === 's' && detections.length > 0) {
    captureSnapshot(random(windowWidth - 60), random(windowHeight - 80));
  }
  if (key === 'c') {
    snapshots = [];
    showInstructions = false;
  }
  if (key === 'd') {
    debugMode = !debugMode;
  }
}
