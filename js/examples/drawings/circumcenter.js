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

  let mp0 = s0.getMidPoint();
  let mp1 = s1.getMidPoint();
  let mp2 = s2.getMidPoint();

  let bs0 = s0.getBisection();
  let bs1 = s1.getBisection();
  let bs2 = s2.getBisection();

  let circumcenter = bs0.getIntersectionPoint(bs1);
  let circumcircle = new Circle().fromCenterAndPoint(circumcenter, p0);

  push();
  translate(width / 2, height / 2);
  fill(0); stroke(0); strokeWeight(3);
  s0.draw();
  s1.draw();
  s2.draw();
  strokeWeight(1);

  bs0.draw(boundary);
  bs1.draw(boundary);
  bs2.draw(boundary);

  noFill();
  drawSquareMark(s0.toLine(), bs0);
  drawSquareMark(s1.toLine(), bs1);
  drawSquareMark(s2.toLine(), bs2);

  fill(255);
  drawCircleMarker(mp0, 3);
  drawCircleMarker(mp1, 3);
  drawCircleMarker(mp2, 3);

  if (circumcenter) {
    noFill(); stroke(0); strokeWeight(1);
    circumcircle.draw();
    fill(255);
    drawCircleMarker(circumcenter, 4);
  }

  fill(255);
  drawCircleMarker(p0, 3);
  drawCircleMarker(p1, 3);
  drawCircleMarker(p2, 3);

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
