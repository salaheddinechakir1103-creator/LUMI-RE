import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Sparkles, RotateCw, Eye, Maximize2, Droplets, Check } from 'lucide-react';

interface FinishOption {
  id: string;
  name: string;
  liquidColor: number;
  capColor: number;
  label: string;
}

const FINISH_OPTIONS: FinishOption[] = [
  { id: 'solaris', name: 'Or Solaire', liquidColor: 0xEEA734, capColor: 0xD4AF37, label: 'Ambré Solaire' },
  { id: 'nocturne', name: 'Ambre Noir', liquidColor: 0x6E3514, capColor: 0x2A2A33, label: 'Ruthenium Sombre' },
  { id: 'rose', name: 'Rose Crépuscule', liquidColor: 0xC4536A, capColor: 0xE8A598, label: 'Or Rose Floral' },
  { id: 'emeraude', name: 'Émeraude Royale', liquidColor: 0x1B5E43, capColor: 0xC5A059, label: 'Vert Impérial' },
];

export const Hero3DPerfume: React.FC<{
  onAddToCart?: () => void;
  onExploreCollection?: () => void;
}> = ({ onAddToCart, onExploreCollection }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedFinish, setSelectedFinish] = useState<FinishOption>(FINISH_OPTIONS[0]);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [isDockOpen, setIsDockOpen] = useState<boolean>(true);
  const [activePreset, setActivePreset] = useState<'front' | 'threeQuarter' | 'topCap' | 'macro'>('threeQuarter');
  const [isSpraying, setIsSpraying] = useState<boolean>(false);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);

  // References to dynamic 3D elements
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const bottleGroupRef = useRef<THREE.Group | null>(null);
  const liquidMeshRef = useRef<THREE.Mesh | null>(null);
  const capMeshRef = useRef<THREE.Mesh | null>(null);
  const collarMeshRef = useRef<THREE.Mesh | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const particleVelocitiesRef = useRef<Float32Array | null>(null);

  // Interaction tracking
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: -0.35 });
  const currentRotation = useRef({ x: 0, y: -0.35 });
  const cameraTargetPos = useRef(new THREE.Vector3(0, 0.4, 4.2));

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    // Initialize Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance',
        alpha: true,
      });
    } catch {
      setWebglSupported(false);
      return;
    }

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;

    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 4.2);
    cameraRef.current = camera;

    // Studio Environment Reflections
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const roomEnv = new RoomEnvironment();
    scene.environment = pmremGenerator.fromScene(roomEnv, 0.04).texture;
    pmremGenerator.dispose();

    // Studio Lighting
    const keyLight = new THREE.DirectionalLight(0xFFF6E5, 3.2);
    keyLight.position.set(3, 4, 3.5);
    keyLight.castShadow = !isSoftwareGl;
    if (keyLight.castShadow) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xD8E8FF, 1.4);
    fillLight.position.set(-3.5, 1.5, 2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xFFFFFF, 3.8);
    rimLight.position.set(0, 4, -4);
    scene.add(rimLight);

    const ambientLight = new THREE.AmbientLight(0x1F1F28, 0.8);
    scene.add(ambientLight);

    // ==========================================
    // PROCEDURAL LUXURY PERFUME BOTTLE (3-12 parts)
    // ==========================================
    const bottleGroup = new THREE.Group();
    bottleGroup.position.set(0, -0.6, 0);
    bottleGroupRef.current = bottleGroup;
    scene.add(bottleGroup);

    // 1. Crystal Faceted Flask Body (Outer Glass)
    const bottleWidth = 1.4;
    const bottleHeight = 1.7;
    const bottleDepth = 0.95;
    const glassGeometry = new THREE.BoxGeometry(bottleWidth, bottleHeight, bottleDepth, 4, 4, 4);

    // Subtle chamfer effect on vertices
    const pos = glassGeometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const vx = pos.getX(i);
      const vy = pos.getY(i);
      const vz = pos.getZ(i);
      const cornerDist = Math.hypot(vx, vz);
      if (Math.abs(vy) < 0.7 && cornerDist > 0.6) {
        pos.setX(i, vx * 0.96);
        pos.setZ(i, vz * 0.96);
      }
    }
    glassGeometry.computeVertexNormals();

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xFFFFFF,
      transmission: isSoftwareGl ? 0 : 0.94,
      opacity: isSoftwareGl ? 0.35 : 1,
      transparent: true,
      roughness: 0.04,
      metalness: 0.05,
      ior: 1.52,
      thickness: 1.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      attenuationColor: new THREE.Color(0xFFF9E8),
      attenuationDistance: 2.5,
      depthWrite: false,
    });
    const glassMesh = new THREE.Mesh(glassGeometry, glassMaterial);
    glassMesh.position.y = 0.85;
    glassMesh.castShadow = !isSoftwareGl;
    glassMesh.receiveShadow = !isSoftwareGl;
    bottleGroup.add(glassMesh);

    // 2. Liquid Core inside Glass (Slightly smaller cavity)
    const liquidGeom = new THREE.BoxGeometry(bottleWidth * 0.82, bottleHeight * 0.78, bottleDepth * 0.78);
    const liquidMaterial = new THREE.MeshPhysicalMaterial({
      color: selectedFinish.liquidColor,
      transmission: isSoftwareGl ? 0 : 0.82,
      opacity: isSoftwareGl ? 0.75 : 0.95,
      transparent: true,
      roughness: 0.12,
      metalness: 0.1,
      ior: 1.38,
      thickness: 0.8,
      attenuationColor: new THREE.Color(selectedFinish.liquidColor),
      attenuationDistance: 1.0,
    });
    const liquidMesh = new THREE.Mesh(liquidGeom, liquidMaterial);
    liquidMesh.position.y = 0.78;
    liquidMeshRef.current = liquidMesh;
    bottleGroup.add(liquidMesh);

    // 3. Atomiser Dip Tube (Thin Frosted Glass)
    const tubeGeom = new THREE.CylinderGeometry(0.015, 0.015, 1.4, 16);
    const tubeMat = new THREE.MeshStandardMaterial({
      color: 0xFFFFFF,
      roughness: 0.2,
      metalness: 0.1,
      transparent: true,
      opacity: 0.7,
    });
    const tubeMesh = new THREE.Mesh(tubeGeom, tubeMat);
    tubeMesh.position.set(0, 0.85, 0);
    bottleGroup.add(tubeMesh);

    // 4. Gold Neck Ring & Atomiser Collar
    const collarGeom = new THREE.CylinderGeometry(0.24, 0.28, 0.32, 32);
    const collarMat = new THREE.MeshStandardMaterial({
      color: selectedFinish.capColor,
      metalness: 0.95,
      roughness: 0.18,
    });
    const collarMesh = new THREE.Mesh(collarGeom, collarMat);
    collarMesh.position.y = 1.76;
    collarMeshRef.current = collarMesh;
    bottleGroup.add(collarMesh);

    // 5. Heavy Beveled Luxury Cap (Octagonal Prism)
    const capGeom = new THREE.CylinderGeometry(0.55, 0.55, 0.42, 8);
    const capMat = new THREE.MeshPhysicalMaterial({
      color: selectedFinish.capColor,
      metalness: 0.96,
      roughness: 0.18,
      clearcoat: 0.4,
      clearcoatRoughness: 0.1,
    });
    const capMesh = new THREE.Mesh(capGeom, capMat);
    capMesh.position.y = 2.12;
    capMesh.castShadow = !isSoftwareGl;
    capMeshRef.current = capMesh;
    bottleGroup.add(capMesh);

    // 6. Luxury Front Label Plaque with Procedural Stamped Typography
    const labelCanvas = document.createElement('canvas');
    labelCanvas.width = 512;
    labelCanvas.height = 256;
    const ctx = labelCanvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#0E0E12';
      ctx.fillRect(0, 0, 512, 256);
      
      // Fine gold border
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 4;
      ctx.strokeRect(16, 16, 480, 224);

      // Typography
      ctx.fillStyle = '#D4AF37';
      ctx.textAlign = 'center';
      ctx.font = '600 36px "Cormorant Garamond", serif';
      ctx.fillText('LUMIÈRE', 256, 85);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = '400 16px "Plus Jakarta Sans", sans-serif';
      ctx.letterSpacing = '6px';
      ctx.fillText('PARIS & CASABLANCA', 256, 125);

      ctx.fillStyle = '#A1A1AA';
      ctx.font = 'italic 18px "Cormorant Garamond", serif';
      ctx.fillText('Élixir de Lumière · Extrait Absolu', 256, 168);

      ctx.font = '500 13px "Space Mono", monospace';
      ctx.fillText('100 ML · 3.4 FL. OZ · 32% VOL', 256, 205);
    }
    const labelTex = new THREE.CanvasTexture(labelCanvas);
    labelTex.colorSpace = THREE.SRGBColorSpace;
    labelTex.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const labelGeom = new THREE.PlaneGeometry(0.9, 0.46);
    const labelMat = new THREE.MeshStandardMaterial({
      map: labelTex,
      roughness: 0.35,
      metalness: 0.25,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    });
    const labelMesh = new THREE.Mesh(labelGeom, labelMat);
    labelMesh.position.set(0, 0.85, (bottleDepth / 2) + 0.005);
    bottleGroup.add(labelMesh);

    // 7. Ground Contact Shadow
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const gradient = sCtx.createRadialGradient(128, 128, 10, 128, 128, 120);
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0.65)');
      gradient.addColorStop(0.4, 'rgba(0, 0, 0, 0.3)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      sCtx.fillStyle = gradient;
      sCtx.fillRect(0, 0, 256, 256);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeom = new THREE.PlaneGeometry(3.5, 3.5);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeom, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -0.01;
    bottleGroup.add(shadowMesh);

    // 8. Interactive Golden Mist Spray Particles
    const particleCount = 200;
    const particleGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      // Start in dormant state inside cap
      particlePositions[i * 3] = 0;
      particlePositions[i * 3 + 1] = 2.3;
      particlePositions[i * 3 + 2] = 0;

      particleVelocities[i * 3] = (Math.random() - 0.5) * 0.04;
      particleVelocities[i * 3 + 1] = 0.02 + Math.random() * 0.05;
      particleVelocities[i * 3 + 2] = 0.03 + Math.random() * 0.06;
    }
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xFFE899,
      size: 0.03,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    bottleGroup.add(particles);
    particlesRef.current = particles;
    particleVelocitiesRef.current = particleVelocities;

    // Mouse and Pointer Handlers
    const onPointerDown = (e: MouseEvent) => {
      isDragging.current = true;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mousePos.current.targetX = normX * 0.4;
      mousePos.current.targetY = normY * 0.3;

      if (isDragging.current) {
        const deltaX = e.clientX - previousMousePosition.current.x;
        const deltaY = e.clientY - previousMousePosition.current.y;
        targetRotation.current.y += deltaX * 0.012;
        targetRotation.current.x = Math.max(-0.4, Math.min(0.4, targetRotation.current.x + deltaY * 0.008));
        previousMousePosition.current = { x: e.clientX, y: e.clientY };
      }
    };

    const onPointerUp = () => {
      isDragging.current = false;
    };

    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    // Touch handlers for mobile
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging.current = true;
        previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (isDragging.current && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - previousMousePosition.current.x;
        const deltaY = e.touches[0].clientY - previousMousePosition.current.y;
        targetRotation.current.y += deltaX * 0.015;
        targetRotation.current.x = Math.max(-0.4, Math.min(0.4, targetRotation.current.x + deltaY * 0.01));
        previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchEnd = () => {
      isDragging.current = false;
    };
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth auto-rotation if idle and active
      if (isRotating && !isDragging.current) {
        targetRotation.current.y += 0.006;
      }

      // Smooth exponential damping
      currentRotation.current.y = THREE.MathUtils.damp(currentRotation.current.y, targetRotation.current.y, 8, delta);
      currentRotation.current.x = THREE.MathUtils.damp(currentRotation.current.x, targetRotation.current.x, 8, delta);

      // Subtle levitation bobbing
      const floatOffset = Math.sin(elapsed * 1.5) * 0.04;
      bottleGroup.position.y = -0.55 + floatOffset;

      bottleGroup.rotation.y = currentRotation.current.y;
      bottleGroup.rotation.x = currentRotation.current.x;

      // Mouse parallax tilt
      mousePos.current.x = THREE.MathUtils.damp(mousePos.current.x, mousePos.current.targetX, 4, delta);
      mousePos.current.y = THREE.MathUtils.damp(mousePos.current.y, mousePos.current.targetY, 4, delta);

      // Interpolate camera to preset target
      camera.position.x = THREE.MathUtils.damp(camera.position.x, cameraTargetPos.current.x + mousePos.current.x, 3, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, cameraTargetPos.current.y + mousePos.current.y, 3, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, cameraTargetPos.current.z, 3, delta);
      camera.lookAt(0, 0.7, 0);

      // Animate Mist Particles if Spraying
      if (particlesRef.current && particleVelocitiesRef.current) {
        const pMat = particlesRef.current.material as THREE.PointsMaterial;
        const pPos = particlesRef.current.geometry.attributes.position;
        const pV = particleVelocitiesRef.current;

        if (pMat.opacity > 0.01) {
          for (let i = 0; i < particleCount; i++) {
            pPos.setX(i, pPos.getX(i) + pV[i * 3]);
            pPos.setY(i, pPos.getY(i) + pV[i * 3 + 1]);
            pPos.setZ(i, pPos.getZ(i) + pV[i * 3 + 2]);
          }
          pPos.needsUpdate = true;
          pMat.opacity = Math.max(0, pMat.opacity - delta * 0.6);
        }
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, []);

  // Update Materials when Finish changes
  useEffect(() => {
    if (liquidMeshRef.current) {
      const mat = liquidMeshRef.current.material as THREE.MeshPhysicalMaterial;
      mat.color.setHex(selectedFinish.liquidColor);
      mat.attenuationColor.setHex(selectedFinish.liquidColor);
    }
    if (capMeshRef.current) {
      const mat = capMeshRef.current.material as THREE.MeshPhysicalMaterial;
      mat.color.setHex(selectedFinish.capColor);
    }
    if (collarMeshRef.current) {
      const mat = collarMeshRef.current.material as THREE.MeshStandardMaterial;
      mat.color.setHex(selectedFinish.capColor);
    }
  }, [selectedFinish]);

  // Handle Camera Presets
  const setCameraView = (view: 'front' | 'threeQuarter' | 'topCap' | 'macro') => {
    setActivePreset(view);
    if (!cameraTargetPos.current) return;

    if (view === 'front') {
      cameraTargetPos.current.set(0, 0.8, 3.8);
      targetRotation.current = { x: 0, y: 0 };
    } else if (view === 'threeQuarter') {
      cameraTargetPos.current.set(0, 0.5, 4.2);
      targetRotation.current = { x: 0.1, y: -0.45 };
    } else if (view === 'topCap') {
      cameraTargetPos.current.set(0, 2.2, 2.4);
      targetRotation.current = { x: -0.35, y: -0.2 };
    } else if (view === 'macro') {
      cameraTargetPos.current.set(0, 0.85, 2.1);
      targetRotation.current = { x: 0, y: 0.05 };
    }
  };

  // Trigger Spray Interaction
  const triggerSpray = () => {
    setIsSpraying(true);
    if (particlesRef.current && particleVelocitiesRef.current) {
      const pMat = particlesRef.current.material as THREE.PointsMaterial;
      const pPos = particlesRef.current.geometry.attributes.position;
      const pV = particleVelocitiesRef.current;

      pMat.opacity = 0.95;
      for (let i = 0; i < pPos.count; i++) {
        pPos.setX(i, (Math.random() - 0.5) * 0.1);
        pPos.setY(i, 2.25);
        pPos.setZ(i, (Math.random() - 0.5) * 0.1);

        pV[i * 3] = (Math.random() - 0.5) * 0.05;
        pV[i * 3 + 1] = 0.03 + Math.random() * 0.06;
        pV[i * 3 + 2] = 0.04 + Math.random() * 0.08;
      }
      pPos.needsUpdate = true;
    }

    setTimeout(() => {
      setIsSpraying(false);
    }, 1400);
  };

  return (
    <div className="relative w-full h-[640px] md:h-[740px] lg:h-[820px] bg-gradient-to-b from-[#0D0D11] via-[#14141C] to-[#0D0D11] overflow-hidden select-none">
      {/* Editorial Watermark Header Overlay */}
      <div className="absolute top-6 left-6 md:top-10 md:left-12 z-10 pointer-events-none">
        <div className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-medium mb-1">
          Haute Parfumerie · Objet N°01
        </div>
        <h2 className="text-3xl md:text-5xl font-editorial font-light tracking-wide text-white">
          Élixir de Lumière
        </h2>
        <div className="text-xs text-zinc-400 tracking-wider mt-1 flex items-center gap-3">
          <span>Extrait Absolu 32%</span>
          <span>·</span>
          <span>Cristal Taillé & Laiton Massif</span>
          <span>·</span>
          <span className="font-mono text-[#D4AF37]">2 450 MAD</span>
        </div>
      </div>

      {/* 3D Canvas Mount */}
      <div 
        ref={mountRef} 
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
        title="Faites glisser pour inspecter le flacon à 360°"
      />

      {/* Fallback for environments where WebGL is unavailable */}
      {!webglSupported && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0D0D11] p-6 text-center">
          <div className="max-w-md">
            <img 
              src="/src/assets/images/product_perfume_elixir_1792768475631.jpg" 
              alt="Élixir de Lumière" 
              className="w-64 h-64 object-cover mx-auto mb-4 border border-zinc-800"
            />
            <p className="text-zinc-400 text-sm">Vue photographique de haute précision pour votre appareil.</p>
          </div>
        </div>
      )}

      {/* Floating Helper Pill (Top-Right) */}
      <div className="absolute top-6 right-6 md:top-10 md:right-12 z-10 hidden sm:flex items-center gap-2 px-3 py-1.5 bg-black/40 backdrop-blur-md border border-white/10 text-[11px] text-zinc-300 rounded-none tracking-widest uppercase">
        <RotateCw className="w-3.5 h-3.5 text-[#D4AF37] animate-spin" style={{ animationDuration: '8s' }} />
        <span>Glisser pour pivoter à 360°</span>
      </div>

      {/* Ergonomic Collapsible Bottom Control Dock (Compliant with threejs/SKILL.md) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-[94%] max-w-3xl transition-transform duration-300">
        {/* Dock Toggle Tab */}
        <div className="flex justify-center mb-1">
          <button
            onClick={() => setIsDockOpen(!isDockOpen)}
            className="px-4 py-1 text-[10px] tracking-widest uppercase font-mono text-zinc-400 hover:text-white bg-[#14141C]/90 hover:bg-[#1E1E28] border border-white/10 transition-colors cursor-pointer"
          >
            {isDockOpen ? '▾ Réduire le Studio 3D' : '▴ Commandes du Flacon 3D'}
          </button>
        </div>

        {isDockOpen && (
          <div className="bg-[#121218]/95 border border-white/15 p-4 shadow-2xl backdrop-blur-md">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              
              {/* Zone 1: Finish / Juice Color Swatches (5 cols) */}
              <div className="md:col-span-5 border-b md:border-b-0 md:border-r border-white/10 pb-3 md:pb-0 md:pr-4">
                <span className="text-[10px] uppercase tracking-wider text-zinc-400 block mb-2 font-mono">
                  Édition du Flacon & Jus :
                </span>
                <div className="flex items-center gap-2">
                  {FINISH_OPTIONS.map((finish) => (
                    <button
                      key={finish.id}
                      onClick={() => setSelectedFinish(finish)}
                      className={`group flex items-center gap-2 px-2.5 py-1.5 text-xs transition-all border ${
                        selectedFinish.id === finish.id 
                          ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-white' 
                          : 'border-white/10 bg-white/5 text-zinc-400 hover:border-white/20'
                      }`}
                    >
                      <span 
                        className="w-3 h-3 rounded-full border border-black/40 shadow-inner shrink-0" 
                        style={{ backgroundColor: `#${finish.liquidColor.toString(16).padStart(6, '0')}` }} 
                      />
                      <span className="whitespace-nowrap text-[11px] font-medium">{finish.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Zone 2: Camera View Presets (4 cols) */}
              <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-white/10 pb-3 md:pb-0 md:pr-3">
                <span className="text-[10px] uppercase tracking-wider text-zinc-400 block mb-2 font-mono">
                  Points de Vue :
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    onClick={() => setCameraView('threeQuarter')}
                    className={`px-2 py-1 text-[11px] font-mono transition-colors ${
                      activePreset === 'threeQuarter' ? 'bg-[#D4AF37] text-black font-semibold' : 'bg-white/5 text-zinc-300 hover:bg-white/10'
                    }`}
                  >
                    3/4
                  </button>
                  <button
                    onClick={() => setCameraView('front')}
                    className={`px-2 py-1 text-[11px] font-mono transition-colors ${
                      activePreset === 'front' ? 'bg-[#D4AF37] text-black font-semibold' : 'bg-white/5 text-zinc-300 hover:bg-white/10'
                    }`}
                  >
                    Face
                  </button>
                  <button
                    onClick={() => setCameraView('topCap')}
                    className={`px-2 py-1 text-[11px] font-mono transition-colors ${
                      activePreset === 'topCap' ? 'bg-[#D4AF37] text-black font-semibold' : 'bg-white/5 text-zinc-300 hover:bg-white/10'
                    }`}
                  >
                    Bouchon
                  </button>
                  <button
                    onClick={() => setCameraView('macro')}
                    className={`px-2 py-1 text-[11px] font-mono transition-colors ${
                      activePreset === 'macro' ? 'bg-[#D4AF37] text-black font-semibold' : 'bg-white/5 text-zinc-300 hover:bg-white/10'
                    }`}
                  >
                    Macro
                  </button>
                </div>
              </div>

              {/* Zone 3: Interactive Spray & Action (3 cols) */}
              <div className="md:col-span-3 flex items-center justify-between md:justify-end gap-2">
                <button
                  onClick={triggerSpray}
                  disabled={isSpraying}
                  className="flex items-center gap-1.5 px-3 py-2 text-[11px] uppercase tracking-wider font-medium text-amber-200 bg-amber-950/40 border border-amber-500/30 hover:bg-amber-900/50 transition-colors"
                  title="Expérimenter la diffusion du parfum"
                >
                  <Droplets className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{isSpraying ? 'Diffusion...' : 'Vaporiser'}</span>
                </button>

                <button
                  onClick={() => setIsRotating(!isRotating)}
                  className={`p-2 border transition-colors ${
                    isRotating ? 'border-[#D4AF37]/50 text-[#D4AF37] bg-[#D4AF37]/10' : 'border-white/10 text-zinc-400 bg-white/5'
                  }`}
                  title={isRotating ? 'Arrêter la rotation automatique' : 'Activer la rotation automatique'}
                >
                  <RotateCw className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>
        )}
      </div>

    </div>
  );
};
