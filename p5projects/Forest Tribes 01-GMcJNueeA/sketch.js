// Forest Tribes

let sound01, sound02, sound04, sound09;
let reverb, filter;

function preload() {
  soundFormats("wav");
  sound01 = loadSound("sound01.wav"); 
  sound02 = loadSound("sound02.wav"); 
  sound04 = loadSound("sound04.wav"); 
  sound09 = loadSound("sound09.wav"); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Set random seed 
  randomSeed(0);
  noiseSeed(0);

  // audio effects
  reverb = new p5.Reverb();
  filter = new p5.LowPass();

  // Apply effects
  reverb.process(sound01, 5, 2); 
  reverb.process(sound04, 4, 2); 
  reverb.process(sound02, 3, 2); 
  filter.freq(300); // Set initial filter frequency

  // Play all sounds
  playSounds();
}

function draw() {
  background("rgb(10, 50, 10)");


  // Dynamically adjust the filter frequency over time
  let freq = 300 + sin(frameCount * 0.01) * 200; // Filter frequency oscillates over time
  filter.freq(freq);
}
function playSounds() {
  
  sound01.loop();
  sound01.setVolume(0.2); // Set volume to 0.4
  sound01.rate(0.9); // Slightly slower playback rate

  
  let drumInterval = setInterval(() => {
    sound02.play();
    sound02.setVolume(0.3); 
    sound02.rate(1.0); 
  }, 1500);//triggered every 1.5 seconds

  
  setTimeout(() => {
    sound04.loop(); 
    sound04.setVolume(0); // Start with volume at 0
    sound04.fade(0.5, 2000); // Fade in to volume 0.5 over 2 seconds
    sound04.rate(1); 
  }, 20000); // Start after 20 seconds

  // High-frequency sound (plays every 10 seconds)
  setTimeout(() => {
    playHighFrequency();
  }, 35000); // Start after 35 seconds

  // Stop all sounds after 60 seconds
  setTimeout(() => {
    stopAllSounds(drumInterval);
  }, 60000); // Stop everything after 60 seconds
}

function playHighFrequency() {
  const startTime = 35000; // Start time (35 seconds)
  const interval = 10000; // Play every 10 seconds
  const soundDuration = 8000; // High-frequency sound lasts for 8 seconds
  const endTime = 60000; // Total duration is 60 seconds

  let currentTime = startTime;

  while (currentTime + soundDuration <= endTime) {
    const triggerTime = currentTime;

    setTimeout(() => {
      sound09.play();
      sound09.setVolume(0.3); 
      sound09.rate(1.0); 
    }, triggerTime - startTime); // Calculate delay from the start time

    currentTime += interval; // Update the next trigger time
  }
}

function stopAllSounds(drumInterval) {
  // Stop all sounds
  sound01.stop();
  sound02.stop();
  sound04.stop();
  sound09.stop();

 
  clearInterval(drumInterval);

  console.log("All sounds have stopped.");
}
