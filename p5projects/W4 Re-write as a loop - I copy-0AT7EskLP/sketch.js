function setup() {
  createCanvas(100, 100);
  background(220);
}
function draw(){
  let w=width/10;
  for(let i=0;i<10;i++){
    
    fill("white")
    rect(i*w,0,w,height)  
    
  }
} 

