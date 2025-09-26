/*
Mathews C.
SS2_MathewsC

Theme: Day & Night
This sketch explores the cycle of the day. The sun and moon swap as day turns into night, 
to switch between day and night just press a silly button, and move the mouse to make the sun/moon follow it*/

// === GLOBAL VARIABLES ===


let timeOfDay = "day";   // can be "day", "twilight", or "night"
let sunMoonSize = 100; 
let grow = 0.5;       

function setup() {
  createCanvas(800, 600);
}

function draw() {
  // === IF / ELSE IF / ELSE for day, twilight, night ===
  if (timeOfDay === "day") {
    background(135, 206, 235); // day sky
    fill(255, 204, 0);    
    noStroke();
  ellipse(mouseX, mouseY, sunMoonSize, sunMoonSize); 
  fill(255,204,0,30);    
  ellipse(mouseX, mouseY, sunMoonSize/0.5, sunMoonSize/0.5); 
  
  } 
  else if (timeOfDay === "twilight") 
    {
    background(250, 128, 114); // twilight orange/pink
    fill(255, 150, 0);         // glowing sun/moon mix
     noStroke();
    ellipse(mouseX, mouseY, sunMoonSize, sunMoonSize);
    fill(255, 145, 0, 30) 
  ellipse(mouseX, mouseY, sunMoonSize/0.5, sunMoonSize/0.5);
  } 
  else 
    {
    background(25, 25, 112);   // night sky
    fill(255);                 // moon (white)
     noStroke();
    ellipse(mouseX, mouseY, sunMoonSize, sunMoonSize); 
    fill(255,0,0,30)
  ellipse(mouseX, mouseY, sunMoonSize/0.5, sunMoonSize/0.5);

    // draw random stars
    //if (frameCount % 10 === 0)//was trying to slow stars down but coudln't rlly
    fill(255); 
    for (let i = 0; i < 20; i++) {
      ellipse(random(width), random(height / 2), 4, 2);
    }
  }

  // draw sun or moon
  //noStroke();
  //ellipse(mouseX, mouseY, sunMoonSize, sunMoonSize);
  
  // grow/shrink with bouncing
  sunMoonSize += grow;
  if (sunMoonSize > 100 || sunMoonSize < 80) {
    grow = -grow;
  }
}

function keyPressed() {
  if (key === 'd' || key === 'D') {
    timeOfDay = "day";
  } else if (key === 'n' || key === 'N') {
    timeOfDay = "night";
  } else {
    timeOfDay = "twilight";
  }

  // randomize growth speed (uncertainty)
  grow = random(-1/2, 1/2);
}