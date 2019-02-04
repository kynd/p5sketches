const maxReflection = 32;
let mirrors;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    updateMirrors();
}

function updateMirrors() {
    mirrors = [];
    const w = min(width, height);
    for (let i = 0; i < 4; i ++) {
        p0 = createVector(-w * 0.5 + random() * w, -w * 0.5 + random() * w);
        p1 = createVector(-w * 0.5 + random() * w, -w * 0.5 + random() * w);
        mirrors.push(new LineSegment().fromTwoPoints(p0, p1));
    }
}

function hitTest(o, d, lineSegments, ignore) {
    let intersection, hitObject, minDistance = Infinity;
    const ray = new Line().fromPointAndVector(o, d);
    lineSegments.forEach((ls)=>{
        if (ls != ignore && ls.intersects(ray)) {
            const temp = ls.getIntersectionPoint(ray);
            const dot = d.dot(temp.copy().sub(o));
            const dist = o.dist(temp);
            if (dot >= 0 && dist < minDistance) {
                intersection = temp;
                minDistance = dist;
                hitObject = ls;
            }
        }
    });

    return intersection ? {point: intersection, object: hitObject} : null;
}

function reflect(i, n) {
  return i.copy().add(n.copy().mult(i.copy().mult(2).dot(n) / pow(n.mag(), 2) * -1));
}

function draw() {
    clear();
    background(255, 235, 200);

    const l = max(width, height);
    const angle = frameCount / 60 * PI;
    if (frameCount % 120 == 0) { updateMirrors();}

    let origin = createVector(cos(angle), sin(angle)).mult(l);
    let dir = origin.copy().mult(-1).normalize();

    const points = [origin];
    let currentMirror = null;
    for (let i = 0; i < maxReflection; i ++) {
        const hitResult = hitTest(origin, dir, mirrors, currentMirror);

        if (hitResult) {
            points.push(hitResult.point);
            currentMirror = hitResult.object;

            const p0 = hitResult.object.p0;
            const p1 = hitResult.object.p1;
            normal = createVector(
                -(p0.y - p1.y),
                p0.x - p1.x
            ).normalize();

            normal = (normal.dot(dir) > 0) ? normal.mult(-1) : normal;
            origin = hitResult.point;
            dir = reflect(dir, normal);
        } else {
            points.push(origin.copy().add(dir.copy().mult(l * 2)));
            break;
        }
    }

    push();

    translate(width / 2, height / 2);
    fill(255); stroke(0); strokeWeight(1);
    for (let i = 1; i < points.length; i++) {
        line(points[i - 1].x, points[i - 1].y, points[i].x, points[i].y);
    }
    strokeWeight(3);
    mirrors.forEach((m)=>{m.draw();});
    fill(0); noStroke(0);
    points.forEach((p)=>{drawCircleMarker(p, 4);})
    pop();
}

/** Line **/

/** LineSegment **/

/** drawCircleMarker **/
