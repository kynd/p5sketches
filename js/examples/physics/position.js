function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    position = createVector(100, -100);
}

function draw() {
  clear();
  const hw = width / 2, hh = height / 2;

  background(117, 147, 208);
  push();
  translate(hw, hh);

  fill(0); stroke(0);
  strokeWeight(2);
  drawArrow(0, 0, position.x, position.y);
  drawLabel(position.x, position.y, `position (${position.x.toPrecision(4)}, ${position.y.toPrecision(4)})`, LEFT);

  strokeWeight(1)
  line(-hw, 0, hw, 0);
  line(0, -hh, 0, hh);
  drawLabel(0, -4, "Origin", LEFT);

  pop();

  position = createVector(mouseX - hw, mouseY - hh);
}

/** drawArrow **/

/** drawLabel **/
