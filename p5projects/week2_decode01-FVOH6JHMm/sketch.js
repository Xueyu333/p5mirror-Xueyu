/*
Inspired by Vera Molnár's Du Cycle: “Carrés Non-Concentriques” (1974)
*/

function setup() {
  //create canvas which is window's width and height
  createCanvas(windowWidth, windowHeight);
  console.log("windowHeight: " + windowHeight)

  //background color is black
  background(0);
  //set the rectangle mode to"center" (drawing from center point)
  rectMode(CENTER);
  //only has stroke
  noFill();
  stroke(255);
  strokeWeight(2);
  
  //get the smallest value between width and height
  let minSize = min(width, height);
  
  let amount = minSize / 30;

  for (let i = 1; i < amount; i++) {
    //The x position changes randomly between the left and right sides of the canvas' center.
    let x = random(width / 2 - amount, width / 2 + amount);
    
    //The y position changes randomly between the top and bottom of the canvas' center.
    let y = random(height / 2 - amount, height / 2 + amount);
    
    //draw the square,and the square size gets bigger, and the largest square slightly exceeds the canvas edge.
    square(x, y, amount * i);
    console.log("suqare size: " + amount * i)
  }
}