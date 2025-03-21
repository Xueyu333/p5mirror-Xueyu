/*
Inspired by William Kolomyjec’s Random Squares

Based on a translation using recursion from Generative Artistry:
https://generativeartistry.com/tutorials/hypnotic-squares/
*/ 

let sizeStart;//initial size of the largest square
let sizeTarget = 4;//minimum size of the smallest square
let totalSteps = 6;//total number of recursive steps (how many nested squares)
var directions = [-1, 0, 1];//Possible movement directions for the nested squares


function setup() {
  createCanvas(windowWidth, windowHeight);
  initialize(); //call the function to start the drawing
}

function initialize() {
  background(255);
  noFill();
  strokeWeight(2);

  sizeStart = width / 8; //define the starting square size as 1/8 of the canvas width

  
  //loop through the grid to place squares
  for (let x = 0; x < width; x += sizeStart) {
    for (let y = 0; y < height; y += sizeStart) {
      
       // randomly choose movement in x and y direction (-1, 0, or 1)
      let xDirection = random(directions);
     
      let yDirection = random(directions);
      
      //draw the recursive squares
      drawSquare(x, y, sizeStart, xDirection, yDirection, totalSteps - 1);
    }
  }
}

function drawSquare(x, y, size, xMove, yMove, steps) {
  
  //draw the outermost square
  square(x, y, size);

  
  if (steps >= 0) {
    
    // calculate the new size of the next square(start from smallest one)
    let newSize = sizeStart * (steps / totalSteps) + sizeTarget;
    
    //calculate the offset for centering the smaller square
    let halfway = (size - newSize) / 5;
    
    // new x and y positions for the next square
    let newX = x + halfway;
    let newY = y + halfway;
    
    
    //apply movement based on randomly chosen direction
    newX = newX - ((x - newX) / (steps + 2)) * xMove;
    newY = newY - ((y - newY) / (steps + 2)) * yMove;
    
    
     // recursively draw the next smaller square
    drawSquare(newX, newY, newSize, xMove, yMove, steps - 1);
  }
}

/*
MIT License

Copyright (c) 2018 Tim Holman

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/