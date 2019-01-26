
let points = [], sticks = [];
let accelIndex, accel;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 10; i ++) {
    points.push(new VerletPoint( createVector(random(width), random(height))) );
    points[i].position.add(random2D().mult(random(2) + 1));
  }
}

function draw() {
  clear();
  background(100, 150, 180);
  points.forEach((p)=>{
    p.update();
    if (p.position.x < 0) { p.position.x += 2; }
    if (p.position.x > width) { p.position.x -= 2; }
    if (p.position.y < 0) { p.position.y += 2; }
    if (p.position.y > height) { p.position.y -= 2; }
    if (p.getVelocity().mag() > 3) {
      p.setVelocity(p.getVelocity().normalize().mult(3)); // limit the speed
    }
  });

  sticks.forEach((s)=>{
    s.update();
  });

  let f = (frameCount - 1) % 60;
  if (f == 0) {
    accelIndex = floor(random(points.length));
    accel = random2D().mult((random(0.5) + 0.5));
    let idx0, idx1;
    do {
      idx0 = floor(random(points.length));
      idx1 = floor(random(points.length));
    } while (idx0 == idx1);

    sticks.push(new VerletStick(points[idx0], points[idx1]));
    if (sticks.length > 5) {
      sticks.shift();
    }
  }

  fill(255); stroke(0); strokeWeight(3);
  if (f < 30) {
    points[accelIndex].position.add(accel);
    let p0 = points[accelIndex].position;
    let p1 = points[accelIndex].position.copy().add(accel.copy().mult(100));
    drawArrow(p0.x, p0.y, p1.x, p1.y);
  }

  strokeWeight(1);
  sticks.forEach((s)=>{s.draw();});
  points.forEach((p)=>{p.draw();});
}

function random2D() {
  return createVector(random(-1, 1), random(-1, 1)).normalize();
}

/** random2D **/

/** drawArrow **/

/** VerletPoint **/

/** VerletStick **/
