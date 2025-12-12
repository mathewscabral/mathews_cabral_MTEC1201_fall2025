/* 
Mathews C.
Final Project – Fishing Game (OOP version)
Instructions:
- Press 1 for MENU
- Press 2 to START the fishing game
- Move the mouse to move the hook and try to touch the fish
*/

// ===== STATES ====
const STATE_MENU = "menu";
const STATE_GAME = "game";
let startTime = 0;    // game start
let gameDuration = 30; // game length


let state = STATE_MENU;  // começa no menu

// ==== GLOBALS ====
let fishes = [];   // array com os peixes
let hookX, hookY;  // posição do anzol
let shark;

// ====== Classes ======
class Fish {
  constructor() {
    // which direction,  1 = right side, -1 = left side
    this.dir = random(1) < 0.5 ? 1 : -1;

    // starts off screen
    if (this.dir === 1) {
      this.x = random(-200, -50);          // come from left side
    } else {
      this.x = random(width + 50, width + 200); //come from right side
    }

    // position, speed and size
    this.y = random(300, 550);
    this.speed = random(1, 3);
    this.size = random(30, 50);

    // cor do corpo rgb
    this.bodyR = random(150, 255);
    this.bodyG = random(80, 180);
    this.bodyB = random(80, 160);
  }

  move() {
    // swims in the right direction
    this.x += this.speed * this.dir;

    // off the right side of screen, appear in the left 
    if (this.dir === 1 && this.x > width + 100) {
      this.x = random(-200, -50);
      this.y = random(300, 550);
    }

    // if its off the left side appears on right
    if (this.dir === -1 && this.x < -100) {
      this.x = random(width + 50, width + 200);
      this.y = random(300, 550);
    }
  }

  draw() {
    // body
    fill(this.bodyR, this.bodyG, this.bodyB);
    ellipse(this.x, this.y, this.size, this.size * 0.6);

    //tail, diff color no matter fish color
    fill(this.bodyR - 40, this.bodyG - 40, this.bodyB - 40);
    triangle(
      this.x - this.dir * this.size * 1.2, this.y,
      this.x - this.dir * this.size * 0.3, this.y - this.size / 4,
      this.x - this.dir * this.size * 0.3, this.y + this.size / 4
    );

    // eye
    fill(0);
    ellipse(
      this.x + this.dir * (this.size * 0.25),
      this.y - 5,
      this.size / 10
    );
  }
}


//====== setup ======

function setup() {
  createCanvas(800, 600);

  // hook starts in middle
  hookX = width / 2;
  hookY = 150;

  // 6 fishes to start 
  for (let i = 0; i < 6; i++) {
    fishes.push(new Fish());
  }
}


// ====== Draw ======
function draw() {
  if (state === STATE_MENU) {
    drawMenu();
  } else if (state === STATE_GAME) {
    drawFishingGame();
  }
}


//======Functions======
function drawMenu() {
  background(20, 40, 80);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("Fishing Game", width / 2, height * 0.3);

  textSize(18);
  text("Press 2 to START", width / 2, height * 0.5);
  text("Press 1 to stay in the MENU", width / 2, height * 0.55);
  text("Move the mouse to move the hook in the game", width / 2, height * 0.65);
}


// ======Game======
function drawFishingGame() {
  background(60, 150, 220);  // água

  // timer
  let elapsed = (millis() - startTime) / 1000;      // time elapsed
  let remaining = gameDuration - elapsed;           // how much is left
  if (remaining < 0) {
    remaining = 0;  // always a positive #
  }

  // text for timer
  fill(255);
  textAlign(CENTER, TOP);
  textSize(24);
  text("Time: " + int(remaining), width / 2, 10);


  // ======anzol follows mouse with constrained movement (X e Y, limited)======

  hookX = mouseX;
  hookY = constrain(mouseY, 40, height - 40);

  //====== hook string======
  stroke(255);
  strokeWeight(3);
  line(hookX, 0, hookX, hookY);

  // hook tip 
  noStroke();
  fill(255, 230);
  ellipse(hookX, hookY, 20, 20);

  // update and draw fishes
  for (let i = 0; i < fishes.length; i++) {
    let f = fishes[i];

    f.move();
    f.draw();

    // collision detecting for hook to fish (pescar)
    let d = dist(hookX, hookY, f.x, f.y);

    // when close enough hooks gets fish, fish just reappear in a new location, might use splice so it dissappears.
    if (d < f.size * 0.5) {
      // reaparece como um novo peixe (bem simples)
      f.x = random(-200, -50);
      f.y = random(300, 550);
      f.dir = random(1) < 0.5 ? 1 : -1;
        
      

    }
  }
}


// ====user
function keyPressed() {
  if (key === '1') {
    state = STATE_MENU;   // volta pro menu
  } else if (key === '2') {
    state = STATE_GAME;   // vai pro jogo
    startTime = millis();
  }
}
