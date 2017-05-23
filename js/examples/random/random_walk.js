let walkers = [];

class RandomWalker {
  constructor(x, y, randomFunc, renderFunc, label) {
    this.x = x;
    this.y = y;
    this.label = label;
    this.random = randomFunc;
    this.render = renderFunc;
    this.log = [];
  }

  update() {
    this.x = constrain(this.x + this.random() * 2, 0, width);
    this.y = constrain(this.y + this.random() * 2, 0, height);
    this.log.push(createVector(this.x, this.y));
    if (this.log.length > 100) {
      this.log.shift();
    }
  }

  draw() {
    push();
    fill(0); noStroke();
    this.render(createVector(this.x, this.y), 8);
    drawLabel(this.x + ((this.x < width / 2) ? 8 : -8), this.y + 16,
      this.label, (this.x < width / 2) ? LEFT : RIGHT);
    noFill(); stroke(0);
    beginShape();
    for (let i = 0; i < this.log.length; i ++) {
      vertex(this.log[i].x, this.log[i].y);
    }
    endShape();
    stroke(0);
    line(this.x, 0, this.x, height);
    line(0, this.y, width, this.y);
    pop();
  }
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  walkers.push(new RandomWalker(random(0, width), random(0, height), uniform(), drawCircleMarker, "uniform"));
  walkers.push(new RandomWalker(random(0, width), random(0, height), perlin(), drawTriangleMarker, "perlin"));
  walkers.push(new RandomWalker(random(0, width), random(0, height), gaussian(), drawSquareMarker, "gaussian"));
  walkers.push(new RandomWalker(random(0, width), random(0, height), gaussian_perlin(), drawStarMarker, "gaussian + perlin"));
}

function draw() {
  clear();
  background(254, 253, 183);

  let v;
  for (let i = 0; i < walkers.length; i ++) {
    walkers[i].update();
  }

  for (let i = 0; i < walkers.length; i ++) {
    walkers[i].draw();
  }
}

function uniform() {
  return ()=>{return random(-1, 1);}
}

function perlin() {
  let i = 0, n = random(100);
  return ()=>{
    n += 0.01;
    i = (i + 1) % 2;
    return (noise(i + n) - 0.5) * 2;
  }
}

function gaussian() {
  return ()=>{return randomGaussian(0,1);}
}

function gaussian_perlin() {
  let g = gaussian();
  let p = perlin();
  return ()=>{return (g() * 0.2 + p() * 0.8);}
}

/** drawLabel **/

/** drawCircleMarker **/

/** drawSquareMarker **/

/** drawTriangleMarker **/

/** drawStarMarker **/
