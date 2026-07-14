/**
 * Signature hero shader — a domain-warped fbm "flow field" that reads as a
 * living ink current. Near-monochrome, tinted by the clay accent, mode-aware.
 *
 *  - Paper (uInk = 0): dark graphite strokes on transparent, low alpha —
 *    like ink drawn through paper.
 *  - Ink  (uInk = 1): luminous clay current on transparent.
 *
 * Reacts to uMouse (bends the field) and uScroll (shifts its phase).
 * Built-in uniforms are supplied by useShaderCanvas.
 */
export const flowFieldFrag = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform float uTime;
  uniform vec2  uMouse;
  uniform float uScroll;
  uniform float uAspect;
  uniform vec3  uAccent;
  uniform float uInk;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  float fbm(vec2 p) {
    float s = 0.0, a = 0.5;
    mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
    for (int i = 0; i < 5; i++) {
      s += a * noise(p);
      p = m * p;
      a *= 0.5;
    }
    return s;
  }

  void main() {
    vec2 uv = vUv;
    uv.x *= uAspect;
    uv *= 1.6;

    float t = uTime * 0.06;
    vec2 mouse = (uMouse - 0.5);

    // two-level domain warp — the field bends toward the cursor and drifts on scroll
    vec2 q = vec2(
      fbm(uv + vec2(0.0, t) + mouse * 0.6),
      fbm(uv + vec2(5.2, 1.3) - t)
    );
    vec2 r = vec2(
      fbm(uv + 2.0 * q + vec2(1.7, 9.2) + 0.10 * t + uScroll * 1.4),
      fbm(uv + 2.0 * q + vec2(8.3, 2.8) - 0.08 * t)
    );
    float f = fbm(uv + 2.0 * r);

    // current "stream lines" carved out of the warp field
    float lines = abs(sin((r.x + r.y) * 3.14159 + f * 4.0));
    float ridge = smoothstep(0.0, 0.6, 1.0 - lines);
    float field = pow(clamp(f, 0.0, 1.0), 1.2);

    // Paper: dark strokes, a whisper of clay in the ridges
    vec3  paperCol = mix(vec3(0.12), uAccent, 0.25 * ridge);
    float paperA   = field * 0.32 + ridge * 0.26;

    // Ink: luminous clay current
    vec3  inkCol = mix(vec3(0.18, 0.2, 0.26), uAccent, ridge * 0.9) + uAccent * field * 0.4;
    float inkA   = field * 0.5 + ridge * 0.55;

    vec3  col   = mix(paperCol, inkCol, uInk);
    float alpha = mix(paperA, inkA, uInk);

    // soft vertical falloff so the column fades at its top and bottom edges
    float vfade = smoothstep(0.0, 0.16, vUv.y) * smoothstep(1.0, 0.82, vUv.y);
    alpha *= vfade;

    // premultiplied alpha (renderer default)
    gl_FragColor = vec4(col * alpha, alpha);
  }
`;
