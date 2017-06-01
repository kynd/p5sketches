let msec = 0, prevInitMsec = 0, prevNow = 0;
let plotMode = -1, plotLabels = ["position(y)", "velocity(y)", "acceralation(y)"], plotStartMsec = 0, plotData = [];
let gravity = 9.8 * 2; // 2px ~= 1m
let apple;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    apple = new Body(1);
}

function draw() {
  clear();
  background(247, 227, 218);

  ellapseTime();

  let minWH = min(width, height);
  push();
  translate(min((width - minWH) / 2 + 32, width / 4) , 32);
  fill(250, 170, 165); stroke(0);
  ellipse(0, apple.position.y, 24, 24);
  line(0, apple.position.y - 8, 0, apple.position.y - 16);
  pop();

  let graphW = minWH - 64;
  plotGraph(plotData, (width - graphW) / 2 + 32, 32, graphW, height - 64, 0, 8000, -(height - 64), 0, "time", plotLabels[plotMode]);
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

  if (msec > prevInitMsec + 8000) {
    apple = new Body(1);
    plotData = [];
    prevInitMsec += 8000;
  }

  if (plotData.length == 0) {
    plotStartMsec = msec;
    plotMode = (plotMode + 1) % 3;
  }

  let protMsec = msec - plotStartMsec;
  switch(plotMode) {
    case 0: plotData.push({x:protMsec, y: -apple.position.y}); break;
    case 1: plotData.push({x:protMsec, y: -apple.velocity.y}); break;
    case 2: plotData.push({x:protMsec, y: -getForce(apple).y}); break;
  }
}

function updateSimulation(t) {
  apple.applyForce(getForce(apple), t);
  apple.update(t);
}

function getForce(o) {
  return createVector(0, gravity).mult(o.mass)
}

/** plotGraph **/

/** Body **/

/** drawCircleMarker **/

/** drawLabel **/
