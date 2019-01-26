function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
  
    counter = 0;
    position = createVector(100, -100);
    velocity = createVector(48, -48);
    acceleration = createVector(30, 30);
    fps = 60; // naively assuming 60 fps
    maxSpeed = 256;
  }
  
  function draw() {
    clear();
    const hw = width / 2, hh = height / 2;
    const vx = position.x + velocity.x;
    const vy = position.y + velocity.y;
    const ax = position.x + acceleration.x;
    const ay = position.y + acceleration.y;
  
    background(255, 174, 166);
    push();
    translate(hw, hh);
  
    fill(0); stroke(0);
    strokeWeight(1);
    drawArrow(position.x, position.y, vx, vy);
    drawCircleMarker(position, 4);

    strokeWeight(2);
    drawArrow(position.x, position.y, ax, ay);
    
    drawLabel(position.x, position.y, `position (${position.x.toPrecision(4)}, ${position.y.toPrecision(4)})`, LEFT);
    drawLabel(vx, vy, `velocity (${velocity.x.toPrecision(4)}, ${velocity.y.toPrecision(4)})`, LEFT);
    drawLabel(ax, ay, `acceleration (${acceleration.x.toPrecision(4)}, ${acceleration.y.toPrecision(4)})`, LEFT);
  
    strokeWeight(1)
    line(-hw, 0, hw, 0);
    line(0, -hh, 0, hh);
    drawLabel(0, -4, "Origin", LEFT);
  
    pop();
  
    acceleration = createVector(mouseX - position.x - hw, mouseY - position.y - hh).div(2);
    const vDelta = acceleration.copy().div(fps);
    velocity.add(vDelta);
    if (velocity.mag() > maxSpeed) {
        velocity.setMag(maxSpeed)
    }
    const pDelta = velocity.copy().div(fps);
    position.add(pDelta);
    if (position.x > hw || position.x < -hw) {velocity.x = -velocity.x;}
    if (position.y > hh || position.y < -hh) {velocity.y = -velocity.y;}
  }
  
  
  /** drawCircleMarker **/
  
  /** drawArrow **/
  
  /** drawLabel **/
  