let msec = 0, prevInitMsec = 0, prevNow = 0;
let plotMode = -1, plotLabels = ["position(y)", "velocity(y)", "acceralation(y)"], plotStartMsec = 0, plotData = [];
let paramMode = -1, tention = 1, friction = 0.0;
let ball;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    ball = new Body(1);
    ball.position.y = 100;
}

function draw() {
  clear();
  background(180, 235, 190);

  ellapseTime();

  let minWH = min(width, height);
  push();
  translate(min((width - minWH) / 2 + 32, width / 4) , height / 2);
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

  let graphW = minWH - 64;
  let graphX = (width - graphW) / 2 + 32;

  plotGraph(plotData, graphX, height / 2, graphW, height - 64, 0, 10000, -height / 2 + 32, height / 2 - 32, "time", plotLabels[plotMode]);

  drawLabel(graphX + graphW, 40, "tention: " + tention, RIGHT);
  drawLabel(graphX + graphW, 56, "friction: " + friction, RIGHT);
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

  if (msec > prevInitMsec + 10000) {
    ball = new Body(1);
    ball.position.y = 100;
    plotData = [];
    prevInitMsec += 10000;
  }

  if (plotData.length == 0) {
    plotStartMsec = msec;
    plotMode = (plotMode + 1) % 3;

    if (plotMode == 0) {
      paramMode = (paramMode + 1) % 3;
      switch(paramMode) {
        case 0: tention = 1; friction = 0; break;
        case 1: tention = 4; friction = 0.5; break;
        case 2: tention = 2; friction = 1.5; break;
      }
    }
  }

  let plotMsec = (msec - plotStartMsec);
  switch(plotMode) {
    case 0: plotData.push({x:plotMsec, y: -ball.position.y}); break;
    case 1: plotData.push({x:plotMsec, y: -ball.velocity.y}); break;
    case 2: plotData.push({x:plotMsec, y: -getForce(ball).y}); break;
  }
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
