let currentScene;
let img;

// let showLeft = false;
// let showRight = false;
// let hasChosen = false;
// let showTitle = true;
// let leftStep = 0;
// let rightStep = 0;
// let randomShake;



function setup() {
  createCanvas(1000, 1000);

  
  currentScene = scene1;
}

function draw() {
  currentScene();
}

function scene1() {
  createCanvas(1000, 1000);
  background("#8BC34A");

  //blue sky
  fill("#A0DCF6");
  rect(0, 0, 1000, 200);

  //left road
  strokeWeight(30);
  stroke("#917166");
  line(500, 1000, 250, 400);

  //right road
  noFill();
  strokeWeight(20);
  stroke("rgb(206,206,63)");
  bezier(500, 1000, 750, 850, 350, 600, 770, 350);

  //background mountain
  strokeWeight(0);

  //right mountain
  fill("rgb(46,109,46)");
  bezier(-100, 250, 50, 250, 150, 50, 500, 250);

  //left mountain
  fill("rgb(60,107,60)");
  bezier(500, 250, 750, 50, 1000, 50, 1200, 250);
  //middle mountain
  fill("#598624");
  bezier(0, 250, 250, 200, 500, 50, 1000, 250);

  //trees
  for (let x = 0; x <= width; x += 100) {
    for (let y = 200; y <= 300; y += 120) {
      fill("rgb(38,82,38)");
      triangle(x, y, x + 40, y + 160, x - 40, y + 160);
      fill("rgb(75,56,56)");
      rect(x - 20, y + 160, 40, 80);
    }
  }
  for (let x = 0; x <= width; x += 80) {
    for (let y = 60; y <= 300; y += 140) {
      fill("rgb(54,133,54)");
      triangle(x, y, x + 40, y + 160, x - 40, y + 160);

      fill("#795548");
      rect(x - 20, y + 160, 40, 100);
    }
  }

  // White bar at the bottom
  fill(255);
  rect(0, 900, 1000, 100); // The white bar at the bottom for text
  fill("rgb(252,252,187)");
  stroke("rgb(29,106,29)"); // pink frame
  strokeWeight(4);
  rect(30, 120, 940, 150, 20); // 
  
  //show text
  fill("rgb(35,60,35)");
  textSize(20);
  strokeWeight(0);
 textFont('Courier New', 20);
  textStyle(BOLD);
  text(
    "You wake up in an unfamiliar place... You need to get back to the floor, \n you have ICM homework to do! You see two paths, which one do you pick?",
    60,
    150
  );
  textFont('Courier New', 30);
  text("1: Go Left 2: Go Right", 270, 230);

  if (keyIsPressed) {
    if (key === "1") {
      currentScene = sceneB;
    } else if (key === "2") {
      currentScene = sceneTaigen;
    }
  }
}

