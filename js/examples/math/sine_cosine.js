function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    deg = 45;
}

function draw() {
  clear();

  let hyp = 100;
  let rad = radians(deg); // Math.PI * deg / 180;

  let sin = Math.sin(rad);
  let cos = Math.cos(rad);
  let opp = sin * hyp;
  let adj = cos * hyp;
  let tan  = sin / cos;

  background(135, 108, 209);

  push();
  translate(width / 2, height / 2);
  fill(255);
  stroke(0); strokeWeight(1);
  ellipse(0, 0, hyp * 2, hyp * 2);
  line(-hyp, 0, hyp, 0);

  fill(0); stroke(0); strokeWeight(3);
  line(0, 0, adj, 0);
  drawLineWithLabel(0, 0, adj, -opp, "hypotenuse:" + hyp.toPrecision(3), (adj > 0) ? RIGHT : LEFT);
  drawLineWithLabel(adj, 0, adj, -opp, "opposite:" + opp.toPrecision(3), (adj > 0) ? LEFT : RIGHT);
  drawLabel(adj / 2, 16, "adjacent:" + adj.toPrecision(3), LEFT);
  pop();

  drawLabel(16, windowHeight - 120, "angle(degrees):" + deg.toPrecision(3), LEFT);
  drawLabel(16, windowHeight - 96, "angle(radians):" + rad.toPrecision(3), LEFT);
  drawLabel(16, windowHeight - 72, "sine:" + sin.toPrecision(3), LEFT);
  drawLabel(16, windowHeight - 48, "cosine:" + cos.toPrecision(3), LEFT);
  drawLabel(16, windowHeight - 24, "tangent:" + tan.toPrecision(3), LEFT);

  deg ++;
}

/** drawLineWithLabel **/

/** drawLabel **/
