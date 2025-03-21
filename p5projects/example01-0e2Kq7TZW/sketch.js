/*
Eclipse
Refresh to get a new output :)
#WCCChallenge topic "Eclipse 🌑" 2024.4.14 by TKt | 陳建中 Tân Kiàn-tiong（rainsr7235）
*/

let y
function setup() {
	describe(`A grayscale generative art image featuring a total solar eclipse in the sky,
	with a desert-like texture below and glowing particle bands generated based on Perlin Noise graphics.`)
	createCanvas(500, 700);
	background(30);
	
	// pixelDensity(10)
	
	y = random(300,400)
	
	let sunX = random(100,width-100)
	let sunY = random(50,150)
	
	let sunD = random(30,50)
	
	push()
	translate(sunX,sunY)
	for(let i=0;i<4000;i++){
		let r = sunD+random(random())*15
		let theta = random(2*PI)
		let x = cos(theta)*r
		let y = sin(theta)*r
		fill(255,30)
		noStroke()
		circle(x,y,random(2))
	}
	pop()
}

function draw() {
	
	for(let x=0;x<width;x++){
		
		let n1 = noise(x*0.002, y*0.008)
		let n2 = noise(x*0.01+1000000, y*0.01+1000000)
		let n3 = noise(x*0.002+10000, y*0.01+10000)
		
		let h = 10 + n1 * 150
		
		noStroke()
		fill(n1*255 + random(-5,5))
		rect(x,y,3,-h)
		 
		if(random()<0.01 && n2<0.4){
			fill(0,5)
			rect(x,y-h,randomGaussian(5,3),-randomGaussian(300,10))
		}
		
		if(n3>0.5 && n3<0.51){
			// fill("red")
			// circle(x,y-h,2)
			for(let j=0;j<100;j++){
				let dotX = x
				let dotY = y-h - (random(random())*200)
				fill(255,5)
				circle(dotX,dotY,random(2))
			}
		}
	}
	
	y++
	
	if(y>height+200){
		noLoop()
	}
}