function sceneB() {
  createCanvas(1000, 1000);
  colorMode(RGB, 255);
  background(200);

  //shirt
  noStroke();
  fill(255, 213, 0);
  ellipse(200, 400, 240, 220);

  //hair fill
  noStroke();
  fill(102, 51, 0);
  rect(105, 80, 190, 205, 80, 80, 0, 0);

  //face fill
  noStroke();
  fill(255, 226, 198);
  //ellipse(200, 190, 150, 170)
  rect(130, 120, 140, 150, 40, 40, 70, 65);

  //neck
  stroke(255, 226, 198);
  strokeWeight(50);
  line(200, 270, 200, 300);

  //left bang outline
  noFill();
  stroke(0);
  strokeWeight(5);
  bezier(185, 120, 100, 110, 180, 190, 105, 180);

  //right bang outline
  noFill();
  stroke(0);
  strokeWeight(5);
  bezier(215, 120, 300, 110, 220, 190, 295, 180);

  //left hair outline
  noFill();
  stroke(0);
  strokeWeight(5);
  bezier(200, 90, 40, 40, 160, 350, 105, 270);

  //right hair outline
  noFill();
  stroke(0);
  strokeWeight(5);
  bezier(200, 90, 360, 40, 240, 350, 295, 270);

  //line for face
  noFill();
  stroke(0);
  strokeWeight(5);
  arc(200, 205, 140, 130, 0, PI);

  //lines for nose
  stroke(0);
  strokeWeight(5);
  line(195, 170, 195, 190);

  noFill();
  stroke(0);
  strokeWeight(5);
  arc(195, 200, 20, 20, HALF_PI, PI + HALF_PI);

  //eyes
  strokeWeight(3);
  fill(102, 51, 0);
  ellipse(165, 170, 15, 20);
  ellipse(225, 170, 15, 20);

  noFill();
  curve(140, 200, 160, 163, 180, 155, 200, 160);
  curve(200, 200, 220, 163, 240, 155, 240, 160);
  //arc(240, 162, 40, 10, PI, PI + HALF_PI)

  //lips
  fill(255, 180, 153);
  noStroke();
  arc(200, 225, 60, 40, 0, PI);

  // White bar at the bottom

  // fill(255);
  // rect(0, 500, 400, 100); // The white bar at the bottom for text

  //show text
    fill(255);
  rect(0, 900, 1000, 100); // The white bar at the bottom for text
  fill("rgb(252,252,187)");
  stroke("#FFD044"); // pink frame
  strokeWeight(4);
  rect(350, 120, 600, 150, 20); // 
  
  fill(0);
  textSize(20);
 fill("rgb(35,60,35)");
  textSize(20);
  strokeWeight(0);
 textFont('Courier New', 20);
  textStyle(BOLD);
  
  text("Hi, I’m B! You want to get back to the floor?", 370, 180);
  text("Maybe Sana can help?", 370, 200);
  textFont('Courier New', 23);
  text("A: Go find Sana   B: I don't trust B...", 370, 240);

  if (keyIsPressed) {
    if (key === "A") {
      currentScene = sceneSana;
    } else if (key === "B") {
      currentScene = scene1;
    }
  }
}

function sceneTaigen() {
  // Create drawing canvas
  createCanvas(1000, 1000);
  background(204, 255, 255);
  fill(153, 153, 255);
  noStroke();
  background(204, 255, 255);

  // White bar at the bottom
  fill(255);
  rect(0, 900, 1000, 100); // The white bar at the bottom for text

 
  // Draw overlapping circles that react to mouseX
  fill(153, 153, 255);
  noStroke();
  let circleX1 = map(mouseX, 0, width, -300, 300);
  circle(circleX1, 153, 600);

  fill(153, 200, 255);
  let circleX2 = map(mouseX, 0, width, 900, 300);
  circle(circleX2, 153, 600);

  // Clothes
  fill(0, 0, 255);
  circle(250, 680, 500);
  

  // Face
  fill(234, 170, 140);
  noStroke();
  ellipse(300, 300, 330, 380);

  // Neck
  fill(234, 170, 140);
  rect(170, 400, 140, 120);
  circle(240, 480, 160);
  
 //show text
  fill(0);
  textSize(20);
  fill(255);
  rect(0, 900, 1000, 100); // The white bar at the bottom for text
  fill("rgb(252,252,187)");
  stroke("#673AB7"); // pink frame
  strokeWeight(4);
  rect(200, 500, 750, 150, 20); // 
  
  fill(0);
  textSize(20);
 fill("rgb(35,60,35)");
  textSize(20);
  strokeWeight(0);
 textFont('Courier New', 20);
  textStyle(BOLD);
  
  text("Hey! Taigen, here. Look at these pretty bubbles...", 220, 530);
  text(
    "If you want to get back to the floor, you’ll need to talk \nto Sana.",
    220,
    560
  );
  textFont('Courier New', 23);
  text("C: Talk to Sana    D: I don't trust Taigen...", 220, 620);
  // Eyes
  fill(255, 255, 255);
  ellipse(260, 260, 50, 70); // Left eye (white part)
  ellipse(400, 260, 50, 70); // Right eye (white part)

  // Black circles for pupils (move with mouseX)
  fill(0, 0, 0);

  // Limit the movement of the pupil within the white eye for the left eye
  let pupilLeftX = map(mouseX, 0, width, 250, 270); // Adjusted range for left eye
  ellipse(pupilLeftX, 260, 30, 40);

  // Limit the movement of the pupil within the white eye for the right eye
  let pupilRightX = map(mouseX, 0, width, 390, 410); // Adjusted range for right eye
  ellipse(pupilRightX, 260, 30, 40);

  // Nose
  fill(233, 150, 122);
  noStroke();
  strokeWeight(2);
  triangle(335, 290, 375, 330, 335, 360);

  // Mouth
  fill(255, 255, 255);
  mouthOpenAngle = map(mouseX, 0, width, 0, PI + QUARTER_PI); // Map mouseX to control mouth angle
  arc(330, 400, 100, 90, 0, mouthOpenAngle, PIE);

  // Ear
  fill(234, 180, 140);
  noStroke();
  ellipse(150, 300, 60, 80);
  fill(160, 160, 160);
  ellipse(150, 340, 10, 20);

  // Hair
  fill(0, 0, 0);
  noStroke();
  circle(340, 100, 150);
  circle(220, 130, 150);
  rotate(QUARTER_PI);
  ellipse(270, -60, 150, 300);
  rotate(QUARTER_PI / 2);
  rotate(QUARTER_PI / 2);
  ellipse(150, -400, 150, 180);

  
  // Background Circle
  fill(0, 0, 255);
  circle(0, 300, 500);

  if (keyIsPressed) {
    if (key === "C") {
      currentScene = sceneSana;
    } else if (key === "D") {
      currentScene = scene1;
    }
  }
}

