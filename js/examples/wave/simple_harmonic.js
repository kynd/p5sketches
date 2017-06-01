let msec = 0, prevInitMsec = 0, prevNow = 0;
let plotData = [];
let tention = 1, friction = 0.0;
let ball;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    ball = new Body(1);
    ball.position.y = 100;
}

function draw() {
  clear();
  background(224, 239, 243);

  ellapseTime();

  push();
  translate(32, height / 2);
  fill(250, 170, 165); stroke(0);
  ellipse(0, ball.position.y, 24, 24);

  noFill(); stroke(0);

  let springEndY = -height / 2;
  let len = height / 2 + ball.position.y - 12;
  beginShape();
  for (let i = 0; i <= 72; i ++) {
    let angle = i / 2 * PI;
    let x = sin(angle) * 6;
    let y = springEndY + len / 72 * i;
    vertex(x, y);
  }
  endShape();
  pop();

  let graphW = width - 64;
  let graphX = 64;
  plotGraph(plotData, graphX, height / 2, graphW, height - 64, 0, 20 * graphW, -height / 2 + 32, height / 2 - 32, "time", "y");
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

  if (msec > prevInitMsec + 20 * (width - 64)) {
    ball = new Body(1);
    ball.position.y = 100;
    plotData = [];
    prevInitMsec += 20 * (width - 64);
  }

  if (plotData.length == 0) {
    plotStartMsec = msec;
  }

  let plotMsec = (msec - plotStartMsec);
  plotData.push({x:plotMsec, y: -ball.position.y});
}

function updateSimulation(t) {
  ball.applyForce(getForce(ball), t);
  ball.update(t);
}

function getForce(o) {
  let springForce = o.position.copy().mult(-tention);
  let frictionForce = o.velocity.copy().mult(-friction);
  return springForce.add(frictionForce);
}

/** plotGraph **/

/** Body **/

/** drawCircleMarker **/

/** drawLabel **/
