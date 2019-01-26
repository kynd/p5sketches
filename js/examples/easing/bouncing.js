let msec = 0, prevNow = 0;
let tween, bezier, quad;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    tween = new Tween();
    bezier = tween.createCubicBezier({x:0.4, y: 0.0}, {x:0.2, y: 1});
    quad = (t)=>{return tween.powerOut(t, 2)};
}

function draw() {
  clear();
  background(73, 5, 255);
  let groundY = height - 24;
  let baseSize = 72;
  let mt = msec % 1900;

  for (let i = 0; i < 2; i++) {
    let x = width / 2 + baseSize * (i * 2 - 1), y = 0, w = baseSize, h = baseSize;
    if (mt < 500) {
      let t = map(mt, 0, 500, 0, 1);
      if (i == 1) {
        let r = 1 - tween.powerInOut(t, 2) * 0.2;
        w = baseSize / r;
        h = baseSize * r;
        x += randomGaussian(0, t * 2);
      }
      y = groundY - h / 2;
    } else if (mt < 1000) {
      let t = map(mt, 500, 1000, 0, 1);
      if (i == 1) {
        let r = 1.2 - tween.powerOut(t, 2) * 0.2;
        w = baseSize / r;
        h = baseSize * r;
      }
      y = groundY - h / 2 - tween.powerOut(t, 2) * height * 2;
    } else if (mt < 1500) {
      let t = map(mt, 1000, 1500, 0, 1);
      y = groundY - h / 2 - tween.powerOut(1 - t, 2) * height * 2;
    } else {
      if (i == 0) {
        y = groundY - h / 2;
      } else if (mt < 1600) {
        let t = map(mt, 1500, 1600, 0, 1);
        let r = 1 - tween.powerOut(t, 2) * 0.3;
        w = baseSize / r;
        h = baseSize * r;
        y = groundY - h / 2;
      } else if (mt < 1750) {
        let t = map(mt, 1600, 1750, 0, 1);
        let t2 = map(mt, 1600, 1650, 0, 1);
        let r = 0.7 + tween.powerOut(t2, 2) * 0.3;
        w = baseSize / r;
        h = baseSize * r;
        y = groundY - h / 2 - tween.powerOut(t, 2) * baseSize;
      } else if (mt < 1900) {
        let t = map(mt, 1750, 1900, 0, 1);
        y = groundY - h / 2 - tween.powerOut(1 - t, 2) * baseSize;
      }
    }

    fill(255); stroke(0);
    ellipse(x, y, w, h);
  }


  noFill(); stroke(0);
  drawGround(groundY);
  ellapseTime();
}

function drawGround(groundY) {
  let n = Math.ceil(width / 32);
  beginShape();
  curveVertex(-8, groundY);
  for (let i = 0; i <= n; i ++) {
    let x = width / n * i;
    curveVertex(x, groundY + randomGaussian(0, 1));

  }
  curveVertex(width + 8, groundY);
  endShape();
}

function ellapseTime() {
  msec += min(100, window.performance.now() - prevNow);
  prevNow = window.performance.now();
}

function drawBox(x, y, size) {
  rect(x - size / 2, y - size / 2, size, size);
}

/** Tween **/
