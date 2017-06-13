let lines = [[],[],[],[],[]];
let sqrt2 = Math.sqrt(2);

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
}

function draw() {
  clear();
  background(72, 140, 255);

  let f = frameCount - 1;

  if (f % 180 >= 90) {
    for (let i = 0; i < lines.length; i ++) {
      lines[i].shift(); lines[i].shift();
    }
  }

  let theta = (f / 90 - 0.25) * TWO_PI;
  let u = min(width, height) / 8;
  let c0 = createVector(0, -u * 2);
  let c1 = createVector(0, u * 2);
  let m = createVector(cos(theta) * u * 3, sin(theta) * u * 3);
  let cp0 = (m.copy().sub(c0)).normalize().mult(u).add(c0);
  let cp1 = (m.copy().sub(c1)).normalize().mult(u).add(c1);
  let mp = createVector(0, constrain(m.y, c0.y, c1.y));

  let sp;
  if (m.y < c0.y) {
    sp = cp0.copy();
  } else if (m.y > c1.y) {
    sp = cp1.copy();
  } else {
    if (m.x < 0) {
      sp = createVector(-u, mp.y);
    } else {
      sp = createVector(u, mp.y);
    }
  }

  lines[0].push(m);
  lines[1].push(cp0);
  lines[2].push(cp1);
  lines[3].push(mp);
  lines[4].push(sp);

  push();
  translate(width / 2, height / 2);
  rotate((f / 180 - 0.125) * TWO_PI);
  noFill(); stroke(0);
  for (let i = 0; i < lines.length; i++) {
    drawLine(lines[i]);
  }
  line(m.x, m.y, c0.x, c0.y);
  line(m.x, m.y, c1.x, c1.y);
  line(m.x, m.y, mp.x, mp.y);
  fill(255);
  drawCircleMarker(m, 4);
  drawCircleMarker(cp0, 4);
  drawCircleMarker(cp1, 4);
  drawCircleMarker(c0, 4);
  drawCircleMarker(c1, 4);
  drawCircleMarker(mp, 4);
  drawCircleMarker(sp, 4);
  pop();
}

function drawLine(line) {
  beginShape();
  for (let i = 0; i < line.length; i ++) {
    vertex(line[i].x, line[i].y);
  }
  endShape();
}

/** drawCircleMarker **/
