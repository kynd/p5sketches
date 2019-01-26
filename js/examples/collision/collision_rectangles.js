let A, B;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  A = {x: 0, y: 0, w: 160, h: 90};
  B = {x: 0, y: 0, w: 90, h: 160};
}

function draw() {
  clear();
  background(249, 246, 236);
  let t = radians(frameCount) / 2;
  A.x = cos(t) * 120 - A.w / 2;
  A.y = sin(t * 2) * 120 - A.h / 2;
  B.x = -cos(t * 3) * 120 - B.w / 2;
  B.y = -sin(t * 4) * 120 - B.h / 2;

  // test

  let xResult = A.x <= B.x + B.w && A.x + A.w >= B.x;
  let yResult = A.y <= B.y + B.h && A.h + A.y >= B.y;
  let result = xResult && yResult;

  // rendering

  push();
  translate(width / 2, height / 2);

  noStroke();
  if (result) {
    fill(225, 81, 106);
  } else {
    fill(255);
  }
  rect(A.x, A.y, A.w, A.h);
  rect(B.x, B.y, B.w, B.h);

  noFill(); stroke(0); strokeWeight(1);
  rect(A.x, A.y, A.w, A.h);
  rect(B.x, B.y, B.w, B.h);

  fill(0); strokeWeight(1);
  let l0 = -width / 2, l1 = l0 + 16;
  let b0 = height / 2, b1 = b0 - 16;

  line(-width / 2, b1, width / 2, b1);
  line(l1, -height / 2, l1, height / 2);

  stroke(0, 0, 0, 32);
  line(A.x, A.y, A.x, b0);
  line(A.x + A.w, A.y, A.x + A.w, b0);
  line(A.x, A.y, l0, A.y);
  line(A.x, A.y + A.h, l0, A.y + A.h);

  line(B.x, B.y, l0, B.y);
  line(B.x, B.y + B.h, l0, B.y + B.h);
  line(B.x, B.y, B.x, b0);
  line(B.x + B.w, B.y, B.x + B.w, b0);

  stroke(0);
  strokeWeight(3);
  if (xResult) {
    let sorted = [A.x, B.x + B.w, A.x + A.w, B.x].sort((a,b)=>{return a > b ? 1: -1});
    line(sorted[1], b1, sorted[2], b1);
  }

  if (yResult) {
    let sorted = [A.y, B.y + B.h, A.y + A.h, B.y].sort((a,b)=>{return a > b ? 1: -1});
    line(l1, sorted[1], l1, sorted[2]);
  }

  pop();
}
