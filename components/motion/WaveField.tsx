"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uAmp;
  uniform float uSize;
  uniform float uPixelRatio;
  attribute float aRand;
  varying float vDepth;
  varying float vHeight;

  void main() {
    vec3 p = position;
    float t = uTime;
    // three overlapping swells
    float h = sin(p.x * 0.16 + t * 0.9) * 0.9
            + sin(p.z * 0.30 + t * 1.25) * 0.6
            + sin((p.x + p.z) * 0.11 + t * 0.55) * 1.1;
    p.y += h * uAmp;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uPixelRatio * (0.8 + aRand * 0.7) * (16.0 / -mv.z);
    vDepth = clamp((-mv.z - 6.0) / 46.0, 0.0, 1.0);
    vHeight = h;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uNear;
  uniform vec3 uFar;
  uniform float uOpacity;
  varying float vDepth;
  varying float vHeight;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float glow = smoothstep(0.5, 0.0, d);
    vec3 color = mix(uNear, uFar, vDepth) + vHeight * 0.05;
    gl_FragColor = vec4(color, glow * uOpacity * (1.0 - vDepth * 0.75));
  }
`;

/**
 * Three.js "sea of light": a field of points rising and falling like ocean swell.
 * GSAP fades the swell in and tilts the field as the section scrolls away.
 * Loaded after the page is interactive; paused off screen; static for reduced motion.
 */
export function WaveField({ className = "" }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      if (disposed) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const small = window.innerWidth < 768;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "low-power" });
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      renderer.setPixelRatio(dpr);
      renderer.setClearColor(0x000000, 0);
      renderer.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%";
      el.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 200);
      camera.position.set(0, 8, 12);
      camera.lookAt(0, -1.5, -10);

      // grid of points across the "sea"
      const cols = small ? 90 : 170;
      const rows = small ? 42 : 70;
      const count = cols * rows;
      const positions = new Float32Array(count * 3);
      const rand = new Float32Array(count);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          positions[i * 3] = (c / (cols - 1) - 0.5) * 110;
          positions[i * 3 + 1] = 0;
          positions[i * 3 + 2] = -60 + (r / (rows - 1)) * 66;
          rand[i] = Math.random();
        }
      }
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("aRand", new THREE.BufferAttribute(rand, 1));

      const uniforms = {
        uTime: { value: 0 },
        uAmp: { value: reduce ? 1 : 0 },
        uSize: { value: small ? 3.4 : 4.2 },
        uPixelRatio: { value: dpr },
        uOpacity: { value: reduce ? 0.95 : 0 },
        uNear: { value: new THREE.Color("#3d7cc8") }, // ocean signal light
        uFar: { value: new THREE.Color("#1e4a86") }, // deep ocean toward the horizon
      };
      const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const points = new THREE.Points(geometry, material);
      scene.add(points);

      const resize = () => {
        const { clientWidth: w, clientHeight: h } = el;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(el);

      const clock = new THREE.Clock();
      let raf = 0;
      let visible = true;
      const frame = () => {
        raf = 0;
        uniforms.uTime.value = clock.getElapsedTime();
        renderer.render(scene, camera);
        if (visible && !reduce) raf = requestAnimationFrame(frame);
      };
      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !raf && !reduce) raf = requestAnimationFrame(frame);
      });
      io.observe(el);
      frame();

      // GSAP: swell and glow rise in, then the field tilts as the hero scrolls away
      const ctx = gsap.context(() => {
        if (reduce) return;
        gsap.to(uniforms.uAmp, { value: 1, duration: 3, ease: "power2.out", delay: 0.6 });
        gsap.to(uniforms.uOpacity, { value: 1, duration: 2.2, ease: "power1.out", delay: 0.4 });
        gsap.to(points.rotation, {
          x: 0.22,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 60%", end: "bottom top", scrub: true },
        });
      });
      ScrollTrigger.refresh();

      cleanup = () => {
        ctx.revert();
        io.disconnect();
        ro.disconnect();
        cancelAnimationFrame(raf);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return <div ref={host} aria-hidden="true" className={`pointer-events-none ${className}`} />;
}
