
precision mediump float;
uniform float frameCount;
uniform sampler2D buffer;
uniform vec2 dims;
varying vec2 uv;

void main() {

  vec4 color;
  if (length(uv - vec2(0.5, 0.7)) < 0.025) {
    // Source
    color = vec4(0.5 + sin(frameCount * 0.5) * 0.2 * (sin(frameCount * 0.05) + 1.0), 0.5, 0.5, 1.0);
  } else if (abs(uv.x - 0.5) < 0.3 && abs(uv.y - 0.5) < 0.02) {
    // Obstacle
    color = vec4(0.5, 0.5, 0.5, 1.0);
  } else {
    vec4 samp = texture2D(buffer, uv);
    float va = samp.r;

    vec2 d[4];
    d[0] = vec2(-1.0, -0.0);
    d[1] = vec2(0.0, -1.0);
    d[2] = vec2(1.0, 0.0);
    d[3] = vec2(-0.0, 1.0);

    float vb = 0.0;
    for (int i = 0; i < 4; i ++) {
      vb += texture2D(buffer, uv + d[i] / dims * 2.0).r;
    }
    
    float vc = samp.g;
    samp.b = va * 2.0 + 0.2 * (vb - va * 4.0) - vc;
    color = clamp(vec4(0.0), vec4(1.0), samp.brga);
  }

  gl_FragColor = color;
}
