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

  let l0 = new Line().fromTwoPoints(p0, mp1);
  let l1 = new Line().fromTwoPoints(p1, mp2);
  let l2 = new Line().fromTwoPoints(p2, mp0);
  let centroid = l0.getIntersectionPoint(l1);

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
  drawCircleMarker(mp0, 3);
  drawCircleMarker(mp1, 3);
  drawCircleMarker(mp2, 3);

  fill(255);
  drawCircleMarker(p0, 3);
  drawCircleMarker(p1, 3);
  drawCircleMarker(p2, 3);
  if (centroid) {
    drawCircleMarker(centroid, 4);
  }
  pop();
}

/** Line **/

/** LineSegment **/

/** Circle **/

/** drawCircleMarker **/
