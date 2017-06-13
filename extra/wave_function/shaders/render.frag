precision mediump float;
uniform sampler2D buffer;
uniform int channelIndex;
uniform vec2 dims;
varying vec2 uv;

void main() {
  vec4 samp0 = texture2D(buffer, uv + vec2(0.0, -1.0) / dims);
  vec4 samp1 = texture2D(buffer, uv + vec2(0.0, 1.0) / dims);

  vec4 color = vec4(0.88, 0.94, 0.95, 1.0);
  if (abs(uv.x - 0.5) < 0.3 && abs(uv.y - 0.5) < 0.02) {
    color = vec4(0.0, 0.0, 0.0, 1.0);
  }
  color.rgb -= smoothstep(0.026, 0.025, length(uv - vec2(0.5, 0.7)));

  float v = smoothstep(0.0, 0.1, samp0.r - samp1.r);
  color = vec4(color.rgb * (1.0 - v), 1.0);
  gl_FragColor = color;
}
