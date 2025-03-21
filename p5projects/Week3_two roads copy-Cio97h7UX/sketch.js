let showLeft = false;
let showRight = false;
let hasChosen = false;
let showTitle = true;
let leftStep = 0;
let rightStep = 0;
let randomShake;

//showleft&&step2 monster
let monsterEyeOpen = false;
let monsterEyeTimer = 0;
let openEyeTimeLimit = 500;//(after eyes opne 0.5s)
let openEyeStartTime = 0;
let gameOver = false;
let success = false;
let eyeOpenTime = 3000;

function setup() {
  createCanvas(400, 400);
  
  //showleft&&step2 monster
  monsterEyeTimer = millis();
  monsterEyeOpen = false;
  gameOver = false;
  success = false;
}

function draw() {
  background("#8BC34A");

  //blue sky
  fill("#A0DCF6");
  rect(0, 0, 400, 100);

  //left road
  strokeWeight(30);
  stroke("#917166");
  line(200, 400, 100, 200);

  //right road
  noFill();
  strokeWeight(20);
  stroke("rgb(206,206,63)");
  bezier(200, 500, 300, 370, 150, 300, 300, 200);

  //background mountain
  strokeWeight(0);

  //right mountain
  fill("rgb(46,109,46)");
  bezier(-50, 100, 10, 100, 30, 5, 200, 100);

  //left mountain
  fill("rgb(60,107,60)");
  bezier(200, 100, 300, 5, 400, 5, 500, 100);
  //middle mountain
  fill("#598624");
  bezier(0, 100, 100, 80, 200, 5, 400, 100);

  //trees
  for (let x = 0; x <= width; x += 50) {
    for (let y = 50; y <= 150; y += 60) {
      fill("rgb(38,82,38)");
      triangle(x, y, x + 20, y + 80, x - 20, y + 80);
      fill("rgb(75,56,56)");
      rect(x - 10, y + 80, 20, 40);
    }
  }
  for (let x = 0; x <= width; x += 40) {
    for (let y = 30; y <= 150; y += 70) {
      fill("rgb(54,133,54)");
      triangle(x, y, x + 20, y + 80, x - 20, y + 80);

      fill("#795548");
      rect(x - 10, y + 80, 20, 50);
    }
  }

  //show text
  fill(255);
  textSize(20);

  //show title
  if (!hasChosen && showTitle) {
    text("Choose Right or Left?", 50, 25);
  }

  //show left or right text
  
  
  
  
  if (showLeft) {
    if (leftStep == 0) {
      text("You choose left road, you get...", 50, 25);
    } else if (leftStep == 1) {
      text(
        "It's too dangerous.\nAre you sure you want \nto keep going?",
        10,
        200
      );

      randomShake = random(-0.1, 0.1);
      push();
      translate(150, 320);
      rotate(randomShake);
      fill("brown");
      rect(-5, 0, 10, 50);
      fill("silver");
      triangle(-5, -100, 10, 0, -5, 0);
      pop();
    } else if (leftStep == 2) {
      text("The monster is coming... Be ready!", 50, 25);

      fill("brown");
      ellipse(200, 300, 150, 100); //monster face
      fill("black");

      if (!monsterEyeOpen) {
        //eyes close
        rect(160, 290, 30, 5);
        rect(210, 290, 30, 5);
      } else {
        // open eyes
        ellipse(180, 290, 30, 30);
        ellipse(220, 290, 30, 30);
      }

      if (!gameOver) {
        if (!monsterEyeOpen && millis() - monsterEyeTimer > eyeOpenTime) {
          monsterEyeOpen = true;
          openEyeStartTime = millis();
        }

        if (monsterEyeOpen && millis() - openEyeStartTime > openEyeTimeLimit) {
          // If there is no click for more than 0.5 seconds, the game ends and the player fails.
          gameOver = true;
          success = false;
        }
      }

      // Display game results
      if (gameOver) {
        if (success) {
          text("Success! You escaped the monster!", 50, 350);
        } else {
          text("Game Over! The monster got you!", 50, 350);
        }
      }
    }
  }




if (showRight) {
  if (rightStep == 0) {
    text("You choose right road, you get...", 50, 25);
  } else if (rightStep == 1) {
    text("come here～\ncome here～", 250, 200);
    fill("rgb(255,203,72)");
    circle(270, 280, 70);
    fill(255);
    let randomWidth = random(10, 40);
    let randomHeight = random(10, 50);
    ellipse(270, 300, randomWidth, randomHeight);
    arc(250, 280, 20, 10, PI, TWO_PI);
    arc(290, 280, 20, 10, PI, TWO_PI);
  } else if (rightStep == 2) {
    //what happen if keep going?
  }
}
}
//event function
function mousePressed() {
  hasChosen = true;
  showTitle = false;
if (mouseX < 200) {
    showLeft = true;
    showRight = false;

    if (leftStep < 2) {
      leftStep++;
    }
  } else if (mouseX > 200) {
    showLeft = false;
    showRight = true;

    if (rightStep < 2) {
      rightStep++;
    }
  }

  // click monster within 0.5s after it open eyes && success
  if (showLeft && leftStep == 2 && monsterEyeOpen && !gameOver) {
    if (millis() - openEyeStartTime <= openEyeTimeLimit) {
      gameOver = true;
      success = true;
    }
  }

  //what happen on the left when i press the mouse in this area?(you can change the value)
  if (
    showLeft &&
    leftStep == 2 &&
    mouseX > 0 &&
    mouseX < 200 &&
    mouseY > 0 &&
    mouseY < 400
  ) {
  }

  //what happen on the right when i press the mouse in this area?(you can change the value)
  if (
    showRight &&
    rightStep == 2 &&
    mouseX > 200 &&
    mouseX < 400 &&
    mouseY > 0 &&
    mouseY < 400
  ) {
  }
}

function mouseReleased() {
  //what happen on the left when i release the mouse?
  if (showLeft && leftStep == 2) {
  }

  //what happen on the right when i release the mouse ?
  if (showRight && rightStep == 2) {
  }
}
