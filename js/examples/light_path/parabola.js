let points = [], focusPoint;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    for (let y = -height / 1.8; y < height / 1.8; y += height / 40) {
        points.push(createVector(f(y), y));
    }
}

function f(y) {
    return -pow(y * 0.1,  2);
}

function n(y) {
    return -2 * y * 0.01;
}

function reflect(i, n) {
    return i.copy().add(n.copy().mult(i.copy().mult(2).dot(n) / pow(n.mag(), 2) * -1));
}

function draw() {
    clear();
    background(255, 235, 200);
    
    const left = - width / 4 * 3;
    const boundary = {x: left, y: -height / 2, w: width, h: height};

    const y = ((frameCount % 120) / 120 - 0.5) * height;
    const x = f(y);

    const intersection = createVector(x, y);
    
    const normal = createVector(-1, n(y)).normalize();
    const rayVec = createVector(1, 0);
    const reflectionVec = reflect(rayVec, normal);




    const rayHead = intersection.copy().add(rayVec.copy().mult(-32));
    const rayTail = intersection.copy().add(rayVec.copy().mult(-56));
    const normalHead = intersection.copy().add(normal.copy().mult(24));
    const reflectionHead = intersection.copy().add(reflectionVec.copy().mult(56));
    const reflectionTail = intersection.copy().add(reflectionVec.copy().mult(32));
    const reflectionLineEnd = intersection.copy().add(reflectionVec.copy().mult(width));

    const centerLine = new Line().fromTwoPoints({x:0, y:0}, {x:1, y:0});
    const reflectionLine = new Line().fromTwoPoints(intersection, intersection.copy().add(reflectionVec));
    const focus = centerLine.getIntersectionPoint(reflectionLine);
    if (focus) {
        focusPoint = focus;
    }

    fill(255); stroke(0); strokeWeight(1);
    push();
    translate(-left, height / 2);
    for (let i = 1; i < points.length; i ++) {
        line(points[i].x, points[i].y, points[i - 1].x, points[i - 1].y);
    }
    line(left, y, x, y);
    centerLine.draw(boundary);
    centerLine.draw(reflectionLine);
    line(intersection.x, intersection.y, reflectionLineEnd.x, reflectionLineEnd.y);

    strokeWeight(2);
    drawArrow(intersection.x, intersection.y, normalHead.x, normalHead.y);
    strokeWeight(4);
    drawArrow(rayTail.x, rayTail.y, rayHead.x, rayHead.y);
    drawArrow(reflectionTail.x, reflectionTail.y, reflectionHead.x, reflectionHead.y);

    fill(0); noStroke(0);
    drawCircleMarker(focusPoint, 4);
    pop();
}

/** Line **/

/** drawCircleMarker **/

/** drawArrow **/

/** drawLabel **/