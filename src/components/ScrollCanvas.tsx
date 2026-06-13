'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ScrollCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    gsap.registerPlugin(ScrollTrigger);

    // Renderer Config
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(container.clientWidth, container.clientHeight, false);
    renderer.shadowMap.enabled = false;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // Holographic Core Group
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Outer Cyan Wireframe Icosahedron
    const outerGeo = new THREE.IcosahedronGeometry(1.3, 2);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    coreGroup.add(outerMesh);

    // Inner Purple Point Core
    const innerGeo = new THREE.IcosahedronGeometry(0.76, 2);
    const innerMat = new THREE.PointsMaterial({
      color: 0x9d00ff,
      size: 0.036,
      transparent: true,
      opacity: 0.78,
    });
    const innerPoints = new THREE.Points(innerGeo, innerMat);
    coreGroup.add(innerPoints);

    // Orbital Rings
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.14,
      side: THREE.DoubleSide,
    });
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x9d00ff,
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide,
    });

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.82, 0.008, 16, 120), ringMat1);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.14, 0.006, 16, 120), ringMat2);
    ring1.rotation.x = Math.PI / 2.5;
    ring2.rotation.x = Math.PI / -2.2;
    coreGroup.add(ring1);
    coreGroup.add(ring2);

    // Lighting (Cast glowing neon highlights)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.14);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x00f0ff, 5.0, 20);
    cyanLight.position.set(-4, 3.5, 4);
    scene.add(cyanLight);

    const blueLight = new THREE.PointLight(0x0055ff, 4.5, 18);
    blueLight.position.set(4, -3.5, 3);
    scene.add(blueLight);

    // Morphing Particle Projection System (3,000 nodes)
    const count = 3000;
    const currentPositions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    // Coordinates 1: Interactive Physics Grid (Hero)
    const spherePos = new Float32Array(count * 3);
    let hIdx = 0;
    const hDim = Math.ceil(Math.sqrt(count)); // 55 x 55 grid
    for (let x = 0; x < hDim; x++) {
      for (let y = 0; y < hDim; y++) {
        if (hIdx >= count) break;
        const xp = ((x - hDim / 2) / (hDim / 2)) * 14.0;
        const yp = ((y - hDim / 2) / (hDim / 2)) * 9.0;
        spherePos[hIdx * 3] = xp;
        spherePos[hIdx * 3 + 1] = yp;
        spherePos[hIdx * 3 + 2] = -1.2;
        hIdx++;
      }
    }

    // Coordinates 2: Wave Space (Showcase)
    const wavePos = new Float32Array(count * 3);
    let idx = 0;
    const gridDim = Math.ceil(Math.sqrt(count)); // 55 x 55 grid
    for (let x = 0; x < gridDim; x++) {
      for (let z = 0; z < gridDim; z++) {
        if (idx >= count) break;
        const xp = ((x - gridDim / 2) / (gridDim / 2)) * 14.0;
        const zp = ((z - gridDim / 2) / (gridDim / 2)) * 9.0;
        wavePos[idx * 3] = xp;
        wavePos[idx * 3 + 1] = 0; // calculated dynamically
        wavePos[idx * 3 + 2] = zp;
        idx++;
      }
    }

    // Coordinates 3: Connected Node Cluster (Services)
    const nodes = [
      new THREE.Vector3(-2.8, 1.8, 0.4),
      new THREE.Vector3(2.6, 1.2, -1.0),
      new THREE.Vector3(-1.9, -1.9, 0.6),
      new THREE.Vector3(2.8, -1.4, 1.0),
      new THREE.Vector3(0, 0.6, -1.8),
      new THREE.Vector3(-2.5, -0.5, -0.5),
    ];
    const networkPos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const node = nodes[i % nodes.length];
      const spread = 0.58;
      const theta = Math.random() * Math.PI * 2;
      const r = Math.random() * spread;
      networkPos[i * 3] = node.x + Math.cos(theta) * r;
      networkPos[i * 3 + 1] = node.y + Math.sin(theta) * r + (Math.random() - 0.5) * spread * 0.5;
      networkPos[i * 3 + 2] = node.z + (Math.random() - 0.5) * spread;
    }

    // Coordinates 4: Flat Matrix Dashboard Grid (Bento)
    const gridPos = new Float32Array(count * 3);
    let gIdx = 0;
    for (let r = 0; r < gridDim; r++) {
      for (let c = 0; c < gridDim; c++) {
        if (gIdx >= count) break;
        gridPos[gIdx * 3] = ((c - gridDim / 2) / (gridDim / 2)) * 14.0;
        gridPos[gIdx * 3 + 1] = ((r - gridDim / 2) / (gridDim / 2)) * 9.0 - 0.6;
        gridPos[gIdx * 3 + 2] = -2.2;
        gIdx++;
      }
    }

    // Initialize Particle Arrays & Colors
    const palette = [
      new THREE.Color('#00f0ff'), // Turquoise
      new THREE.Color('#0055ff'), // Electric Blue
      new THREE.Color('#9d00ff'), // Purple
      new THREE.Color('#d300ff'), // Violet
    ];

    for (let i = 0; i < count; i++) {
      currentPositions[i * 3] = spherePos[i * 3];
      currentPositions[i * 3 + 1] = spherePos[i * 3 + 1];
      currentPositions[i * 3 + 2] = spherePos[i * 3 + 2];

      const color = palette[i % palette.length];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(currentPositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.046,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Anim State
    const animState = {
      progress1: 0, // Sphere -> Wave
      progress2: 0, // Wave -> Network
      progress3: 0, // Network -> Grid
      meshX: 0,
      meshY: 0,
      meshScale: 1,
      meshOpacity: 0.42,
    };

    // Cursor tracking
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    // GSAP Scroll Triggers
    // Hero -> Showcase
    gsap.to(animState, {
      progress1: 1,
      meshX: 2.1,
      meshY: -0.3,
      meshScale: 0.74,
      scrollTrigger: {
        trigger: '#showcase',
        start: 'top bottom',
        end: 'top center',
        scrub: 1.0,
      },
    });

    // Showcase -> Services
    gsap.to(animState, {
      progress2: 1,
      meshX: -2.1,
      meshY: 0.15,
      meshScale: 0.82,
      scrollTrigger: {
        trigger: '#services',
        start: 'top bottom',
        end: 'top center',
        scrub: 1.0,
      },
    });

    // Services -> Bento/Skills
    gsap.to(animState, {
      progress3: 1,
      meshX: 1.7,
      meshY: -1.2,
      meshScale: 0.48,
      meshOpacity: 0.12,
      scrollTrigger: {
        trigger: '#skills',
        start: 'top bottom',
        end: 'top center',
        scrub: 1.0,
      },
    });

    let animationFrameId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const time = clock.getElapsedTime();

      // Mouse Lerping
      mouse.x += (mouse.targetX - mouse.x) * 0.045;
      mouse.y += (mouse.targetY - mouse.y) * 0.045;

      // Animate coreGroup Mesh transforms
      coreGroup.position.x = animState.meshX + mouse.x * 0.42;
      coreGroup.position.y = animState.meshY + mouse.y * 0.42;
      coreGroup.scale.setScalar(animState.meshScale);
      outerMat.opacity = animState.meshOpacity * 0.5;
      innerMat.opacity = animState.meshOpacity * 1.8;

      coreGroup.rotation.y = time * 0.16 + mouse.x * 0.32;
      coreGroup.rotation.x = time * 0.1 + mouse.y * 0.25;

      // Spin orbital rings in opposite directions
      ring1.rotation.y = time * 0.32;
      ring2.rotation.y = -time * 0.48;

      // Interpolate particles
      const positionsAttr = particleGeometry.attributes.position;
      const posArray = positionsAttr.array as Float32Array;

      // Project mouse coordinates to 3D scene space dynamically based on aspect ratio
      const aspect = container.clientWidth / container.clientHeight;
      const spaceMouseY = mouse.y * 4.0;
      const spaceMouseX = mouse.x * 4.0 * aspect;

      // Translate the world mouse position into local space coordinates of the rotated particles mesh
      const localMouse = new THREE.Vector3(spaceMouseX, spaceMouseY, -1.2);
      particles.worldToLocal(localMouse);

      for (let i = 0; i < count; i++) {
        let x = spherePos[i * 3];
        let y = spherePos[i * 3 + 1];
        let z = spherePos[i * 3 + 2];

        // Morph to Vector Wave Space
        if (animState.progress1 > 0) {
          const targetX = wavePos[i * 3];
          const targetZ = wavePos[i * 3 + 2];
          // Fluid holographic waves calculation
          const targetY = Math.sin(targetX * 0.9 + time * 1.6) * Math.cos(targetZ * 0.9 + time * 1.2) * 0.74;

          x = THREE.MathUtils.lerp(x, targetX, animState.progress1);
          y = THREE.MathUtils.lerp(y, targetY, animState.progress1);
          z = THREE.MathUtils.lerp(z, targetZ, animState.progress1);
        }

        // Morph to Connected Nodes
        if (animState.progress2 > 0) {
          const targetX = networkPos[i * 3];
          const targetY = networkPos[i * 3 + 1] + Math.sin(time * 1.1 + (i % 9)) * 0.08;
          const targetZ = networkPos[i * 3 + 2] + Math.cos(time * 1.1 + (i % 9)) * 0.08;

          x = THREE.MathUtils.lerp(x, targetX, animState.progress2);
          y = THREE.MathUtils.lerp(y, targetY, animState.progress2);
          z = THREE.MathUtils.lerp(z, targetZ, animState.progress2);
        }

        // Morph to flat HUD grid
        if (animState.progress3 > 0) {
          const targetX = gridPos[i * 3];
          const ripple = Math.sin(targetX * 0.4 - time * 2.5) * 0.15;
          const targetY = gridPos[i * 3 + 1] + ripple;
          const targetZ = gridPos[i * 3 + 2];

          x = THREE.MathUtils.lerp(x, targetX, animState.progress3);
          y = THREE.MathUtils.lerp(y, targetY, animState.progress3);
          z = THREE.MathUtils.lerp(z, targetZ, animState.progress3);
        }

        // 3D Gravity well mouse grid physics interaction (using local space coordinates)
        const dx = localMouse.x - x;
        const dy = localMouse.y - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 2.2;
        if (dist < maxDist) {
          const force = (1.0 - dist / maxDist) * 0.48;
          x += (dx / dist) * force;
          y += (dy / dist) * force;
          z += force * 1.6; // lift grid in depth
        }

        posArray[i * 3] = x;
        posArray[i * 3 + 1] = y;
        posArray[i * 3 + 2] = z;
      }

      positionsAttr.needsUpdate = true;

      // Slow particle field rotation (Z-axis so it spins and never collapses edge-on)
      particles.rotation.z = time * 0.012;
      particles.rotation.y = mouse.x * 0.08;
      particles.rotation.x = -mouse.y * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    const setSize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    const resizeObserver = new ResizeObserver(setSize);
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', onMouseMove);

      outerGeo.dispose();
      outerMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ring1.geometry.dispose();
      ring2.geometry.dispose();
      ringMat1.dispose();
      ringMat2.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 h-screen w-screen overflow-hidden bg-[#020204]"
      aria-hidden="true"
    >
      <div className="hologram-laser" />
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
