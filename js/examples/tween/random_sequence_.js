let msec = 0, prevNow = 0;
let tween = new Tween();
let bezier = tween.createCubicBezier({x:0.4, y: 0.0}, {x:0.2, y: 1});
let animations = [];
let project = getProjectionFunc(400, 600);

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    animations.push(new CircleAnimation(createVector(0,100,0), createVector(0, 1, 0), 0));
    animations.push(new CircleAnimation(createVector(0,-100,0), createVector(0, 1, 0), 0));
    animations.push(new LineAnimation(createVector(0,0,0), createVector(1,1,0)));
    for (let i = 0; i < animations.length; i++) {
      animations[i].msec = -200;
    }
}

function draw() {
  clear();
  background(0);
  ellapseTime();

  push();
  translate(width / 2, height / 2);
  for (let i = animations.length - 1; i >= 0; i --) {
    animations[i].update();
    animations[i].draw();

    if (animations.length == 0) {
    }

    if (animations[i].reproductive) {
      if (animations.length < 16) {
        animations.push(animations[i].reproduce());
      }
      animations[i].reproductive = false;
    }
    if (animations[i].isDone) {
      animations.splice(i, 1);
    }
  }

  pop();
}

function ellapseTime() {
  msec += min(100, window.performance.now() - prevNow);
  prevNow = window.performance.now();
}

class CircleAnimation {
  constructor(c, axis, a) {

    this.center = c;
    this.axis = axis;
    this.startAngle = a;
    this.angle0 = 0;
    this.angle1 = 0;
    this.startMs = msec;
    this.prevT = 0;
    this.reproductive = false;
    this.isDone = false;

    this.initialVec = axis.cross(createVector(0, 0, 1)).normalize();
  }

  reproduce() {
    let o = this.getHeadPosition(this.startAngle + this.angle0);
    return new LineAnimation(o, this.getTangent(this.startAngle + this.angle0));
  }

  update() {
    let t = map(msec - this.startMs, 0, 1000, 0, 1);
    this.angle0 = bezier(t * 1.5) * Math.PI;
    this.angle1 = bezier(t * 1.5 - 0.5) * Math.PI;
    for (let i = 1; i <= 4; i ++) {
      let threshold = i * 0.25;
      if (this.prevT < threshold && t > threshold) {
        this.reproductive = true;
      }
      if (t > 1) {
        this.isDone = true;
      }
    }
    this.prevT = t;
  }

  getHeadPosition(angle) {
    return this.center.copy().add(rotate3d(this.initialVec, this.axis, angle).mult(80));
  }

  getTangent(angle) {
    let v = rotate3d(this.initialVec, this.axis, angle);
    return v.cross(this.axis).normalize();
  }

  draw() {
    push();
    noFill(); stroke(255);
    beginShape();
    let aDiff = this.angle0 - this.angle1;
    let n = Math.floor(aDiff / 0.1) + 1;
    let p;
    for (let i = 0; i <= n; i ++) {
      p = project(this.getHeadPosition(this.startAngle + this.angle1 + aDiff / n * i));
      vertex(p.x, p.y);
    }
    endShape();
    pop();
  }
}

class LineAnimation {
  constructor(o, v) {
    this.origin = this.p0 = this.p1 = o;
    this.vec = v.normalize();
    this.startMs = msec;
    this.prevT = 0;
    this.reproductive = false;
    this.isDone = false;
  }

  reproduce() {
    if (Math.random() < 0.4) {
      return new CircleAnimation(this.p0.copy(), this.vec.copy().normalize(), 0);
    } else {
      let v;
      do {
        let vx = (this.p0.x / width + Math.random() - 0.5 > 0) ? -1 : 1;
        let vy = (this.p0.y / height + Math.random() - 0.5 > 0) ? -1 : 1;
        let vz = (this.p0.z / height + Math.random() - 0.5 > 0) ? -1 : 1;
        v = createVector(vx, vy, vz).normalize();
      } while (v.equals(this.vec));
      return new LineAnimation(this.p0.copy(), v);
    }
  }

  update() {
    let t = map(msec - this.startMs, 0, 1000, 0, 1);
    this.p0 = this.origin.copy().add(this.vec.copy().mult(tween.powerIn(t * 3, 3) * 320));
    this.p1 = this.origin.copy().add(this.vec.copy().mult(tween.powerOut(t * 2 - 1, 2) * 320));
    for (let i = 1; i <= 4; i ++) {
      let threshold = i * 0.5;
      if (this.prevT < threshold && t > threshold) {
        this.reproductive = true;
      }
      if (t > 1) {
        this.isDone = true;
      }
    }
    this.prevT = t;
  }

  draw() {
    push();
    noFill(); stroke(255);
    let pp0 = project(this.p0);
    let pp1 = project(this.p1);
    line(pp0.x, pp0.y, pp1.x, pp1.y);
    endShape();
    pop();
  }
}

/** Tween **/

/** rotate3d **/

/** drawCircleMarker **/
