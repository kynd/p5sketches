let A, B, P;
let radius = 60;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  A = createVector();
  B = createVector();
  P = createVector();
}

function draw() {
  clear();
  background(249, 246, 236);
  let t = radians(frameCount);
  P.x = cos(t) * 120;
  P.y = sin(t * 1.5) * 120;
  A.x = 60;
  A.y = -height / 2;
  B.x = -60;
  B.y = height / 2;

  // test
  let ap = P.copy().sub(A);
  let ab = B.copy().sub(A);
  let d = (ap.x * ab.y - ab.x * ap.y) / ab.mag();

  let result = abs(d) <= radius;

  // rendering

  push();
  translate(width / 2, height / 2);

  noStroke();
  if (result) {
    fill(225, 81, 106);
  } else {
    fill(255);
  }
  ellipse(P.x, P.y, radius * 2);

  noFill(); stroke(0); strokeWeight(1);
  ellipse(P.x, P.y, radius * 2);
  line(A.x, A.y, B.x, B.y);

  let l = new Line().fromTwoPoints(A, B);
  let q = l.getNearestPoint(P);
  if (result) {
    strokeWeight(3);
    stroke(0, 0, 0, 255);
  }
  line(q.x, q.y, P.x, P.y);

  stroke(0, 0, 0, 32); strokeWeight(1);

  line(A.x, A.y, P.x, P.y);

  fill(0);
  drawLabel(P.x + 8, P.y, "P", "RIGHT");
  drawLabel(A.x + 8, A.y + 16, "A", "RIGHT");
  drawLabel(B.x + 8, B.y - 8, "B", "RIGHT");

  pop();
}

/** Line **/

/** drawLabel **/
