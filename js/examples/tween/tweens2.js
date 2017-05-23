let graphData = [{y:0, msec: -5000}];
let resolution = 80;
let duration = 1000, interval = 500;
let msec = 0, prevNow = 0, prevUpdateMsec = 0;
let tween, tweens;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    tween = new Tween();
    tweens = [
      {func:tween.linear , label: "linear"},
      {func:(t)=>{return tween.powerIn(t,2);} , label: "powerIn(2)"},
      {func:(t)=>{return tween.powerOut(t,2);} , label: "powerOut(2)"},
      {func:(t)=>{return tween.powerInOut(t,2);} , label: "powerInOut(2)"},
      {func:(t)=>{return tween.powerIn(t,3);} , label: "powerIn(3)"},
      {func:(t)=>{return tween.powerOut(t,3);} , label: "powerOut(3)"},
      {func:(t)=>{return tween.powerInOut(t,3);} , label: "powerInOut(3)"},
      {func:tween.sineIn , label: "sineIn"},
      {func:tween.sineOut , label: "sineOut"},
      {func:tween.circularIn , label: "circularIn"},
      {func:tween.circularOut , label: "circularOut"},
      {func:tween.circularInOut , label: "circularInOut"},
      {func:tween.createCubicBezier({x:0.4, y: 0.0}, {x:0.2, y: 1}), label:"bezier([0.2,0.8],[0.6,0.4])"}
    ];
}

function draw() {
  clear();
  background(29, 223, 182);

  while (msec + duration + interval >= prevUpdateMsec) {
    updateGraphData();
  }
  ellapseTime();

  let s = height * 0.8;
  let x = (width + s) / 2, oy = (height + s) / 2;
  let y = oy - s * msecToValue(msec);

  noFill(); stroke(0);

  beginShape();
  for (let i = 0; i < graphData.length; i ++) {
    let vx = x - s * (msec - graphData[i].msec) / duration;
    vertex(vx, oy - graphData[i].y * s);
  }
  endShape();

  fill(255); stroke(0);
  drawCircleMarker(createVector(x, y), 4);

  fill(0); noStroke();
  drawLabel(width / 2, height / 2, msecToLabel(msec));
}

function ellapseTime() {
  msec += min(100, window.performance.now() - prevNow);
  prevNow = window.performance.now();
}

function msecToValue(msec) {
  let t = (msec % (duration + interval)) / duration;
  t = Math.min(1, Math.max(0, t));
  let i = Math.floor(msec / (duration + interval));
  let reverse =  i % 2 == 0;
  let idx = Math.floor(i / 2) % tweens.length;
  return reverse ? tweens[idx].func(t) : (1 - tweens[idx].func(t));
}

function msecToLabel(msec) {
  let idx = Math.floor(Math.floor(msec / (duration + interval)) / 2) % tweens.length;
   return tweens[idx].label;
}

function updateGraphData() {
  for (let i = 0; i <= resolution; i ++) {
    let dataMsec = prevUpdateMsec + i / resolution * duration;
    let y = msecToValue(dataMsec);
    graphData.push({msec: dataMsec, y: y});
  }
  if (graphData.length > resolution * 4) {
    graphData = graphData.slice(resolution);
  }

  prevUpdateMsec += (duration + interval);
}

/** Tween **/

/** drawCircleMarker **/

/** drawLabel **/
