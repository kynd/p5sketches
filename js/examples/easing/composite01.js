

let msec = 0, prevNow = 0;
const duration = 1000;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    plotData = [];
    tween = new Tween();
    tweens = [
      (t)=>{return tween.powerInOut(t, 2)},
      (t)=>{return tween.powerInOut(t, 4)},
      (t)=>{return tween.linear(t)}
    ]
}

function draw() {
    clear();
    background(240, 240, 30);

    const t = msec / duration;

    const hw = width / 2;
    const hh = height / 2;
    const p0 = createVector(-160, -160);
    const p1 = createVector(80, -80);
    const p2 = createVector(160, 160);
    let p0_1 = p0.copy().lerp(p1, tweens[0](t));
    let p1_2 = p1.copy().lerp(p2, tweens[1](t));
    let p = p0_1.copy().lerp(p1_2, tweens[2](t));
    plotData.push(p);

    push();
    translate(hw, hh);
    noFill(); stroke(0);
    line(p0.x, p0.y, p1.x, p1.y);
    line(p1.x, p1.y, p2.x, p2.y);
    line(p0_1.x, p0_1.y, p1_2.x, p1_2.y);

    for (let i = 1; i < plotData.length; i ++) {
        line(plotData[i - 1].x, plotData[i - 1].y, plotData[i].x, plotData[i].y);
    }

    fill(0); noStroke();
    drawCircleMarker(p0, 4);
    drawCircleMarker(p1, 4);
    drawCircleMarker(p2, 4);
    fill(255); stroke(0);
    drawCircleMarker(p0_1, 4);
    drawCircleMarker(p1_2, 4);
    drawCircleMarker(p, 4);


    pop();
    ellapseTime();
}

function ellapseTime() {
    if (msec > duration) {
        msec = 0;
        plotData = [];
    } else {
        msec += min(100, window.performance.now() - prevNow);
    }
    prevNow = window.performance.now();
}

/** drawCircleMarker **/

/** Tween **/
