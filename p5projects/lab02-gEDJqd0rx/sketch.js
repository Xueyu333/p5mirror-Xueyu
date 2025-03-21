let portButton, closeButton;
let serial = new p5.WebSerial();
let inData;  // for incoming serial data
let outByte = 0;  // for outgoing data

function setup() {
  createCanvas(400, 300);  // make the canvas
  if (!navigator.serial) {
    alert("WebSerial is not supported in this browser. Try Chrome or MS Edge.");
  }

  // Get available ports
  serial.getPorts();

  // Set up event listeners
  serial.on("noport", makePortButton);
  serial.on("portavailable", openPort);
  serial.on("requesterror", portError);
  serial.on("data", serialEvent);
  serial.on("close", makePortButton);
}

function draw() {
  background(0);
  fill(255);
  text("Incoming value: " + inData, 30, 30);
}

function mouseDragged() {
  outByte = byte(map(mouseY, 0, height, 0, 255));
  serial.write(outByte);
}

function keyPressed() {
  if (key >= 0 && key <= 9) {
    outByte = byte(key * 25);
    serial.println(outByte);
  }
  if (key === "H" || key === "L") {
    serial.println(key);
  }
}

// Make a button to choose the port
function makePortButton() {
  if (!portButton) {
    portButton = createButton('Choose Port');
    portButton.position(10, 10);
    portButton.mousePressed(choosePort);
  }
}

// Choose a port
function choosePort() {
  serial.requestPort();
}

// Open the selected port
function openPort() {
  serial.open().then(initiateSerial);
  
  function initiateSerial() {
    console.log("Port open");

    // Create the close port button once the port is open
    if (!closeButton) {
      closeButton = createButton('Close Port');
      closeButton.position(100, 10);
      closeButton.mousePressed(closePort);
    }
  }

  if (portButton) portButton.hide();
}

// Close the port
function closePort() {
  if (serial) {
    serial.close();
    console.log("Port closed");
    closeButton.hide();  // Hide the close button
    if (portButton) portButton.show();  // Show the port selection button again
  }
}

// Handle serial errors
function portError(err) {
  alert("Serial port error: " + err);
}

// Handle incoming serial data
function serialEvent() {
  let incoming = serial.read();
  if (incoming !== -1) {
    inData = incoming;
    console.log(inData);
  }
}
