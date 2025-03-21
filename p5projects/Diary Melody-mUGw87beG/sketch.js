//diary example

// Sad Diary
// Today feels like a weight I can’t lift... The emptiness in my chest grows heavier with every passing hour... I tried distracting myself, but nothing seems to work. Even the things that used to bring me joy feel distant now. I wonder if this ache will ever leave or if it’s just a part of me now.

// Happy Diary
// Today was perfect in its simplicity! The sun felt warmer, the air crisper, and every little thing seemed to glow with possibility~ I laughed more than I have in weeks, and it felt like my heart was lighter than air~~ It’s a day I’ll carry with me for a long time.

// Calm Diary
// The world was quiet today, and so was I~~~ I sat by the window, watching the rain paint patterns on the glass, feeling content. No rush, no noise—just me and the steady rhythm of the moment. Peace isn’t loud, but it’s beautiful in its stillness.

// Angry Diary
// I can’t stop replaying it in my head!!! The way they spoke, the lack of respect—it burns. I tried to keep calm, but the frustration bubbled over. Why is it so hard for people to listen? I’m tired of holding back when all I want is to scream.

//Declare and define the following variables:
let diaryInput = ""; //Variable to store the text input by the user for their diary entry
let currentScene = "input"; // Variable to track the current application scene (input or visual)
let isTextboxActive = false; // Flag to indicate whether the text input box is currently active
let submittedDiary = ""; // Variable to store the final diary text after submission
let currentEmotion = ""; // Variable to store the current selected emotion (Sad, Calm, Happy, or Stressed)

//Declare additional variables for audio and visual effects
let synth; // Variable to hold the audio synthesizer for sound generation
let currentIndex = 0; // Variable to track the current character index being processed
let circles = []; // Array to store information about generated visual circles
let punctuations = []; // Array to store information about punctuation marks

// Define the setup function to initialize the diary
function setup() {
  createCanvas(800, 800);
  noStroke();

  // Initialize audio context to ensure sound can be played
  userStartAudio();

  synth = new p5.PolySynth(); // Create a polyphonic synthesizer for generating musical notes

  // Add an event listener for paste events to handle text input
  document.addEventListener("paste", handlePaste);
}

// Define the main draw loop function to render different scenes
function draw() {
  // Check the current scene and call the appropriate rendering function
  if (currentScene === "input") {
    drawInputScene(); //Render the input text scene
  } else if (currentScene === "visual") {
    drawVisualScene(); //Render the visual effect scene
  }
}

//Define the input scene rendering function
function drawInputScene() {
  //background color
  background("rgb(247,247,247)");

  //Configure and render the "Diary" title
  textAlign(CENTER, CENTER);
  textFont("papyrus");
  textSize(60);
  fill("rgb(119,104,92)");
  text("Diary", width / 2, height * 0.13);

  //Define textbox dimensions and position
  let textboxX = width * 0.1;
  let textboxY = height * 0.2;
  let textboxWidth = width * 0.8;
  let textboxHeight = height * 0.4;

  //Draw textbox with color changing based on active state
  fill(isTextboxActive ? 220 : 180); // When isTextboxActive is true, the rectangle's background color is light gray; when isTextboxActive is false, the rectangle's background color is dark gray.
  rect(textboxX, textboxY, textboxWidth, textboxHeight, 20);

  // Configure text rendering for diary input
  fill(0);
  textAlign(LEFT, TOP); //Text left-aligned and top-aligned.
  textSize(18);

  //Ensure the text content automatically wraps based on the width and height of the text box
  text(
    diaryInput,
    textboxX + 10,
    textboxY + 10,
    textboxWidth - 20,
    textboxHeight - 20
  );

  // Draw emotion selection buttons
  drawEmotionButton(width * 0.2, height * 0.7, "Sad", ["#29388D"]); // blue
  drawEmotionButton(width * 0.35, height * 0.7, "Calm", ["#82BF3B"]); // green
  drawEmotionButton(width * 0.5, height * 0.7, "Happy", ["rgb(255,227,8)"]); // yellow
  drawEmotionButton(width * 0.65, height * 0.7, "Stressed", ["rgb(207,0,0)"]); // red
}

//Define function to render emotion selection buttons
function drawEmotionButton(x, y, label, color) {
  //Calculate button dimensions
  let buttonWidth = width * 0.12;
  let buttonHeight = height * 0.08;

  //Draw button rectangle with specified color
  fill(color);
  rect(x, y, buttonWidth, buttonHeight, 20);

  //Configure and render button label
  fill(255);
  textSize(20);
  textFont("papyrus");
  textAlign(CENTER, CENTER);
  text(label, x + buttonWidth / 2, y + buttonHeight / 2);
}

