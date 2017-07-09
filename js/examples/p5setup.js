let __ready = false;
let __clicked = false;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function start() {
  if (__ready) {
    loop();
  }
}

function stop() {
  if (__ready && !__clicked) {
    noLoop();
    if (stopAudio) {
      stopAudio();
    }
  }
  __clicked = false;
}

let __setup = setup;

setup = function() {
  __setup();

  if (!__autorun) { noLoop(); }
  canvas.mouseClicked(function() {__clicked = true; __parent.focusExample(window)});
  canvas.touchStarted(function() {__clicked = true; __parent.focusExample(window)});
  __ready = true;
}
