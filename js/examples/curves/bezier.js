let log = [];
let pDef = [[-1, 1], [-0.5, -1], [0.5, 1], [1, -1]] ;
let p = [];

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < pDef.length; i ++) {
    p.push(createVector(pDef[i][0], pDef[i][1]));
  }
}

function draw() {
  clear();
  background(15, 243, 208);

  let interval = 30;
  let duration = 120;
  let len = interval + duration;
  let f = frameCount - 1;
  if (f % len == 0) { log = []; }
  let t = constrain((f % len - interval / 2) / duration, 0, 1);

  fill(0); stroke(0);
  let s = createVector(width * 0.3, height * 0.2);

  push();
  translate(width / 2, height / 2);

  for (let i = 0; i < p.length; i ++) {
    drawCircleMarker(createVector(p[i].x * s.x, p[i].y * s.y), 3);
    drawLabel(p[i].x * s.x, p[i].y * s.y + 24, "P" + i);
    if (i > 0) {
      line(p[i - 1].x * s.x, p[i - 1].y * s.y, p[i].x * s.x, p[i].y * s.y);
    }
  }

  tp = [];
  tp.push(p[0].copy().lerp(p[1], t));
  tp.push(p[1].copy().lerp(p[2], t));
  tp.push(p[2].copy().lerp(p[3], t));
  tp.push(tp[0].copy().lerp(tp[1], t));
  tp.push(tp[1].copy().lerp(tp[2], t));
  tp.push(tp[3].copy().lerp(tp[4], t));
  log.push(tp[5]);

  for (let i = 0; i < tp.length; i ++) {
    drawCircleMarker(createVector(tp[i].x * s.x, tp[i].y * s.y), 3);
  }

  line(tp[0].x * s.x, tp[0].y * s.y, tp[1].x * s.x, tp[1].y * s.y);
  line(tp[1].x * s.x, tp[1].y * s.y, tp[2].x * s.x, tp[2].y * s.y);
  line(tp[3].x * s.x, tp[3].y * s.y, tp[4].x * s.x, tp[4].y * s.y);


  let pt = p[0].copy().mult((1 - t) * (1 - t) * (1 - t))
          .add(p[1].copy().mult(3 * (1 - t) * (1 - t) * t))
          .add(p[2].copy().mult(3 * (1 - t) * t * t))
          .add(p[3].copy().mult(t * t * t));

  noFill();
  drawCircleMarker(createVector(pt.x * s.x, pt.y * s.y), 8);

  strokeWeight(2);
  beginShape();
  for (let i = 0; i < log.length; i ++) {
    vertex(log[i].x * s.x, log[i].y * s.y);
  }
  endShape();

  pop();
}

/** drawLabel **/

/** drawCircleMarker **/
