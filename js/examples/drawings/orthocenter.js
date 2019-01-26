function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
}

function draw() {
  clear();
  background(62, 252, 100);
  let boundary = {x: -width / 2, y: -height / 2, w: width, h: height};

  let t = (frameCount % 720) / 720;
  let a0 = PI / 3 * cos(t * TWO_PI) + 0.01 + TWO_PI / 3 ;
  let a1 = PI / 3 * cos(t * TWO_PI  * 3) + 0.02 + TWO_PI / 3 * 2;
  let a2 = PI / 3 * cos(t * TWO_PI  * 5) + 0.03;

  let p0 = createVector(cos(a0), sin(a0)).mult(120);
  let p1 = createVector(cos(a1), sin(a1)).mult(140);
  let p2 = createVector(cos(a2), sin(a2)).mult(160);

  let s0 = new LineSegment().fromTwoPoints(p0, p1);
  let s1 = new LineSegment().fromTwoPoints(p1, p2);
  let s2 = new LineSegment().fromTwoPoints(p2, p0);

  let pl0 = s0.getPerpendicular(p2);
  let pl1 = s1.getPerpendicular(p0);
  let pl2 = s2.getPerpendicular(p1);
  let l0 = s0.toLine();
  let l1 = s1.toLine();
  let l2 = s2.toLine();

  let orthocenter = pl0.getIntersectionPoint(pl1);

  push();
  translate(width / 2, height / 2);
  fill(0); stroke(0); strokeWeight(3);
  s0.draw();
  s1.draw();
  s2.draw();

  strokeWeight(1);
  pl0.draw(boundary);
  pl1.draw(boundary);
  pl2.draw(boundary);

  stroke(0, 0, 0, 30);
  l0.draw(boundary);
  l1.draw(boundary);
  l2.draw(boundary);

  stroke(0); noFill();
  drawSquareMark(l0, pl0);
  drawSquareMark(l1, pl1);
  drawSquareMark(l2, pl2);

  fill(255);
  drawCircleMarker(p0, 3);
  drawCircleMarker(p1, 3);
  drawCircleMarker(p2, 3);
  if (orthocenter) {
    drawCircleMarker(orthocenter, 4);
  }

  pop();
}

function drawSquareMark(l0, l1) {
  let p = l0.getIntersectionPoint(l1);
  push();
  translate(p.x, p.y);
  rotate(l0.getAngle());
  rect(0,0,8,8);
  pop();
}

/** Line **/

/** LineSegment **/

/** Circle **/

/** drawCircleMarker **/
