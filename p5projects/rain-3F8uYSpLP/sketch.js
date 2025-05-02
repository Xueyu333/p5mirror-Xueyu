let sentence = "The rain falls gently on the ground\nNature's music, a calming sound";
let letters = [];
let finalFontSize = 32;
let dropHeight = 150;

function setup() {
  createCanvas(900, 400);
  textFont('Georgia');
  textAlign(LEFT, BASELINE); // Using BASELINE alignment
  fill(0);
  
  // Calculate positions based on the final font size
  textSize(finalFontSize);
  let lines = sentence.split('\n');
  let lineHeight = finalFontSize * 1.5;
  // Calculate center position for text block
  let startY = height / 2 - ((lines.length - 1) * lineHeight) / 2 + finalFontSize/2;
  
  // Process each line
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    let lineWidth = textWidth(line);
    let startX = (width - lineWidth) / 2;
    // Each line has the same baseline y-coordinate for all letters
    let y = startY + i * lineHeight;
    
    // Create letter objects for this line
    for (let j = 0; j < line.length; j++) {
      let ch = line[j];
      let chWidth = textWidth(ch);
      
      letters.push({
        char: ch,
        x: startX,
        y: y - dropHeight - random(50, 200),
        targetX: startX,
        targetY: y,
        size: finalFontSize, // Use consistent size
        speed: random(1, 4),
        settled: false,
        // Add line and position information for debugging
        line: i,
        position: j
      });
      
      startX += chWidth;
    }
  }
}

function draw() {
  background(230, 235, 245);
  
  // Draw guidelines for debugging (optional)
  // stroke(200, 0, 0, 50);
  // line(0, letters[0].targetY, width, letters[0].targetY);
  // if (letters.length > 20) {
  //   line(0, letters[20].targetY, width, letters[20].targetY);
  // }
  
  // Set consistent size for drawing
  textSize(finalFontSize);
  
  // Draw each letter
  for (let letter of letters) {
    if (!letter.settled) {
      // Falling process - each letter falls straight down
      letter.y += letter.speed;
      
      // When letter reaches or exceeds its target Y position
      if (letter.y >= letter.targetY) {
        // Snap directly to target position
        letter.y = letter.targetY;
        letter.settled = true;
      }
    }
    
    // Always use the final font size for consistent display
    text(letter.char, letter.x, letter.y);
  }
}