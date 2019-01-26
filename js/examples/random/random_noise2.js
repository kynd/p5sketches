let record = [], x = 0;
let resolution = 150;

function setup() {
  for (let i = 0; i < resolution * 10; i ++) {
    nextRandom();
  }
  canvas = createCanvas(windowWidth, windowHeight);
}

function draw() {
  clear();
  background(254, 253, 183);

  nextRandom();

  fill(0);stroke(0);
  for (let i = 0; i < record.length; i ++) {
    let w = width / resolution;
    let h = height * record[i];
    let x = w * i;
    let y = height - h;
    rect(x, y, w, h);
  }
}

function nextRandom() {
  let v = noise(x); x += 0.01;
  record.push(v);
  if (record.length > resolution) {
    record.shift();
  }
}
