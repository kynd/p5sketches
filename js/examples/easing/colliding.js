let msec = 0, prevNow = 0;
let tween, tweens;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    tween = new Tween();
    tweens = [
      (t)=>{return tween.powerInOut(t, 2)},
      (t)=>{return tween.powerOut(t, 2)},
      (t)=>{return tween.powerOut(t, 3)}
    ]
}

function draw() {
  clear();
  background(73, 5, 255);

  let duration = 500, baseSize = 72;
  let t = (msec % (duration)) / duration;
  let i = Math.floor(msec / duration);
  let phase = i % 4;
  let reverse = i % 2;


  fill(255); stroke(0);
  push();
  translate(width / 2, height / 2);
  for (let i = 0; i < 3; i ++) {
    let xr0 = 0, xr1 = 0, y = (i - 1) * baseSize * 1.3;
    let d = width * 0.4;
  switch(phase) {
      case 0:
        xr0 = tweens[i](t);
        break;
      case 1:
        xr0 = tweens[i](1 - t);
        break;
      case 2:
        xr1 = tweens[i](t);
        break;
      case 3:
        xr1 = tweens[i](1 - t);
        break;
    }

    ellipse(d * -xr0 - baseSize / 2, y, baseSize);
    ellipse(d * xr1 + baseSize / 2, y, baseSize);
  }
  pop();

  ellapseTime();
}

function ellapseTime() {
  msec += min(100, window.performance.now() - prevNow);
  prevNow = window.performance.now();
}

/** Tween **/
