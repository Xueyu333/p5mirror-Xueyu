let columnWidth;
let columnHeight;
let hues= [0,30,60];

function setup() {
  createCanvas(windowWidth, windowHeight);
  columnWidth = width / 3;
  columnHeight = height / 3;
  //hue, saturation, brightness
  colorMode(HSB,360,100,100);
}

function draw() {
  background(255);

  for (let counter = 0; counter < 3; counter++) {
    
    // let h =counter * 30;
    // fill(h,100,100);
    let x = counter * columnWidth;
    let y = height / 4;
    
    let h =hues[counter];
    fill(h,100,100);

    rect(x, y, columnWidth, columnHeight);
  }
}
