// -----------------------------------------------------------
let glShader = require('gl-shader');
let glFBO = require("gl-fbo");
let clear = require('gl-clear')({color: [0.5, 0.5, 0.5, 1.0]});
let glslify = require('glslify');
let fillScreen = require("a-big-triangle");
let now = require("gl-now");
// -----------------------------------------------------------

class glRenderer {
  constructor() {
    this.shell = now();
    this.shell.on("gl-init", this.init.bind(this));
  }

  init() {
    let gl = this.shell.gl;
    //this.shell.on("tick", this.update.bind(this));
    this.shell.on("gl-render", this.draw.bind(this));

    this.updateShader = glShader( gl, glslify( './shaders/flat.vert' ), glslify( './shaders/update.frag' ) );
    this.renderShader = glShader( gl, glslify( './shaders/flat.vert' ), glslify( './shaders/render.frag' ) );

    let w = 640, h = 640;
    this.fbos = [ glFBO(gl, [w,h]), glFBO(gl, [w,h]) ];
    this.pingpongIndex = 0;
    this.frameCount = 0;

    this.fbos[0].bind();
    clear(gl);
    this.fbos[1].bind();
    clear(gl);
  }

  update() {
    // NULL
  }

  draw() {
    // OFF SCREEEN
    if (!this.updateShader) return;
    let gl = this.shell.gl;

    let prevFbo = this.fbos[this.pingpongIndex];
    let currentFbo = this.fbos[this.pingpongIndex ^= 1];

    currentFbo.bind();
    this.updateShader.bind();
    this.updateShader.uniforms.buffer = prevFbo.color[0].bind(0);
    this.updateShader.uniforms.frameCount = this.frameCount;
    this.updateShader.uniforms.dims = prevFbo.shape;
    fillScreen(gl);
    this.frameCount ++;

    // ON SCREEN

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    if (!this.renderShader) return;

    this.renderShader.bind()
    this.renderShader.uniforms.buffer =this.fbos[this.pingpongIndex].color[0].bind(0);
    this.renderShader.uniforms.dims = [gl.drawingBufferWidth, gl.drawingBufferHeight];
    fillScreen(gl);
  }
}

let renderer = new glRenderer();
