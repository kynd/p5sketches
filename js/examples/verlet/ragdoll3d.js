let project;
let points = [], sticks = [];
let headTarget;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  project = getProjectionFunc(height / 3 * 2, height, 2);
  let u = height / 16;
  points.push(new VerletPoint( createVector(0, u * 2 - u * 8)) ); // 0
  points.push(new VerletPoint( createVector(-u * 2, u * 3 - u * 8)) ); // 1
  points.push(new VerletPoint( createVector(u * 2, u * 3 - u * 8)) ); // 2
  points.push(new VerletPoint( createVector(-u * 1.5, u * 8 - u * 8)) ); // 3
  points.push(new VerletPoint( createVector(u * 1.5, u * 8 - u * 8)) ); // 4
  points.push(new VerletPoint( createVector(-u * 5, u * 3 - u * 8)) ); // 5
  points.push(new VerletPoint( createVector(-u * 8, u * 3 - u * 8)) ); // 6
  points.push(new VerletPoint( createVector(u * 5, u * 3 - u * 8)) ); // 7
  points.push(new VerletPoint( createVector(u * 8, u * 3 - u * 8)) ); // 8
  points.push(new VerletPoint( createVector(-u * 1.5, u * 12 - u * 8)) ); // 9
  points.push(new VerletPoint( createVector(-u * 1.5, u * 16 - u * 8)) ); // 10
  points.push(new VerletPoint( createVector(u * 1.5, u * 12 - u * 8)) ); // 11
  points.push(new VerletPoint( createVector(u * 1.5, u * 16 - u * 8)) ); // 12

  sticks.push(new VerletStick(points[0], points[1]));
  sticks.push(new VerletStick(points[0], points[2]));
  sticks.push(new VerletStick(points[1], points[2]));
  sticks.push(new VerletStick(points[1], points[3]));
  sticks.push(new VerletStick(points[2], points[4]));
  sticks.push(new VerletStick(points[3], points[4]));
  sticks.push(new VerletStick(points[1], points[4]));
  sticks.push(new VerletStick(points[2], points[3]));

  sticks.push(new VerletStick(points[1], points[5]));
  sticks.push(new VerletStick(points[5], points[6]));
  sticks.push(new VerletStick(points[2], points[7]));
  sticks.push(new VerletStick(points[7], points[8]));

  sticks.push(new VerletStick(points[3], points[9]));
  sticks.push(new VerletStick(points[9], points[10]));
  sticks.push(new VerletStick(points[4], points[11]));
  sticks.push(new VerletStick(points[11], points[12]));

}

function draw() {
  clear();
  background(254, 131, 49);
  points.forEach((p, i)=>{
    p.update();
    p.position.y += 0.1;
    p.position.y = min(p.position.y, height / 2);
  });

  for (let i = 0; i < 2; i ++) {
    sticks.forEach((s)=>{
      s.update();
    });
  }

  let f = (frameCount - 1) % 60;
  if (f == 0) {
    let u = height / 16;
    headTarget = createVector(random(-u * 4, u * 4), random(u * 2) - u * 8, random(-u , u));
  }

  if (f < 30) {
    points[0].position.add(headTarget.sub(points[0].position).normalize().mult(4));
  }

  push();
  translate(width / 2, height / 2);
  fill(255); stroke(0); strokeWeight(3);

  strokeWeight(1);
  points.forEach((p)=>{
    p.screenPos = project(p.position);
  });

  sticks.forEach((s)=>{
    let p0 = s.pa.screenPos;
    let p1 = s.pb.screenPos;
    line(p0.x, p0.y, p1.x, p1. y);
  });
  //points.forEach((p)=>{drawCircleMarker(p.screenPos, 4);});
  pop();
}

/** drawCircleMarker **/

/** getProjectionFunc **/

/** VerletPoint **/

/** VerletStick **/
