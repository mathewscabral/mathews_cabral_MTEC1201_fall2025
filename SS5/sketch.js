/*
 Mathews Cabral Henrique de Oliveira
 SS5 
 requirements 2 for loop, one conditional
Instructions: 
- Move the mouse to change the size and color of the circles.
- Click and screen go to sDark mode.
- Press any key to add random sparkles.
*/

let sparklePositions = [];

function setup() {
  createCanvas(600, 600);
  noStroke();
}

function draw() {
  // background changes depending on mousePressed 
  if (mouseIsPressed) {
    background(15);       // darker mode
  } else {
    background(240);      // lighter mode
  }

  // ========= PATTERN 1 =========
  let step = 40; // distance between circle 

  for (let y = 0; y <= height; y += step) {       // first for loop
    for (let x = 0; x <= width; x += step) {      // second for loop
      // distance from mouse to circle
      let d = dist(mouseX, mouseY, x, y);

      // distance for circle and color
      let size = map(d, 0, 400, 30, 3);          // closer to mouse = bigger
      size = constrain(size, 3, 30);

      let r = map(d, 0, 300, 255, 50);
      let b = map(d, 0, 300, 100, 255);

      // If mouse is pressed, invert colors a bit
      if (mouseIsPressed) {
        fill(b, 80, r);
      } else {
        fill(r, 120, b);
      }

      circle(x, y, size);
    }
  }


  // this was just for the unpredictability
  for (let i = 0; i < sparklePositions.length; i++) { // fourth for loop
    let s = sparklePositions[i];
    fill(255, 255, 0, 180);
    circle(s.x, s.y, s.size);
  }

  // sparkles fade by reducing size
  for (let i = sparklePositions.length - 1; i >= 0; i--) { // fifth for loop
    sparklePositions[i].size *= 0.92;
    if (sparklePositions[i].size < 2) {
      sparklePositions.splice(i, 1); // remove tiny sparkles-https://p5js.org/reference/p5/splice/
    }
  }
}

function keyPressed() {
  // random sparkle added when any key pressed
  for (let i = 0; i < 25; i++) {
    sparklePositions.push({
      x: random(width),
      y: random(height),
      size: random(4, 20)
    });
  }
}
