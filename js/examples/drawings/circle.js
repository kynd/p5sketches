
let lines = [];

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    lines.push(new Line(0, 1, 0)); // X-axis: a = 0, b != 0, c = 0
    lines.push(new Line(1, 0, 0)); // Y-axis: a != 0, b = 0, c = 0
}

function draw() {
  clear();
  background(255, 235, 59);

  let boundary = {x: -width / 2, y: -height / 2, w: width, h: height}

  let points = [];
  for (let i = 0; i < 3; i ++) {
    let f = frameCount + 100;
    let t0 = i + f * 0.00123, t1 = i + f * 0.00234;
    points.push(createVector(signedNoise(t0) * 320,signedNoise(t1) * 320));
  }
  let circle = new Circle().fromThreePoints(points[0], points[1], points[2]);

  translate(width / 2, height / 2);

  noFill(); stroke(0);
  for (let i = 0; i < lines.length; i ++) {
    lines[i].draw(boundary);
  }

  circle.draw();

  fill(255);
  for (let i = 0; i < points.length; i ++) {
    drawCircleMarker(points[i], 3);
  }
  drawCircleMarker(circle.center, 3);


  fill(0); noStroke();
  for (let i = 0; i < lines.length; i ++) {
    let intersections = circle.getIntersectionPoints(lines[i]);
    for (let j = 0; j < intersections.length; j++) {
      drawCircleMarker(intersections[j], 3);
    }
  }
}

/** signedNoise **/

/** Line **/

/** Circle **/

/** drawCircleMarker **/
