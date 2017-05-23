let log = [];

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
}

function draw() {
  clear();
  background(255, 46, 132);

  let boundary = {x: -width / 2, y: -height / 2, w: width, h: height};
  let radius = 120;
  let f = frameCount;
  let a0 = radians(f * 2), a1 = radians(f * 3 + 90);
  let p0 = createVector(cos(a0) * radius, sin(a0) * radius);
  let p1 = createVector(cos(a1) * radius, sin(a1) * radius);
  let line0 = new Line().fromPointAndAngle(p0, 0);
  let line1 = new Line().fromPointAndAngle(p1, radians(90));
  let ip = line0.getIntersectionPoint(line1);
  if (f % 2 == 0) { log.push(ip) };
  if (log.length > 90) { log.shift(); }

  translate(width / 2, height / 2);

  noFill(); stroke(0);
  ellipse(0, 0, radius * 2, radius * 2);
  line0.draw(boundary);
  line1.draw(boundary);

  beginShape();
  for (let i = 0; i < log.length; i ++) {
    vertex(log[i].x, log[i].y);
  }
  endShape();

  fill(255); stroke(0);
  drawCircleMarker(p0, 3);
  drawCircleMarker(p1, 3);
  drawCircleMarker(ip, 3);
}

/** Line **/

/** LineSegment **/

/** drawLabel **/

/** drawCircleMarker **/
