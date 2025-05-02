
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
    maskType: "person",
    outputStride: 16,
    segmentationThreshold: 0.5
  });
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Create a video capture
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  
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

// Window resize handling
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
      // If any non-transparent pixel is found in the mask
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
  const size = 100; // Size similar to your face snapshot example
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
  // Clear the canvas
  background(0);
  
  // Calculate video position to center it
  let vidX = (width - video.width) / 2;
  let vidY = (height - video.height) / 2;
  
  // Draw the video feed (mirrored)
  push();
  translate(width, 0);
  scale(-1, 1);
  let mirroredVidX = -width + vidX;
  image(video, mirroredVidX, vidY);
  pop();
  
  // Show current live segmentation (person with transparent background)
  if (segmentation && segmentation.mask) {
    // Extract person from current video frame
    copyPersonPixels(video, segmentation.mask, personImage);
    
    // Draw the live person with proper mirroring
    push();
    translate(width, 0);
    scale(-1, 1);
    image(personImage, mirroredVidX, vidY);
    pop();
  }
  
  // Draw all saved body segments at their random positions
  for (let segment of bodySegments) {
    // Apply mirroring when showing the saved segments
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