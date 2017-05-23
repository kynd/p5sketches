
let lines = [];

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);

    lines.push(new Line(0, 1, 0)); // X-axis: a = 0, b != 0, c = 0
    lines.push(new Line(1, 0, 0)); // Y-axis: a != 0, b = 0, c = 0
    lines.push(new LineSegment());
    lines.push(new LineSegment());
    lines.push(new LineSegment());
}

function draw() {
  clear();
  background(255, 235, 59);

  let boundary = {x: -width / 2, y: -height / 2, w: width, h: height}

  for (let i = 2; i < lines.length; i ++) {
    let f = frameCount + 100;
    let t0 = i + f * 0.00123, t1 = i + f * 0.00234, t2 = i + f * 0.00345, t3 = i + f * 0.00456;
    lines[i].fromTwoPoints(createVector(signedNoise(t0) * 320,signedNoise(t1) * 320), createVector(signedNoise(t2) * 320, signedNoise(t3) * 320));
  }

  translate(width / 2, height / 2);

  fill(255); stroke(0);
  for (let i = 0; i < lines.length; i ++) {
    lines[i].draw(boundary);
  }

  for (let i = 0; i < lines.length; i ++) {
    if (lines[i] instanceof LineSegment) {
      drawCircleMarker(lines[i].p0, 3);
      drawCircleMarker(lines[i].p1, 3);
    }
    for (let j = i + 1; j < lines.length; j ++) {
      let p = lines[i].getIntersectionPoint(lines[j]);
      if (p) {
        drawCircleMarker(p, 3);
      }
    }
  }
}

/** signedNoise **/

/** Line **/

/** LineSegment **/

/** drawCircleMarker **/
