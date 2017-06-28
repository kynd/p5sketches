let A, B;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  A = new Triangle(0, 0, createVector(0, -80), createVector(-80, 40), createVector(80, 40));
  B = new Triangle(0, 0, createVector(0, -80), createVector(-40, 40), createVector(40, 40));
}

function draw() {
  clear();
  background(249, 246, 236);
  let t = radians(frameCount) / 2;
  A.position.x = cos(t) * 120;
  A.position.y = sin(t * 2) * 120;
  B.position.x = -cos(t * 3) * 120;
  B.position.y = -sin(t * 4) * 120;
  A.rotation = t;
  B.rotation = -t;
  A.update();
  B.update();

  // test

  let renderingData = [];
  let result = true;
  for (let i = 0; i < 3; i++) {
    let i0 = i;
    let i1 = (i + 1) % 3;
    let i2 = (i + 2) % 3;
    let vec = A.p[i1].copy().sub(A.p[i0]).normalize();
    let axis = createVector(vec.y, - vec.x);
    let o = axis.dot(A.p[i0]);
    let dA0 = axis.dot(A.p[i1]);
    let dA1 = axis.dot(A.p[i2]);
    let Amin = min(dA0, dA1);
    let Amax = max(dA0, dA1);

    let dB0 = axis.dot(B.p[0]);
    let dB1 = axis.dot(B.p[1]);
    let dB2 = axis.dot(B.p[2]);
    let Bmin = min(dB0, dB1, dB2);
    let Bmax = max(dB0, dB1, dB2);

    renderingData.push({vec: vec, axis: axis, o: o, Amin: Amin, Amax: Amax, Bmin, Bmax, result: false});
    if (
      ( Bmin <= Amin && Amin <= Bmax ) ||
      ( Bmin <= Amax && Amax <= Bmax ) ||
      ( Amin <= Bmin && Bmin <= Amax ) ||
      ( Amin <= Bmax && Bmax <= Amax )
    ) {
      renderingData[i].result = true;
      continue;
    }
    result = false;
  }

  // rendering

  push();
  translate(width / 2, height / 2);
  noStroke();
  if (result) {
    fill(225, 81, 106);
  } else {
    fill(255);
  }
  A.draw();
  B.draw();

  noFill(); stroke(0); strokeWeight(1);
  A.draw();
  B.draw();

  fill(0);

  let n = floor(frameCount / 180) % 4;
  let boundary = {x: -width / 2, y: -height / 2, w: width, h: height};
  for (let i = 0; i < n; i ++) {
    let d = renderingData[i];
    let origin = A.p[i].copy();
    let axis = new Line().fromPointAndVector(origin, d.axis);

    stroke(0); strokeWeight(1);
    axis.draw(boundary);

    let pAmin = origin.copy().add(d.axis.copy().mult(d.Amin - d.o));
    let pAmax = origin.copy().add(d.axis.copy().mult(d.Amax - d.o));
    let pBmin = origin.copy().add(d.axis.copy().mult(d.Bmin - d.o));
    let pBmax = origin.copy().add(d.axis.copy().mult(d.Bmax - d.o));

    stroke(0, 0, 0, 32);
    axis.getPerpendicular(pAmin).draw(boundary);
    axis.getPerpendicular(pAmax).draw(boundary);
    axis.getPerpendicular(pBmin).draw(boundary);
    axis.getPerpendicular(pBmax).draw(boundary);

    if (d.result) {
      let sorted = [d.Amin, d.Amax, d.Bmin, d.Bmax].sort((a,b)=>{return a > b ? 1: -1});
      let p0 = origin.copy().add(d.axis.copy().mult(sorted[1] - d.o));
      let p1 = origin.copy().add(d.axis.copy().mult(sorted[2] - d.o));
      stroke(0); strokeWeight(3);
      line(p0.x, p0.y, p1.x, p1.y);
    }
  }
  pop();
}

class Triangle {
  constructor(x, y, p0, p1, p2) {
    this.position = createVector(x, y);
    this.op = [];
    this.p = [];
    this.op.push(p0);
    this.op.push(p1);
    this.op.push(p2);
    this.p.push(createVector());
    this.p.push(createVector());
    this.p.push(createVector());
    this.rotation = 0;
    this.update();
  }

  update() {
    for (let i = 0; i < 3; i ++) {
      this.p[i] = rotate2d(this.op[i], this.rotation).add(this.position);
    }
  }

  draw() {
    beginShape();
    for (let i = 0; i < 3; i ++) {
      vertex(this.p[i].x, this.p[i].y);
    }
    endShape(CLOSE);
  }
}

/** rotate2d **/

/** Line **/
