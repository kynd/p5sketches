let msec = 0, prevInitMsec = 0, prevNow = 0;
let bodies = [];

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    initBodies();
}

function draw() {
  clear();
  background(247, 227, 218);

  ellapseTime();

  push();
  translate(width / 2, height / 2);
  stroke(0);
  bodies.forEach((b, i)=>{
    noFill();
    let step = 4;
    for (let i = step; i < b.tail.length; i += step) {
      line(b.tail[i].x, b.tail[i].y, b.tail[i - 1].x, b.tail[i - 1].y);
    }
  });
  bodies.forEach((b, i)=>{
    if (i == 0) {
      fill(250, 170, 165);
    } else {
      fill(117, 147, 208);
    }
    let s = pow(b.mass, 1 / 3) * 4;
    ellipse(b.position.x, b.position.y, s, s);
  });
  pop();
}

function ellapseTime() {
  let ellapsedMsec = min(100, window.performance.now() - prevNow);
  msec += ellapsedMsec;
  let secondsRemaining = ellapsedMsec / 1000;
  let maxStepSize = 1 / 60;
  while (secondsRemaining > 0) {
    let stepSize = secondsRemaining > maxStepSize ? maxStepSize : secondsRemaining;
    updateSimulation(stepSize);
    secondsRemaining -= maxStepSize;
  }

  if (msec > prevInitMsec + 20000) {
    initBodies();
    prevInitMsec += 20000;
  }

}

function updateSimulation(t) {
  for (let i = 0; i < bodies.length - 1; i ++) {
    for (let j = i + 1; j < bodies.length; j ++) {
      gravitate(bodies[i], bodies[j], t);
    }
  }
  for (let i = 0; i < bodies.length; i ++) {
    bodies[i].update(t);
    if (bodies[i].prevPosition.dist(bodies[i].position) > 4) {
      bodies[i].tail.push(bodies[i].position.copy());
      bodies[i].prevPosition = bodies[i].position.copy();
    }
  }
}

function gravitate(o0, o1, t) {
  let distance = max(1, o0.position.dist(o1.position) / 10);
  let force = o1.position.copy().sub(o0.position).normalize().mult(o0.mass * o1.mass / distance / distance);
  o0.applyForce(force, t);
  o1.applyForce(force.mult(-1), t);
}

function initBodies() {
  bodies = [];
  for (let i = 0; i < 8; i ++) {
    let body;
    if (i == 0) {
      body = new Body(500);
    } else {
      let angle = random(PI * 2);
      let distance = random(100, 200);
      let speed = random(10, 30);
      body = new Body(random(2,30));
      body.position = createVector(cos(angle), sin(angle)).mult(distance);
      body.velocity = createVector(-sin(angle), cos(angle)).mult(speed);
    }
    body.tail = [];
    body.prevPosition = body.position.copy();
    bodies.push(body);
  }
}

/** Body **/
