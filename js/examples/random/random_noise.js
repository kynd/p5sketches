let record, max, x = 0;
let resolution = 150;

function setup() {
  initRecord();
  for (let i = 0; i < resolution * 10; i ++) {
    nextRandom();
  }
  canvas = createCanvas(windowWidth, windowHeight);
}

function draw() {
  clear();
  background(254, 253, 183);

  let v;
  for (let i = 0; i < resolution; i ++) {
    v = nextRandom();
    line(v * width, 0, v * width, height);
  }

  fill(0);stroke(0);
  for (let i = 0; i < resolution; i ++) {
    let w = width / resolution;
    let h = height / max * record[i];
    let x = w * i;
    let y = height - h;
    rect(x, y, w, h);
  }

  if (frameCount % 600 == 0) {
    initRecord();
  }
}

function initRecord() {
  max = 1;
  if (!record) {
    record = [];
  } else {
    record.length = 0;
  }

  for (let i = 0; i < resolution; i ++) {
    record.push(0);
  }
}

function nextRandom() {
  let v = noise(x); x += 0.001;
  if (++record[floor(v * resolution)] > max) {max ++};
  return v;
}
