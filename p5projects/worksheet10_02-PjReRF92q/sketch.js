let musics = [];
let button;
let currentMusicIndex = 0;
let clickCount = 0;

function preload() {
  for (let i = 0; i < 11; i++) {
    let sound = loadSound(i + ".mp3");
    musics.push(sound);
  }
}

function setup() {
  createCanvas(400, 400);
  button = createButton("play");
  button.position(width / 2, height / 2);
  button.mousePressed(toggleMusic);
}

function draw() {
  background(220);
  if (clickCount < musics.length * 2) {
    let currentMusic = musics[currentMusicIndex];
    if (currentMusic.isPlaying()) {
      button.html("Pause");
    } else {
      button.html("Play");
    }
  } else {
    button.html("Click to Restart");
  }
}

function toggleMusic() {
  if (clickCount >= musics.length * 2) {
    clickCount = 0;
    currentMusicIndex = 0;
  }

  if (clickCount < musics.length * 2) {
    let currentMusic = musics[currentMusicIndex];

    if (currentMusic.isPlaying()) {
      currentMusic.pause();
    } else {
      currentMusic.play();
    }

    clickCount++;
    if (clickCount % 2 === 0) {
      currentMusicIndex++;
    }
  }
}
