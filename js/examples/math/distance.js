function setup() {
    canvas = createCanvas(windowWidth, windowHeight);

    counter = 0;
    p = createVector(0, 0);
    q = createVector(0, 0);
}

function draw() {
  clear();
  let cx = width / 2, cy = height / 2;
  let t = frameCount - 1;
  let a0 = radians(t), a1 = radians(t * 2), a2 = radians(t * 3), a3 = radians(t * 4);
  p.x = cos(a0) * 150;
  p.y = sin(a3) * 100;
  q.x = -cos(a1) * 150;
  q.y = -sin(a2) * 100;

  // see also p5.Vector.dist()
  // https://p5js.org/reference/#/p5.Vector/dist
  let distance = sqrt((p.x - q.x) * (p.x - q.x) + (p.y - q.y) * (p.y - q.y));

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

function drawLineWithLabel(x0, y0, x1, y1, label, align) {
  line(x0, y0, x1, y1);
  let mx = (x0 + x1) / 2, my = (y0 + y1) / 2;
  drawLabel(mx, my, label, align);
}

function drawLabel(x, y, label, align) {
  push();
  strokeWeight(0);
  textFont("monospace");
  textSize(14);
  textAlign(align ? align : CENTER);
  if (align == LEFT) {x += 6;}
  if (align == RIGHT) {x -= 6;}
  text(label, x, y);
  pop();
}

function drawSquareMarker(p, size) {
  rect(p.x - size, p.y - size, size * 2, size * 2);
}

function drawTriangleMarker(p, size) {
  let r3 = sqrt(3) / 3 * size;
  triangle(p.x, p.y - r3 * 2, p.x - size, p.y + r3, p.x + size, p.y + r3);
}
