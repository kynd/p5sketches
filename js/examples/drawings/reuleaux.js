let cLog = [], vLog = [[],[],[]];
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
}

function draw() {
  clear();
  background(72, 140, 255);
  let t = ((frameCount - 1) % 180) / 180;
  if (t == 0) {
      cLog = [];
      vLog[0] = [];
      vLog[1] = [];
      vLog[2] = [];
  }

  let s = height * 0.8;
  let lb = -s / 2;
  let rb = s / 2;
  let tb = -s / 2;
  let bb = s / 2;

  let cos120 = cos(PI / 3 * 2);
  let r = sqrt(s * s / (2 * (1 - cos120)));

  let rot = t * TWO_PI / 3 * 4;
  let p = [];
  let adjX = 0, adjY = 0;
  for (let i = 0; i < 3; i ++) {
      let a = rot + TWO_PI / 3 * i;
      p[i] = createVector(cos(a) * r, sin(a) * r);
      if (p[i].x + adjX < lb) {
          adjX = lb - p[i].x;
      }
      if (p[i].x + adjX > rb) {
          adjX = rb - p[i].x;
      }
      if (p[i].y + adjY < tb) {
          adjY = tb - p[i].y;
      }
      if (p[i].y + adjY > bb) {
          adjY = bb - p[i].y;
      }
  }
  for (let i = 0; i < 3; i ++) {
      p[i].x += adjX;
      p[i].y += adjY;
      vLog[i].push(p[i]);
  }

  push();
  translate(width / 2, height / 2);

  noFill(); stroke(0); strokeWeight(1);
  rect(lb, tb, s, s);

  fill(255);
  let t0 = constrain(t * 8 - 1, 0, 1);
  for (let i = 0; i < 3; i ++) {
    let i1 = (i + 2) % 3;
    let pt = p[i].copy().lerp(p[i1], t0);
    line(p[i].x, p[i].y, pt.x, pt.y);
      drawCircleMarker(p[i], 4);
  }

  noFill();
  strokeWeight(3);
  let ph = constrain(t * 8 - 2 , 0, 1);
  if (ph > 0) {
    let a = ph * PI / 3;
    drawArc(p[0], p[2], a);
    drawArc(p[1], p[0], a);
    drawArc(p[2], p[1], a);
  }
  pop();
}

function drawArc(p0, p1, a) {
  let diameter = p0.dist(p1) * 2;
  let angle = atan2(p1.y - p0.y, p1.x - p0.x);
  arc(p0.x, p0.y, diameter, diameter, angle - a, angle);
}

/** drawCircleMarker **/