function sceneSana() {
  let x = 10;
  // Create drawing canvas
  createCanvas(1000, 1000);
  // blue sky background
  background(135, 206, 235);

  //green grass
  fill(126, 200, 80);
  noStroke();
  rect(0, 320, 399, 399);
  while (x < width) {
    ellipse(x, 400, 10, 200);
    x = x + 10;
  }
  // dark hair
  fill(72, 60, 50);
  ellipse(200, 200, 200, 250);
  circle(115, 250, 50);
  circle(120, 270, 50);
  circle(140, 300, 50);
  circle(150, 330, 50);
  circle(280, 250, 50);
  circle(270, 270, 50);
  circle(270, 300, 50);
  circle(259, 330, 50);

  // brown face
  fill(176, 108, 73);
  ellipse(200, 200, 150, 200);

  // white eyes
  fill(257);
  ellipse(170, 150, 40, 40);
  ellipse(230, 150, 40, 40);

  // Black pupils
  fill(0);
  ellipse(170, 160, 30, 20);
  ellipse(230, 160, 30, 20);

  //triangle nose
  fill(116, 61, 43);
  triangle(180, 200, 215, 200, 200, 170);

  // BIG SMILE
  fill(0);
  arc(200, 220, 80, 80, 0, PI, CHORD);

  // Pink mouth
  fill(255, 0, 127);
  ellipse(200, 250, 50, 20);

  // black body
  fill(0);
  rect(150, 275, 100, 200);

  // Bubble wand
  stroke(255);
  strokeWeight(5);
  line(200, 305, 200, 370);
  // No fill
  noFill();
  ellipse(200, 290, 30, 30);

  // Bubble!!
  noStroke();
  fill(240, 255, 255);
  circle(50, 50, 50, 50);
  console.log(x);
  circle(350, 120, 50, 50);
  circle(0, 200, 50, 50);
  fill(115, 147, 179);
  arc(50, 60, 30, 20, 0, PI + QUARTER_PI, PIE);
  arc(350, 130, 30, 20, 0, PI + QUARTER_PI, PIE);
  arc(0, 210, 30, 20, 0, PI + QUARTER_PI, PIE);

  // Two arms
  stroke(176, 108, 73);
  strokeWeight(20);
  line(200, 330, 155, 370);
  line(245, 370, 200, 360);

  noStroke();
  // White bar at the bottom
  fill(255);
  rect(0, 900, 1000, 100); // The white bar at the bottom for text

  //show text
  fill(0);
  textSize(20);
  
 fill(255);
  rect(0, 900, 1000, 100); // The white bar at the bottom for text
  fill("rgb(252,252,187)");
  stroke("#8BC34A"); // pink frame
  strokeWeight(4);
  rect(350, 120, 600, 150, 20); // 
  
  fill(0);
  textSize(20);
 fill("rgb(35,60,35)");
  textSize(20);
  strokeWeight(0);
 textFont('Courier New', 20);
  textStyle(BOLD);
  
  // text("Hi, I’m B! You want to get back to the floor?", 370, 180);
  // text("Maybe Sana can help?", 370, 200);
  // textFont('Courier New', 23);
  // text("A: Go find Sana   B: I don't trust B...", 370, 240);

  text(
    "What?! They sent you to me? I have no idea how \nto get back to the floor...",
    370,
    150
  );
  text("Maybe you should talk to Mark or Queenie?", 370, 200);
   textFont('Courier New', 23);
  text("U: Go find Mark   F: Go find Queenie", 370, 240);

  if (keyIsPressed) {
    if (key === "U") {
      currentScene = sceneMark;
    } else if (key === "F") {
      currentScene = sceneQueenie;
    }
  }
}

