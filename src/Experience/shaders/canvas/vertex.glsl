uniform float time;
uniform vec3 uColor[5];

varying vec2 vUv;
varying vec3 vColor;

#pragma glslify: snoise = require('../partials/simplex3d.glsl')

void main() {

  vec2 noiseCoord = uv * vec2(3.0, 4.0);

  float t = time * 0.15;

  float tilt = -0.8 * uv.y;

  float incline = uv.x * 0.1;

  float offset = incline * mix(-0.25, 0.25, uv.y);

  float noise = snoise(vec3(noiseCoord.x + t * 3.0, noiseCoord.y, t * 5.0));
  noise = max(0.0, noise);

  vec3 pos = vec3(position.x, position.y, position.z + noise * 0.4 + tilt + incline + offset);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

  vColor = uColor[4];

  for(int i = 0; i < 4; i++){
    float noiseFlow = 5.0 + float(i) * 0.3;
    float noiseSpeed = 7.0 + float(i) * 0.3;
    float noiseSeed = 1.0 + float(i) * 7.0;

    vec2 noiseFreq = vec2(0.3, 0.4);

    float noiseFloor = 0.1;
    float noiseCeil = 0.6 + float(i) * 0.07;

    float noise = smoothstep(
      noiseFloor, 
      noiseCeil, 
      snoise(
        vec3(
          noiseCoord.x * noiseFreq.x + t * noiseFlow,
          noiseCoord.y * noiseFreq.y, 
          t * noiseSpeed + noiseSeed
        )
      )
    );

    vColor = mix(vColor, uColor[i], noise);
    
  }

  vUv = uv;
}
