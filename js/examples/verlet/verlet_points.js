
let points = [];
let forceIndex, force;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 10; i ++) {
    points.push(new VerletPoint( createVector(random(width), random(height))) );
    points[i].position.add(random2D().mult(random(2) + 1));
  }
}

function draw() {
  clear();
  background(255, 235, 59);
  points.forEach((p)=>{
    p.update();
    if (p.position.x < 0) { p.setPosition(createVector(width, p.position.y), true);}
    if (p.position.x > width) { p.setPosition(createVector(0, p.position.y), true);}
    if (p.position.y < 0) { p.setPosition(createVector(p.position.x, height), true);}
    if (p.position.y > height) { p.setPosition(createVector(p.position.x, 0), true);}
    if (p.getVelocity().mag() > 3) {
      p.setVelocity(p.getVelocity().normalize().mult(3)); // limit the speed
    }

  });

  if (!force || frameCount % 60 == 0) {
    forceIndex = floor(random(points.length));
    force = random2D().mult((random(3) + 1)  / 10);
  }

  if (frameCount % 60 < 30) {
    points[forceIndex].position.add(force);
    let p0 = points[forceIndex].position;
    let p1 = points[forceIndex].position.copy().add(force.copy().mult(100));
    drawArrow(p0.x, p0.y, p1.x, p1.y);
  }

  points.forEach((p)=>{p.draw();});
}

function random2D() {
  return createVector(random(-1, 1), random(-1, 1)).normalize();
}

/** drawArrow **/

class VerletPoint {
  constructor(p) {
    this.setPosition(p);
  }

  setPosition(p, keepVelocity = false) {
    if (keepVelocity) {
      let vel = this.getVelocity();
      this.position = p;
      this.setVelocity(vel);
    } else {
      this.position = p;
      this.prevPosition = this.position.copy();
    }
  }

  update() {
    let temp = this.position.copy();
    this.position.add(this.getVelocity());
    this.prevPosition = temp;
  }

  setVelocity(v) {
    this.prevPosition = this.position.copy().sub(v);
  }

  getVelocity() {
    return this.position.copy().sub(this.prevPosition);
  }

  draw() {
    ellipse(this.position.x, this.position.y, 8, 8);
  }
}
