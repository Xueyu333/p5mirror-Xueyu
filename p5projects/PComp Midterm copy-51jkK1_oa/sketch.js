const serial = new p5.WebSerial();    // variable to hold an instance of the p5.webserial library
let portButton;      // HTML button object:
let inString = '';   // incoming serial data, 1 line string, convert inData to num by Number(inString)

let event = '';          // which event
let timeLeft = '';             // use as countdown
let switchNum = -1;        // control the switch animation
let lastEvent = '';

let myFont;
let doll1, doll2, weirddoll1, weirddoll2, grassland, sky, doorstep;

 
function setup() {
  createCanvas(windowWidth, windowHeight);          // make the canvas
  startSerial();                     // start serial
  textFont(myFont);
  textAlign(CENTER, CENTER);
  imageMode(CENTER);
}
 
function draw() {
  background(255);   //clean background

  if (event == 'switch')  
    switchEvent();
  else if (event == "fail")
    failEvent();
  else if (event == "0")
    startEvent();
  else if (event == "1" || event == "2" || event == "3" || event == "4" || event == "5" || event == "6" || event == "7" || event == "8" || event == "9")
    middleEvent();
  else if (event == "final")
    finalEvent();
  
  lastEvent = event;
}

