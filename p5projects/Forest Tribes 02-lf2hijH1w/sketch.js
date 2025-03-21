// Forest Tribes

let sound01, sound02, sound04, sound09;
let reverb, filter;

function preload() {
  soundFormats('wav');
  sound01 = loadSound('sound01.wav');
  sound02 = loadSound('sound02.wav');
  sound04 = loadSound('sound04.wav');
  sound09 = loadSound('sound09.wav');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

 
  randomSeed(0);
  noiseSeed(0);

 
  reverb = new p5.Reverb();
  filter = new p5.LowPass();

  // Apply reverb to sound09
  reverb.process(sound09, random(5, 15), random(5, 15));
  
  // Apply filter to sound02
  sound02.disconnect();
  sound02.connect(filter);
  filter.freq(300 + random(200)); // Random filter frequency

  // Play sounds
  playSound(sound01, 0, 48000);//01:0-48s
   sound01.setVolume(0.5); 
  playSound(sound02, 4000, 60000);//02:4-60s
   sound02.setVolume(1.2); 
  playSound(sound04, 22000, 60000);//04:22-60s
   sound04.setVolume(0.5); 
   
  
  // loop for sound09
  setTimeout(() => {
    sound09.loop();
    sound09.setVolume(0.3); 
    sound09.rate(random(0.8, 1.2)); 
    setTimeout(() => sound09.stop(), 8000);
  }, 17000);//09:start from 17s
  
  sound09.rate(random(0.8, 1.2));
   playSound(sound09, 35000, 43000);//09:35-43s
   sound09.setVolume(0.4); 
}

function draw() {
  background("rgb(0,77,0)");
 
}

function playSound(sound, startDelay, stopDelay) {
  setTimeout(() => {
    sound.loop();
    sound.rate(random(0.8, 1)); // Random playback rate
  }, startDelay);

  setTimeout(() => {
    sound.stop();
  }, stopDelay);
}