function sceneMark() {
  let color1, color2, color3;
  let mouthOpen;
  let eye1, eye2, eye3, eye4, eyeSize;
  createCanvas(1000, 1000);
  //Color Changer

  //mouseY range = 0-400
  //color range = existing color to desire color
  color1 = map(mouseY, 0, 400, 255, 255);
  color2 = map(mouseY, 0, 400, 5, 220);
  color3 = map(mouseY, 0, 400, 5, 177);

  mouthOpen = map(mouseY, 0, 400, 2 * PI - 1, PI);

  //255,220,177

  /*
  print("X:", mouseX);
  print("Y:", mouseY);
  */

  background(139, 69, 19);

  //frame
  rect(20, 20, 360, 360);

  //sand and sky
  noStroke();
  fill(135, 206, 235);
  rect(20, 20, 360, 280);

  //SUN
  fill(209, 64, 9);
  circle(mouseX, mouseY, 60);

  fill(246, 220, 189);
  rect(20, 300, 360, 80);
  ellipse(50, 350, 1, 1);

  //HERE
  //face
  fill(color1, color2, color3);
  //255,220,177
  ellipse(200, 160, 100, 120);

  circle(200, 300, 150);

  //arms

  ellipse(110, 230, 150, 30);
  ellipse(300, 230, 150, 30);

  //mouth
  fill(255);
  arc(200, 185, 50, 50, 0, mouthOpen, CHORD);

  //Shake Function

  let xOffset = random(-5, 5);
  let yOffset = random(-5, 5);

  if (mouseY > 200) {
    //eyes
    fill(255);
    circle(180, 145, 20);
    circle(240, 145, 20);
  } else {
    circle(180 + xOffset, 145 + yOffset, 20);
    circle(240 + xOffset, 145 + yOffset, 20);
  }

  //hair
  fill(251, 231, 161);
  triangle(192, 100, 180, 89, 127, 140);
  fill(251, 231, 161);
  triangle(193, 98, 204, 84, 251, 128);

  //I'M JUST KEN
  fill(255, 220, 177);

  stroke(300, 200, 177);
  square(145, 250, 55, 20);
  square(190, 250, 55, 20);
  square(145, 280, 55, 20);
  square(190, 280, 55, 20);
  square(145, 300, 55, 20);
  square(190, 300, 55, 20);

  // White bar at the bottom
  fill(255);
  rect(0, 900, 1000, 100); // The white bar at the bottom for text

  //show text
  fill(0);
  textSize(20);
  
fill(255);
  rect(0, 900, 1000, 100); // The white bar at the bottom for text
  fill("rgb(252,252,187)");
  stroke("#E91E63"); // pink frame
  strokeWeight(4);
  rect(350, 120, 600, 250, 20); // 
  
  fill(0);
  textSize(20);
 fill("rgb(35,60,35)");
  textSize(20);
  strokeWeight(0);
 textFont('Courier New', 20);
  textStyle(BOLD);
  
  // text("Hi, I’m B! You want to get back to the floor?", 370, 180);
  // text("Maybe Sana can help?", 370, 200);
  // textFont('Courier New', 23);
  // text("A: Go find Sana   B: I don't trust B...", 370, 240);

  text(
    "eeeerrraaaeeefausdifuahduhdfCANVASisnotdyna\nmicAHHhahdfdcanvas not dynamciconacnd\nufnaisudhfiasudhfiasudhfiahdsfiausndfiandsf",
    370,
    150
  );
  text(
    "*&@#$*#*&dfjnaidfiaudblah blah blah blah \nblah ablha blah ablhalahalh",
    370,
    230
  );
  textFont('Courier New', 23);
  text("E: ...slowly back away and return to Sana", 370, 300);

  if (keyIsPressed) {
    if (key === "E") {
      currentScene = sceneSana;
    }
  }
}