//Define the visual scene rendering function
function drawVisualScene() {
  //Set background color based on selected emotion
  if (currentEmotion === "Sad") {
    background("rgb(64,64,141)"); // blue
  } else if (currentEmotion === "Calm") {
    background("rgb(107,216,107)"); // green
  } else if (currentEmotion === "Happy") {
    background(255, 227, 8); // yellow
  } else if (currentEmotion === "Stressed") {
    background(207, 0, 0); // red
  }
  

  //Process one character every 23 frames
  if (frameCount % 23 === 0 && currentIndex < submittedDiary.length) {
    processCharacter(submittedDiary[currentIndex]);
    currentIndex++;
  }

  //Update and render breathing circles
  for (let circle of circles) {
    drawBreathingCircle(circle);
  }

  //Update and render punctuation marks
  for (let punctuation of punctuations) {
    drawPunctuation(punctuation);
  }
}

//Define function to process individual characters
function processCharacter(char) {
  //Convert character to lowercase
  let lowerChar = char.toLowerCase(); //string.toLowerCase()

  //Define a fixed list of punctuation marks
  const punctuationList = [
    "!",
    "?",
    ".",
    ",",
    ":",
    ";",
    "-",
    "—",
    "…",
    '"',
    "~",
    "'",
    "‘",
    "’",
  ];

  // Handle punctuation separately
  //Determine whether the current character is a punctuation mark
  if (punctuationList.includes(char)) {
    addPunctuation(char);
    return; // If it is, return immediately without processing the logic for notes and colors
  }

  //Define note and color mappings for characters
  const notes = {
    a: ["C4", "E4", "G4"],
    b: ["D4", "F4", "A4"],
    c: ["E4", "G4", "B4"],
    d: ["F4", "A4", "C5"],
    e: ["G4", "B4", "D5"],
    f: ["A4", "C5", "E5"],
    g: ["B3", "D4", "F4"],
    h: ["C4", "F4", "G4"],
    i: ["D4", "G4", "A4"],
    j: ["E4", "A4", "B4"],
    k: ["F4", "A4", "D5"],
    l: ["G4", "B4", "E5"],
    m: ["A3", "C4", "E4", "G4"],
    n: ["B3", "D4", "F4", "A4"],
    o: ["C4", "E4", "G4", "B4"],
    p: ["D4", "F4", "A4", "C5"],
    q: ["E4", "G4", "B4", "D5"],
    r: ["F4", "A4", "C5", "E5"],
    s: ["G4", "B4", "D5", "F5"],
    t: ["A4", "C5", "E5", "G5"],
    u: ["B3", "D4", "F4", "Ab4"],
    v: ["C4", "D4", "G4"],
    w: ["D4", "E4", "A4"],
    x: ["E4", "F4", "B4"],
    y: ["F4", "G4", "A4"],
    z: ["G4", "A4", "B4"],
  };

  const colors = {
    a: [254, 79, 79],
    b: [255, 178, 102],
    c: [255, 255, 102],
    d: [178, 255, 102],
    e: [102, 255, 102],
    f: [102, 255, 178],
    g: [102, 255, 255],
    h: [102, 178, 255],
    i: [102, 102, 255],
    j: [178, 102, 255],
    k: [255, 102, 255],
    l: [255, 102, 178],
    m: [255, 153, 153],
    n: [255, 204, 153],
    o: [255, 255, 153],
    p: [204, 255, 153],
    q: [153, 255, 153],
    r: [153, 255, 204],
    s: [153, 255, 255],
    t: [153, 204, 255],
    u: [153, 153, 255],
    v: [204, 153, 255],
    w: [255, 153, 255],
    x: [255, 153, 204],
    y: [255, 204, 204],
    z: [204, 204, 255],
  };

  //Process valid alphabetic characters
  if (notes[lowerChar]) {
    //// Check if the current character exists in the notes object
    let chord = notes[lowerChar];

    //Adjust pitch based on selected emotion
    if (currentEmotion === "Sad") {
      // // If the current emotion is "Sad"
      chord = chord.map((note) => note.replace(/\d/, (n) => parseInt(n) - 1)); //Lower the pitch by reducing the octave by 1
    } else if (currentEmotion === "Stressed") {
      // Stressed Mode
      chord = chord.map((note) => note.replace(/\d/, (n) => parseInt(n) + 1)); //Raise the pitch by increasing the octave by 1
    }

    //Play the chord and create a corresponding circle
    chord.forEach((note) => synth.play(note, 0.5, 0, 0.5)); // play(note, velocity, time, duration) Play each note in the chord with velocity 0.5, no delay, and a duration of 0.5s
    addCircle(colors[lowerChar]); // Create a visual breathing circle with the color corresponding to the letter
  }
}

