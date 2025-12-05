/* 
Mathews C.
Final Project – Fishing Game (Phase 1, OOP version)
Instructions: Move the mouse to move the hook. 
Fish swim left or right across the water.
*/

// ====== GLOBALS ======
let fishes = [];      // fish array
let hookX, hookY;     // hook position


// ====== CLASS ======
class Fish {
  constructor() {
    // random direction: 1 = right, -1 = left
    this.dir = random(1) < 0.5 ? 1 : -1;

    // start offscreen depending on direction
    this.x = (this.dir === 1) 
      ? random(-200, -50) 
      : random(width + 50, width + 200);

    // random Y, speed, size
    this.y = random(300, 550);
    this.speed = random(1, 3);
    this.size = random(30, 50);
  }

  move() {
    // movement depends on direction
    this.x += this.speed * this.dir;

    // respawn when off-screen
    if (this.dir === 1 && this.x > width + 100) {
     
      this.x = random(-200, -50);
      this.y = random(300, 550);
    }
    if (this.dir === -1 && this.x < -100) {
      
      this.x = random(width + 50, width + 200);
      this.y = random(300, 550);
    }
  }

  draw() {
    // 

    // body
    fill(255, 160, 90);
    ellipse(this.x, this.y, this.size, this.size * 0.6);

    // tail
    fill(230, 120, 70);
    triangle(
      this.x - this.dir * (this.size * 0.8), this.y,
      this.x - this.dir * (this.size * 0.25), this.y - this.size * 0.3,
      this.x - this.dir * (this.size * 0.25), this.y + this.size * 0.3
    );
    fill(230,160)
triangle(
      this.x - this.dir * (this.size * 0.5), this.y,
      this.x - this.dir * (this.size * 0.25), this.y - this.size * 0.3,
      this.x - this.dir * (this.size * 0.25), this.y + this.size * 0.3
    );
    // fin
    fill(255, 130, 60);
    triangle(
      this.x, this.y - this.size * 0.3,
      this.x + this.dir * this.size * 0.18, this.y - this.size * 0.55,
      this.x - this.dir * this.size * 0.18, this.y - this.size * 0.55
    );

    // eye
    fill(255);
    ellipse(
      this.x + this.dir * this.size * 0.22,
      this.y - this.size * 0.1,
      this.size * 0.15
    );

    fill(0);
    ellipse(
      this.x + this.dir * this.size * 0.26,
      this.y - this.size * 0.1,
      this.size * 0.07
    );
  }
}


// ====== SETUP ======
function setup() {
  createCanvas(800, 600);

  hookX = width / 2;
  hookY = 150;

  // create 8 FISH OBJECTS
  for (let i = 0; i < 8; i++) {
    fishes.push(new Fish());
  }
}


// ====== DRAW LOOP ======
function draw() {
  background(60, 150, 220);  // water

  // hook follows mouse
  hookX = mouseX;
  hookY = constrain(mouseY, 40, height - 40);// so it won't come out of screen.

  // draw hook and line
  stroke(255);
  strokeWeight(3);
  line(hookX, 0, hookX, hookY);

  noStroke();
  fill(255, 230);
  ellipse(hookX, hookY, 20, 20);

  // UPDATE + DRAW every fish using OOP
  for (let i = 0; i < fishes.length; i++) {
    fishes[i].move();
    fishes[i].draw();
  }
}
