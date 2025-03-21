let shapes = [];
let shapeSize = 10;
let gridSize = 80;

function setup() {
  createCanvas(800, 800);
  noStroke();

   for (let x = gridSize / 2; x < width; x += gridSize) {
    for (let y = gridSize / 2; y < height; y += gridSize) {
      let shapeType = random(["circle", "square", "triangle"]);

      let offsetX = random(-gridSize / 4, gridSize / 4);
      let offsetY = random(-gridSize / 4, gridSize / 4);
      let offset = random(100);
      shapes.push({ shapeType, x: x + offsetX, y: y + offsetY, offset });
    }
  }
}

function draw() {
  background("#FFF6F1");

  for (let shape of shapes) {
    let opacity = map(sin(frameCount * 0.05 + shape.offset), -1, 1, 50, 255);

    if (shape.shapeType === "circle") {
      fill(242, 64, 0, opacity);
      ellipse(shape.x, shape.y, shapeSize);
    } else if (shape.shapeType === "square") {
      fill(49, 0, 137, opacity); // blue square
      rect(shape.x, shape.y, shapeSize, shapeSize);
    } else if (shape.shapeType === "triangle") {
      fill(255, 223, 87, opacity); // yellow traiangle
      triangle(
        shape.x,
        shape.y - shapeSize / 2, // vertex
        shape.x - shapeSize / 2,
        shape.y + shapeSize / 2, // left vertex
        shape.x + shapeSize / 2,
        shape.y + shapeSize / 2 // right vertex
      );
    }
  }
}
