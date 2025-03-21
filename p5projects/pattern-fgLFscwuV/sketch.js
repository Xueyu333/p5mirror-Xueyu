let r=50;
let x=25;


function setup() {
  createCanvas(600, 600);
   topLeftColor = color(255, 0, 0);
   bottomRightColor = color(0, 0, 255); 
   
  backColor1 = color (0, 0, 255);
  backColor2 = color (255, 0, 0);
  
 noLoop(); 
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
      
      let interFactor = (i + j) / 10;
      let currentColor = lerpColor(topLeftColor, bottomRightColor, interFactor);
      
  fill(currentColor);     
  arc(50+offsetX, 25+offsetY,  r,  r, PI*3/2, PI/2, CHORD);//top arc
  fill(currentColor); 
  arc(75+offsetX, 50+offsetY,  r,  r, 0, PI, CHORD);// right arc
  fill(currentColor); 
  arc(50+offsetX, 75+offsetY,  r,  r, PI/2, PI*3/2, CHORD);//bottom arc
  fill(currentColor); 
  arc(25+offsetX, 50+offsetY,  r,  r, PI, 0, CHORD);//left arc
    }
}
  
}