let msec = 0, prevNow = 0;
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
  ellapseTime();

  let duration = 1000, interval = 500;
  let t = (msec % (duration + interval) - interval / 2) / duration;
  let i = Math.floor(msec / (duration + interval)) % tweens.length;
  t = Math.min(1, Math.max(0, t));

  push();
  translate(width / 2, height / 2);
  plot(0, 0, tweens[i].func, tweens[i].label, t);
  pop();
}

function ellapseTime() {
  msec += min(100, window.performance.now() - prevNow);
  prevNow = window.performance.now();
}

function plot(cx, cy, func, label, t) {
  let w = height * 0.8, h = height * 0.8;
  let ox = -w / 2, oy = h / 2;
  let resolution = w / 2;
  noFill(); stroke(0);

  beginShape();
  for (let i = 0; i <= resolution; i ++) {
    let x = i / resolution;
    vertex(ox + w * x, oy - h * func(x));
  }
  endShape();

  let x = ox + w * t, y = oy - h * func(t);
  rect(ox, oy - h, w, h);
  line(ox, y, ox + w, y);
  line(x, oy, x, oy - h);
  fill(255); stroke(0);

  drawCircleMarker(createVector(x, y), 4);
  fill(0); noStroke(0);
  drawLabel(ox, oy + 20, label, LEFT);
  drawLabel(ox + w, oy + 20, "t", RIGHT);
  drawLabel(ox , oy - h + 16, "f(t)", RIGHT);
}

/** Tween **/

/** drawCircleMarker **/

/** drawLabel **/
