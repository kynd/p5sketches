let log = [];
let center, pivot, radius, armLength;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    center = createVector(width * 0.25, height * 0.5);
    pivot = createVector(width * 0.5, height * 0.5);
    armLength = width * 0.5;
    radius = min(height * 0.2, center.dist(pivot) * 0.5);
}

function draw() {
  clear();
  background(69, 157, 193);

  let a = radians((frameCount - 1) * 2) + PI * 0.5;
  let p = createVector(cos(a) * radius, sin(a) * radius).add(center);
  let arm = new LineSegment().fromTwoPointsAndLength(p, pivot, armLength);
  if (frameCount % 2 == 0) { log.push(arm.p1) };
  if (log.length > 90) { log.shift(); }

  fill(253, 219, 192); stroke(0);
  ellipse(center.x, center.y, radius * 2, radius * 2);

  noFill();stroke(0);
  line(center.x, center.y, p.x, p.y);

  strokeWeight(3);
  beginShape();
  for (let i = 0; i < log.length; i ++) {
    vertex(log[i].x, log[i].y);
  }
  endShape();
  arm.draw();

  fill(255); strokeWeight(1);
  drawCircleMarker(center, 4);
  drawCircleMarker(p, 4);
  drawCircleMarker(arm.p1, 4);
  drawCircleMarker(pivot, 4);
}

/** LineSegment **/

/** drawLabel **/

/** drawCircleMarker **/
