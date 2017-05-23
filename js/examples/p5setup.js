function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function start() { loop(); }

function stop() { noLoop(); }

let __setup = setup;

setup = function() {
  __setup();
  if (!__autorun) { noLoop(); }
  canvas.mouseClicked(function() {__parent.focusExample(window)});
  canvas.touchStarted(function() {__parent.focusExample(window)});
}
