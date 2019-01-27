

let msec = 0, prevNow = 0;
const duration0 = 900, duration1 = 1200, duration2 = 3000;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    plotData = [];
    tween = new Tween();
    console.log(tween.sinInOut)
    tweens = [
      (t)=>{return recprocate(t, tween.sineInOut)},
      (t)=>{return recprocate(t, tween.sineInOut)},
      (t)=>{return recprocate(t, tween.sineInOut)}
    ]
}

function draw() {
    clear();
    background(240, 240, 30);

    const t0 = (msec % duration0) / duration0;
    const t1 = (msec % duration1) / duration1;
    const t2 = (msec % duration2) / duration2;

    const hw = width / 2;
    const hh = height / 2;
    const p0 = createVector(-160, -160);
    const p1 = createVector(160, -160);
    const p2 = createVector(-160, 160);
    const p3 = createVector(160, 160);
    let p0_1 = p0.copy().lerp(p1, tweens[0](t0));
    let p2_3 = p2.copy().lerp(p3, tweens[1](t1));
    let p = p0_1.copy().lerp(p2_3, tweens[2](t2));
    plotData.push(p);
    if (plotData.length > 40) {
        plotData.shift();
    }

    push();
    translate(hw, hh);
    noFill(); stroke(0);
    line(p0.x, p0.y, p1.x, p1.y);
    line(p2.x, p2.y, p3.x, p3.y);
    line(p0_1.x, p0_1.y, p2_3.x, p2_3.y);

    for (let i = 1; i < plotData.length; i ++) {
        line(plotData[i - 1].x, plotData[i - 1].y, plotData[i].x, plotData[i].y);
    }

    fill(0); noStroke();
    drawCircleMarker(p0, 4);
    drawCircleMarker(p1, 4);
    drawCircleMarker(p2, 4);
    drawCircleMarker(p3, 4);
    fill(255); stroke(0);
    drawCircleMarker(p0_1, 4);
    drawCircleMarker(p2_3, 4);
    drawCircleMarker(p, 4);

    pop();
    ellapseTime();
}


function recprocate(t, f) {
    if (t < 0.5) {
        return f(t * 2);
    } else {
        return 1 - f((t - 0.5) * 2);
    }
}

function ellapseTime() {
    msec += min(100, window.performance.now() - prevNow);
    prevNow = window.performance.now();
}

/** drawCircleMarker **/

/** Tween **/
