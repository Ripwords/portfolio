import * as THREE from "three";
import { usePreferredReducedMotion } from "@vueuse/core";

/**
 * Shared full-screen fragment-shader runner.
 *
 * Renders a single fragment shader onto a quad that fills the host canvas,
 * encapsulating one performance contract so every shader moment on the site
 * behaves identically:
 *   - device pixel ratio is capped (default 1.5)
 *   - the RAF loop pauses when the canvas scrolls offscreen (IntersectionObserver)
 *   - the RAF loop pauses when the tab is hidden (visibilitychange)
 *   - under `prefers-reduced-motion` it renders exactly one static frame
 *   - it disposes all GPU resources on unmount
 *
 * Built-in uniforms always supplied to the fragment shader:
 *   uTime (float), uMouse (vec2, 0..1), uScroll (float 0..1),
 *   uAspect (float), uAccent (vec3, clay per mode), uInk (float, 1 in dark).
 */

export interface ShaderCanvasOptions {
  fragmentShader: string;
  /** Extra uniforms merged with the built-ins. */
  uniforms?: Record<string, THREE.IUniform>;
  /** Cap on devicePixelRatio. Default 1.5. */
  dprCap?: number;
  /** Optional external pause switch (e.g. a parent that wants to freeze the loop). */
  paused?: Ref<boolean>;
}

export interface ShaderCanvasHandle {
  canvasRef: Ref<HTMLCanvasElement | null>;
  /** Set the mouse uniform in normalized 0..1 coordinates. */
  setMouse: (x: number, y: number) => void;
  /** True when the shader is frozen to a single frame (reduced-motion). */
  isStatic: Readonly<Ref<boolean>>;
}

const VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

// Clay accent as linear-ish rgb, per mode.
const ACCENT_PAPER = new THREE.Vector3(0.81, 0.42, 0.29);
const ACCENT_INK = new THREE.Vector3(0.88, 0.53, 0.4);

export function useShaderCanvas(opts: ShaderCanvasOptions): ShaderCanvasHandle {
  const canvasRef = ref<HTMLCanvasElement | null>(null);
  const isStatic = ref(false);
  const reduced = usePreferredReducedMotion();
  const colorMode = useColorMode();

  const dprCap = opts.dprCap ?? 1.5;

  let renderer: THREE.WebGLRenderer | null = null;
  let scene: THREE.Scene | null = null;
  let camera: THREE.Camera | null = null;
  let material: THREE.ShaderMaterial | null = null;
  let geometry: THREE.PlaneGeometry | null = null;
  let raf = 0;
  let running = false;
  let intersecting = true;
  let visible = true;

  let io: IntersectionObserver | null = null;
  let ro: ResizeObserver | null = null;

  // Uniform state kept outside the render tree.
  const uniforms: Record<string, THREE.IUniform> = {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uScroll: { value: 0 },
    uAspect: { value: 1 },
    uAccent: { value: ACCENT_PAPER.clone() },
    uInk: { value: 0 },
    ...(opts.uniforms ?? {}),
  };

  function isInk(): boolean {
    return colorMode.value === "dark";
  }

  function applyMode() {
    const ink = isInk();
    (uniforms.uInk.value as number) = ink ? 1 : 0;
    (uniforms.uAccent.value as THREE.Vector3).copy(ink ? ACCENT_INK : ACCENT_PAPER);
  }

  function setMouse(x: number, y: number) {
    (uniforms.uMouse.value as THREE.Vector2).set(x, y);
  }

  function currentScroll(): number {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (max <= 0) return 0;
    return Math.min(1, Math.max(0, window.scrollY / max));
  }

  function resize() {
    const canvas = canvasRef.value;
    if (!canvas || !renderer) return;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (w === 0 || h === 0) return;
    renderer.setSize(w, h, false);
    (uniforms.uAspect.value as number) = w / h;
  }

  function renderFrame(tMs: number) {
    if (!renderer || !scene || !camera) return;
    (uniforms.uTime.value as number) = tMs / 1000;
    (uniforms.uScroll.value as number) = currentScroll();
    renderer.render(scene, camera);
  }

  function shouldRun(): boolean {
    return intersecting && visible && !(opts.paused?.value ?? false);
  }

  function loop(tMs: number) {
    if (!running) return;
    renderFrame(tMs);
    raf = requestAnimationFrame(loop);
  }

  function start() {
    if (running || isStatic.value) return;
    if (!shouldRun()) return;
    running = true;
    raf = requestAnimationFrame(loop);
  }

  function stop() {
    running = false;
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  }

  function sync() {
    if (isStatic.value) return;
    if (shouldRun()) start();
    else stop();
  }

  onMounted(() => {
    const canvas = canvasRef.value;
    if (!canvas) return;

    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, dprCap));
    renderer.setClearColor(0x000000, 0);

    scene = new THREE.Scene();
    camera = new THREE.Camera();
    geometry = new THREE.PlaneGeometry(2, 2);
    material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: opts.fragmentShader,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      uniforms,
    });
    scene.add(new THREE.Mesh(geometry, material));

    applyMode();
    resize();

    ro = new ResizeObserver(resize);
    ro.observe(canvas);

    io = new IntersectionObserver(
      (entries) => {
        intersecting = entries[0]?.isIntersecting ?? true;
        sync();
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    document.addEventListener("visibilitychange", onVisibility, { passive: true });

    if (reduced.value === "reduce") {
      // Single static frame, no loop.
      isStatic.value = true;
      renderFrame(0);
    } else {
      start();
    }
  });

  function onVisibility() {
    visible = document.visibilityState === "visible";
    sync();
  }

  // React to mode + external pause + reduced-motion changes.
  watch(
    () => colorMode.value,
    () => {
      applyMode();
      if (isStatic.value) renderFrame(0);
    },
  );

  watch(
    () => opts.paused?.value,
    () => sync(),
  );

  watch(
    () => reduced.value,
    (val) => {
      if (val === "reduce") {
        isStatic.value = true;
        stop();
        renderFrame(0);
      } else {
        isStatic.value = false;
        start();
      }
    },
  );

  onBeforeUnmount(() => {
    stop();
    io?.disconnect();
    ro?.disconnect();
    document.removeEventListener("visibilitychange", onVisibility);
    geometry?.dispose();
    material?.dispose();
    renderer?.dispose();
    renderer = null;
    scene = null;
    camera = null;
  });

  return { canvasRef, setMouse, isStatic: readonly(isStatic) as Readonly<Ref<boolean>> };
}
