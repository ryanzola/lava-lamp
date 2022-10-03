uniform vec3 iResolution;

varying vec3 vColor;
varying vec2 vUv;

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv = (fragCoord-.5*iResolution.xy)/iResolution.y;

  fragColor = vec4(vColor, 1.0);
}

void main() {
  mainImage(gl_FragColor, gl_FragCoord.xy);
}
