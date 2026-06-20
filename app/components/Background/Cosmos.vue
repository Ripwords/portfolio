<script lang="ts" setup>
import * as THREE from "three";
import { usePreferredReducedMotion } from "@vueuse/core";

// Cosmic backdrop:
//  - fluidCanvas: a domain-warped fbm noise shader (flowing aurora, no circular blobs)
//  - starCanvas: lightweight 2D starfield drawn on top so stars stay crisp
const fluidCanvas = ref<HTMLCanvasElement | null>(null);
const starCanvas = ref<HTMLCanvasElement | null>(null);
const reduced = usePreferredReducedMotion();

type Star = { x: number; y: number; r: number; base: number; tw: number; ph: number };

let raf = 0;
let w = 0;
let h = 0;
let dpr = 1;

// --- starfield (2D) ---
let stars: Star[] = [];
let ctx: CanvasRenderingContext2D | null = null;

// --- aurora (WebGL shader) ---
let renderer: THREE.WebGLRenderer | null = null;
let scene: THREE.Scene | null = null;
let cam: THREE.Camera | null = null;
let mat: THREE.ShaderMaterial | null = null;
let geo: THREE.PlaneGeometry | null = null;
const FLUID_SCALE = 0.5; // render the shader at half-res; it's soft, no one notices

const vert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

// Inigo-Quilez-style domain-warped fbm → flowing, fluid-like color fields.
const frag = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uAspect;

  // cheap hash-based value noise
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
    // 3 octaves only → soft, large-scale masses (no fine, busy detail)
    for (int i = 0; i < 3; i++) {
      s += a * noise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return s;
  }

  void main() {
    vec2 uv = vUv;
    uv.x *= uAspect;
    // low frequency → big, slow fog clouds
    uv *= 0.8;

    float t = uTime * 0.04;

    // gentle single domain-warp = slow drifting fog, not tight marbling
    vec2 q = vec2(
      fbm(uv + vec2(0.0, t)),
      fbm(uv + vec2(5.2, 1.3) - t)
    );
    vec2 r = vec2(
      fbm(uv + 2.0 * q + vec2(1.7, 9.2) + 0.10 * t),
      fbm(uv + 2.0 * q + vec2(8.3, 2.8) - 0.08 * t)
    );
    float f = fbm(uv + 2.0 * r);

    // palette (approx of the violet / cyan / pink aurora)
    vec3 violetC = vec3(0.45, 0.22, 0.85);
    vec3 cyanC   = vec3(0.20, 0.74, 0.92);
    vec3 pinkC   = vec3(0.95, 0.35, 0.62);

    vec3 col = mix(violetC, cyanC, smoothstep(0.28, 0.82, f));
    col = mix(col, pinkC, 0.45 * smoothstep(0.3, 1.0, length(q)));
    // let the warp field push extra violet into the troughs for richer banding
    col = mix(col, violetC, 0.35 * smoothstep(0.0, 0.45, length(r) - f));

    // soft falloff → diffuse fog rather than sharp wisps
    float glow = pow(clamp(f, 0.0, 1.0), 1.1);
    float alpha = glow * 0.85;
    gl_FragColor = vec4(col * glow, alpha);
  }
`;

function seedStars() {
  if (!starCanvas.value) return;
  starCanvas.value.width = w * dpr;
  starCanvas.value.height = h * dpr;
  starCanvas.value.style.width = `${w}px`;
  starCanvas.value.style.height = `${h}px`;
  ctx = starCanvas.value.getContext("2d");
  ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);

  const count = Math.min(220, Math.round((w * h) / 9000));
  stars = Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.3 + 0.2,
    base: Math.random() * 0.5 + 0.25,
    tw: Math.random() * 0.5 + 0.2,
    ph: Math.random() * Math.PI * 2,
  }));
}

function paintStars(t: number) {
  if (!ctx) return;
  ctx.clearRect(0, 0, w, h);
  for (const s of stars) {
    const flicker = reduced.value === "reduce" ? 0 : Math.sin(t * 0.001 + s.ph) * s.tw;
    const a = Math.max(0, Math.min(1, s.base + flicker * 0.4));
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(225, 226, 255, ${a})`;
    ctx.fill();
  }
}

function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  w = window.innerWidth;
  h = window.innerHeight;
  seedStars();
  if (renderer && mat) {
    renderer.setSize(w * FLUID_SCALE, h * FLUID_SCALE, false);
    (mat.uniforms.uAspect.value as number) = w / h;
  }
}

function render(t: number) {
  if (renderer && scene && cam && mat) {
    if (reduced.value !== "reduce") (mat.uniforms.uTime.value as number) = t / 1000;
    renderer.render(scene, cam);
  }
  paintStars(t);
}

function loop(t: number) {
  render(t);
  raf = requestAnimationFrame(loop);
}

onMounted(() => {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  w = window.innerWidth;
  h = window.innerHeight;

  // aurora shader
  if (fluidCanvas.value) {
    renderer = new THREE.WebGLRenderer({
      canvas: fluidCanvas.value,
      alpha: true,
      antialias: false,
    });
    renderer.setPixelRatio(1);
    renderer.setSize(w * FLUID_SCALE, h * FLUID_SCALE, false);
    scene = new THREE.Scene();
    cam = new THREE.Camera();
    geo = new THREE.PlaneGeometry(2, 2);
    mat = new THREE.ShaderMaterial({
      vertexShader: vert,
      fragmentShader: frag,
      transparent: true,
      depthTest: false,
      uniforms: {
        uTime: { value: 0 },
        uAspect: { value: w / h },
      },
    });
    scene.add(new THREE.Mesh(geo, mat));
  }

  seedStars();
  window.addEventListener("resize", resize, { passive: true });

  if (reduced.value === "reduce") {
    render(0);
  } else {
    raf = requestAnimationFrame(loop);
  }
});

onBeforeUnmount(() => {
  cancelAnimationFrame(raf);
  window.removeEventListener("resize", resize);
  geo?.dispose();
  mat?.dispose();
  renderer?.dispose();
});
</script>

<template>
  <div class="cosmos pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
    <!-- Flowing aurora shader (rendered upscaled + blurred for a soft, liquid feel) -->
    <canvas ref="fluidCanvas" class="fluid absolute inset-0 h-full w-full" />
    <!-- Starfield on top so points stay sharp -->
    <canvas ref="starCanvas" class="absolute inset-0" />
    <!-- Vignette to seat content against the edges -->
    <div class="vignette absolute inset-0" />
    <!-- Film grain -->
    <div class="grain absolute inset-0" />
  </div>
</template>

<style scoped>
.cosmos {
  background:
    radial-gradient(
      120% 80% at 50% -10%,
      color-mix(in oklch, var(--nebula-violet) 9%, transparent),
      transparent 60%
    ),
    var(--background);
}

.fluid {
  /* upscaling the half-res shader + a soft blur removes any pixel structure,
     leaving a smooth, liquid aurora. opacity keeps text readable. */
  opacity: 0.68;
  filter: blur(48px) saturate(125%);
  transform: scale(1.18);
}

.vignette {
  background: radial-gradient(
    120% 120% at 50% 40%,
    transparent 50%,
    color-mix(in oklch, var(--background) 88%, black) 100%
  );
}

.grain {
  opacity: 0.04;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
</style>
