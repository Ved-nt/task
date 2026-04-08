import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

const paletteMap = {
  spring: {
    main: 0x2f855a,
    side: 0x9ed8ad,
    lightA: 0xfff3cd,
    lightB: 0x6bcf9f,
  },
  summer: {
    main: 0xc46a15,
    side: 0xffcf6c,
    lightA: 0xffa94d,
    lightB: 0xffe8a1,
  },
  autumn: {
    main: 0xa03f27,
    side: 0xe38b6e,
    lightA: 0xffd5b2,
    lightB: 0xbf5d3e,
  },
  winter: {
    main: 0x255b8d,
    side: 0x8abce0,
    lightA: 0xe4f3ff,
    lightB: 0x5f9ccc,
  },
};

export default function BackgroundScene({ theme = "spring" }) {
  const mountRef = useRef(null);
  const meshRef = useRef(null);
  const lightOneRef = useRef(null);
  const lightTwoRef = useRef(null);
  const frameRef = useRef(0);

  useEffect(() => {
    if (!mountRef.current) return;
    const mountNode = mountRef.current;

    const scene = new THREE.Scene();

    const activePalette = paletteMap.spring;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountNode.appendChild(renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(15, 4);
    const material = new THREE.MeshPhongMaterial({
      color: activePalette.main,
      emissive: activePalette.side,
      emissiveIntensity: 0.16,
      shininess: 80,
      specular: 0xffffff,
      flatShading: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    meshRef.current = mesh;

    const light1 = new THREE.PointLight(activePalette.lightA, 1.1, 120);
    light1.position.set(20, 20, 20);
    scene.add(light1);
    lightOneRef.current = light1;

    const light2 = new THREE.PointLight(activePalette.lightB, 0.9, 120);
    light2.position.set(-20, -20, -20);
    scene.add(light2);
    lightTwoRef.current = light2;

    const ambient = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambient);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      mesh.rotation.x += 0.003;
      mesh.rotation.y += 0.002;
      mesh.position.y = Math.sin(Date.now() * 0.0006) * 0.8;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", handleResize);
      if (mountNode.contains(renderer.domElement)) {
        mountNode.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    const palette = paletteMap[theme] || paletteMap.spring;
    const mesh = meshRef.current;
    const light1 = lightOneRef.current;
    const light2 = lightTwoRef.current;
    if (!mesh || !light1 || !light2) return;

    const targetMain = new THREE.Color(palette.main);
    const targetSide = new THREE.Color(palette.side);
    const colorProxy = {
      r: mesh.material.color.r,
      g: mesh.material.color.g,
      b: mesh.material.color.b,
      er: mesh.material.emissive.r,
      eg: mesh.material.emissive.g,
      eb: mesh.material.emissive.b,
    };

    gsap.to(colorProxy, {
      r: targetMain.r,
      g: targetMain.g,
      b: targetMain.b,
      er: targetSide.r,
      eg: targetSide.g,
      eb: targetSide.b,
      duration: 0.8,
      ease: "power2.out",
      onUpdate: () => {
        mesh.material.color.setRGB(colorProxy.r, colorProxy.g, colorProxy.b);
        mesh.material.emissive.setRGB(
          colorProxy.er,
          colorProxy.eg,
          colorProxy.eb,
        );
      },
    });

    gsap.to(mesh.rotation, {
      y: mesh.rotation.y + 0.5,
      duration: 1,
      ease: "power2.out",
    });

    light1.color.setHex(palette.lightA);
    light2.color.setHex(palette.lightB);
  }, [theme]);

  return <div ref={mountRef} className="fixed inset-0 -z-10" />;
}
