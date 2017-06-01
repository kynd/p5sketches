let prevInitFrame = 1;
let radius = 100;
let plotData = [];

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
}

function draw() {
  clear();
  background(224, 239, 243);

  let rad = radians(frameCount - 1) * 2;
  let sine = sin(rad);
  let cosine = cos(rad);
  let x = cosine * radius;
  let y = -sine * radius;

  push();
  translate(radius + 20, height / 2);
  fill(255); strokeWeight(1);
  ellipse(0, 0, radius * 2, radius * 2);
  line(-radius, 0, radius, 0);
  line(radius + 20, y, -radius - 20, y);
  strokeWeight(3);
  line(0,0,x, y);
  line(x, 0, x, y);
  line(0,0,x, 0);
  strokeWeight(1);
  drawCircleMarker(createVector(x, y), 4);
  pop();

  let graphW = width - (radius + 20) * 2;
  let graphX = (radius + 20) * 2;

  if (frameCount > prevInitFrame + graphW) {
    plotData = [];
    prevInitFrame += graphW;
  }
  plotData.push({x:frameCount - prevInitFrame, y: -y});

  plotGraph(plotData, graphX, height / 2, graphW, height - 64, 0, graphW, -height / 2 + 32, height / 2 - 32, "time", "y");
}

/** plotGraph **/

/** drawLabel **/

/** drawCircleMarker **/
