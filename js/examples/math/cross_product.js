let project = getProjectionFunc(2, 3);

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
}

function draw() {
  clear();
  let t = frameCount * 0.005;

  let m = 320; // Magnifier
  let x1 = signedNoise(t + 123);
  let y1 = signedNoise(t + 234);
  let z1 = signedNoise(t + 456);
  let x2 = signedNoise(t + 789);
  let y2 = signedNoise(t + 890);
  let z2 = signedNoise(t + 901);

  let v1 = createVector(x1, y1, z1).normalize();
  let v2 = createVector(x2, y2, z2).normalize();
  let v3 = v1.cross(v2);
  let v4 = v1.cross(v3);

  let p1 = project(v1).mult(m);
  let p2 = project(v2).mult(m);
  let p3 = project(v3).mult(m);

  let sp0 = project(v1.copy().sub(v4)).mult(m * 1.2);
  let sp1 = project(v1.copy().add(v4)).mult(m * 1.2);
  let sp2 = project(v1.copy().mult(-1).sub(v4)).mult(m * 1.2);
  let sp3 = project(v1.copy().mult(-1).add(v4)).mult(m * 1.2);

  background(245, 177, 217);

  push();
  translate(width / 2, height / 2);

  noFill(); stroke(0); strokeWeight(1);
  line(sp0.x, sp0.y, sp1.x, sp1.y);
  line(sp1.x, sp1.y, sp3.x, sp3.y);
  line(sp0.x, sp0.y, sp2.x, sp2.y);
  line(sp2.x, sp2.y, sp3.x, sp3.y);
  strokeWeight(2);
  drawArrow(0, 0, p1.x, p1.y);
  drawArrow(0, 0, p2.x, p2.y);
  strokeWeight(3);
  drawArrow(0, 0, p3.x, p3.y);


  fill(0); noStroke()
  drawLabel(p1.x, p1.y, "v1 [" + v1.x.toPrecision(2) + ", " + v1.y.toPrecision(2) + ", " + v1.z.toPrecision(2) + "]", LEFT);
  drawLabel(p2.x, p2.y, "v2 [" + v2.x.toPrecision(2) + ", " + v2.y.toPrecision(2) + ", " + v2.z.toPrecision(2) + "]", LEFT);
  drawLabel(p3.x, p3.y, "Cross Product [" + v3.x.toPrecision(2) + ", " + v3.y.toPrecision(2) + ", " + v3.z.toPrecision(2) + "]", LEFT);
  pop();
}

/** signedNoise **/

/** getProjectionFunc **/

/** drawArrow **/

/** drawLabel **/
