let log = [];
let b = [];
let resolution = 50;
let n = 2;
let knots = [0, 0, 0, 1, 2, 3, 3, 3];
let pDef = [[-1, 1], [-0.5, -1], [0, 1], [0.5, -1], [1, 1]];
let p = [];
let tmin = 0;
let tmax = 3;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < pDef.length; i ++) {
    p.push(createVector(pDef[i][0], pDef[i][1]));
  }

  for (let i = 0; i < p.length; i ++) {
    b.push([]);
    for (let j = tmin; j <= tmax * resolution; j += 1) {
      let x = j / resolution;
      if (x >= tmax) { x = tmax - 0.00001; }
      b[i].push(bN(i, n, x));
    }
  }
}

function draw() {
  clear();
  background(15, 243, 208);

  let interval = 30;
  let len = b[0].length + interval;
  let f = frameCount - 1;
  if (f % len == 0) { log = []; }
  let idx = constrain(f % len - interval / 2, 0, b[0].length - 1);

  drawGraph(idx);
  drawCurve(idx);
}

function drawGraph(idx) {
  noFill(); stroke(0);
  let w = width * 0.6, h = height * 0.2;
  let x = (width - w) / 2, y = height - 32;

  push();
  translate(x, y);
  for (let i = 0; i < b.length; i ++) {
    beginShape();
    for (let j = 0; j < b[i].length; j ++) {
      let v = b[i][j];
      vertex(j / resolution * w / tmax, -v * h);
    }
    endShape();
  }
  line(idx / resolution * w / tmax, 0, idx / resolution * w / tmax, -h);

  fill(0);
  for (let i = 0; i < b.length; i ++) {
    let v = b[i][idx];
    drawCircleMarker(createVector(idx / resolution * w / tmax, -v * h), 2);
  }

  for (let i = 0; i <= tmax; i ++) {
    drawCircleMarker(createVector(i * w / tmax, 0), 2);

    drawLabel(i * w / tmax, 16, "x = " + i);
  }

  drawLabel(0, -h - 8, "B i,n(x)");
  pop();
}


function drawCurve(idx) {
  fill(0); stroke(0);
  let s = createVector(width * 0.4, height * 0.2); // scale

  push();
  translate(width / 2, height / 3 * 1);

  for (let i = 0; i < p.length; i ++) {
    drawCircleMarker(createVector(p[i].x * s.x, p[i].y * s.y), 3);
    drawLabel(p[i].x * s.x, p[i].y * s.y + 24, "P" + i);
    if (i > 0) {
      line(p[i - 1].x * s.x, p[i - 1].y * s.y, p[i].x * s.x, p[i].y * s.y);
    }
  }

  let pt = createVector();
  let v = [];
  for (let i = 0; i < p.length; i ++) {
    v.push(b[i][idx]);
    pt.add(p[i].copy().mult(v[i]))
  }

  drawCircleMarker(createVector(pt.x * s.x, pt.y * s.y), 4);
  log.push(pt);
  for (let i = 0; i < p.length; i ++) {
    stroke(0, 0, 0, v[i] * 255);
    line(pt.x * s.x, pt.y * s.y, p[i].x * s.x, p[i].y * s.y);
  }

  noFill(); stroke(1); strokeWeight(2);
  beginShape();
  for (let i = 0; i < log.length; i ++) {
    vertex(log[i].x * s.x, log[i].y * s.y);
  }
  endShape();

  pop();
}


function bN(i, k, x){
  let w1 = 0, w2 = 0;
  if(k == 0){
    if (x >= knots[i] && x < knots[i + 1]) {
      return 1;
    } else {
      return 0;
    }
  } else {
    if ((knots[i + k] - knots[i]) != 0 ){
      w1 = ((x - knots[i]) / (knots[i + k] - knots[i])) * bN(i, k - 1, x);
    }

    if ((knots[i + k + 1] - knots[i + 1]) != 0) {
      w2 = ((knots[i + k + 1] - x) / (knots[i + k + 1] - knots[i + 1])) * bN(i + 1, k - 1, x);
    }
    return w1 + w2;
  }
}

/** drawLabel **/

/** drawCircleMarker **/
