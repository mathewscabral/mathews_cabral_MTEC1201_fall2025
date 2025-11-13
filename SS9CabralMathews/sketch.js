/* 
Mathews C.
SS5_MathewsC — “Hallway Lights”

Instructions:
- Watch the hallway of rectangles flash.
- Move the mouse up/down to change how deep the hallway feels.
- Press C to change the color mood.
*/

let paletteIndex = 0; // which color mode we are in

function setup() {
  createCanvas(800, 600);
  rectMode(CENTER);
  frameRate(14); // slows things down so the flashing feels nicer
}

function draw() {
  background(5); // dark background like a tunnel

  // simple flash: ON for a few frames, OFF for a few frames
  let lightsOn = frameCount % 10 < 5;

  // how many rectangles (depth) – depends on mouseY
  let steps = int(map(mouseY, 0, height, 5, 15));
  steps = constrain(steps, 8, 25);

  // pick colors based on paletteIndex and lightsOn
  let edgeColor;
  let fillBright;
  let fillDim;

  if (paletteIndex === 0) {
    // warm / sunset
    edgeColor = color(255, 200, 140, 160);
    fillBright = color(255, 160, 80, 120);
    fillDim = color(100, 60, 40, 50);
  } else if (paletteIndex === 1) {
    // cool / sci-fi
    edgeColor = color(150, 220, 255, 170);
    fillBright = color(80, 180, 255, 130);
    fillDim = color(40, 80, 120, 60);
  } else {
    // neon / trippy
    edgeColor = color(180, 255, 200, 180);
    fillBright = color(120, 255, 200, 140);
    fillDim = color(180, 120, 255, 80);
  }

  // ----- FOR LOOP #1: stacked rectangles into depth -----
  for (let i = 0; i < steps; i++) {
    let t = i / (steps - 1); // 0 → front, 1 → far
    let w = lerp(width * 0.95, width * 0.2, t);
    let h = lerp(height * 0.85, height * 0.25, t);

    stroke(edgeColor);
    strokeWeight(2 + t * 3); // lines a bit thicker in the distance

    if (lightsOn) {
      fill(fillBright);
    } else {
      fill(fillDim);
    }

    rect(width / 2, height / 2, w, h);
  }

  // ----- FOR LOOP #2: floor lights along the bottom -----
  let stepX = 60;
  for (let x = stepX / 2; x < width; x += stepX) {
    noStroke();
    if (lightsOn) {
      fill(255, 230, 180, 180);
    } else {
      fill(120, 90, 60, 80);
    }
    rect(x, height * 0.85, 20, 10);
  }
}

function keyPressed() {
  // press C to switch between color moods
  if (key === 'c' || key === 'C') {
    paletteIndex++;
    if (paletteIndex > 2) {
      paletteIndex = 0;
    }
  }
}
