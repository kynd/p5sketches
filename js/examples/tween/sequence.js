let msec = 0, prevNow = 0;
let tween, bezier;
let actors = [];

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    tween = new Tween();
    bezier = tween.createCubicBezier({x:0.4, y: 0.0}, {x:0.2, y: 1});
    for (let i = 0; i < 10; i++) {
      let o = createVector(width / 2, height / 2);
      let d = createVector(randomBool() ? -1: 1, randomBool() ? -1: 1)
      let actor = randomBool() ? new ArcActor(o, d) : new LineActor(o, d);
      actors.push(actor);
    }
}

function draw() {
  clear();
  background(255, 60, 0);
  ellapseTime();

  push();
  noFill(); stroke(0);
  for (let i = actors.length - 1; i >= 0; i --) {
    actors[i].update();
    actors[i].draw();

    if (actors[i].reproductive) {
      actors.push(actors[i].reproduce());
      actors[i].reproductive = false;
    }
    if (actors[i].isDone) {
      actors.splice(i, 1);
    }
  }
  pop();
}

function ellapseTime() {
  msec += min(100, window.performance.now() - prevNow);
  prevNow = window.performance.now();
}

class Actor {
  constructor(o, d) {
    if (o.x < 0 || o.x >= width) { o.x = width / 2; }
    if (o.y < 0 || o.y >= width) { o.y = height / 2; }
    this.origin = o;
    this.dir = d.normalize();
    this.startMs = msec;
    this.duration = randomBool() ? 500 : 1000;
    this.reproductive = false;
    this.isDone = false;
    this.reproduceFlag = false;
  }

  update() {
    let t = map(msec - this.startMs, 0, this.duration, 0, 1);
    this.t0 = t * 1.5;
    this.t1 = t * 1.5 - 0.5;
    if (this.t0 >= 0.99 && !this.reproduceFlag) {
      this.reproductive = this.reproduceFlag = true;
    }
    if (t >= 0.99) {this.isDone = true; }
  }
}

class ArcActor extends Actor{
  constructor(o, d) {
    super(o, d);
    let rotDir = randomBool() ? -1 : 1;
    let size = randomBool() ? 30 : 60;
    this.center = o.copy().add(d.copy().rotate(Math.PI / 2 * rotDir).mult(size));
    this.angle = Math.floor(Math.random() * 3 + 1) * Math.PI / 2 * rotDir;
    this.radius = this.origin.copy().sub(this.center);
  }

  reproduce() {
    let o = this.getHeadPosition(this.angle);
    let d = this.dir.copy().rotate(this.angle);
    return randomBool() ? new ArcActor(o, d) : new LineActor(o, d);
  }

  getHeadPosition(angle) {
    return this.center.copy().add(this.radius.copy().rotate(angle));
  }

  draw() {
    let a0 = bezier(this.t0) * this.angle;
    let a1 = bezier(this.t1) * this.angle;
    let aDiff = a1 - a0;
    let n = Math.floor(Math.abs(aDiff / 0.1));
    beginShape();
    for (let i = 0; i <= n; i ++) {
      let p = this.getHeadPosition(a0 + aDiff / n * i);
      vertex(p.x, p.y);
    }
    endShape();
  }
}


class LineActor extends Actor{
  constructor(o, d) {
    super(o, d);
    this.length = randomBool() ? 180 : 120;
  }

  reproduce() {
    let o = this.getHeadPosition(tween.powerIn(this.t0, 3));
    if (randomBool()) {
      let d = this.dir.copy().rotate(randomBool() ? -PI / 2 : PI / 2);
      return new LineActor(o, d);
    } else {
      return new ArcActor(o, this.dir.copy());
    }
  }

  getHeadPosition(t) {
    return this.origin.copy().add(this.dir.copy().mult(t * this.length));
  }

  draw() {
    let p0 = this.getHeadPosition(tween.powerOut(this.t0, 3));
    let p1 = this.getHeadPosition(tween.powerIn(this.t1, 3));
    line(p0.x, p0.y, p1.x, p1.y);
    endShape();
  }
}

function randomBool() {
  return Math.random() < 0.5;
}

/** Tween **/

/** drawCircleMarker **/
