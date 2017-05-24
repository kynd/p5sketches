let center, centerLine, armLength, radius;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    center = createVector(width * 0.5, height * 0.75);
    centerLine = new Line().fromTwoPoints(createVector(width * 0.5, 0), createVector(width * 0.5, height));
    armLength = height * 0.3;
    radius = height * 0.14;
}

function draw() {
  clear();
  background(0, 171, 107);

  let a = radians((frameCount - 1) * 4);
  let p = createVector(cos(a) * radius, sin(a) * radius).add(center);
  let circle = new Circle().fromCenterAndRadius(p, armLength);
  let intersections = circle.getIntersectionPoints(centerLine);
  let pistonBottom = intersections[0];

  if (intersections.length > 1 && intersections[1].y < intersections[0].y) {
    pistonBottom = intersections[1];
  }
  let arm = new LineSegment().fromTwoPoints(p, pistonBottom);

  fill(171, 232, 199); stroke(0);
  ellipse(center.x, center.y, radius * 2, radius * 2);
  fill(12, 228, 113);
  rect(center.x - 60, -1, 120, pistonBottom.y + 1);

  noFill();stroke(0);
  line(center.x, center.y, p.x, p.y);
  centerLine.draw();

  strokeWeight(3);
  arm.draw();

  fill(255); strokeWeight(1);
  drawCircleMarker(center, 4);
  drawCircleMarker(p, 4);
  drawCircleMarker(arm.p1, 4);
  drawCircleMarker(pistonBottom, 4);
}

/** Line **/

/** LineSegment **/

/** Circle **/

/** drawLabel **/

/** drawCircleMarker **/
