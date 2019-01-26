function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
}

function draw() {
  clear();
  let cx = width / 4 * 3, cy = height / 2;
  let cameraZ = -width / 8 * 5;
  let planeZ =  cameraZ / 2;
  let radius = width / 8;
  let r0 = radians(frameCount + 45);
  let r1 = radians(frameCount + 135);
  let r2 = radians(frameCount + 225);
  let r3 = radians(frameCount + 315);
  let p0 = createVector(0, cos(r0), sin(r0)).mult(radius);
  let p1 = createVector(0, cos(r1), sin(r1)).mult(radius);
  let p2 = createVector(0, cos(r2), sin(r2)).mult(radius);
  let p3 = createVector(0, cos(r3), sin(r3)).mult(radius);

  let pp0 = project(p0, planeZ, cameraZ)
  let pp1 = project(p1, planeZ, cameraZ)
  let pp2 = project(p2, planeZ, cameraZ)
  let pp3 = project(p3, planeZ, cameraZ)

  background(135, 108, 209);

  push();

  fill(0); stroke(0); strokeWeight(1);
  translate(cx, cy);
  line(p0.z, p0.y, cameraZ, 0);
  line(p1.z, p1.y, cameraZ, 0);
  line(p2.z, p2.y, cameraZ, 0);
  line(p3.z, p3.y, cameraZ, 0);
  line(-width / 4 * 3, 0, width / 4, 0);
  line(0, -height / 2, 0, height / 2);
  line(cameraZ, 0, cameraZ, -height / 3);
  line(cameraZ, -height / 4 + 16, planeZ, -height / 4 + 16);
  line(p1.z, p1.y, p1.z, -height / 3);
  line(cameraZ, -height / 3 + 16, p1.z, -height / 3 + 16);

  strokeWeight(2);
  line(p0.z, p0.y, p1.z, p1.y);
  line(p1.z, p1.y, p2.z, p2.y);
  line(p2.z, p2.y, p3.z, p3.y);
  line(p3.z, p3.y, p0.z, p0.y);
  line(planeZ, -height / 4, planeZ, height / 4);

  fill(255); stroke(0); strokeWeight(1);
  drawCircleMarker(createVector(p1.z, p1.y), 4);
  drawCircleMarker(createVector(planeZ, pp1.y), 4);
  drawSquareMarker(createVector(cameraZ, 0), 8);

  fill(0); stroke(0); strokeWeight(1);
  drawCircleMarker(createVector(p0.z, p0.y), 2);
  drawCircleMarker(createVector(p2.z, p2.y), 2);
  drawCircleMarker(createVector(p3.z, p3.y), 2);

  drawCircleMarker(createVector(planeZ, pp0.y), 2);
  drawCircleMarker(createVector(planeZ, pp2.y), 2);
  drawCircleMarker(createVector(planeZ, pp3.y), 2);


  noStroke(); fill(0);
  drawLabel(cameraZ, 24, "camera");
  drawLabel(planeZ, height / 4, "image plane", LEFT);
  drawLabel(-width / 4 * 3, -12, "z(+)", LEFT);
  drawLabel(width / 4, -12, "z(-)", RIGHT);
  drawLabel(4, -height / 2 + 16, "y(-)", LEFT);
  drawLabel(4, height / 2 - 8, "y(+)", LEFT);
  drawLabel(4, 16, "[0, 0]", LEFT);
  drawLabel((cameraZ + planeZ) / 2, -height / 4 + 8, "d1");
  drawLabel((cameraZ + p1.z) / 2, -height / 3 + 8, "d2");
  pop();
}

function project(v, nearClip, cameraZ) {
  let r = abs(cameraZ - nearClip) / abs(cameraZ - v.z);
  return createVector(v.x * r, v.y * r);
  // Look up for Projection Matrix for more proper 3D projection
  // e.g. http://www.songho.ca/opengl/gl_projectionmatrix.html
}

/** drawCircleMarker **/

/** drawSquareMarker **/

/** drawLabel **/
