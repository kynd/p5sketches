let log = [];
let centerA, centerB, radiusA, radiusB, armLength;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    centerA = createVector(width * 0.25, height * 0.5);
    centerB = createVector(width * 0.5, height * 0.5);
    armLength = width * 0.5;
    radiusA = min(height * 0.2, centerA.dist(centerB) * 0.5);
    radiusB = radiusA * 0.5;
}

function draw() {
  clear();
  background(69, 157, 193);

  let aA = radians((frameCount - 1) * 2) + PI * 0.5;
  let aB = radians((frameCount - 1) * 5) - PI * 0.5;
  let pA = createVector(cos(aA) * radiusA, sin(aA) * radiusA).add(centerA);
  let pB = createVector(cos(aB) * radiusB, sin(aB) * radiusB).add(centerB);
  let arm = new LineSegment().fromTwoPointsAndLength(pA, pB, armLength);
  noFill();stroke(0);

  log.push(arm.p1);
  if (log.length > 120) { log.shift(); }

  fill(253, 219, 192); stroke(0);
  ellipse(centerA.x, centerA.y, radiusA * 2, radiusA * 2);
  ellipse(centerB.x, centerB.y, radiusB * 2, radiusB * 2);
  noFill();
  line(centerA.x, centerA.y, pA.x, pA.y);
  line(centerB.x, centerB.y, pB.x, pB.y);


  strokeWeight(3);
  beginShape();
  for (let i = 0; i < log.length; i ++) {
    vertex(log[i].x, log[i].y);
  }
  endShape();

  arm.draw();

  fill(255); strokeWeight(1);
  drawCircleMarker(centerA, 4);
  drawCircleMarker(centerB, 4);
  drawCircleMarker(pA, 4);
  drawCircleMarker(pB, 4);
  drawCircleMarker(arm.p1, 4);
}

/** LineSegment **/

/** drawLabel **/

/** drawCircleMarker **/
