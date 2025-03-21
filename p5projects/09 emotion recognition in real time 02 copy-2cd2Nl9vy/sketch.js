// Define global variables
let capture;                    // Variable to store the video capture object
let captureWidth = 640;         // Set video width
let captureHeight = 480;        // Set video height
let emotions = ["neutral", "happy", "sad", "angry", "fearful", "disgusted", "surprised"];  // Array of recognizable emotions
let faceapi;                    // Variable to store the face detection API object
let detections = [];            // Array to store detected face data
let numBlinds = 10;             // Number of blinds (window shutters)
let scales = Array(numBlinds).fill(1);  // Array storing the scale factor for each blind, initialized to 1 (fully closed)
let smileThreshold = 0.5;       // Threshold for detecting a smile, above this value means "smiling"
let animationSpeed = 0.1;       // Animation speed, higher values make animation faster

// Setup function (runs once at the beginning)
function setup() {
    createCanvas(captureWidth, captureHeight, WEBGL);  // Create a canvas with WEBGL mode for 3D transformations
    
    capture = createCapture(VIDEO);  // Initialize video capture from webcam
    capture.size(captureWidth, captureHeight);  // Set video dimensions
    capture.hide();  // Hide the default HTML video element to avoid redundancy

    // Face detection options
    const faceOptions = { 
        withLandmarks: true,     // Enable facial landmark detection (eyes, nose, mouth, etc.)
        withExpressions: true,   // Enable facial expression detection
        withDescriptors: false   // Do not include face descriptors (used for identity recognition)
    };

    faceapi = ml5.faceApi(capture, faceOptions, faceReady);  // Initialize face detection API
}

// Callback function when face detection is ready
function faceReady() {
    faceapi.detect(gotFaces);  // Start detecting faces
}

// Callback function when faces are detected
function gotFaces(error, result) {
    if (error) {
        console.log(error);  // Log any errors if face detection fails
        return;
    }
    detections = result;  // Store the detection results
    faceapi.detect(gotFaces);  // Continue detecting faces in the next frame
}

// Draw function (runs continuously to update the canvas)
function draw() {
    background(0);  // Set the background to black

    // Draw the webcam feed
    push();  // Save current transformation state
    translate(-captureWidth/2, -captureHeight/2);  // Move origin to the top-left corner
    image(capture, 0, 0, captureWidth, captureHeight);  // Draw video feed on the canvas
    pop();  // Restore previous transformation state

    // Get smile value (if a face is detected)
    let smileValue = detections.length > 0 ? detections[0].expressions.happy : 0;

    // Determine whether to open or close the blinds based on smile intensity
    let targetScale = smileValue > smileThreshold ? 0 : 1;  // If smiling, blinds open (scale to 0)

    // Update each blind's scale value smoothly using lerp
    for (let i = 0; i < numBlinds; i++) {
        scales[i] = lerp(scales[i], targetScale, animationSpeed);  // Smoothly transition scale values
    }

    // Draw the blinds
    drawBlinds();
}

// Function to draw the blinds (shutters)
function drawBlinds() {
    let blindWidth = captureWidth / numBlinds;  // Calculate width of each blind

    // Loop through each blind and draw it
    for (let i = 0; i < numBlinds; i++) {
        let x = i * blindWidth - captureWidth/2 + blindWidth/2;  // Compute x position for each blind
        let scaleFactor = scales[i];  // Get current scale factor for this blind

        // If the blind is almost fully open, skip drawing it for performance optimization（continue; makes the current loop skip directly to the next iteration of the for loop.）
        if (scaleFactor < 0.01) continue;

        push();  // Save current transformation state
        translate(x, 0, 0);  // Move blind to the correct position
        scale(scaleFactor, 1, 1);  // Apply horizontal scaling (open/close effect)
        fill(50);  // Set the blind color to gray
        // noStroke();  // Uncomment to remove border
        rect(-blindWidth/2, -captureHeight/2, blindWidth, captureHeight);  // Draw the blind as a rectangle
        pop();  // Restore previous transformation state
    }
}
