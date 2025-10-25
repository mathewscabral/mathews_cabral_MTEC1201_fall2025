/*
Mathews C.
SS4: “Day and Night”
Continous work from SS1 till now. New additions, a new scene. "night"
 simple sky changes.
Instructions: Press D for Day and N for Night. Move your mouse to move the Sun or Moon.
*/

let scene = "day";  // day or night 

function setup() {
  createCanvas(800, 600);
}

function draw() {
  // background
  if (scene === "day") {
    background(135, 206, 235); // sky blue
  } else {
    background(25, 25, 112); // night blue
  }

  // clouds (always visible)
  noStroke();
  fill(255);
  ellipse(140, 110, 90, 55);
  ellipse(175, 100, 120, 65);
  ellipse(215, 112, 90, 55);

  ellipse(560, 90, 80, 50);
  ellipse(590, 82, 105, 60);
  ellipse(625, 92, 80, 50);

  // sun or moon
  if (scene === "day") {
    fill(255, 204, 0);
    ellipse(mouseX, mouseY, 150, 150);
    fill(255, 204, 0, 60);
    ellipse(mouseX, mouseY, 190, 190);

    // sun face
    fill(60);
    rect(mouseX - 40, mouseY - 18, 22, 26, 6);
    rect(mouseX + 18, mouseY - 18, 22, 26, 6);

    noFill();
    stroke(70);
    strokeWeight(4);
    arc(mouseX, mouseY + 40, 60, 30, 0, PI); // smile
    //cheeks
   fill(255, 150, 150, 120);
noStroke();
ellipse(mouseX - 50, mouseY + 35, 20, 15);
ellipse(mouseX + 50, mouseY + 35, 20, 15);
  } else {
    fill(255, 255, 230);
    ellipse(mouseX, mouseY, 150, 150);
    fill(255, 255, 230, 60);
    ellipse(mouseX, mouseY, 190, 190);

    // moon face
    fill(100);
    rect(mouseX - 35, mouseY - 18, 20, 25, 6);
    rect(mouseX + 15, mouseY - 18, 20, 25, 6);
//cheeks
   fill(255, 150, 150, 120);
noStroke();
ellipse(mouseX - 50, mouseY + 35, 20, 15);
ellipse(mouseX + 50, mouseY + 35, 20, 15);
    noFill();
    stroke(255);
    strokeWeight(4);
    arc(mouseX, mouseY + 45, 60, 25, 0, PI); // sleepy smile
  }
}

function keyPressed() {
  if (key === 'D' || key === 'd') {
    scene = "day";
  } else if (key === 'N' || key === 'n') {
    scene = "night";
  }
}
