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

  let p0 = createVector(cos(a0), sin(a0)).mult(60);
  let p1 = createVector(cos(a1), sin(a1)).mult(70);
  let p2 = createVector(cos(a2), sin(a2)).mult(80);

  let s0 = new LineSegment().fromTwoPoints(p0, p1);
  let s1 = new LineSegment().fromTwoPoints(p1, p2);
  let s2 = new LineSegment().fromTwoPoints(p2, p0);

  let l0 = s0.toLine();
  let l1 = s1.toLine();
  let l2 = s2.toLine();

  let bs0 = getExternalAngleBisctor(p0, p1, p2);
  let bs1 = getExternalAngleBisctor(p1, p2, p0);
  let bs2 = getExternalAngleBisctor(p2, p0, p1);

  let excenters = [];
  excenters.push(bs0.getIntersectionPoint(bs1));
  excenters.push(bs1.getIntersectionPoint(bs2));
  excenters.push(bs2.getIntersectionPoint(bs0));

  let excircles = [];
  if (excenters[0]) { excircles.push(getExcircle(excenters[0], l2)); }
  if (excenters[1]) { excircles.push(getExcircle(excenters[1], l0)); }
  if (excenters[2]) { excircles.push(getExcircle(excenters[2], l1)); }

  push();
  translate(width / 2, height / 2);
  noFill(); stroke(0); strokeWeight(1);
  fill(0); strokeWeight(3);
  s0.draw();
  s1.draw();
  s2.draw();

  strokeWeight(1);
  l0.draw(boundary);
  l1.draw(boundary);
  l2.draw(boundary);

  stroke(0, 0, 0, 30);
  bs0.draw(boundary);
  bs1.draw(boundary);
  bs2.draw(boundary);

  fill(255); stroke(0);
  drawCircleMarker(p0, 3);
  drawCircleMarker(p1, 3);
  drawCircleMarker(p2, 3);

  for (let i = 0; i < 3; i ++) {
    if (excenters[i]) {
      noFill(); stroke(0); strokeWeight(1);
      excircles[i].draw();
      fill(255);
      drawCircleMarker(excenters[i], 4);
    }
  }

  pop();
}

function getExternalAngleBisctor(o, p0, p1) {
    let a0 = atan2((o.y - p0.y), (o.x - p0.x));
    let a1 = atan2((p1.y - o.y), (p1.x - o.x));
    return new Line().fromPointAndAngle(o, (a0 + a1) / 2);
}

function getExcircle(p, l) {
  let radius = p.dist(l.getIntersectionPoint(l.getPerpendicular(p)));
  return new Circle().fromCenterAndRadius(p, radius);
}

/** Line **/

/** LineSegment **/

/** Circle **/

/** drawCircleMarker **/
