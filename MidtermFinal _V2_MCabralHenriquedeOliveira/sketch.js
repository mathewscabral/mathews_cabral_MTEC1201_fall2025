/* 
Mathews C.
Midterm — “Daytime”

Instructions:
- Use the mouse to move the Sun or Moon
- Press 1 = SS2, 2 = SS3, 3 = SS4, M = Menu, R = Restart
- In SS3: D = Day, N = Night, any other key = Twilight
- In SS4: time auto-cycles every 7 seconds
*/

//---States
const STATE_MENU = "menu";
const STATE_SS2 = "ss2";
const STATE_SS3 = "ss3";
const STATE_SS4 = "ss4";

let state = STATE_MENU;

//---vars
let orbSize = 100;
let orbGrow = 0.4;
let stars = [];
let clouds = [];
let timeOfDay = "day";

//---timers
let lastSwitch = 0;
let switchInterval = 7000;

// bubble of text + shooting star
let messageText = "";
let messageEnd = 0;
let shooting = null;

//imgs
let menuBG;
function preload() {
  menuBG = loadImage("images/menuBG.png");
}

function setup() {
  createCanvas(800, 600);
  textAlign(CENTER, CENTER);
  restartProject();

  // spawn clouds
  for (let i = 0; i < 6; i++) {
    clouds.push({ x: random(width), y: random(100,250), s: random(60,120), speed: random(0.2,0.5) });
  }
}

function draw() {
  if (state === STATE_MENU) drawMenu();
  else if (state === STATE_SS2) drawSS2();
  else if (state === STATE_SS3) drawSS3();
  else if (state === STATE_SS4) drawSS4();

  drawMessage();
}

/* ------------ MENU ------------- */
function drawMenu() {
  imageMode(CORNER);
  image(menuBG, 0, 0, width, height);
  fill(0,120);
  rect(0,0,width,height);

  fill(255);
  textSize(28);
  text("MIDTERM — Daytime", width/2, height*0.25);

  textSize(18);
  text("Press 1: SS2 (Day / Night growth)", width/2, height*0.45);
  text("Press 2: SS3 (Day / Twilight / Night)", width/2, height*0.52);
  text("Press 3: SS4 (Timed Cycle)", width/2, height*0.59);
  text("Press R = Restart  |  M = Menu", width/2, height*0.75);
}

/* ------------ CLOUDS ------------- */
function drawClouds() {
  noStroke();
  fill(255,240);
  for (let c of clouds) {
    ellipse(c.x, c.y, c.s, c.s/2);
    ellipse(c.x+20, c.y+10, c.s*0.8, c.s*0.6);
    ellipse(c.x-20, c.y+10, c.s*0.9, c.s*0.7);
    c.x += c.speed;
    if (c.x - c.s > width) c.x = -c.s;
  }
}

/* ---------- STARS ---------- */
function spawnStars(n) {
  let arr = [];
  for (let i = 0; i < n; i++) {
    arr.push({ x: random(width), y: random(height*.5), r: random(1,3) });
  }
  return arr;
}

function drawStars(list) {
  noStroke();
  fill(255);
  for (let s of list) ellipse(s.x, s.y, s.r, s.r);
}

/* ---------- ORB w/ SS1 FACE & GLOW ---------- */
function drawOrb(flag) {
  // sun = yellow, moon = white, twilight = orange
  let base = flag === true ? color(255, 204, 0) :
  flag === false ? color(255) :
  color(205, 198, 153);
  noStroke();
  // main orb
  fill(base);
  ellipse(mouseX, mouseY, orbSize, orbSize);
  // basic glow (simple,  level)
  fill(red(base), green(base), blue(base), 90);
  ellipse(mouseX, mouseY, orbSize + 50, orbSize + 50);

  // trying to keep face inside orb
  let faceSize = orbSize *0.20; // keeps face always inside orb

  //---eyes
  fill(flag === false ? 200 : 100);
  rect(mouseX - faceSize, mouseY - faceSize * 0.4, faceSize * 0.6, faceSize * 0.9, 4);
  rect(mouseX + faceSize * 0.4, mouseY - faceSize * 0.4, faceSize * 0.6, faceSize * 0.9, 4);

  fill(255);
  rect(mouseX - faceSize, mouseY - faceSize * 0.4, faceSize * 0.4, faceSize * 0.9, 4);
  rect(mouseX + faceSize * 0.4, mouseY - faceSize * 0.4, faceSize * 0.4, faceSize * 0.9, 4);

  //---cheeks
  fill(255, 150, 160, 120);
  ellipse(mouseX - faceSize * 1.3, mouseY + faceSize * 0.6, faceSize * 0.7, faceSize * 0.5);
  ellipse(mouseX + faceSize * 1.3, mouseY + faceSize * 0.6, faceSize * 0.7, faceSize * 0.5);

  //---smile
  noFill();
  stroke(flag === false ? 255 : 90);
  strokeWeight(3);
  arc(mouseX, mouseY + faceSize, faceSize * 2, faceSize * 1.2, 0, PI);
}
 

