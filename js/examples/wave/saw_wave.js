let prevInitFrame = 1;
let n = 1;
let baseRadius = 100;
let plotData = [];

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
}

function draw() {
  clear();
  background(224, 239, 243);

  let x = 0, y = 0;

  push();
  translate(baseRadius + 20, height / 2);
  fill(255); stroke(0); strokeWeight(1);
  ellipse(x, y, baseRadius * 2, baseRadius * 2);

  let m = 2 / PI;
  for (let i = 1; i <= n; i ++) {
    let rad = radians(frameCount - 1) * 2 * i;
    let radius = baseRadius / i * (i % 2 == 0 ? -1 : 1) * m;
    let sine = sin(rad);
    let cosine = cos(rad);
    let nx = x + cosine * radius;
    let ny = y - sine * radius;
    if (i == 0) {
      ellipse(x, y, radius * 2, radius * 2);
    }

    line(x, y, nx, ny);
    drawCircleMarker(createVector(nx, ny), 2);
    x = nx;
    y = ny;
  }

  drawCircleMarker(createVector(0, 0), 2);
  line(baseRadius + 20, y, -baseRadius - 20, y);
  drawCircleMarker(createVector(x, y), 4);
  pop();


  let graphW = width - (baseRadius + 20) * 2;
  let graphX = (baseRadius + 20) * 2;

  if (frameCount > prevInitFrame + graphW) {
    plotData = [];
    prevInitFrame += graphW;
  }
  plotData.push({x:frameCount - prevInitFrame, y: -y});

  if (frameCount % 90 == 0) {
    n ++;
    if (n > 40) {
      n = 1;
    }
  }

  plotGraph(plotData, graphX, height / 2, graphW, height - 64, 0, graphW, -height / 2 + 32, height / 2 - 32, "time", "y");
  drawLabel(8, height - 32, "n = " + n, LEFT);

}

/** plotGraph **/

/** drawLabel **/

/** drawCircleMarker **/
