var stopAudio = false;

function saveCanvasInterval(n = 2) {
  if ((frameCount - 1) % n == 0) {
    saveCanvas('output' + (frameCount - 1) / n, 'png');
  }
}

function drawLineWithLabel(x0, y0, x1, y1, label, align = CENTER) {
  line(x0, y0, x1, y1);
  let mx = (x0 + x1) / 2, my = (y0 + y1) / 2;
  drawLabel(mx, my, label, align);
}

function drawLabel(x, y, label, align = CENTER) {
  push();
  strokeWeight(0);
  textFont("monospace");
  textSize(14);
  textAlign(align);
  if (align == LEFT) {x += 6;}
  if (align == RIGHT) {x -= 6;}
  text(label, x, y);
  pop();
}

function drawCircleMarker(p, size) {
  ellipse(p.x, p.y, size * 2, size * 2);
}

function drawSquareMarker(p, size) {
  rect(p.x - size, p.y - size, size * 2, size * 2);
}

function drawTriangleMarker(p, size) {
  let r3 = sqrt(3) / 3 * size;
  triangle(p.x, p.y - r3 * 2, p.x - size, p.y + r3, p.x + size, p.y + r3);
}

function drawStarMarker(p, size) {
  beginShape();
  for (let i = 0; i < 5; i ++) {
    let a0 = PI * 2 / 5 * i;
    let a1 = PI * 2 / 5 * (i + 0.5);
    vertex(p.x + sin(a0) * size * 1.5, p.y - cos(a0) * size * 1.5);
    vertex(p.x + sin(a1) * size * 0.5, p.y - cos(a1) * size * 0.5);
  }
  endShape(CLOSE);
}

function drawArrow(x0, y0, x1, y1) {
  line(x0, y0, x1, y1);
  let v = createVector(x1 - x0, y1 - y0).normalize();
  line(x1, y1, x1 - v.y * 4 - v.x * 4, y1 + v.x * 4 - v.y * 4);
  line(x1, y1, x1 + v.y * 4 - v.x * 4, y1 - v.x * 4 - v.y * 4);
}

function rotate2d(p, rad) {
  // see p5.Vector.rotate()
  // https://p5js.org/reference/#/p5.Vector/rotate
  let sine = sin(rad);
  let cosine = cos(rad);
  return createVector(p.x * cosine + p.y * sine, -p.x * sine + p.y * cosine);
}

function rotate3d(v, axis, angle) {
	let ax = axis.copy().normalize();
	let sina = sin(angle);
	let cosa = cos(angle);
	let cosb = 1 - cosa;

	let x = v.x * (ax.x * ax.x * cosb + cosa)
	+ v.y * (ax.x * ax.y * cosb - ax.z * sina)
	+ v.z * (ax.x * ax.z * cosb + ax.y * sina);
	let y = v.x * (ax.y * ax.x * cosb + ax.z * sina)
	+ v.y * (ax.y * ax.y * cosb + cosa)
	+ v.z * (ax.y * ax.z * cosb - ax.x * sina);
	let z = v.x * (ax.z * ax.x * cosb - ax.y * sina)
	+ v.y * (ax.z * ax.y * cosb + ax.x * sina)
	+ v.z * (ax.z * ax.z * cosb + cosa);

	return createVector(x, y, z);
}

function random2D() {
  return createVector(random(-1, 1), random(-1, 1)).normalize();
}

function random3D() {
  return createVector(random(-1, 1), random(-1, 1), random(-1, 1)).normalize();
}

function getProjectionFunc(n, z, m = 1) {
  let nearClip = n;
  let cameraZ = z;
  let multiplier = m;
  return (v)=>{
    let r = abs(cameraZ - nearClip) / abs(cameraZ - v.z) * multiplier;
    return createVector(v.x * r, v.y * r);
  }
  // Look up for Projection Matrix for more proper 3D projection
  // e.g. http://www.songho.ca/opengl/gl_projectionmatrix.html
}

function signedNoise(x, y, z) {
  return (noise(x, y, z) - 0.5) * 2;
}

