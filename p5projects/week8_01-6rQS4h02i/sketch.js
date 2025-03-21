function setup() {
  createCanvas(200, 200);


}

function draw() {
  background(220);
    stroke("red");
    for(x=0;x<width;x++){
    for(y=0;y<height;y++){
      point(x,y);
      
    }
  }
}