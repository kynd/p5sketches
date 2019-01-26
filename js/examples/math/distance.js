function setup() {
    canvas = createCanvas(windowWidth, windowHeight);

    counter = 0;
    p = createVector(0, 0);
    q = createVector(0, 0);
}

function draw() {
  clear();
  const cx = width / 2, cy = height / 2;
  const t = frameCount - 1;
  const a0 = radians(t), a1 = radians(t * 2), a2 = radians(t * 3), a3 = radians(t * 4);
  p.x = cos(a0) * 150;
  p.y = sin(a3) * 100;
  q.x = -cos(a1) * 150;
  q.y = -sin(a2) * 100;

  // see also p5.Vector.dist()
  // https://p5js.org/reference/#/p5.Vector/dist
  const distance = sqrt((p.x - q.x) * (p.x - q.x) + (p.y - q.y) * (p.y - q.y));

  background(245, 177, 217);

  push();
  translate(cx, cy);
  fill(0); stroke(0);
  drawLineWithLabel(p.x, p.y, q.x, q.y, "distance:" + distance.toPrecision(4), CENTER);
  drawSquareMarker(p, 10);
  drawTriangleMarker(q, 12);
  pop();

  counter ++;
}

/** drawSquareMarker **/

/** drawTriangleMarker **/

/** drawLineWithLabel **/

/** drawLabel **/