function plotGraph(data, ox, oy, w, h, minX, maxX, minY, maxY, xLabel, yLabel) {
  let left = ox - minX / (maxX - minX) * w;
  let top = oy - maxY / (maxY - minY) * h;
  let labelLeft = abs(left - ox) > abs(left + w - ox);
  let labelTop = abs(top - oy) > abs(top + h - oy);

  push();

  noFill(); stroke(0);
  line(left, oy, left + w, oy);
  line(ox, top, ox, top + h);

  beginShape();
  for (let i = 0; i < data.length; i ++) {
    let x = ox + data[i].x / (maxX - minX) * w;
    let y = oy - data[i].y / (maxY - minY) * h;
    vertex(x, y);
  }
  endShape();

  fill(0);
  drawLabel(labelLeft ? left : left + w, oy + (labelTop ? 16 : -8), xLabel, labelLeft ?  LEFT : RIGHT);
  drawLabel(ox, labelTop ? top : top + h, yLabel, labelLeft ?  RIGHT : LEFT);
  pop();
}

class Line {
  constructor(a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;
  }

  fromTwoPoints(p0, p1) {
    let dx = p1.x - p0.x;
    let dy = p1.y - p0.y;
    this.a = dy;
    this.b = -dx;
    this.c = dx * p0.y - dy * p0.x;
    return this;
  }

  fromPointAndAngle(p0, angle) {
    let p1 = {x: p0.x + cos(angle), y: p0.y + sin(angle)};
    return this.fromTwoPoints(p0, p1);
  }

  fromPointAndVector(p0, v) {
    let p1 = {x: p0.x + v.x, y: p0.y + v.y};
    return this.fromTwoPoints(p0, p1);
  }

  intersects(o) {
    if (o instanceof Line) {
      let d = this.a * o.b - o.a * this.b;
      return d != 0.0;
    } else if (o instanceof LineSegment) {
      let t1 = this.a * o.p0.x + this.b * o.p0.y + this.c;
      let t2 = this.a * o.p1.x + this.b * o.p1.y + this.c;
      return t1 * t2 <= 0;
    }
    return undefined;
  }

  getIntersectionPoint(o) {
    if (o instanceof Line) {
      let d = this.a * o.b - o.a * this.b;
      if (d == 0.0) { return undefined; }
      let x = (this.b * o.c - o.b * this.c) / d;
      let y = (o.a * this.c - this.a * o.c) / d;
      return createVector(x, y);
    } else if (o instanceof LineSegment) {
      if (!this.intersects(o)) { return undefined; }
      return this.getIntersectionPoint(o.toLine());
    }
    return undefined;
  }

  getAngle() {
    return atan2(this.a, -this.b);
  }

  getPerpendicular(p) {
    return new Line(this.b, -this.a, this.a * p.y - this.b * p.x);
  }

  getParallel(p) {
    return new Line(this.a, this.b, -this.a * p.x - this.b * p.y);
  }

  getNearestPoint(p) {
    let l = this.getPerpendicular(p);
    return this.getIntersectionPoint(l);
  }

  draw(rect) {
    if (!rect) { rect = {x:0, y:0, w:0, h:0}}
    let l0, l1;
    if (abs(this.a) > abs(this.b)) {
      l0 = new Line().fromTwoPoints({x:rect.x, y:rect.y}, {x:rect.x + width, y:rect.y});
      l1 = new Line().fromTwoPoints({x:rect.x, y:rect.y + height}, {x:rect.x + width,   y:height});
    } else {
        l0 = new Line().fromTwoPoints({x:rect.x, y:rect.y}, {x:rect.x, y:height});
      l1 = new Line().fromTwoPoints({x:rect.x + width, y:rect.y}, {x:rect.x + width, y:rect.y + height});
    }

    let p0 = this.getIntersectionPoint(l0);
    let p1 = this.getIntersectionPoint(l1);
    line(p0.x, p0.y, p1.x, p1.y);
  }
}

window.Line = Line;

class LineSegment {
  constructor(x0, y0, x1, y1) {
    this.p0 = createVector(x0, y0);
    this.p1 = createVector(x1, y1);
  }

  fromTwoPoints(p0, p1) {
    this.p0 = p0;
    this.p1 = p1;
    return this;
  }

  fromTwoPointsAndLength(p0, p1, length) {
    this.p0 = p0;
    let n = p1.copy().sub(p0).normalize();
    this.p1 = n.mult(length).add(p0);
    return this;
  }

