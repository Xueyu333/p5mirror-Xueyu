let r=50;
let x=25;
let angle=0;

function setup() {
  createCanvas(600, 600);
   topLeftColor = color(255, 0, 0);
   bottomRightColor = color(0, 0, 255); 
   
  backColor1 = color (0, 0, 255);
  backColor2 = color (255, 0, 0);
  
 // noLoop(); 
}

function draw() {
  
   for (let y = 0; y < height; y++) {
    let interFactor = y / height; 
    let backgroundColor = lerpColor(backColor1, backColor2, interFactor);
    stroke(backgroundColor);  
    fill(backgroundColor);
    rect(0, y, width, 1);  
  }
  
  for (let i = 0; i < 6; i++) { 
    for (let j = 0; j < 6; j++) { 
      let offsetX = i * 100; 
      let offsetY = j * 100; 
      
        push();
      translate(offsetX + 50, offsetY + 50);
       rotate(angle);
      
      let interFactor = (i + j) / 10;
      let currentColor = lerpColor(topLeftColor, bottomRightColor, interFactor);
      
  fill(currentColor);     
  arc(0, -25,  r,  r, PI*3/2, PI/2, CHORD);//top arc
  fill(currentColor); 
  arc(25, 0,  r,  r, 0, PI, CHORD);// right arc
  fill(currentColor); 
  arc(0, 25,  r,  r, PI/2, PI*3/2, CHORD);//bottom arc
  fill(currentColor); 
  arc(-25, 0,  r,  r, PI, 0, CHORD);//left arc
  pop();
    }
  
}
  
}
function mouseMoved() {
  angle += 0.05;
  // redraw(); 
}