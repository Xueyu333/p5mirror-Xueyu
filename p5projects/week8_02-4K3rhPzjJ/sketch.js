let cat;

function preload(){
  cat = loadImage('cat.jpg');
}

function setup() {
  createCanvas(cat.width, cat.height);
  pixelDensity(1);
}

function draw() {
  // fill("red");
  rect(0, 0, cat.width, cat.height);

  cat.loadPixels();
  for(let i=0;i<cat.pixels.length;i+=8){
    if(i%2==0){
    cat.pixels[i]=0;
    cat.pixels[i+1]=255;
    cat.pixels[i+2]=0;
    }
    
  }
  cat.updatePixels();
  image(cat, 0, 0);
}
