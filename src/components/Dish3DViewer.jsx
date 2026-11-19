import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const DISH_PALETTES = [
  { main: 0xd97724, rim: 0xf8fafc, garnish: 0x22c55e, spice: 0xef4444 },
  { main: 0xe05a2b, rim: 0xffffff, garnish: 0x16a34a, spice: 0xfacc15 },
  { main: 0x9a3412, rim: 0xf1f5f9, garnish: 0x15803d, spice: 0xf97316 },
  { main: 0x65a30d, rim: 0xffffff, garnish: 0xf59e0b, spice: 0xef4444 },
  { main: 0xea580c, rim: 0xf8fafc, garnish: 0x22c55e, spice: 0xeab308 }
];

function Dish3DViewer({ recipes }) {
  const mountRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const dishGroupRef = useRef(null);
  const materialsRef = useRef(null);

  const activeRecipe = recipes[activeIndex] || recipes[0];

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = 260;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 3.4, 5.4);
    camera.lookAt(0, 0.2, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff5eb, 1.8);
    keyLight.position.set(4, 7, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xff8c5a, 0.9);
    rimLight.position.set(-5, 3, -4);
    scene.add(rimLight);

    // Root 3D Group
    const dishGroup = new THREE.Group();
    dishGroupRef.current = dishGroup;
    scene.add(dishGroup);

    // 1. Sculpted Ceramic Plate Base
    const plateGeo = new THREE.CylinderGeometry(2.15, 1.55, 0.24, 48);
    const plateMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.22,
      metalness: 0.08
    });
    const plateMesh = new THREE.Mesh(plateGeo, plateMat);
    dishGroup.add(plateMesh);

    // Inner Gold Accent Ring
    const ringGeo = new THREE.TorusGeometry(1.78, 0.03, 16, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.25,
      metalness: 0.75
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = 0.13;
    dishGroup.add(ringMesh);

    // 2. Main Sculpted Dish Mound
    const foodGeo = new THREE.SphereGeometry(1.25, 36, 24, 0, Math.PI * 2, 0, Math.PI * 0.48);
    const foodMat = new THREE.MeshStandardMaterial({
      color: DISH_PALETTES[0].main,
      roughness: 0.48,
      metalness: 0.05
    });
    const foodMesh = new THREE.Mesh(foodGeo, foodMat);
    foodMesh.scale.set(1.1, 0.55, 1.1);
    foodMesh.position.y = 0.11;
    dishGroup.add(foodMesh);

    // 3. Garnish & Spice Cubes/Spheres on Top
    const garnishMat = new THREE.MeshStandardMaterial({
      color: DISH_PALETTES[0].garnish,
      roughness: 0.4
    });
    const spiceMat = new THREE.MeshStandardMaterial({
      color: DISH_PALETTES[0].spice,
      roughness: 0.35
    });

    materialsRef.current = { foodMat, garnishMat, spiceMat };

    const garnishGroup = new THREE.Group();
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const herb = new THREE.Mesh(
        new THREE.DodecahedronGeometry(0.14, 0),
        i % 2 === 0 ? garnishMat : spiceMat
      );
      herb.position.set(Math.cos(angle) * 0.68, 0.58, Math.sin(angle) * 0.68);
      garnishGroup.add(herb);
    }
    dishGroup.add(garnishGroup);

    // 4. Orbiting 3D Ingredient Nodes
    const orbitGroup = new THREE.Group();
    for (let i = 0; i < 3; i++) {
      const angle = (i / 3) * Math.PI * 2;
      const orb = new THREE.Mesh(
        new THREE.SphereGeometry(0.16, 24, 24),
        i === 0 ? spiceMat : garnishMat
      );
      orb.position.set(Math.cos(angle) * 2.45, 0.65, Math.sin(angle) * 2.45);
      orbitGroup.add(orb);
    }
    dishGroup.add(orbitGroup);

    // Drag / Touch Interaction
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;

    const onDown = (x, y) => {
      isDragging = true;
      prevX = x;
      prevY = y;
    };
    const onMove = (x, y) => {
      if (!isDragging) return;
      const dx = x - prevX;
      const dy = y - prevY;
      prevX = x;
      prevY = y;
      dishGroup.rotation.y += dx * 0.012;
      dishGroup.rotation.x = Math.max(
        -0.35,
        Math.min(0.45, dishGroup.rotation.x + dy * 0.008)
      );
    };
    const onUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    const handleMouseDown = (e) => onDown(e.clientX, e.clientY);
    const handleMouseMove = (e) => onMove(e.clientX, e.clientY);
    const handleTouchStart = (e) => {
      if (e.touches[0]) onDown(e.touches[0].clientX, e.touches[0].clientY);
    };
    const handleTouchMove = (e) => {
      if (e.touches[0]) onMove(e.touches[0].clientX, e.touches[0].clientY);
    };

    dom.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", onUp);
    dom.addEventListener("touchstart", handleTouchStart, { passive: true });
    dom.addEventListener("touchmove", handleTouchMove, { passive: true });
    dom.addEventListener("touchend", onUp);

    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      if (!isDragging) {
        dishGroup.rotation.y += 0.006;
      }
      orbitGroup.rotation.y -= 0.012;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || 320;
      camera.aspect = newW / height;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, height);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      dom.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", onUp);
      dom.removeEventListener("touchstart", handleTouchStart);
      dom.removeEventListener("touchmove", handleTouchMove);
      dom.removeEventListener("touchend", onUp);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  // Update 3D Dish Colors When Switching Dish
  useEffect(() => {
    if (!materialsRef.current) return;
    const palette = DISH_PALETTES[activeIndex % DISH_PALETTES.length];
    materialsRef.current.foodMat.color.setHex(palette.main);
    materialsRef.current.garnishMat.color.setHex(palette.garnish);
    materialsRef.current.spiceMat.color.setHex(palette.spice);
  }, [activeIndex]);

  return (
    <div className="viewer-3d-box">
      <div ref={mountRef} className="canvas-3d-mount" />

      <div className="viewer-3d-footer">
        <span className="viewer-dish-name">{activeRecipe.name}</span>
        <span className="viewer-hint">Drag with finger to rotate dish</span>

        <div className="viewer-dots">
          {recipes.slice(0, 5).map((item, idx) => (
            <button
              key={item.id}
              type="button"
              className={`viewer-thumb ${idx === activeIndex ? "active" : ""}`}
              onClick={() => setActiveIndex(idx)}
              aria-label={`View ${item.name}`}
            >
              <img src={item.image} alt="" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dish3DViewer;
