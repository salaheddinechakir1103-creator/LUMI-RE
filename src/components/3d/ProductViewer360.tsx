import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { RotateCw, ZoomIn, ZoomOut, RefreshCcw } from 'lucide-react';

interface ProductViewer360Props {
  productId: string;
  accentColor?: string;
}

export const ProductViewer360: React.FC<ProductViewer360Props> = ({ productId, accentColor = '#D4AF37' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [rotationSpeed, setRotationSpeed] = useState<number>(0.005);
  const isDragging = useRef(false);
  const previousMouse = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
    camera.position.set(0, 0.2, 3.8);
    cameraRef.current = camera;

    // Room environment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // Studio Lights
    const key = new THREE.DirectionalLight(0xFFF0DD, 3.0);
    key.position.set(2, 3, 3);
    scene.add(key);

    const rim = new THREE.DirectionalLight(0xFFFFFF, 2.5);
    rim.position.set(-2, 2, -3);
    scene.add(rim);

    const amb = new THREE.AmbientLight(0x22222B, 1.0);
    scene.add(amb);

    // Procedural Product Geometry
    const productGroup = new THREE.Group();
    scene.add(productGroup);

    // Create realistic 3D bottle
    const glassGeo = new THREE.CylinderGeometry(0.7, 0.7, 1.3, 32);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xFFFFFF,
      transmission: 0.94,
      transparent: true,
      roughness: 0.05,
      metalness: 0.05,
      ior: 1.5,
      thickness: 1.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      depthWrite: false,
    });
    const glass = new THREE.Mesh(glassGeo, glassMat);
    glass.position.y = 0.65;
    productGroup.add(glass);

    // Liquid
    const liquidGeo = new THREE.CylinderGeometry(0.62, 0.62, 1.15, 32);
    const liquidMat = new THREE.MeshPhysicalMaterial({
      color: 0xEAA230,
      transmission: 0.85,
      transparent: true,
      roughness: 0.1,
      metalness: 0.1,
      ior: 1.35,
      thickness: 0.7,
      attenuationColor: new THREE.Color(0xEAA230),
      attenuationDistance: 1.2,
    });
    const liquid = new THREE.Mesh(liquidGeo, liquidMat);
    liquid.position.y = 0.62;
    productGroup.add(liquid);

    // Gold Cap
    const capGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.5, 32);
    const capMat = new THREE.MeshStandardMaterial({
      color: 0xD4AF37,
      metalness: 0.95,
      roughness: 0.2,
    });
    const cap = new THREE.Mesh(capGeo, capMat);
    cap.position.y = 1.55;
    productGroup.add(cap);

    // Collar
    const collarGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.2, 32);
    const collar = new THREE.Mesh(collarGeo, capMat);
    collar.position.y = 1.35;
    productGroup.add(collar);

    // Ground Shadow
    const shadowGeo = new THREE.PlaneGeometry(2.5, 2.5);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.35,
    });
    const shadow = new THREE.Mesh(shadowGeo, shadowMat);
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = -0.01;
    productGroup.add(shadow);

    // Pointer events
    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      previousMouse.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const deltaX = e.clientX - previousMouse.current.x;
      const deltaY = e.clientY - previousMouse.current.y;
      targetRotation.current.y += deltaX * 0.012;
      targetRotation.current.x = Math.max(-0.4, Math.min(0.4, targetRotation.current.x + deltaY * 0.008));
      previousMouse.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging.current = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging.current = true;
        previousMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMouse.current.x;
      const deltaY = e.touches[0].clientY - previousMouse.current.y;
      targetRotation.current.y += deltaX * 0.015;
      targetRotation.current.x = Math.max(-0.4, Math.min(0.4, targetRotation.current.x + deltaY * 0.01));
      previousMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onTouchEnd = () => {
      isDragging.current = false;
    };

    container.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Render loop
    let animId: number;
    const animate = () => {
      if (!isDragging.current) {
        targetRotation.current.y += rotationSpeed;
      }
      currentRotation.current.y = THREE.MathUtils.damp(currentRotation.current.y, targetRotation.current.y, 8, 0.016);
      currentRotation.current.x = THREE.MathUtils.damp(currentRotation.current.x, targetRotation.current.x, 8, 0.016);

      productGroup.rotation.y = currentRotation.current.y;
      productGroup.rotation.x = currentRotation.current.x;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, [rotationSpeed]);

  const handleZoom = (direction: 'in' | 'out') => {
    if (!cameraRef.current) return;
    const newZ = direction === 'in' 
      ? Math.max(2.4, cameraRef.current.position.z - 0.4) 
      : Math.min(5.5, cameraRef.current.position.z + 0.4);
    cameraRef.current.position.z = newZ;
    setZoomLevel(direction === 'in' ? zoomLevel + 0.2 : Math.max(0.6, zoomLevel - 0.2));
  };

  const resetView = () => {
    if (cameraRef.current) cameraRef.current.position.set(0, 0.2, 3.8);
    targetRotation.current = { x: 0, y: 0 };
    setZoomLevel(1);
  };

  return (
    <div className="relative w-full h-[460px] md:h-[540px] bg-[#0E0E14] border border-white/10 flex flex-col justify-between overflow-hidden">
      {/* 360 Title Indicator */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37] block">
          Visionneuse 360° Studio
        </span>
        <span className="text-xs text-zinc-400">Interaction tactile et rotation fluide</span>
      </div>

      {/* Canvas */}
      <div 
        ref={mountRef} 
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
      />

      {/* Floating Viewport Controls */}
      <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 p-1 bg-black/60 backdrop-blur-md border border-white/10">
        <button
          onClick={() => handleZoom('in')}
          className="p-2 text-zinc-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          title="Zoomer"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleZoom('out')}
          className="p-2 text-zinc-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          title="Dézoomer"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={resetView}
          className="p-2 text-zinc-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer border-l border-white/10"
          title="Réinitialiser l'angle"
        >
          <RefreshCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