  toLine() {
    return new Line().fromTwoPoints(this.p0, this.p1);
  }

  intersects(o) {
    if (o instanceof Line) {
      let t0 = o.a * this.p0.x + o.b * this.p0.y + o.c;
      let t1 = o.a * this.p1.x + o.b * this.p1.y + o.c;
      return t0 * t1 < 0;
    } else if (o instanceof LineSegment) {
      return this.intersects(o.toLine()) && o.intersects(this.toLine());
    }
    return undefined;
  }

  getIntersectionPoint(o) {
    if (o instanceof Line) {
      if (!this.intersects(o)) { return undefined; }
      return o.getIntersectionPoint(this.toLine());
    } else if (o instanceof LineSegment) {
      if (!this.intersects(o)) { return undefined; }
      return o.toLine().getIntersectionPoint(this.toLine());
    }
    return undefined;
  }

  getAngle() {
    return atan2(this.p1.y - this.p0.y, this.p1.x - this.p0.x);
  }

  getLength() {
    return p0.dist(p1);
  }

  getNearestPoint(p) {
    if (this.p1.copy().sub(this.p0).dot(p.copy().sub(this.p0)) < 0) return this.p0;
    if (this.p0.copy().sub(this.p1).dot(p.copy().sub(this.p1)) < 0) return this.p1;
    return this.toLine().getNearestPoint(p);
  }

  getBisection() {
    let o = this.getMidPoint();
    return this.toLine().getPerpendicular(o);
  }

  getMidPoint() {
    return this.p0.copy().add(this.p1).mult(0.5);
  }

  getPerpendicular(p) {
    return this.toLine().getPerpendicular(p);
  }

  getParallel(p) {
    return this.toLine().getParallel(p);
  }

  draw() {
    line(this.p0.x, this.p0.y, this.p1.x, this.p1.y);
  }
}

window.LineSegment = LineSegment;

class Circle {
  constructor(x, y, radius) {
    this.center = createVector(x, y);
    this.radius = radius;
  }

  fromCenterAndRadius(center, radius) {
    this.center = center;
    this.radius = radius;
    return this;
  }

  fromCenterAndPoint(center, p) {
    this.center = center;
    this.radius = center.dist(p);
    return this;
  }

  fromThreePoints(p0, p1, p2) {
    let x = ((p0.y - p2.y) * (p0.y * p0.y - p1.y * p1.y + p0.x * p0.x - p1.x * p1.x)
                    - (p0.y - p1.y) * (p0.y * p0.y - p2.y * p2.y + p0.x * p0.x - p2.x * p2.x))
                    / (2 * (p0.y - p2.y) * (p0.x - p1.x)
                    - 2 * (p0.y - p1.y) * (p0.x - p2.x));

    let y = ((p0.x - p2.x) * (p0.x * p0.x - p1.x * p1.x + p0.y * p0.y - p1.y * p1.y)
                    - (p0.x - p1.x) * (p0.x * p0.x - p2.x * p2.x + p0.y * p0.y - p2.y * p2.y))
                    / (2 * (p0.x - p2.x) * (p0.y - p1.y) - 2 * (p0.x - p1.x) * (p0.y - p2.y));
    this.center = createVector(x, y);
    this.radius = this.center.dist(p0);
    return this;
  }

  getIntersectionPoints(o) {
    let points = [];
    if (o instanceof Line) {
      let l = o.a * o.a + o.b * o.b;
      let k = o.a * this.center.x + o.b * this.center.y + o.c;
      let d = l * this.radius * this.radius - k * k;
      if (d > 0) {
        let ds = sqrt(d);
        let apl = o.a / l;
        let bpl = o.b / l;
        let xc = this.center.x - apl * k;
        let yc = this.center.y - bpl * k;
        let xd = bpl*ds;
        let yd = apl*ds;
        points.push(createVector(xc - xd, yc + yd));
        points.push(createVector(xc + xd, yc - yd));
      } else if (d == 0) {
        points.push(createVector(this.center.x - o.a / l, this.center.y - o.b * k / l));
      }
    } else if (o instanceof LineSegment) {
      let l = o.toLine();
      let temp = [];
      temp = this.getIntersectionPoints(l, this);
      for (let i = 0; i < temp.length; i ++) {
        let d0 = (o.p0.copy().sub(o.p1)).dot(temp[i].copy().sub(o.p1));
        let d1 = (o.p1.copy().sub(o.p0)).dot(temp[i].copy().sub(o.p0));
        if (d0 >= 0 && d1 >= 0) points.push(temp[i]);
      }
    }
    return points;
  }

