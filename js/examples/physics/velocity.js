function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  counter = 0;
  position = createVector(100, -100);
  velocity = createVector(48, -48);
  fps = 60; // naively assuming 60 fps
}

function draw() {
  clear();
  const hw = width / 2, hh = height / 2;
  const vx = position.x + velocity.x;
  const vy = position.y + velocity.y;

  background(117, 147, 208);
  push();
  translate(hw, hh);

  fill(0); stroke(0);
  strokeWeight(2);
  drawArrow(position.x, position.y, vx, vy);
  drawCircleMarker(position, 4);
  
  drawLabel(position.x, position.y, `position (${position.x.toPrecision(4)}, ${position.y.toPrecision(4)})`, LEFT);
  drawLabel(vx, vy, `velocity (${velocity.x.toPrecision(4)}, ${velocity.y.toPrecision(4)})`, LEFT);

  strokeWeight(1)
  line(-hw, 0, hw, 0);
  line(0, -hh, 0, hh);
  drawLabel(0, -4, "Origin", LEFT);

  pop();

  const pDelta = velocity.copy().div(fps);
  position.add(pDelta);
  if (position.x > hw || position.x < -hw) {velocity.x = -velocity.x;}
  if (position.y > hh || position.y < -hh) {velocity.y = -velocity.y;}
}


/** drawCircleMarker **/

/** drawArrow **/

/** drawLabel **/
