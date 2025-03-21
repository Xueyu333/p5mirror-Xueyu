let w;
function setup() {
  createCanvas(400, 400);
  w = width / 10;
  h = height / 10;
}

function draw() {
  background(255);
  for (let i = 0; i < 11; i++) {
    for (let a = 0; a < 11; a++) {
      if(i%2==0 && a%2==0){fill("black")}
      else if(i%2==1 && a%2==1){fill("black")}
      else
      {fill("white")}
       rect(i * w, a * h, w, h);
      } 

    }
  
}
