let cam;
let x=0;
function setup() {
  createCanvas(400, 400);
  cam = createCapture(VIDEO);
  cam.hide();
}

function draw() {
  // background(220);
  // image(cam, 0, 0);
  cam.loadPixels();

  for (let y = 0; y < height; y++) {
    //grab the color data at(width/2,y)
    let p =y*width+width/2;
    let i = p*4;
    let r = cam.pixels[i];
    let g = cam.pixels[i + 1];
    let b = cam.pixels[i + 2];
    let a = cam.pixels[i + 3];

    stroke(r, g, b);
    point(x, y);
  }
  x++;
  if(x>width){
    x=0;}
}
