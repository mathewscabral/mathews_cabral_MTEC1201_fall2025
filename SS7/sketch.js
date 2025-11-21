/* 
Mathews C.
SS7 — “Day & Night OOP”
code from SS4

Instructions:
=== Press "D" for Day, or "N" for Night.


Instructions:
- Press D for Day
- Press N for Night
- Move the mouse to move the Sun or Moon
*/

let scene = "day";  //

// vars
let sun;
let moon;
let c1, c2, c3;  

// ====== CELESTIAL CLASS (SUN + MOON) ======
class Celestial {
  constructor(isSun) {
    this.isSun = isSun;  // true → sun, false → moon
  }

  display() {
    // pick color based on sun/moon
    if (this.isSun) {
      fill(255, 204, 0);
    } else {
      fill(255, 255, 230);
    }

    // main circle
    ellipse(mouseX, mouseY, 150, 150);

    // glow
    if (this.isSun) {
      fill(255, 204, 0, 60);
    } else {
      fill(255, 255, 230, 60);
    }
    ellipse(mouseX, mouseY, 190, 190);
  }

  drawFace() {
    // face inside the orb — same for sun & moon
    fill(100);
    rect(mouseX - 40, mouseY - 18, 22, 26, 6);
    rect(mouseX + 18, mouseY - 18, 22, 26, 6);

    // cheeks
    fill(255, 150, 150, 120);
    ellipse(mouseX - 50, mouseY + 35, 20, 15);
    ellipse(mouseX + 50, mouseY + 35, 20, 15);

    // smile
    noFill();
    stroke(70);
    strokeWeight(4);
    arc(mouseX, mouseY + 40, 60, 30, 0, PI);
  }
}

// ------------------ CLOUD CLASS ------------------
class Cloud {
  constructor(x, y, size) {
    this.x = x;     // position
    this.y = y;
    this.size = size;
    this.speed = 0.5; // small movement
  }

  move() {
    this.x += this.speed;
    if (this.x > width + this.size) {
      this.x = -this.size; // wrap around screen
    }
  }

  display() {
    noStroke();
    fill(255);

    // simple cloud made of 3 ellipses
    ellipse(this.x, this.y, this.size, this.size * 0.6);
    ellipse(this.x + this.size * 0.4, this.y + 10, this.size * 0.8, this.size * 0.5);
    ellipse(this.x - this.size * 0.4, this.y + 10, this.size * 0.8, this.size * 0.5);
  }
}

// ------------------ SETUP ------------------
function setup() {
  createCanvas(800, 600);

  // create sun and moon objects
  sun = new Celestial(true);
  moon = new Celestial(false);

  // create 3 cloud objects (meeting the requirement)
  c1 = new Cloud(150, 120, 90);
  c2 = new Cloud(400, 80, 110);
  c3 = new Cloud(650, 140, 100);
}

// ------------------ DRAW ------------------
function draw() {

  // background
  if (scene === "day") {
    background(135, 206, 235);
  } else {
    background(25, 25, 112);
  }

  // draw & move clouds (always visible)
  c1.move(); c1.display();
  c2.move(); c2.display();
  c3.move(); c3.display();

  // draw sun or moon depending on scene
  if (scene === "day") {
    sun.display();
    sun.drawFace();
  } else {
    moon.display();
    moon.drawFace();
  }
}

// ------------------ INPUT ------------------
function keyPressed() {
  if (key === 'D' || key === 'd') scene = "day";
  if (key === 'N' || key === 'n') scene = "night";
}
