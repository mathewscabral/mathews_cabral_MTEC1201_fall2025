/*
Mathews C.
SS2_MathewsC

Theme: Day & Night
This sketch explores the cycle of the day. The sun and moon swap as day turns into night, 
to switch between day and night just press a silly button, and move the mouse to make the sun/moon follow it*/

// === GLOBAL VARIABLES ===
let isDay = true;   // starts with day
let sunMoonSize = 100; // size of the sun/moon
let grow = 0.5

// background color variables
let r = 135;  // starting day sky color (light blue)
let g = 206;
let b = 235;

function setup() {
  createCanvas(800, 600);
}

function draw() {
  // background changes depending on day/night
  if (isDay) {
    background(r, g, b); // light blue day
    fill(255, 204, 0);   // yellow sun
  } else {
    background(25, 25, 112); // dark night blue
    fill(255);              // white moon
  }


  // draw sun or moon following the mouse
  noStroke();
  ellipse(mouseX, mouseY, sunMoonSize, sunMoonSize);
  fill(50,20)
  ellipse(mouseX,mouseY, sunMoonSize/1.75, sunMoonSize/1.75)


  
  sunMoonSize += grow
}

function keyPressed() {
  // change between day/night
  isDay = !isDay;
 sunMoonSize = 100 //resets size of sun/moon
}