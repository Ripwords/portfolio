<script lang="ts" setup>
import * as THREE from "three";
import { usePreferredReducedMotion } from "@vueuse/core";

const props = withDefaults(defineProps<{ count?: number }>(), { count: 0 });

const host = ref<HTMLDivElement | null>(null);
const reduced = usePreferredReducedMotion();

let renderer: THREE.WebGLRenderer | null = null;
let scene: THREE.Scene | null = null;
let camera: THREE.PerspectiveCamera | null = null;
let points: THREE.Points | null = null;
let geometry: THREE.BufferGeometry | null = null;
let material: THREE.PointsMaterial | null = null;
let raf = 0;
let ro: ResizeObserver | null = null;

// Smoothed cursor-driven parallax (kept outside the render tree)
const target = { x: 0, y: 0 };
const current = { x: 0, y: 0 };

function buildGalaxy(count: number) {
  geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  const radius = 2.7;
  const branches = 4;
  const spin = 0.85;
  const randomnessPower = 2.4;

  const inside = new THREE.Color("#ffffff"); // bright platinum core
  const outside = new THREE.Color("#8a7fb5"); // soft desaturated violet edge

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const r = Math.random() * radius;
    const branchAngle = ((i % branches) / branches) * Math.PI * 2;
    const spinAngle = r * spin;

    const rand = () => Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1);
    const rx = rand() * (0.18 + r * 0.08);
    const ry = rand() * (0.1 + r * 0.03);
    const rz = rand() * (0.18 + r * 0.08);

    positions[i3] = Math.cos(branchAngle + spinAngle) * r + rx;
    positions[i3 + 1] = ry;
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * r + rz;

    const mixed = inside.clone().lerp(outside, r / radius);
    colors[i3] = mixed.r;
    colors[i3 + 1] = mixed.g;
    colors[i3 + 2] = mixed.b;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  material = new THREE.PointsMaterial({
    size: 0.03,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
    transparent: true,
  });

  points = new THREE.Points(geometry, material);
  points.rotation.x = 0.5;
}

function resize() {
  if (!host.value || !renderer || !camera) return;
  const w = host.value.clientWidth;
  const h = host.value.clientHeight;
  if (w === 0 || h === 0) return;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

function render(t: number) {
  if (!renderer || !scene || !camera || !points) return;
  // ease cursor parallax
  current.x += (target.x - current.x) * 0.05;
  current.y += (target.y - current.y) * 0.05;

  const spinning = reduced.value !== "reduce";
  // gentler parallax so the arms never swing past the frame edge
  points.rotation.y = (spinning ? t * 0.00006 : 0) + current.x * 0.2;
  points.rotation.x = 0.55 + current.y * 0.12;

  renderer.render(scene, camera);
}

function loop(t: number) {
  render(t);
  raf = requestAnimationFrame(loop);
}

function onPointer(e: PointerEvent) {
  target.x = (e.clientX / window.innerWidth) * 2 - 1;
  target.y = (e.clientY / window.innerHeight) * 2 - 1;
}

onMounted(() => {
  if (!host.value) return;

  // Scale particle budget to device for steady 60fps
  const isSmall = window.innerWidth < 768;
  const count = props.count || (isSmall ? 6000 : 14000);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
  // pulled back + raised so the full disc (incl. scatter + parallax swing) stays in frame
  camera.position.set(0, 2.4, 7);
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);
  host.value.appendChild(renderer.domElement);
  renderer.domElement.style.width = "100%";
  renderer.domElement.style.height = "100%";
  renderer.domElement.style.display = "block";

  buildGalaxy(count);
  if (points) scene.add(points);

  resize();
  ro = new ResizeObserver(resize);
  ro.observe(host.value);

  window.addEventListener("pointermove", onPointer, { passive: true });

  if (reduced.value === "reduce") {
    render(0); // single static frame
  } else {
    raf = requestAnimationFrame(loop);
  }
});

onBeforeUnmount(() => {
  cancelAnimationFrame(raf);
  window.removeEventListener("pointermove", onPointer);
  ro?.disconnect();
  geometry?.dispose();
  material?.dispose();
  renderer?.dispose();
  if (renderer?.domElement && host.value?.contains(renderer.domElement)) {
    host.value.removeChild(renderer.domElement);
  }
});
</script>

<template>
  <div ref="host" class="galaxy-host h-full w-full" aria-hidden="true" />
</template>

<style scoped>
.galaxy-host {
  /* faint core bloom behind the points */
  background: radial-gradient(
    closest-side at 50% 58%,
    color-mix(in oklch, var(--primary) 12%, transparent),
    transparent 72%
  );
}
</style>