//Define function to add punctuation marks
function addPunctuation(char) {
  //Generate random position and size for punctuation
  let x = random(width); //random position
  let y = random(height);
  let size = random(30, 100); // random size

  //Store punctuation information
  punctuations.push({
    char,
    x,
    y,
    size,
  });
}

//Define function to render punctuation marks
function drawPunctuation(punctuation) {
  //Set white color and render punctuation
  fill(255);
  textSize(punctuation.size);
  textAlign(CENTER, CENTER);
  text(punctuation.char, punctuation.x, punctuation.y);
}

//Define function to add breathing circles
function addCircle(color) {
  //Generate random circle properties
  let x = random(width);
  let y = random(height);
  let maxSize = random(50, 150); //constrain the size
  let breathingSpeed = random(0.002, 0.01);

  //Store circle information
  circles.push({
    x,
    y,
    color,
    maxSize,
    currentSize: maxSize * 0.8,
    breathingSpeed,
    phase: random(TWO_PI), // A random phase offset for the breathing animation, ensures circles start at different points in the breathing cycle
  });
}

//Define function to render breathing circles
function drawBreathingCircle(circle) {
  let adjustedColor;

  //Adjust circle color based on emotion
  if (currentEmotion === "Sad") {
    adjustedColor = [
      (circle.color[0] + 10) / 2, //Adjust red , making it slightly darker
      (circle.color[1] + 10) / 2, // Adjust green, making it slightly darker
      (circle.color[2] + 80) / 2, // Increase the blue component, creating a cooler tone
    ];
  } else if (currentEmotion === "Calm") {
    adjustedColor = [
      (circle.color[0] + 50) / 2, //Adjust the red component, making it slightly warmer
      (circle.color[1] + 200) / 2, //increase the green component
      (circle.color[2] + 50) / 2, //Adjust the blue component,
    ];
  } else if (currentEmotion === "Stressed") {
    adjustedColor = [
      (circle.color[0] + 200) / 2, // Increase the red component
      (circle.color[1] + 50) / 2,
      (circle.color[2] + 50) / 2,
    ];
  } else {
    // Happy mode(defaut color)
    adjustedColor = circle.color;
  }

  //Calculate breathing effect size
  circle.currentSize =
    circle.maxSize * 0.8 +
    sin(frameCount * circle.breathingSpeed + circle.phase) *
      circle.maxSize *
      0.2;
  //base size (80% of maxSize) + a sin oscillation (with amplitude 20% of maxSize) that creates a breathing effect, controlled by the frameCount,breathingSpeed,and starting offset (phase).

  //Render multi-layered gradient circle
  push();
  translate(circle.x, circle.y);
  for (let layer = 0; layer < 12; layer++) {
    let alpha = map(layer, 0, 12, 100, 5); //Maps the value of layer from the range [0, 12] to the transparency range [100, 5].
    fill(adjustedColor[0], adjustedColor[1], adjustedColor[2], alpha);
    ellipse(0, 0, circle.currentSize - layer * 5); //Each layer is 5 smaller than the previous one.
  }
  pop();
  //push() saves the current canvas state. All transformations between push() and pop() only affect the current block of code and do not interfere with the global state.
}

//Define mouse press event handler
function mousePressed() {
  if (currentScene === "input") {
    //Check if textbox is clicked
    let textboxX = width * 0.1;
    let textboxY = height * 0.2;
    let textboxWidth = width * 0.8;
    let textboxHeight = height * 0.4;

    if (
      mouseX > textboxX &&
      mouseX < textboxX + textboxWidth &&
      mouseY > textboxY &&
      mouseY < textboxY + textboxHeight
    ) {
      isTextboxActive = true;
    } else {
      isTextboxActive = false;
    }

    //Check emotion button clicks
    let buttonWidth = width * 0.1;
    let buttonHeight = height * 0.08;

    if (mouseY > height * 0.7 && mouseY < height * 0.7 + buttonHeight) {
      //Set emotion based on button location
      if (mouseX > width * 0.2 && mouseX < width * 0.3) {
        currentEmotion = "Sad"; // Switch to sad mode
      } else if (mouseX > width * 0.35 && mouseX < width * 0.45) {
        currentEmotion = "Calm"; // Switch to calm mode
      } else if (mouseX > width * 0.5 && mouseX < width * 0.6) {
        currentEmotion = "Happy"; // Switch to happy mode
      } else if (mouseX > width * 0.65 && mouseX < width * 0.75) {
        currentEmotion = "Stressed"; // Switch to stressed mode
      }

      //Transition to visual scene
      submittedDiary = diaryInput; //Save the diary content entered by the user in the text box (diaryInput) to the variable submittedDiary.
      diaryInput = ""; //Clear the text box content to prepare for the next entry.
      isTextboxActive = false; //Set the text box's active state to false
      currentScene = "visual"; //Switch the current scene to visual scene
    }
  }
}

