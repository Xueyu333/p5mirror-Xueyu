let w = 50;
let angle = 0;

function setup() {
  createCanvas(600, 600);
  
  //define pinwheel's gradient color
  topLeftColor = color(255, 0, 0);//red
  bottomRightColor = color(0, 0, 255);//blue

  //define background's gradient color
  backColor1 = color(0, 0, 255);//blue
  backColor2 = color(255, 0, 0);//red

}

function draw() {
  
  //gradient background color loop
  for (let y = 0; y < height; y++) {
    let interFactor = y / height;
    let backgroundColor = lerpColor(backColor1, backColor2, interFactor);
    stroke(backgroundColor);
    fill(backgroundColor);
    rect(0, y, width, 1);
  }

  //gradient pinwheel color loop
  
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      let offsetX = i * 100;
      let offsetY = j * 100;

      
 //rotate the pinwheel
      
      push();
      translate(offsetX + 50, offsetY + 50);
      rotate(angle);
      
  //gradient pinwheel color loop
      let interFactor =(i+j)/10 ;
      let currentColor = lerpColor(topLeftColor, bottomRightColor, interFactor);

      fill(currentColor);
      arc(0, -25, w, w, (PI * 3) / 2, PI / 2, CHORD); //top arc
      fill(currentColor);
      arc(25, 0, w, w, 0, PI, CHORD); // right arc
      fill(currentColor);
      arc(0, 25, w, w, PI / 2, (PI * 3) / 2, CHORD); //bottom arc
      fill(currentColor);
      arc(-25, 0, w, w, PI, 0, CHORD); //left arc
      pop();
    }
  }
}

//event function
function mouseMoved() {
  angle += 0.05;
}




// //Example01 using a fixed interFactor
// function setup() {
//   createCanvas(600, 600);
  
//   // Define two colors
//   let color1 = color(255, 0, 0); // 
//   let color2 = color(0, 0, 255); // 

//   // Use lerpColor() to manually calculate the gradient factor
//   let interFactor = 0.5; // Use a value between 0 and 1 to control the blending ratio

//   let blendedColor = lerpColor(color1, color2, interFactor); 
//   console.log(blendedColor);
//   fill(blendedColor); 
//   rect(100, 100, 400, 400); 
// }


// //Example02 change color by position
// function setup() {
//   createCanvas(600, 600);
  
//   let color1 = color(255, 0, 0); // 
//   let color2 = color(0, 0, 255); // 

//   // calculate the color blend based on the x position of the rectangle
//   for (let x = 0; x < width; x++) {
//     let interFactor = x / width; 
//     let blendedColor = lerpColor(color1, color2, interFactor); 
    
//     // stroke(blendedColor); // Set the stroke color
//     noStroke();
//     fill(blendedColor);   
//     rect(x, 0, 1, height); // Draw a vertical rectangle 1 pixel wide
//   }
// }



