/* 
Mathews C.
Midterm — “Daytime”
Instructions:
- Use the mouse to move the Sun or moon
- Menu: press 1 = SS2 world, 2 = SS3 world, 3 = SS4 world, R = restart, M = menu.
- SS3 world: D = Day, N = Night, any other key = Twilight.
- SS4 world: time auto-cycles every 7s (millis).
*/

// ---------- Program Stat ----------
const STATE_MENU = "menu";
const STATE_SS2  = "ss2";
const STATE_SS3  = "ss3";
const STATE_SS4  = "ss4";

let state = STATE_MENU;

// ---------- Shared vars ----------
let orbSize = 100;
let orbGrow = 0.4;
let stars = [];
let clouds = [];
let timeOfDay = "day";

// ---------- SS4 vars (millis) ----------
let lastSwitch = 0;
let switchInterval = 7000;
let menuBG;

// simple message bubble
let messageText = "";
let messageEnd = 0;

// simple shooting star
let shooting = null; // https://www.youtube.com/watch?v=FO87ggFryk4//tutorial on how to do a cool shooting star

function preload() {
  menuBG = loadImage("images/menuBG.png");
}

function setup() {
  createCanvas(800, 600);
  textAlign(CENTER, CENTER);
  restartProject();
  for (let i = 0; i < 6; i++) {
    clouds.push({ x: random(width), y: random(100, 250), s: random(60,120), speed: random(0.2,0.5) });
  }
}

function draw() {
  if (state === STATE_MENU)      drawMenu();
  else if (state === STATE_SS2)  drawSS2();
  else if (state === STATE_SS3)  drawSS3();
  else if (state === STATE_SS4)  drawSS4();

  drawMessage();
}

// ---------- MENU ----------
function drawMenu() {
  imageMode(CORNER);
  image(menuBG, 0, 0, width, height);
  noStroke(); fill(0,120); rect(0,0,width,height);
  fill(255);
  textSize(28); text("MIDTERM — DayTime", width/2, height*0.25);
  textSize(18);
  text("Press 1: SS2 world (Day/Night growth)",  width/2, height*0.45);
  text("Press 2: SS3 world (Uncertainty + 3-way states)", width/2, height*0.52);
  text("Press 3: SS4 world (Text + millis)",     width/2, height*0.59);
  text("Press R anytime to restart; M for Menu", width/2, height*0.70);
}

/* ---------- HELPERS ---------- */

function drawClouds() {
  noStroke(); fill(255, 240);
  for (let c of clouds) {
    ellipse(c.x, c.y, c.s, c.s/2);
    ellipse(c.x+20, c.y+10, c.s*0.8, c.s*0.6);
    ellipse(c.x-20, c.y+10, c.s*0.9, c.s*0.7);
    c.x += c.speed;
    if (c.x - c.s > width) c.x = -c.s;
  }
}

function spawnStars(n) {
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push({ x: random(width), y: random(height*0.5), r: random(1, 3) });
  }
  return arr;
}

function drawStars(list) {
  noStroke(); fill(255);
  for (const s of list) ellipse(s.x, s.y, s.r, s.r);
}

function drawOrb(flag) {
  noStroke();
  let c;
  if (flag === true) c = color(255, 204, 0);
  else if (flag === false) c = color(255);
  else c = color(255, 150, 0);
  fill(c); ellipse(mouseX, mouseY, orbSize, orbSize);
  c.setAlpha(40); fill(c); ellipse(mouseX, mouseY, orbSize*1.6, orbSize*1.6);
}

// smoother gradient (only in SS3/SS4)
function drawGradientSky(t) {
  t = constrain(t, 0, 1);
  // ease the mouseX factor so it feels smoother
  t = t * t * (3 - 2 * t); // simple smoothstep easing

  let nightTop    = color(20, 20, 80);
  let nightBottom = color(10, 10, 40);
  let dayTop      = color(80, 180, 255);
  let dayBottom   = color(180, 220, 255);

  let topC    = lerpColor(nightTop, dayTop, t);//tutorial i used to do a smoother gradient https://www.youtube.com/watch?v=lPgscmgxcH0
  let bottomC = lerpColor(nightBottom, dayBottom, t);

  for (let y = 0; y < height; y++) {
    let p = y / height;
    stroke(lerpColor(topC, bottomC, p));
    line(0, y, width, y);
  }
  noStroke();
}

