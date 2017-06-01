let u = [];

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    initValues();
}

function draw() {
  clear();
  background(224, 239, 243);

  let f = frameCount;
  let iN = (f + 1) % 3; // Next (t + 1)
  let iC = f % 3; // Current (t)
  let iP = (f + 2) % 3; // Previous (t - 1)
  let span = width / (u[0].length - 1);

  u[iC][0] += signedNoise(frameCount * 0.1) * 0.5;

  updateSimulation(iN, iC, iP)

  noFill(); stroke(1); strokeWeight(3);
  beginShape();
  for (let i = 0; i < u[0].length; i ++) {
    vertex(span * i, height / 2 + u[iN][i]);
  }
  endShape();
}

function updateSimulation(iN, iC, iP) {
  for (let i = 0; i < u[0].length; i ++) {
    let dhdx = 0;
    if (i != 0 && i != u[0].length - 1) {
      dhdx = u[iC][i - 1] + u[iC][i + 1] - 2 * u[iC][i]
    }
    let c2 = 0.1;
    let dampen = 0.995;
    u[iN][i] = 2 * u[iC][i] + c2 * dhdx - u[iP][i];
    u[iN][i] *= dampen;
  }
}

function initValues() {
  u = [];
  for (let i = 0; i < 3; i ++) {
    u.push(new Array(floor(width / 8) + 1).fill(0));
  }
}

/** signedNoise **/
