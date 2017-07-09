let audioCtx;
let prevClickFrame = -999;
let buffer_size = 16384;
let baseFreq = 440.0;
let note = 0;
let gain = 0.1;
let phase = 0;
let ratios = [1, 9/8, 5/4, 4/3, 3/2, 5/3, 15/8, 2];
let labels = ["A", "B(M2 9/8)", "C#(M3 5/4)", "D(P4 4/3)", "E(P5 3/2)", "F#(M6 5/3)", "G#(M7 15/8)", "A(Octave 2/1)"];

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.mousePressed(function() { toggleAudio(); });
  canvas.touchStarted(function() { toggleAudio(); });
}

function draw() {
  clear();
  background(0, 222, 201);
  let freq = ratios[note] * baseFreq;

  if (frameCount % 100 == 0) {
    note = (note + 1) % 8;
  }

  push();
  translate(0, height / 2);
  noFill(); stroke(0);
  beginShape();
  for (let i = 0; i <= width; i ++) {
    let ph = i / width * freq / 100;
    vertex(i, f(ph) * height * 0.3);
  }
  endShape();
  pop();

  stroke(0, 0, 0, 64);
  for (let i = 0; i < 10; i ++) {
    let x = i * width / 10;
    if (i != 0) { line(x, 0, x, height); }
    drawLabel(x, height - 16, i + "ms", LEFT);
  }

  drawLabel(8, 32, labels[note] + " = " + freq.toPrecision(4) + "Hz", LEFT);
  drawLabel(width - 8, 32, "Click to turn on/off the sound", RIGHT);
}

function f(phase) {
  return Math.sin(phase * 3.141592 * 2);
}

function audiohandler(event) {
  let outL = event.outputBuffer.getChannelData(0);
  let outR = event.outputBuffer.getChannelData(1);
  let acc = ratios[note] * baseFreq / audioCtx.sampleRate;
  for(let i = 0 ; i < outL.length; i++) {
      phase += acc;
      let out = f(phase);
      outL[i] = outR[i] = out * gain;
  }
}

function toggleAudio() {
  if (prevClickFrame + 10 >= frameCount) {
    return;
  }
  prevClickFrame = frameCount;

  if (audioCtx) {
    stopAudio();
  } else {
    initAudio();
  }
}

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.webkitAudioContext || window.AudioContext);
    let scriptproc = audioCtx.createScriptProcessor(buffer_size);
    scriptproc.connect(audioCtx.destination);
    scriptproc.onaudioprocess = audiohandler;
  }
}

function stopAudio() {
  if (audioCtx) {
    audioCtx.close();
    audioCtx = null;
  }
}

/** drawLabel **/
