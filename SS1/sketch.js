function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(50, 100, 255); // blue sky

  // sun
  fill(255, 204, 0);
  noStroke();
  ellipse(mouseX, mouseY, 150, 150);
  fill(235,210,0,98);
   ellipse(mouseX, mouseY, 160, 160);
   //eyes of the sun
   fill(100)
   rect(mouseX-40,mouseY-15, 28, 30)
   rect(mouseX+35,mouseY-15, 28, 30)
   //iris
   fill(255,255,255,)
   rect(mouseX-40,mouseY-15, 20, 30)
   rect(mouseX+35,mouseY-15, 20, 30)
   //goofy eyes
   fill(255, 150, 150, 120);
noStroke();
ellipse(mouseX - 50, mouseY + 35, 20, 15);
ellipse(mouseX + 50, mouseY + 35, 20, 15);


//mouth
noFill();
stroke(100);
strokeWeight(4);
arc(mouseX, mouseY + 40, 60, 30, 0, PI);


  // clouds 
  fill(255);
  stroke(200, 200, 255, 60);
  strokeWeight(3);

  // main big puff
  ellipse(mouseX - 50, mouseY + 120, 120, 80);
  ellipse(mouseX, mouseY + 110, 140, 90);
  ellipse(mouseX + 50, mouseY + 120, 120, 80);

  // smaller top puffs for round cuteness
  noStroke();
  ellipse(mouseX - 30, mouseY + 95, 60, 45);
  ellipse(mouseX + 30, mouseY + 95, 65, 48);
}
