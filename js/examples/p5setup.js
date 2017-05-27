let __ready = false;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function start() { if (__ready) {loop();} }

function stop() { if (__ready) {noLoop();} }

let __setup = setup;

setup = function() {
  __setup();

  if (!__autorun) { noLoop(); }
  canvas.mouseClicked(function() {__parent.focusExample(window)});
  canvas.touchStarted(function() {__parent.focusExample(window)});
  __ready = true;
}


//saveCanvas('output' + frameCount, 'jpg');
