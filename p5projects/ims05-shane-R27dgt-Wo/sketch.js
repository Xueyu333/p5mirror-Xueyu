//https://github.com/ml5js/ml5-library/blob/main/docs/reference/bodypix.md

let video;
let bodySegmentation;
let segmentation;
let captureInterval = 3000; // 3 seconds between captures
let lastCaptureTime = 0;
let bodySegments = []; // Array to store body segment images
let personPresent = false;
let personAbsentFrames = 0; // Counter for consecutive frames with no person
let clearThreshold = 30; // Number of frames with no person before clearing
let personImage; // Image for the current segmentation

function preload() {
  // Preload the BodyPix model
  bodySegmentation = ml5.bodySegmentation("BodyPix", {
    maskType: "person", //detect entire person as one mask
    outputStride: 16, //Controls the resolution of the internal feature map; lower = higher accuracy, slower speed
    segmentationThreshold: 0.5 //Confidence threshold (0 to 1)
  });
}

function setup() {
  // Create a canvas that covers the full viewport
  createCanvas(windowWidth, windowHeight);
  
  // Create a video capture - keep original resolution for processing
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide(); // Hide the default HTML element
  
  // Create an image for person segmentation
  personImage = createImage(video.width, video.height);
  
  // Start the continuous detection process
  bodySegmentation.detectStart(video, gotResults);
  
  // Display loading message
  textSize(24);
  textAlign(CENTER, CENTER);
  fill(255);
  text("Loading model...", width/2, height/2);
}

// Window resize handling - important for fullscreen
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Callback function for body segmentation
function gotResults(result) {
  segmentation = result;
  
  // Check if a person is present in the frame
  if (segmentation && segmentation.mask) {
    // Check if there are any body parts detected by sampling some pixels
    let hasBodyParts = false;
    segmentation.mask.loadPixels();
    
    for (let i = 0; i < segmentation.mask.pixels.length; i += 4) {
      // If any semi-transparent pixel is found in the mask
      if (segmentation.mask.pixels[i + 3] < 255) {
        hasBodyParts = true;
        break;
      }
    }
    
    personPresent = hasBodyParts;
    
    if (personPresent) {
      // Reset the counter if a person is detected
      personAbsentFrames = 0;
      
      // Check if it's time to capture a new segment
      const currentTime = millis();
      if (currentTime - lastCaptureTime >= captureInterval) {
        captureBodySegment();
        lastCaptureTime = currentTime;
      }
    } else {
      // Increment counter for frames with no person
      personAbsentFrames++;
      
      // Clear all segments if no person detected for a certain number of frames
      if (personAbsentFrames >= clearThreshold) {
        bodySegments = [];
        personAbsentFrames = 0;
      }
    }
  }
}

// Function to extract person from video using mask
function copyPersonPixels(videoImg, maskImg, resultImg) {
  videoImg.loadPixels();
  maskImg.loadPixels();
  resultImg.loadPixels();
  
  const totalPixels = resultImg.pixels.length;
  const imgChannels = 4;
  
  for (let i = 0; i < totalPixels; i += imgChannels) {
    // Check alpha channel of mask
    let maskAlpha = maskImg.pixels[i + 3];
    
    if (maskAlpha === 255) {
      // If mask pixel is fully opaque (background), make result transparent
      resultImg.pixels[i + 3] = 0;
    } else {
      // If mask pixel is not fully opaque (person), copy video pixel
      resultImg.pixels[i] = videoImg.pixels[i];
      resultImg.pixels[i + 1] = videoImg.pixels[i + 1];
      resultImg.pixels[i + 2] = videoImg.pixels[i + 2];
      resultImg.pixels[i + 3] = 255; // Fully opaque
    }
  }
  
  resultImg.updatePixels();
}

// Capture current body segment and add to collection
function captureBodySegment() {
  if (!segmentation || !segmentation.mask) return;
  
  // Create a copy of the current segmentation
  let capturedImage = createImage(video.width, video.height);
  
  // Extract person from video using mask
  copyPersonPixels(video, segmentation.mask, capturedImage);
  
  // Generate random position within canvas bounds
  const size = min(300, width/4); // Adjust size based on screen width
  let x = random(size, width - size);
  let y = random(size, height - size);
  
  // Add to body segments array
  bodySegments.push({
    img: capturedImage,
    x: x,
    y: y,
    size: size
  });
  
  console.log("Captured body segment. Total captures:", bodySegments.length);
}

function draw() {
  // Optional: Use a different background color or gradient instead of black
  // background(10, 10, 30); // Dark blue background
  
  // Calculate video scaling to cover the entire canvas
  let scaleRatio;
  if (width/height > video.width/video.height) {
    // If canvas is wider than video
    scaleRatio = width / video.width;
  } else {
    // If canvas is taller than video
    scaleRatio = height / video.height;
  }
  
  let scaledWidth = video.width * scaleRatio;
  let scaledHeight = video.height * scaleRatio;
  
  // Center the video
  let vidX = (width - scaledWidth) / 2;
  let vidY = (height - scaledHeight) / 2;
  
  // Draw scaled video (mirrored horizontally for natural interaction)
  push();
  translate(width, 0); // Move to right edge
  scale(-1, 1); // Flip horizontally
  image(video, vidX, vidY, scaledWidth, scaledHeight);
  pop();
  
  // Draw all saved body segments
  for (let segment of bodySegments) {
    // Apply mirroring effect to segments
    push();
    translate(segment.x + segment.size/2, segment.y + segment.size/2);
    scale(-1, 1);
    image(segment.img, -segment.size/2, -segment.size/2, segment.size, segment.size);
    pop();
  }
  
  // Display status information
  fill(255);
  textSize(16);
  textAlign(LEFT, BOTTOM);
  text("Person detected: " + (personPresent ? "Yes" : "No"), 20, height - 40);
  text("Captures: " + bodySegments.length, 20, height - 20);
  
  // Instructions
  fill(255, 255, 200);
  textSize(18);
  textAlign(CENTER);
  text("Body segments are captured every 3 seconds", width/2, 30);
  text("Walk out of frame to clear all images", width/2, 60);
}

// Add this function to support toggling fullscreen mode with a key press
function keyPressed() {
  if (key === 'f' || key === 'F') {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}