// simple shooting star at night
function updateShootingStar() {
  if (!shooting && random(1) < 0.01) {
    shooting = {
      x: random(-100, width*0.3),
      y: random(40, height*0.4),
      vx: random(6, 10),
      vy: random(2, 4),
      life: 45
    };
  }
  if (shooting) {
    stroke(255); strokeWeight(2);
    line(shooting.x, shooting.y, shooting.x - shooting.vx*3, shooting.y - shooting.vy*3);
    noStroke(); fill(255); ellipse(shooting.x, shooting.y, 3, 3);
    shooting.x += shooting.vx;
    shooting.y += shooting.vy;
    shooting.life--;
    if (shooting.life <= 0 || shooting.x > width+50 || shooting.y > height+50) shooting = null;
  }
}

// simple messages
function SaySomething(isDayNow) {
  if (millis() < messageEnd) return;
  if (isDayNow && random(1) < 0.01) {
    messageText = "good morning";
    messageEnd = millis() + 1500;
  } else if (!isDayNow && random(1) < 0.01) {
    messageText = "buenas noches hermoso";
    messageEnd = millis() + 1800;
  }
}

function drawMessage() {
  if (millis() < messageEnd) {
    fill(0,150); rect(width/2-160, 20, 320, 46, 8);
    fill(255); textSize(20); text(messageText, width/2, 43);
  }
}

/* ---------- WORLDS ---------- */

// SS2:
function drawSS2() {
  const isDay = (timeOfDay === "day");
  background(isDay ? color(135,206,235) : color(25,25,112));
  if (isDay) drawClouds();
  drawOrb(isDay);

  orbSize += orbGrow;
  if (orbSize > 120 || orbSize < 80) orbGrow *= -1;

  fill(255); textSize(16);
  text("SS2 — D=Day, N=Night", width/2, height-24);
}

// SS3: gradient controlled by mouseX + 3-way states 
function drawSS3() {
  let t = mouseX / width;
  drawGradientSky(t);

  if (timeOfDay === "day") {
    drawClouds();
    drawOrb(true);
    SaySomething(true);
  } else if (timeOfDay === "twilight") {
    drawClouds();
    drawOrb(); // orange
  } else {
    if (frameCount % 20 === 0) stars = spawnStars(24);
    drawStars(stars);
    drawOrb(false);
    updateShootingStar();
    SaySomething(false);
  }

  orbSize += orbGrow;
  if (orbSize > 120 || orbSize < 80) orbGrow *= -1;

  fill(255); textSize(16);
  text("SS3 — D=Day, N=Night, other key=Twilight | Move mouse X for sky blend", width/2, height-24);
}

// SS4: auto-cycle with millis + gradient controlled by mouseX
function drawSS4() {
  if (millis() - lastSwitch > switchInterval) {
    cycleTimeOfDay();
    lastSwitch = millis();
  }

  let t = mouseX / width;
  drawGradientSky(t);

  if (timeOfDay === "day") {
    drawClouds();
    drawOrb(true);
    SaySomething(true);
  } else if (timeOfDay === "twilight") {
    drawClouds();
    drawOrb();
  } else {
    if (frameCount % 20 === 0) stars = spawnStars(20);
    drawStars(stars);
    drawOrb(false);
    updateShootingStar();
    SaySomething(false);
  }

  orbSize += orbGrow;
  if (orbSize > 120 || orbSize < 80) orbGrow *= -1;

  fill(255); textSize(16);
  text("SS4 — auto-cycles every 7s | Move mouse X for sky blend", width/2, height-24);
}

//state / input

function cycleTimeOfDay() {
  if (timeOfDay === "day") timeOfDay = "twilight";
  else if (timeOfDay === "twilight") timeOfDay = "night";
  else timeOfDay = "day";
}

function restartProject() {
  state = STATE_MENU;
  timeOfDay = "day";
  orbSize = 100;
  orbGrow = 0.4;
  lastSwitch = millis();
  stars = [];
  messageText = "";
  messageEnd = 0;
  shooting = null;
}

function keyPressed() {
  if (key === '1') state = STATE_SS2;
  else if (key === '2') state = STATE_SS3;
  else if (key === '3') state = STATE_SS4;
  else if (key === 'M' || key === 'm') state = STATE_MENU;
  else if (key === 'R' || key === 'r') restartProject();

  if (key === 'D' || key === 'd') timeOfDay = "day";
  else if (key === 'N' || key === 'n') timeOfDay = "night";
  else if (key === 'T' || key === 't') timeOfDay = "twilight";

  orbGrow = random(-0.8, 0.8);
}