/* ----message---- */
function saySomething(isDayNow) {
  if (millis() < messageEnd) return;
  if (isDayNow && random(1)<0.01) {
    messageText = "Buenos días";
    messageEnd = millis()+3000;
  } 
  else if (!isDayNow && random(1)<0.01) {
    messageText = "Buenas noches";
    messageEnd = millis()+3000;
  }
}

function drawMessage() {
  if (millis() < messageEnd) {
    noStroke()
    fill(0,150);
    rect(width/2-160, 20, 320,46, 8);
    fill(255);
    textSize(18);
    text(messageText, width/2, 43);
  }
}

/* ---------- SHOOTING STAR ---------- */
function ShootingStar() {
  if (!shooting && random(1) < 0.01) {
    shooting = { x: random(-100,width*.3), y: random(40,height*.4), vx: random(6,10), vy: random(2,4), life:45 };
  }

  if (shooting) {
    stroke(255);
    line(shooting.x, shooting.y, shooting.x-shooting.vx*3, shooting.y-shooting.vy*3);
    noStroke();
    ellipse(shooting.x, shooting.y,3,3);
    shooting.x += shooting.vx;
    shooting.y += shooting.vy;
    shooting.life--;

    if (shooting.life<=0 || shooting.x>width+50) shooting=null;
  }
}

/* ---------- SKY GRADIENT ---------- */
function drawGradientSky(t) {
  t = constrain(t,0,1);
  t = t*t*(3-2*t); // smoothing

  let nightTop=color(20,20,80), nightBot=color(10,10,40);
  let dayTop=color(80,180,255), dayBot=color(180,220,255);

  let topC = lerpColor(nightTop,dayTop,t);
  let botC = lerpColor(nightBot,dayBot,t);

  for (let y=0;y<height;y++) {
    stroke(lerpColor(topC,botC,y/height));
    line(0,y,width,y);
  }
}

/* ---------- WORLD SS2 ---------- */
function drawSS2() {
  let isDay = timeOfDay==="day";
  background(isDay?color(135,206,235):color(25,25,112));

  if (isDay) drawClouds();
  drawOrb(isDay);

  orbSize+=orbGrow;
  if (orbSize>120||orbSize<80) orbGrow*=-1;
}

/* ---------- WORLD SS3 ---------- */
function drawSS3() {
  let t = mouseX/width;
  drawGradientSky(t);

  if (timeOfDay==="day") {
    drawClouds();
    drawOrb(true);
    saySomething(true);
  } else if (timeOfDay==="twilight") {
    drawClouds();
    drawOrb();
  } else {
    if (frameCount%20===0) stars = spawnStars(24);
    drawStars(stars);
    drawOrb(false);
    ShootingStar();
    saySomething(false);
  }

  orbSize+=orbGrow;
  if (orbSize>120||orbSize<80) orbGrow*=-1;
}

/* ---------- WORLD SS4 ---------- */
function drawSS4() {
  if (millis()-lastSwitch > switchInterval) {
    cycleTimeOfDay();
    lastSwitch = millis();
  }

  let t = mouseX/width;
  drawGradientSky(t);

  if (timeOfDay==="day") {
    drawClouds();
    drawOrb(true);
    saySomething(true);
  } else if (timeOfDay==="twilight") {
    drawClouds();
    drawOrb();
  } else {
    if (frameCount%20===0) stars=spawnStars(20);
    drawStars(stars);
    drawOrb(false);
    ShootingStar();
    saySomething(false);
  }

  orbSize+=orbGrow;
  if (orbSize>120||orbSize<80) orbGrow*=-1;
}

/* ---------- STATE + INPUT ---------- */
function cycleTimeOfDay() {
  if (timeOfDay==="day") timeOfDay="twilight";
  else if (timeOfDay==="twilight") timeOfDay="night";
  else timeOfDay="day";
}

function restartProject() {
  state=STATE_MENU;
  timeOfDay="day";
  orbSize=100;
  orbGrow=0.4;
  lastSwitch=millis();
  stars=[];
  messageText="";
  messageEnd=0;
  shooting=null;
}

function keyPressed() {
  if (key==='1') state=STATE_SS2;
  else if (key==='2') state=STATE_SS3;
  else if (key==='3') state=STATE_SS4;
  else if (key==='M'||key==='m') state=STATE_MENU;
  else if (key==='R'||key==='r') restartProject();

  if (key==='D'||key==='d') timeOfDay="day";
  else if (key==='N'||key==='n') timeOfDay="night";
  else if (key==='T'||key==='t') timeOfDay="twilight";

  orbGrow = random(-0.8,0.8);
}
/* =======================
   REFERENCES
   =======================
   - gradient  
     https://www.youtube.com/watch?v=lPgscmgxcH0

   - shooting star logic   
     https://www.youtube.com/watch?v=FO87ggFryk4

*/
