import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function BackgroundScene() {
  const mountRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const mount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 80;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mount.appendChild(renderer.domElement);

    // 🔵 PARTICLES
    const particleCount = 1200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 200;
    }

    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const material = new THREE.PointsMaterial({
      size: 1.5,
      color: 0x6366f1,
      transparent: true,
      opacity: 0.7,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // 💡 LIGHTS
    const light1 = new THREE.PointLight(0x6366f1, 1.5, 300);
    const light2 = new THREE.PointLight(0xf43f5e, 1.5, 300);
    scene.add(light1, light2);

    // 🌈 AMBIENT
    const ambient = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambient);

    // 📱 RESPONSIVE
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // 🎬 ANIMATION
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      // Particle wave motion 🌊
      const pos = geometry.attributes.position.array;
      for (let i = 0; i < pos.length; i += 3) {
        pos[i + 1] += Math.sin(time + pos[i] * 0.01) * 0.02;
      }
      geometry.attributes.position.needsUpdate = true;

      // Slow rotation
      particles.rotation.y += 0.0008;

      // Moving lights
      light1.position.set(
        Math.sin(time) * 50,
        Math.cos(time * 0.5) * 40,
        30
      );

      light2.position.set(
        Math.cos(time * 0.7) * 50,
        Math.sin(time) * 40,
        -30
      );

      renderer.render(scene, camera);
    };

    animate();

    // 🧹 CLEANUP
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", handleResize);

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }

      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-br from-indigo-50 via-white to-pink-50" ref={mountRef} />
  );
}