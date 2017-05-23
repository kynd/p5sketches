function setup() {
    canvas = createCanvas(windowWidth, windowHeight);

    deg = 240;
}

function draw() {
  clear();
  let m = 60; // magnifier
  let v1 = createVector(1, -1).normalize();
  let rad = radians(deg);
  let v2 = createVector(cos(rad), sin(rad)).mult(3);
  let dotProduct = v2.dot(v1.copy().normalize());
  let p = v1.copy().normalize().mult(dotProduct);

  background(15, 157, 88);

  push();
  translate(width / 2, height / 2);

  fill(255); stroke(0); strokeWeight(1);
  let hh = height / 2;
  //line(-hh, -hh, hh, hh);
  line(-hh, hh, hh, -hh);
  line(v2.x * m, v2.y * m, p.x * m, p.y * m);

  fill(0); stroke(0); strokeWeight(3);
  drawArrow(0, 0, v1.x * m, v1.y * m);
  drawArrow(0, 0, v2.x * m, v2.y * m);

  strokeWeight(1);
  line(0, 0, 72, 72);
  line(p.x * m, p.y * m, p.x * m + 72, p.y * m + 72);
  drawLineWithLabel(64, 64, p.x * m + 64, p.y * m + 64, " dot product = " + dotProduct.toPrecision(3), LEFT);

  fill(255); stroke(0); strokeWeight(1);
  drawCircleMarker(p.copy().mult(m), 4);
  drawCircleMarker(v2.copy().mult(m), 4);
  drawCircleMarker(createVector(0, 0), 4);

  fill(0); noStroke()
  drawLabel(v1.x * m + 4, v1.y * m, "v1(magnitude = 1)", LEFT);
  drawLabel(v2.x * m + 4, v2.y * m, "v2(magnitude = 3)", LEFT);
  deg ++;
}

/** drawLineWithLabel **/

/** drawLabel **/

/** drawArrow **/

/** drawCircleMarker **/