function sceneQueenie() {
  createCanvas(1000, 1000); // Create the canvas
  background(255, 192, 203); // Set background color

  // Polka Dot Background
  noStroke();
  fill(193, 231, 245);
  circle(150, 150, 50);
  circle(50, 500, 50);
  circle(30, 40, 50);
  circle(60, 240, 50);
  circle(120, 350, 50);
  circle(10, 320, 50);
  circle(400, 50, 50);
  circle(480, 250, 50);
  circle(380, 300, 50);
  circle(420, 550, 50);
  circle(260, 70, 50);

  // Back hair
  fill(0);
  ellipse(250, 220, 200, 300);

  // Face and neck
  fill(234, 176, 144);
  noStroke();
  rect(210, 250, 80, 100);
  ellipse(250, 200, 180, 200);

  // Front bang hair
  fill(0);
  arc(250, 170, 170, 180, PI, 0);

  // Front bang hair skin color
  stroke(234, 176, 144);
  strokeWeight(6);
  line(178, 179, 190, 140);

  // Eyes (White Part)
  noStroke();
  fill(255);
  circle(210, 215, 40); // Left eye
  circle(285, 215, 40); // Right eye

  // Eyes (Black Part)
  fill(0);
  circle(210, 215, 20); // Left pupil
  circle(285, 215, 20); // Right pupil

  // Pupil base positions
  let leftPupilX = 210;
  let rightPupilX = 285;
  let pupilY = 215;

  // Adjust pupil movement based on mouse position
  if (mouseX < 200 && mouseY > 200 && mouseY < 400) {
    leftPupilX -= 10; // Move left pupil to the left
    rightPupilX -= 10; // Move right pupil to the left
  } else if (mouseX > 300 && mouseY > 200 && mouseY < 400) {
    leftPupilX += 10; // Move left pupil to the right
    rightPupilX += 10; // Move right pupil to the right
  }

  if (mouseY < 200) {
    pupilY -= 10; // Move pupils up
  } else if (mouseY > 400) {
    pupilY += 10; // Move pupils down
  }

  // Draw the white pupils inside the black eyes
  fill(255);
  circle(leftPupilX, pupilY, 10); // Left pupil
  circle(rightPupilX, pupilY, 10); // Right pupil

  // Nose
  stroke(0);
  strokeWeight(1);
  fill(234, 176, 144);
  rect(240, 220, 17, 28);

  // Mouth
  stroke(0);
  strokeWeight(1);
  fill(255);
  arc(250, 260, 80, 50, 0, PI);
  line(213, 270, 287, 270);

  // Hands
  noStroke();
  fill(234, 176, 144);
  circle(60, 410, 50);
  circle(460, 410, 50);
  stroke(234, 176, 144);
  strokeWeight(12);
  line(40, 400, 30, 360);
  line(45, 400, 60, 360);

  // Shirt
  noStroke();
  fill(255);
  rect(130, 320, 250, 300, 100);
  rect(60, 370, 100, 80, 20);
  rect(360, 370, 100, 80, 20);

  // Shirt placket
  stroke(0);
  strokeWeight(0.5);
  rect(240, 320, 20, 300);

  // Shirt buttons
  circle(250, 340, 12);
  circle(250, 400, 12);
  circle(250, 460, 12);
  circle(250, 520, 12);
  circle(250, 580, 12);

  // Sleeves
  stroke(0);
  strokeWeight(1);
  line(75, 370, 75, 450);
  line(445, 370, 445, 450);

  // Pants
  fill(0);
  rect(143, 570, 225, 100);

  // Blush
  noStroke();
  fill(255, 200, 203);
  ellipse(195, 242, 40, 20);
  ellipse(307, 242, 40, 20);

  // White bar at the bottom
  fill(255);
  rect(0, 900, 1000, 100); // The white bar at the bottom for text

  //show text
  fill(0);
  textSize(20);

   rect(0, 900, 1000, 100); // The white bar at the bottom for text
  fill("rgb(252,252,187)");
  stroke("#FF85AE"); // pink frame
  strokeWeight(4);
  rect(350, 120, 600, 280, 20); // 
  
  fill(0);
  textSize(20);
 fill("rgb(35,60,35)");
  textSize(20);
  strokeWeight(0);
 textFont('Courier New', 20);
  textStyle(BOLD);
  
 
  text("Hi, I'm Queenie! I can teleport you back to the\nfloor!", 370, 180);
  text("But do you REALLY want to do ICM homework right \nnow?", 370, 230);
  
   textFont('Courier New', 23);
  text(
    "G: Teleport to the floor  \nH: Go back to the forest, we can do ICM\n later...",
    370,
    300
  );

  if (keyIsPressed) {
    if (key === "G") {
      currentScene = sceneFloor;
    } else if (key === "H") {
      currentScene = scene1;
    }
  }
}

