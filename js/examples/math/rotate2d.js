function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  degA = degB = degC = 0;
  pA = createVector(0, -80);
  pB = createVector(100, 0);
  pC = createVector(-100, 100);
}

function draw() {
  clear();
  let cx = width / 2, cy = height / 2;

  let radA = radians(degA); // PI * deg / 180;
  let radB = radians(degB); // PI * deg / 180;
  let radC = radians(degC); // PI * deg / 180;
  let npA = rotate2d(pA, radA);
  let npB = rotate2d(pB, radB);
  let npC = rotate2d(pC, radC);

  background(15, 157, 88);

  push();
  translate(cx, cy);
  fill(0); stroke(0);
  line(0, 0, pA.x, pA.y);
  line(0, 0, pB.x, pB.y);
  line(0, 0, pC.x, pC.y);
  drawTriangleMarker(pA, 12);
  drawCircleMarker(pB, 12);
  drawSquareMarker(pC, 10);

  fill(255); stroke(255);
  ellipse(0, 0, 8, 8);
  line(0, 0, npA.x, npA.y)
  line(0, 0, npB.x, npB.y)
  line(0, 0, npC.x, npC.y)
  drawTriangleMarker(npA, 12);
  drawCircleMarker(npB, 12);
  drawSquareMarker(npC, 10);

  pop();

  degA += 1;
  degB += 2;
  degC += 4;
}

/** rotate2d **/

/** drawCircleMarker **/

/** drawSquareMarker **/

/** drawTriangleMarker **/
