let total = 20;
let columnWidth;
let columnHeight;
// let hues = [0,30,60];
let hues = [];
let baseHue;
let hueIncrement =30;
let hFill;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);
  columnWidth = width / total;
  columnHeight = height / 3;
  
  baseHue= round(random(0,300));
  
  for(let i=0; i<3;i++){
    let h=baseHue + i *hueIncrement
    hues.push(h);
  }

}

function draw() {
  background(255);

  for (let counter = 0; counter < total; counter++) {
    
    if(counter<total/3){
      hFill = hues[0];
    }else if(counter<(total/3)*2){
      hFill= hues[1];
    }else{
      hFill= hues [2];
    }
    
    fill(hFill,100,100);
    let x = counter * columnWidth;
    let y = height / 4;
    

    rect(x, y, columnWidth, columnHeight);
  }
}