  draw() {
    ellipse(this.center.x, this.center.y, this.radius * 2, this.radius * 2);
  }
}

window.Circle = Circle;

class Tween {
  linear(t) {
    t = max(0, min(t, 1));
    return t;
  }

  powerIn(t, a = 2) {
    t = max(0, min(t, 1));
    return pow(t, a);
  }

  powerOut(t, a = 2) {
    t = 1.0 - max(0, min(t, 1));
    return 1.0 - pow(t, a);
  }

  powerInOut(t, a = 2) {
    t = max(0, min(t, 1));
    if (t < 0.5) {
      return pow(t * 2, a) * 0.5;
    } else {
      return 1.0 - pow((1 - t) * 2, a) * 0.5;
    }
  }

  sineIn(t) {
    t = 1.0 - max(0, min(t, 1));
    return 1.0 - sin(t * PI * 0.5);
  }

  sineOut(t) {
    return sin(t * PI * 0.5);
  }

  sineInOut(t) {
    t = max(0, min(t, 1));
    return sin((t - 0.5) * PI) * 0.5 + 0.5;
  }

  circularIn(t) {
    t = max(0, min(t, 1));
    return sqrt(1 - (1 - t) * (1- t));
  }

  circularOut(t) {
    t = max(0, min(t, 1));
    return 1 - sqrt(1 - (t) * (t));
  }

  circularInOut(t) {
    t = max(0, min(t, 1));

    if (t < 0.5) {
      t *= 2;
      return 0.5 - sqrt(1 - (t) * (t)) * 0.5;
    } else {
      t = (t - 0.5) * 2;
      return 0.5 + sqrt(1 - (1 - t) * (1 - t)) * 0.5;
    }
  }

  createCubicBezier(a, b, resolution = 40) {
    let buff = [];

    let n = 0;
    let i = 0;
    while (i <= resolution && n <= resolution * 10) {
      let x = 3*(1-n)*(1-n)*n * a.x + 3*(1-n)*n*n * b.x + n*n*n;
      if (x > i / resolution) {
        let y = 3*(1-n)*(1-n)*n * a.y + 3*(1-n)*n*n * b.y + n*n*n;
        buff.push(y);
        i ++;
      }
      n += 1 / resolution / 10;
    }
    return (t)=>{
      t = max(0, min(t, 1));
      let ti = floor(t * resolution);
      let tr = t * resolution - ti;

      if (ti >= buff.length - 1) {
          return buff[ti];
      } else {
          return buff[ti] * (1-tr) + buff[ti + 1] * tr;
      }

      return 1;
    }
  }
}

window.Tween = Tween;

class VerletPoint {
  constructor(p) {
    this.setPosition(p);
  }

  setPosition(p) {
    this.position = p;
    this.prevPosition = this.position.copy();
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

window.VerletPoint = VerletPoint;

class VerletStick {
  constructor(a, b) {
    this.pa = a;
    this.pb = b;
    this.length = this.pa.position.dist(this.pb.position);
  }

  update() {
    let dist = this.pa.position.dist(this.pb.position);
    let diff = this.length - dist;
    let offset = this.pa.position.copy().sub(this.pb.position).mult(diff / dist / 2);
    this.pa.position.add(offset);
    this.pb.position.sub(offset);
  }

  draw() {
    let p0 = this.pa.position;
    let p1 = this.pb.position;
    line(p0.x, p0.y, p1.x, p1.y);
  }
}

window.VerletStick = VerletStick;

class Body { // Newtonian Physics Object
  constructor(m) {
    this.position = createVector(0, 0, 0);
    this.velocity = createVector(0, 0, 0);
    this.mass = m;
  }

  applyForce(f, t) {
    this.velocity.add(f.copy().mult(t / this.mass));
  }

  update(t) {
    this.position.add(this.velocity.copy().mult(t))
  }

  draw() {
    ellipse(this.position.x, this.position.y, 8, 8);
  }
}

window.Body = Body;
