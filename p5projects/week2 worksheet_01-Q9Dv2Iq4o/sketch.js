function setup() {
  createCanvas(400, 400);
  // Arguments for rect 1
  // e.g. rect(topRightX, topRightY, bottomLeftX, bottomLeftY);
  rect();

  // Arguments for rect 2
  //Starting from the coordinates of the center point of the rectangle, width, height
  rect(centerPointx, centerPointy, width, height);
  // Come up with as many as you can think of!

  // Arguments for rect 3
  //By the ratio of the height and width of the drawing board
  let ratioX = 0.8;
  let ratioY = 0.6;
  let sizeX = 20;
  let sizeY = rect(width * ratioX, height * ratioY, sizeX, sizeY);

  // Arguments for rect 4
  //By using four vertices, the same x and y values are managed uniformly.
  let x1=100;
  let x2=200;
  let y1=200;
  let y2=400;
  
  line(x1,y1,x2,y1);
  line(x1,y2,x2,y2);
  line(x1,y1,x1,y2);
  line(x2,y1,x2,y2);
  
  rect();
  rect();
  rect();
  rect();
  rect();
  rect();
}
