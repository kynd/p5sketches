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
  let bs0 = getAngleBisection(p0, p1, p2);
  let bs1 = getAngleBisection(p1, p2, p0);
  let bs2 = getAngleBisection(p2, p0, p1);

  let incenter = bs0.getIntersectionPoint(bs1);
  let radius = incenter.dist(s0.getIntersectionPoint(s0.getPerpendicular(incenter)));
  let incircle = new Circle().fromCenterAndRadius(incenter, radius);

  push();
  translate(width / 2, height / 2);
  noFill(); stroke(0); strokeWeight(1);
  fill(0); strokeWeight(3);
  s0.draw();
  s1.draw();
  s2.draw();
  strokeWeight(1);

  bs0.draw(boundary);
  bs1.draw(boundary);
  bs2.draw(boundary);

  fill(255);
  drawCircleMarker(p0, 3);
  drawCircleMarker(p1, 3);
  drawCircleMarker(p2, 3);

  if (incenter) {
    noFill(); stroke(0); strokeWeight(1);
    incircle.draw();
    fill(255);
    drawCircleMarker(incenter, 4);
  }

  pop();
}

function getAngleBisection(o, p0, p1) {
    let a0 = atan2((p0.y - o.y), (p0.x - o.x));
    let a1 = atan2((p1.y - o.y), (p1.x - o.x));
    return new Line().fromPointAndAngle(o, (a0 + a1) / 2);
}

/** Line **/

/** LineSegment **/

/** Circle **/

/** drawCircleMarker **/
