
let points = [], sticks = [];
let accelIndex, accel;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 10; i ++) {
    points.push(new VerletPoint( createVector(i * 16, i * 16)) );
    if (i != 0) {
      sticks.push(new VerletStick(points[i - 1], points[i]));
    }
  }
  let p0 = points[points.length - 1];
  let p1 = new VerletPoint( p0.position.copy().add(createVector(32, 0)) );
  let p2 = new VerletPoint( p0.position.copy().add(createVector(32, 32)) );
  let p3 = new VerletPoint( p0.position.copy().add(createVector(0, 32)) );
  sticks.push(new VerletStick(p0, p1));
  sticks.push(new VerletStick(p1, p2));
  sticks.push(new VerletStick(p2, p3));
  sticks.push(new VerletStick(p3, p0));
  sticks.push(new VerletStick(p0, p2));
  sticks.push(new VerletStick(p1, p3));
  points.push(p1);
  points.push(p2);
  points.push(p3);
}

function draw() {
  clear();
  background(254, 131, 49);
  points.forEach((p, i)=>{
    p.update();
    if (i != 0) {
      p.position.y += 1;
    }
  });

  for (let i = 0; i < 3; i ++) {
    sticks.forEach((s)=>{
      s.update();
    });
    points[0].position.x = points[0].position.y = 0;
  }

  let f = (frameCount - 1) % 120;
  if (f == 0) {
    accelIndex = points.length - 2;
    accel = createVector((random() < 0.5) ? -random(1,3) : random(1,3), -random(0,3));
  }

  push();
  translate(width / 2, 0);
  fill(255); stroke(0); strokeWeight(3);
  if (f > 90) {
    points[accelIndex].position.add(accel);
    let p0 = points[accelIndex].position;
    let p1 = points[accelIndex].position.copy().add(accel.copy().mult(40));
    drawArrow(p0.x, p0.y, p1.x, p1.y);
  }
  strokeWeight(1);
  sticks.forEach((s)=>{s.draw();});
  //points.forEach((p)=>{p.draw();});
  pop();
}

/** random2D **/

/** drawArrow **/

/** VerletPoint **/

/** VerletStick **/
