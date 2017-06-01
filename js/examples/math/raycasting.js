function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    deg = 45;
}

function draw() {
  clear();

  let hypotenuse = 100;
  let rad = radians(deg); // PI * deg / 180;

  let sine = sin(rad);
  let cosine = cos(rad);
  let opposite = sine * hypotenuse;
  let adjacent = cosine * hypotenuse;
  let tangent  = sine / cosine;

  background(135, 108, 209);

  push();
  translate(width / 2, height / 2);
  fill(255);
  stroke(0); strokeWeight(1);
  ellipse(0, 0, hypotenuse * 2, hypotenuse * 2);
  line(-hypotenuse, 0, hypotenuse, 0);

  fill(0); stroke(0); strokeWeight(3);
  line(0, 0, adjacent, 0);
  drawLineWithLabel(0, 0, adjacent, -opposite, "hypotenuse:" + hypotenuse.toPrecision(3), (adjacent > 0) ? RIGHT : LEFT);
  drawLineWithLabel(adjacent, 0, adjacent, -opposite, "opposite:" + opposite.toPrecision(3), (adjacent > 0) ? LEFT : RIGHT);
  drawLabel(adjacent / 2, 16, "adjacent:" + adjacent.toPrecision(3), LEFT);
  pop();

  drawLabel(16, windowHeight - 120, "angle(degrees):" + deg.toPrecision(3), LEFT);
  drawLabel(16, windowHeight - 96, "angle(radians):" + rad.toPrecision(3), LEFT);
  drawLabel(16, windowHeight - 72, "sine:" + sine.toPrecision(3), LEFT);
  drawLabel(16, windowHeight - 48, "cosine:" + cosine.toPrecision(3), LEFT);
  drawLabel(16, windowHeight - 24, "tangent:" + tangent.toPrecision(3), LEFT);

  deg ++;
}

/** drawLineWithLabel **/

/** drawLabel **/
