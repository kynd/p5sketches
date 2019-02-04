let mirror;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    mirror = new Line();
}

function reflect(i, n) {
  return i.copy().add(n.copy().mult(i.copy().mult(2).dot(n) / pow(n.mag(), 2) * -1));
}

function draw() {
    clear();
    background(255, 235, 200);
    const boundary = {x: -width / 2, y: -height / 2, w: width, h: height};
    
    const mx = cos(frameCount / 120 * PI + PI * 0.251);
    const my = 1;
    mirror.fromTwoPoints({x:0, y: 0}, {x: mx, y: my});

    const ty = sin(frameCount / 90 * PI) * height / 4;
    const ray = new Line().fromTwoPoints({x: -width / 2, y:0}, {x: 0, y: ty});
    const rayVec = createVector(width / 2, ty).normalize();
    
    const intersection = mirror.getIntersectionPoint(ray);
    const normal = createVector(-my, mx);
    if (normal.dot(rayVec) > 0) { normal.mult(-1);}
    const reflectionVec = reflect(rayVec, normal);

    const rayHead = intersection.copy().add(rayVec.copy().mult(-32));
    const rayTail = intersection.copy().add(rayVec.copy().mult(-56));
    const normalHead = intersection.copy().add(normal.copy().mult(24));
    const reflectionHead = intersection.copy().add(reflectionVec.copy().mult(56));
    const reflectionTail = intersection.copy().add(reflectionVec.copy().mult(32));
    const reflectionLineEnd = intersection.copy().add(reflectionVec.copy().mult(width));

    push();

    fill(255); stroke(0); strokeWeight(1);
    translate(width / 2, height / 2);
    line(-width / 2, 0, intersection.x, intersection.y);
    line(intersection.x, intersection.y, reflectionLineEnd.x, reflectionLineEnd.y);

    strokeWeight(2);
    mirror.draw(boundary);
    drawArrow(intersection.x, intersection.y, normalHead.x, normalHead.y);
    strokeWeight(4);
    drawArrow(rayTail.x, rayTail.y, rayHead.x, rayHead.y);
    drawArrow(reflectionTail.x, reflectionTail.y, reflectionHead.x, reflectionHead.y);

    fill(0); noStroke(0);
    drawLabel(rayHead.x + rayVec.x * 16, rayHead.y + rayVec. y * 16, "i");
    drawLabel(reflectionHead.x + reflectionVec.x * 16, reflectionHead.y + reflectionVec.y * 16, "r");
    drawLabel(normalHead.x + normal.x * 16, normalHead.y + normal.y * 16, "n");

    pop();
}

/** Line **/

/** drawArrow **/

/** drawLabel **/

