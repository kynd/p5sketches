let A, B;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  A = {center: createVector(), radius: 80};
  B = {center: createVector(), radius: 60};
}

function draw() {
  clear();
  background(249, 246, 236);
  let t = radians(frameCount) / 2;
  A.center.x = cos(t) * 120;
  A.center.y = sin((t + 1) * 2) * 120;
  B.center.x = -cos((t + 2) * 3) * 100;
  B.center.y = -sin((t + 3) * 4) * 100;

  // test

  let result = A.center.dist(B.center) - A.radius - B.radius <= 0;

  // rendering

  push();
  translate(width / 2, height / 2);

  noStroke();
  if (result) {
    fill(225, 81, 106);
  } else {
    fill(255);
  }
  ellipse(A.center.x, A.center.y, A.radius * 2);
  ellipse(B.center.x, B.center.y, B.radius * 2);

  noFill(); stroke(0); strokeWeight(1);
  ellipse(A.center.x, A.center.y, A.radius * 2);
  ellipse(B.center.x, B.center.y, B.radius * 2);

  let pA = A.center.copy().add(B.center.copy().sub(A.center).normalize().mult(A.radius));
  let pB = B.center.copy().add(A.center.copy().sub(B.center).normalize().mult(B.radius));

  strokeWeight(1);
  let boundary = {x: -width / 2, y: -height / 2, w: width, h: height};
  let l = new Line().fromTwoPoints(A.center, B.center);
  let perpA = l.getPerpendicular(pA);
  let perpB = l.getPerpendicular(pB);
  l.draw(boundary);

  stroke(0, 0, 0, 128);
  perpA.draw(boundary);
  perpB.draw(boundary);

  if (result) {
    strokeWeight(3);
    stroke(0, 0, 0, 255);
    line(pA.x, pA.y, pB.x, pB.y);
  }

  pop();
}

/** Line **/