//Handles the text input by the user in the text box and automatically wraps the text based on the width of the text box, ensuring the content does not exceed its boundaries.

function keyTyped() {
  if (currentScene === "input" && isTextboxActive) {
    //Ensures that the input is a valid character, not a control key (such as Shift or Ctrl).key represents the value of the currently pressed key, and its length is 1 if it is a character (e.g., 'a').

    if (key.length === 1) {
      // Define the maximum width of the text box
      let textboxWidth = width * 0.8 - 40; // subtracting the left and right margins

      //Add the current input character key to the existing text diaryInput to get the simulated new content.
      let testInput = diaryInput + key;

      textSize(18); // Ensure the text size is the same as used during rendering.
      let lastLineWidth = textWidth(testInput.split("\n").pop());
      //Retrieve the last line of text (including all words and characters in that line).
      //Calculate the total width of this entire line of text.(textWidth())

      if (lastLineWidth < textboxWidth) {
        diaryInput += key;
      } else {
        // Automatically wrap to the next line if the width is exceeded.
        diaryInput += "\n" + key;
      }
    }
  }
}

//Define key pressed event handler
function keyPressed() {
  //Handle backspace to remove last character
  if (currentScene === "input" && isTextboxActive) {
    if (keyCode === BACKSPACE) {
      diaryInput = diaryInput.slice(0, -1);
    } else if (keyCode === ENTER || keyCode === RETURN) {
      // Manually add a newline character.
      diaryInput += "\n";
    }
  }
}

//Define paste event handler：Handle the text pasted by the user into the text box and ensure the pasted content automatically wraps based on the width of the text box.
function handlePaste(event) {
  //Add pasted text to diary input
  if (isTextboxActive && currentScene === "input") {
    //Retrieve the plain text content pasted from the clipboard.
    let pasteData = event.clipboardData.getData("text");

    // Split pasted text into lines to handle existing newlines
    let lines = pasteData.split(/\n/);

    // Define the maximum width of the textbox
    let textboxWidth = width * 0.8 - 40; // Subtracting padding/margin

    // Initialize variables to rebuild wrapped text
    let wrappedText = "";

    textSize(18); // Match the text size used in rendering

    for (let line of lines) {
      let words = line.split(/\s+/); // Split the line into words
      let currentLine = "";

      for (let word of words) {
        // Handle long, unbroken words exceeding the textbox width
        if (textWidth(word) > textboxWidth) {
          for (let i = 0; i < word.length; i++) {
            let testLine = currentLine + word[i];
            if (textWidth(testLine) > textboxWidth) {
              wrappedText += currentLine + "\n"; // Wrap the line
              currentLine = word[i]; // Start a new line with the current character
            } else {
              currentLine = testLine; // Add character to the current line
            }
          }
        } else {
          // Test adding the next word to the current line
          let testLine =
            currentLine.length > 0 ? currentLine + " " + word : word;

          // If the line width exceeds the textbox width, wrap to the next line
          if (textWidth(testLine) > textboxWidth) {
            wrappedText += currentLine + "\n"; // Add current line with a newline
            currentLine = word; // Start a new line with the current word
          } else {
            currentLine = testLine; // Continue adding to the current line
          }
        }
      }

      // Add the last line of the current paragraph
      wrappedText += currentLine + "\n";
    }

    // Append the wrapped text to the diary input
    diaryInput += wrappedText.trim();

    event.preventDefault(); // Prevent default paste behavior
  }
}

// //Define paste event handler
// function handlePaste(event) {

//   //Add pasted text to diary input
//   if (isTextboxActive && currentScene === "input") {
//     let pasteData = event.clipboardData.getData("text");
//     diaryInput += pasteData;
//   }
// }

// //Define key typed event handler
// function keyTyped() {
//   //Add typed characters to diary input
//   if (currentScene === "input" && isTextboxActive) {
//     if (key.length === 1) {
//
//       let testInput = diaryInput + key;

//       let testLines = wrapText(testInput, width * 0.8 - 20);

//       if (testLines[testLines.length - 1].length > 0) {
//         diaryInput += key;
//       }
//     }
//   }
// }
