let lines = [];

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);

    lines.push(new Line(0, 1, 0)); // X-axis: a = 0, b != 0, c = 0
    lines.push(new Line(1, 0, 0)); // Y-axis: a != 0, b = 0, c = 0
    lines.push(new Line());
    lines.push(new Line());
    lines.push(new Line());
}

function draw() {
  clear();
  background(255, 235, 59);
  let boundary = {x: -width / 2, y: -height / 2, w: width, h: height};

  for (let i = 2; i < lines.length; i ++) {
    let f = frameCount;
    let t0 = i + f * 0.00123, t1 = i + f * 0.00234, t2 = i + f * 0.00345, t3 = i + f * 0.00456;
    lines[i].fromTwoPoints({ x:signedNoise(t0) * 640, y: signedNoise(t1) * 640 }, { x:signedNoise(t2) * 640, y: signedNoise(t3) * 640 });
  }

  translate(width / 2, height / 2);

  fill(255); stroke(0);
  for (let i = 0; i < lines.length; i ++) {
    lines[i].draw(boundary);
  }

  for (let i = 0; i < lines.length; i ++) {
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
