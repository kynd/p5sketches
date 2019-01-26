function setup() {
    canvas = createCanvas(windowWidth, windowHeight);

    counter = 0;
    p = createVector(0, 0);
    q = createVector(0, 0);
    r = createVector(0, 0);
}

function draw() {
    clear();
    const cx = width / 2, cy = height / 2;
    const t = frameCount + 30;
    const a0 = radians(t), a1 = radians(t * 2), a2 = radians(t * 3), a3 = radians(t * 4);
    p.x = cos(a0) * 150;
    p.y = sin(a3) * 100;
    q.x = -cos(a1) * 150;
    q.y = -sin(a2) * 100;
    r.x = p.x;
    r.y = q.y;

    const dx = Math.abs(p.x - q.x);
    const dy = Math.abs(p.y - q.y);
    const distance = dx + dy;

    background(245, 177, 217);

    push();
    translate(cx, cy);
    fill(0); stroke(0);
    drawLineWithLabel(p.x, p.y, r.x, r.y, "dx: " + dx.toPrecision(4), LEFT);
    drawLineWithLabel(q.x, q.y, r.x, r.y, "dy: " + dy.toPrecision(4), CENTER, 0, -4);
    drawLabel(0, cy - 16, "distance = dx + dy = " + distance.toPrecision(4), CENTER);
    drawSquareMarker(p, 10);
    drawTriangleMarker(q, 12);
    drawCircleMarker(r, 4);
    pop();

    counter ++;
}

/** drawCircleMarker **/

/** drawSquareMarker **/

/** drawTriangleMarker **/

/** drawLineWithLabel **/

/** drawLabel **/