function sceneFloor() {
 
  createCanvas(1000, 1000); // Create a 1000x1000 canvas

  background(220); // Light gray background to represent the general ambiance of the room

  // Drawing the ceiling lights
  fill(200);
  noStroke();
  rect(0, 0, 1000, 150); // Ceiling area
  fill(255);
  rect(100, 40, 800, 30); // Large ceiling light panel
  fill(240);
  rect(200, 100, 600, 20); // Another ceiling light panel

  // Drawing vertical columns
  fill(50);
  rect(150, 0, 50, 1000); // Left column
  rect(800, 0, 50, 1000); // Right column

  // Drawing hanging lights and wires
  stroke(0);
  strokeWeight(3);
  line(500, 0, 500, 300); // Wire hanging from the ceiling
  ellipse(500, 300, 20, 20); // Light bulb

  // Drawing the far back tables and chairs
  fill(150);
  noStroke();
  rect(100, 700, 800, 50); // Large desk surface
  rect(200, 750, 150, 100); // Chair on left
  rect(700, 750, 150, 100); // Chair on right

  // Drawing the front desk and objects on it
  fill(180);
  rect(50, 800, 900, 150); // Front table
  fill(100);
  rect(200, 900, 70, 70); // Laptop on the table
  fill(255, 150, 0);
  rect(600, 900, 50, 100); // Bottle on the table
  2
  // Drawing some additional details (people or screens)
  fill(100);
  rect(400, 600, 100, 200); // Person or standing object
  rect(550, 600, 100, 200); // Another person or standing object

  // Drawing a screen in the background
  fill(0);
  rect(750, 500, 200, 100); // Big screen or window

  // Additional minor details to simulate the ambiance
  stroke(150);
  line(200, 200, 800, 200); // Ceiling pipes
  line(100, 250, 900, 250); // Another ceiling pipe

  // Simplifying other details for overall feel
  
  fill("red");
  strokeWeight(0);
  textFont('Courier New', 30);
  textStyle(BOLD);
  
  text("Congrats you made it back to the floor!\nLots of assignments waiting for you", 190, 350);

}
                
