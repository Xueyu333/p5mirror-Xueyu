let a1 = 0; //宣告變數a1並代入0
let a2 = 0; //宣告變數a2並代入0

function setup(){
  createCanvas(windowWidth, windowHeight); //創建畫布(視窗的寬, 高)
  background(0); //背景色(黑)
  colorMode(HSB); //設定使用HSB色彩模式，各階段數為？
  rectMode(CENTER); //繪製矩形的模式(中央)
  angleMode(DEGREES); //設定使用角度的模式(依度數法)
  stroke(0); //縣條的顏色(黑)
}

function draw(){
  background(0, 0.2); //背景色(黑)0.2為透明度
  translate(width/2, height/2); //位移原點座標至畫布的中央
  
  for(let i = width/2; i < width; i += 24){ //利用for迴圈處理變數i
	push(); //暫存原點座標
	rotate(45*cos(i*a1)); //旋轉(45*cos(i*a1))
	fill(i%360, 70, 100); //填塗顏色
	rect(0, 0, width-i, width-i, (width-i)/8); //繪製矩形
	pop(); //恢復原點座標
  }
  a1 = tan(a2); //變數a1代入sin(a2)
  a2 += 0.2; //變數a2逐次遞增0.2
}