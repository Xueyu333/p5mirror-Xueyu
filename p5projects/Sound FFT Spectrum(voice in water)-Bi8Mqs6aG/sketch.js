/**
 * @name Frequency Spectrum
 * @arialabel Audio waves are graphed on a grey screen based on the user’s audio input into their mic
 * @description <p>Visualize the frequency spectrum of live audio input.</p>
 * <p><em><span class="small"> To run this example locally, you will need the
 * <a href="http://p5js.org/reference/#/libraries/p5.sound">p5.sound library</a>
 * and a running <a href="https://github.com/processing/p5.js/wiki/Local-server">local server</a>.</span></em></p>
 */
let mic, fft;
let bubbles = []; //An array to store bubble objects.（position, size, and movement speed.）

function setup() {
  createCanvas(710, 400);
  noFill();

  mic = new p5.AudioIn();//Creates a new microphone input
  mic.start(); // Starts capturing audio from the microphone
  fft = new p5.FFT();// Creates a new FFT object for frequency analysis
  fft.setInput(mic);// Sets the microphone as the input for FFT analysis
}

function draw() {
//   background(200);

//   let spectrum = fft.analyze();

//   beginShape();
//   for (i = 0; i < spectrum.length; i++) {
//     vertex(i, map(spectrum[i], 0, 255, height, 0));
//   }
//   endShape();
  
background("#03A9F4");

  let volume = mic.getLevel(); // Gets the current microphone volume level (0-1)

// If there is sound, generate bubbles
  if (volume > 0.01) {
    let bubble = {
      x: width / 2, //Start at the bottom of the canvas
      y: height,
      size: map(volume, 0, 1, 10, 50), // Maps the volume level to bubble size (10-50 pixels)
      speedX: random(-2, 2), // Horizontal movement speed (randomly moves left or right)
      speedY: random(-1, -3) // Vertical movement speed (moves upward)
    };
    bubbles.push(bubble);// Adds the new bubble to the bubbles array
  } else {
    
    // If no sound, remove all bubbles
    bubbles = [];
  }

//updates and draws all existing bubbles on the screen.
  for (let i = bubbles.length - 1; i >= 0; i--) {
    let bubble = bubbles[i];
    fill("white");
    noStroke();
    ellipse(bubble.x, bubble.y, bubble.size);

    // Update bubble position
    bubble.x += bubble.speedX;// Move left or right
    bubble.y += bubble.speedY;// Move upward

 // Remove bubbles that go off the screen
    if (bubble.y > height || bubble.x < 0 || bubble.x > width) {
      bubbles.splice(i, 1); // Remove bubble from array
      
      
    }
  }
  
}
