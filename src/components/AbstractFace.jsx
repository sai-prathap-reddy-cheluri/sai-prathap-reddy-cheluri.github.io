import { useEffect, useRef } from "react";

/**
 * AbstractFace – particle half-profile with drag + organic scatter
 */
export default function AbstractFace({
  size = 352,
  dotCount = 1600,
  assembleMs = 1400,
  clickStepDeg = 22,
  colorA = [34, 211, 238],
  colorB = [167, 139, 250],
  frontBias = 0.9,
  idleSpin = false,
  profileAngleDeg = 38,

  noiseAmp = 0.085,
  noiseFreq = 5.0,
  edgeFuzz = 0.14,
  outlierRatio = 0.10,
  outlierMin = 1.15,
  outlierMax = 1.9
}) {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    rot: 0,
    parallax: 0,
    reduce: false,
    points: [],
    startedAt: 0,
    mounted: false,
    raf: 0,
    clickAnim: 0,
    drag: { active: false, id: null, lastX: 0, accumPx: 0 },
  });

  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d", { alpha: true });
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    // crisp canvas
    cvs.style.width = `${size}px`;
    cvs.style.height = `${size}px`;
    cvs.width = Math.floor(size * dpr);
    cvs.height = Math.floor(size * dpr);

    // motion preference
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    stateRef.current.reduce = mq.matches;
    const onMQ = (e) => (stateRef.current.reduce = e.matches);
    mq.addEventListener?.("change", onMQ);

    // initial yaw
    stateRef.current.rot = (profileAngleDeg * Math.PI) / 180;

    // ===== utilities =====
    const randn = () => {
      let u = 0, v = 0;
      while (u === 0) u = Math.random();
      while (v === 0) v = Math.random();
      return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    };
    const pseudoNoise = (x, y, z) => {
      return (
        Math.sin(noiseFreq * x + 1.2) * Math.cos(noiseFreq * y - 0.7) * Math.sin(noiseFreq * z + 0.4)
      );
    };

    // === build target points (half-profile) ===
    const jawTaper = 0.72;
    const noseBump = 0.075;
    const cheekBump = 0.04;
    const backCull = 0.35;
    const backCullProb = 0.95;

    const N = dotCount;
    const GA = Math.PI * (3 - Math.sqrt(5));
    const pts = [];

    for (let i = 0; i < N; i++) {
      const t = i / N;
      const y0 = 1 - 2 * t;
      const r0 = Math.sqrt(1 - y0 * y0);
      const phi = i * GA;

      let x = r0 * Math.cos(phi);
      let z = r0 * Math.sin(phi);
      let y = y0;

      // ellipsoid + jaw taper
      const isLower = y < 0;
      x *= 0.85;
      z *= 0.72;
      if (isLower) {
        const k = (y + 1) / 1;
        x *= (1 - (1 - jawTaper) * (1 - k));
      }

      // forehead shaping
      y *= 0.98 + 0.02 * Math.cos(phi * 3);

      // face detail only on front half
      if (z > 0) {
        const nose = Math.max(0, 0.9 - Math.abs(x) * 2) * noseBump;
        x += nose;
        z += cheekBump * Math.max(0, 1 - Math.abs(x) * 1.8);
      }

      // cull back
      if (z < -backCull && Math.random() < backCullProb) {
        continue;
      }

      // normalize to unit-ish radius
      const mag = Math.hypot(x, y, z) || 1;
      x /= mag; y /= mag; z /= mag;

      // --- organic distortion ---
      const n = pseudoNoise(x, y, z) * noiseAmp;

      const rim = Math.pow(Math.max(0, 1 - Math.abs(z)), 2);
      const fuzz = edgeFuzz * rim * (Math.random() - 0.5);

      const rScale = 1 + n + fuzz;

      pts.push({
        x: x * rScale,
        y: y * rScale,
        z: z * rScale,
        dead: false,
        outlier: false,
      });
    }

    // --- add halo outliers ---
    const outliersToAdd = Math.floor(pts.length * outlierRatio);
    for (let k = 0; k < outliersToAdd; k++) {
      const base = pts[(Math.random() * pts.length) | 0] || { x: randn(), y: randn(), z: randn() };
      let dx = base.x + randn() * 0.6;
      let dy = base.y + randn() * 0.6;
      let dz = base.z + randn() * 0.6;
      const mag = Math.hypot(dx, dy, dz) || 1;
      dx /= mag; dy /= mag; dz /= mag;

      const radius = outlierMin + Math.random() * (outlierMax - outlierMin); // >1
      pts.push({
        x: dx * radius,
        y: dy * radius,
        z: dz * radius,
        dead: false,
        outlier: true,
      });
    }

    // create particles with start positions (assemble from left)
    const startX = -1.8;
    const P = pts.map((tgt, idx) => {
      const jitter = (n) => n + (Math.random() - 0.5) * 0.08;
      const start = {
        x: startX + Math.random() * 0.3,
        y: jitter((Math.random() * 2 - 1) * 0.8),
        z: jitter((Math.random() * 2 - 1) * 0.8),
      };
      const delay = (idx % 90) * (assembleMs / 90);
      return {
        target: tgt,
        p: { ...start },
        start,
        t0: performance.now() + delay,
        r: tgt.outlier ? 0.75 + Math.random() * 0.4 : 1 + Math.random() * 0.6,
        hueMix: Math.random(),
      };
    });

    stateRef.current.points = P;
    stateRef.current.startedAt = performance.now();
    stateRef.current.mounted = true;

    // ===== pointer handling (drag) =====
    const onPointerMove = (e) => {
      const st = stateRef.current;
      const rect = cvs.getBoundingClientRect();

      if (st.drag.active) {
        const dx = e.clientX - st.drag.lastX;
        st.drag.lastX = e.clientX;
        st.drag.accumPx += Math.abs(dx);
        const sensitivity = (Math.PI * 1.75) / rect.width;
        st.rot += dx * sensitivity;
        st.clickAnim = Math.min(1, st.clickAnim + 0.12);
        e.preventDefault();
        return;
      }

      const pointerX = (e.clientX - rect.left) / rect.width;
      stateRef.current.parallax = (pointerX - 0.5) * 0.06;
    };

    const onPointerDown = (e) => {
      const st = stateRef.current;
      st.drag.active = true;
      st.drag.id = e.pointerId;
      st.drag.lastX = e.clientX;
      st.drag.accumPx = 0;
      try { cvs.setPointerCapture?.(e.pointerId); } catch {}
      cvs.style.cursor = "grabbing";
      e.preventDefault();
    };

    const onPointerUpOrCancel = (e) => {
      const st = stateRef.current;
      if (!st.drag.active) return;
      try { cvs.releasePointerCapture?.(st.drag.id); } catch {}
      const wasDrag = st.drag.accumPx > 6;
      st.drag.active = false;
      st.drag.id = null;
      cvs.style.cursor = "grab";

      if (!wasDrag) {
        const rect = cvs.getBoundingClientRect();
        const leftHalf = (e.clientX - rect.left) / rect.width < 0.5;
        const dir = leftHalf ? -1 : 1;
        const delta = (clickStepDeg * Math.PI) / 180 * dir;
        st.rot += delta;
        st.clickAnim = 1;
      }
      e.preventDefault();
    };

    cvs.addEventListener("pointermove", onPointerMove);
    cvs.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUpOrCancel);
    window.addEventListener("pointercancel", onPointerUpOrCancel);

    const lerp = (a, b, t) => a + (b - a) * t;
    const mix = (a, b, t) => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
    const clamp01 = (n) => Math.max(0, Math.min(1, n));

    function draw(now) {
      const st = stateRef.current;
      const { width, height } = cvs;
      const W = width, H = height;
      const scale = Math.min(W, H) * 0.42;

      ctx.clearRect(0, 0, W, H);

      if (!st.reduce && idleSpin) st.rot += 0.003;
      const yaw = st.rot + (st.drag.active ? 0 : st.parallax);

      const c = Math.cos(yaw), s = Math.sin(yaw);
      const cx = W / 2, cy = H / 2;

      const assembleEase = (t) => (t < 0 ? 0 : t > 1 ? 1 : t * t * (3 - 2 * t));
      st.clickAnim *= 0.92;

      for (let i = 0; i < st.points.length; i++) {
        const it = st.points[i];
        const T = it.target;
        if (!T || T.dead) continue;

        const tt = assembleEase((now - it.t0) / assembleMs);
        const x = lerp(it.start.x, T.x, tt);
        const y = lerp(it.start.y, T.y, tt);
        const z = lerp(it.start.z, T.z, tt);

        const rx = c * x + s * z;
        const rz = -s * x + c * z;
        const ry = y;

        const front = clamp01((rz + 1) / 2);
        const baseLum = it.target.outlier ? 0.35 : 0.45;
        const lum = lerp(baseLum, 1.0, Math.pow(front, frontBias * 2));
        const colorT = clamp01((ry + 1) / 2);
        const [r, g, b] = mix(colorA, colorB, colorT);
        ctx.fillStyle = `rgba(${r|0}, ${g|0}, ${b|0}, ${lum})`;

        const px = cx + rx * scale;
        const py = cy + ry * scale;

        const rad = (it.r + st.clickAnim * (it.target.outlier ? 0.25 : 1)) * dpr * 0.72 * (0.8 + 0.4 * front);
        ctx.beginPath();
        ctx.arc(px, py, rad, 0, Math.PI * 2);
        ctx.fill();
      }

      stateRef.current.raf = requestAnimationFrame(draw);
    }

    if (stateRef.current.reduce) {
      const fakeNow = performance.now() + assembleMs * 2;
      draw(fakeNow);
    } else {
      stateRef.current.raf = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(stateRef.current.raf);
      cvs.removeEventListener("pointermove", onPointerMove);
      cvs.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUpOrCancel);
      window.removeEventListener("pointercancel", onPointerUpOrCancel);
      mq.removeEventListener?.("change", onMQ);
    };
  }, [
    size, dotCount, assembleMs, clickStepDeg,
    colorA, colorB, frontBias, idleSpin, profileAngleDeg,
    noiseAmp, noiseFreq, edgeFuzz, outlierRatio, outlierMin, outlierMax
  ]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        display: "block",
        width: `${size}px`,
        height: `${size}px`,
        maskImage:
          "radial-gradient(closest-side, rgba(0,0,0,1) 70%, rgba(0,0,0,.9) 82%, rgba(0,0,0,0) 100%)",
        cursor: "grab",
        touchAction: "none",
        userSelect: "none",
      }}
    />
  );
}
