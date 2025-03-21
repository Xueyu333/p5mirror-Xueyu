let myImage;
let cat;

function preload(){
  cat = loadImage('cat.jpg');
}
function setup() {
  createCanvas(cat.width, cat.height);
  pixelDensity(1);
  myImage= createImage(width, height);
}

function draw() {
  fill("red");
  rect(0,0,cat.width,cat.height)
  myImage.loadPixels();
  cat.loadPixels();
  for(let i = cat.width*4; i<cat.pixels.length; i++){
    myImage.pixels[i] = cat.pixels[i];
  }
  let start=135*
   for(let i = cat.width*4; i<cat.pixels.length; i++){
    myImage.pixels[i] = 0;
  }
  
  
 myImage.updatePixels();
  image(myImage, 0, 0);
   
 
  
}