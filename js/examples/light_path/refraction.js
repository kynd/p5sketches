let IOR = 1;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
}

function refract(i, n, ior) {
    const cosi = -i.copy().dot(n);
    const eta = 1 / ior;
    const k = 1 -  eta *  eta * (1 - cosi * cosi);
    return t = i.copy().mult(eta).add(
        n.copy().mult(eta * cosi - sqrt(k))
    );
}


function draw() {
    clear();
    background(255, 235, 200);

    if (frameCount % 60 == 0) {
        IOR = 1 + (frameCount % 600) / 600;
    }

    const boundary = {x: -width / 2, y: -height / 2, w: width, h: height};
    
    const mx = cos(frameCount / 120 * PI + PI * 0.251);
    const my = 1;
    const border = new Line().fromTwoPoints({x:0, y: 0}, {x: mx, y: my});

    const ty = sin(frameCount / 90 * PI) * height / 4;
    const ray = new Line().fromTwoPoints({x: -width / 2, y:0}, {x: 0, y: ty});
    const rayVec = createVector(width / 2, ty).normalize();
    
    const intersection = border.getIntersectionPoint(ray);
    const normal = createVector(-my, mx).normalize();
    if (normal.dot(rayVec) > 0) { normal.mult(-1);}
    const refractionVec = refract(rayVec, normal, IOR);

    const rayHead = intersection.copy().add(rayVec.copy().mult(-32));
    const rayTail = intersection.copy().add(rayVec.copy().mult(-56));
    const normalHead = intersection.copy().add(normal.copy().mult(24));
    const refractionHead = intersection.copy().add(refractionVec.copy().mult(56));
    const refractionTail = intersection.copy().add(refractionVec.copy().mult(32));
    const refractionLineEnd = intersection.copy().add(refractionVec.copy().mult(width));

    push();

    fill(255); stroke(0); strokeWeight(1);
    translate(width / 2, height / 2);
    line(-width / 2, 0, intersection.x, intersection.y);
    line(intersection.x, intersection.y, refractionLineEnd.x, refractionLineEnd.y);

    strokeWeight(2);
    border.draw(boundary);
    drawArrow(intersection.x, intersection.y, normalHead.x, normalHead.y);
    strokeWeight(4);
    drawArrow(rayTail.x, rayTail.y, rayHead.x, rayHead.y);
    drawArrow(refractionTail.x, refractionTail.y, refractionHead.x, refractionHead.y);

    fill(0); noStroke(0);
    drawLabel(rayHead.x + rayVec.x * 16, rayHead.y + rayVec. y * 16, "i");
    drawLabel(refractionHead.x + refractionVec.x * 16, refractionHead.y + refractionVec.y * 16, "r");
    drawLabel(normalHead.x + normal.x * 16, normalHead.y + normal.y * 16, "n");

    pop();
    drawLabel(8, 32, "IOR = " + IOR, LEFT);
}

/** Line **/

/** drawArrow **/

/** drawLabel **/

