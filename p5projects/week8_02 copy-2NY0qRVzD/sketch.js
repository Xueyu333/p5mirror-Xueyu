let cat;

function preload(){
  cat = loadImage('cat.jpg');
}

function setup() {
  createCanvas(cat.width, cat.height);
  pixelDensity(1);

  cat.loadPixels();
  
  //Erase a line that is 10 pixels tall across the middle of it.
  let startY = (cat.height / 2 - 5); 
  let endY = (cat.height / 2 + 5);   
  
  for(y=startY;y<endY;y++){
    
    for(x=0;x<cat.width;x++){
      
      let i=(x + y * cat.width) * 4;
      cat.pixels[i]=255;
       cat.pixels[i+1]=255;
       cat.pixels[i+2]=255;
       cat.pixels[i+3]=255;
      
    }
  }
  
  //Turn a line that is 10 pixels wide down the middle of it blue.
  let startX = (cat.width / 2 - 5);  
  let endX = (cat.width / 2 + 5);  
  
  for(x=startX;x<endX;x++){
    
    for(y=0;y<cat.height;y++){
      
      let i=(x + y * cat.width) * 4;
      cat.pixels[i]=0;
       cat.pixels[i+1]=0;
       cat.pixels[i+2]=255;
       cat.pixels[i+3]=255;
      
    }
  }
  
  
  cat.updatePixels();
}

function draw() {
  background(220);
  image(cat, 0, 0);

}
