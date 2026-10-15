import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { 
  X, RotateCw, ZoomIn, ZoomOut, Sparkles, ShoppingBag, 
  Camera, Check, Sliders, User, Shirt, Footprints, Sun, Eye, ChevronRight,
  ArrowLeft, ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

// Customization Configs
const SKIN_TONES = [
  { id: 'porcelain', name: 'Fair Porcelain', hex: '#F5D7C4', roughness: 0.35 },
  { id: 'honey', name: 'Warm Honey', hex: '#DEB887', roughness: 0.4 },
  { id: 'bronze', name: 'Artisan Bronze', hex: '#B27B55', roughness: 0.4 },
  { id: 'espresso', name: 'Rich Espresso', hex: '#6C462C', roughness: 0.42 },
  { id: 'olive', name: 'Golden Olive', hex: '#C49E72', roughness: 0.38 },
  { id: 'ebony', name: 'Deep Ebony', hex: '#3E271D', roughness: 0.45 }
];

const FACE_TYPES = [
  { id: 'sculpted', name: 'Sculpted Oval', desc: 'Graceful contour & defined cheekbones' },
  { id: 'soft', name: 'Soft Heart', desc: 'Gentle jawline with delicate proportions' },
  { id: 'chiseled', name: 'Chiseled High', desc: 'Prominent brow & architectural structure' },
  { id: 'regal', name: 'Regal Angular', desc: 'Statuesque profile with refined symmetry' }
];

const HAIRSTYLES = [
  { id: 'bun', name: 'Sleek Low Chignon', icon: '✦' },
  { id: 'waves', name: 'Voluminous Soft Waves', icon: '〰' },
  { id: 'bob', name: 'Textured French Bob', icon: '✂' },
  { id: 'braid', name: 'High Braided Crown', icon: '❈' },
  { id: 'curls', name: 'Sculpted Afro Curls', icon: '◎' }
];

const HAIR_COLORS = [
  { id: 'espresso-black', name: 'Espresso Black', hex: '#1C150E' },
  { id: 'rich-chestnut', name: 'Rich Chestnut', hex: '#3D2518' },
  { id: 'auburn-terracotta', name: 'Auburn Clay', hex: '#5E2C1A' },
  { id: 'honey-amber', name: 'Warm Amber', hex: '#8C5B32' }
];

const BODY_SHAPES = [
  { id: 'hourglass', name: 'Hourglass Balanced', waistScale: 0.88, hipScale: 1.08, bustScale: 1.05, height: 1.0 },
  { id: 'curvy', name: 'Curvy Full Silhouette', waistScale: 1.05, hipScale: 1.25, bustScale: 1.2, height: 0.98 },
  { id: 'petite', name: 'Petite Slender', waistScale: 0.82, hipScale: 0.92, bustScale: 0.9, height: 0.94 },
  { id: 'athletic', name: 'Athletic Statuesque', waistScale: 0.94, hipScale: 1.02, bustScale: 1.02, height: 1.05 }
];

const FOOTWEAR = [
  { id: 'kolhapuri', name: 'Artisanal Kolhapuris', color: '#493512', heelHeight: 0.05, desc: 'Espresso handcrafted leather sandals with subtle brass threadwork' },
  { id: 'strappy-heels', name: 'Nude Strappy Block Heels', color: '#E8D2B5', heelHeight: 0.22, desc: 'Warm linen tone Italian block heels' },
  { id: 'stilettos', name: 'Espresso Suede Stilettos', color: '#2F210A', heelHeight: 0.32, desc: 'Ultra-refined evening pointed pumps' },
  { id: 'loafers', name: 'Ivory Flax Loafers', color: '#FAF2E3', heelHeight: 0.08, desc: 'Casual daytime luxury ease' },
  { id: 'barefoot', name: 'Studio Natural (Barefoot)', color: 'skin', heelHeight: 0.0, desc: 'Zero heel baseline natural posture' }
];

const LIGHTING_MODES = [
  { id: 'studio', name: 'Atelier Studio Warm', keyColor: '#FFF2DC', ambientColor: '#493512', intensity: 1.5 },
  { id: 'golden', name: 'Golden Hour Sunset', keyColor: '#FFB86C', ambientColor: '#6B3E1F', intensity: 1.8 },
  { id: 'runway', name: 'Runway Editorial Spotlight', keyColor: '#FFFFFF', ambientColor: '#2B231A', intensity: 2.2 }
];

export default function VirtualTryOnModal({
  isOpen,
  onClose,
  product,
  products,
  onSelectProduct,
  onAddToCart,
  currency
}) {
  if (!isOpen || !product) return null;

  // Customization State
  const [activeTab, setActiveTab] = useState('model'); // 'model' | 'outfit' | 'footwear' | 'lighting'
  const [selectedSkin, setSelectedSkin] = useState(SKIN_TONES[1]); // Warm Honey default
  const [selectedFace, setSelectedFace] = useState(FACE_TYPES[0]);
  const [selectedHair, setSelectedHair] = useState(HAIRSTYLES[1]); // Waves default
  const [selectedHairColor, setSelectedHairColor] = useState(HAIR_COLORS[0]);
  const [selectedBody, setSelectedBody] = useState(BODY_SHAPES[0]);
  const [selectedSize, setSelectedSize] = useState('M'); // Strictly M, L, XL, XXL
  const [selectedFootwear, setSelectedFootwear] = useState(FOOTWEAR[0]);
  const [selectedLighting, setSelectedLighting] = useState(LIGHTING_MODES[0]);
  
  // 3D & Turntable State
  const [renderMode, setRenderMode] = useState('editorial360'); // 'editorial360' (default real photos) | 'mesh3d' (Three.js wireframe/mannequin)
  const [isAutoSpinning, setIsAutoSpinning] = useState(true);
  const [cameraView, setCameraView] = useState('full'); // 'full' | 'upper' | 'shoes'
  const [rotationAngle, setRotationAngle] = useState(0); // 0 to 360 deg
  const [isSnapshotDone, setIsSnapshotDone] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  // Active Multi-Angle View calculation based on rotationAngle
  const getActiveView = () => {
    const views = product.views360 || {
      front: product.image,
      sideRight: product.image,
      back: product.image,
      sideLeft: product.image
    };

    const normAngle = ((Math.round(rotationAngle) % 360) + 360) % 360;

    if (normAngle >= 45 && normAngle < 135) {
      // Right profile (90 deg)
      const localProgress = (normAngle - 90) / 45;
      return {
        src: views.sideRight || views.front,
        label: 'Right Profile • 90°',
        flip: false,
        tiltY: localProgress * 12
      };
    } else if (normAngle >= 135 && normAngle < 225) {
      // Back view (180 deg)
      const localProgress = (normAngle - 180) / 45;
      return {
        src: views.back || views.front,
        label: 'Back Editorial Drape • 180°',
        flip: false,
        tiltY: localProgress * 12
      };
    } else if (normAngle >= 225 && normAngle < 315) {
      // Left profile (270 deg)
      const localProgress = (normAngle - 270) / 45;
      return {
        src: views.sideLeft || views.sideRight || views.front,
        label: 'Left Profile • 270°',
        flip: true,
        tiltY: -localProgress * 12
      };
    } else {
      // Front view (0 deg)
      const localProgress = normAngle >= 315 ? (normAngle - 360) / 45 : normAngle / 45;
      return {
        src: views.front,
        label: 'Front Editorial Look • 0°',
        flip: false,
        tiltY: localProgress * 12
      };
    }
  };

  // Continuous Turntable Animation Loop
  useEffect(() => {
    if (!isAutoSpinning) return;
    let animId;
    let lastTime = performance.now();

    const spin = (now) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;
      if (!isDraggingRef.current) {
        setRotationAngle(prev => {
          const next = (prev + delta * 24) % 360;
          return Number(next.toFixed(1));
        });
        if (modelGroupRef.current) {
          modelGroupRef.current.rotation.y += delta * 0.419;
        }
      }
      animId = requestAnimationFrame(spin);
    };

    animId = requestAnimationFrame(spin);
    return () => cancelAnimationFrame(animId);
  }, [isAutoSpinning]);

  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const modelGroupRef = useRef(null);
  const lightsGroupRef = useRef(null);
  const animationFrameRef = useRef(null);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });

  // Map product garment color tones to 3D materials
  const getProductColorConfig = (prod) => {
    switch (prod.id) {
      case 1: // Crimson Maroon Co-ord
        return { primary: '#6B1D28', secondary: '#4A121A', textureType: 'slub', pants: '#6B1D28' };
      case 2: // Duo Floral Motif
        return { primary: '#C2185B', secondary: '#FAF5EB', accent: '#FF9800', textureType: 'block', pants: '#C2185B' };
      case 4: // Indigo Heritage
        return { primary: '#1B365D', secondary: '#E3EDF8', textureType: 'print', pants: '#1B365D' };
      case 5: // Earth & Ochre Striped
        return { primary: '#7A5B35', secondary: '#E8D5B5', textureType: 'stripe', pants: '#E8D5B5' };
      case 6: // Geometric Chevron
        return { primary: '#3B2A18', secondary: '#D9C8AE', textureType: 'chevron', pants: '#3B2A18' };
      default:
        return { primary: '#493512', secondary: '#FFF2DC', textureType: 'linen', pants: '#493512' };
    }
  };

  // Build Three.js 3D Avatar & Garment Setup with robust ResizeObserver
  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true, alpha: true });
    } catch (e) {
      console.warn("WebGL not supported, falling back to 3D canvas engine:", e);
      setHasWebGL(false);
      return;
    }

    const container = containerRef.current;
    const width = container.clientWidth || 650;
    const height = container.clientHeight || 700;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#FAF5EB');
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.35, 4.5);
    camera.lookAt(0, 1.15, 0);
    cameraRef.current = camera;

    // 3. Renderer Setup
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;

    container.innerHTML = '';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    // 4. Lights Group
    const lightsGroup = new THREE.Group();
    lightsGroupRef.current = lightsGroup;
    updateSceneLights(lightsGroup, selectedLighting);
    scene.add(lightsGroup);

    // 5. Turntable Luxury Stage
    const stageGroup = new THREE.Group();
    const stageGeo = new THREE.CylinderGeometry(1.4, 1.45, 0.08, 64);
    const stageMat = new THREE.MeshStandardMaterial({
      color: '#E8D5B5',
      roughness: 0.35,
      metalness: 0.1
    });
    const stage = new THREE.Mesh(stageGeo, stageMat);
    stage.position.y = -0.04;
    stage.receiveShadow = true;
    stageGroup.add(stage);

    const ringGeo = new THREE.RingGeometry(1.36, 1.4, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: '#493512', side: THREE.DoubleSide });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.005;
    stageGroup.add(ring);
    scene.add(stageGroup);

    // 6. Master Model Hierarchy Group
    const modelGroup = new THREE.Group();
    modelGroupRef.current = modelGroup;
    scene.add(modelGroup);

    // Initial Avatar Build
    rebuildAvatar();

    // 7. ResizeObserver to guarantee canvas matches dimensions instantly
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        if (w > 0 && h > 0 && cameraRef.current && rendererRef.current) {
          cameraRef.current.aspect = w / h;
          cameraRef.current.updateProjectionMatrix();
          rendererRef.current.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    // Initial forced check after 50ms for CSS transition settling
    const timer = setTimeout(() => {
      if (container && cameraRef.current && rendererRef.current) {
        const w = container.clientWidth || 650;
        const h = container.clientHeight || 700;
        cameraRef.current.aspect = w / h;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(w, h);
      }
    }, 60);

    // 8. Render Loop with Turntable Auto-Rotation
    let lastTime = performance.now();
    const animate = (time) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (isAutoSpinning && modelGroupRef.current && !isDraggingRef.current) {
        modelGroupRef.current.rotation.y += delta * 0.45;
        // sync angle display
        const deg = Math.round((modelGroupRef.current.rotation.y * (180 / Math.PI)) % 360);
        setRotationAngle(deg >= 0 ? deg : 360 + deg);
      }

      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      clearTimeout(timer);
      resizeObserver.disconnect();
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      renderer.dispose();
    };
  }, [isOpen]);

  // Update Lights when lighting mode changes
  const updateSceneLights = (group, lighting) => {
    while (group.children.length > 0) {
      group.remove(group.children[0]);
    }
    const ambientLight = new THREE.AmbientLight(lighting.ambientColor, 1.2);
    group.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(lighting.keyColor, lighting.intensity);
    keyLight.position.set(2.5, 4.5, 3.5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    group.add(keyLight);

    const fillLight = new THREE.DirectionalLight('#FFF2DC', 0.85);
    fillLight.position.set(-3, 2.5, 2);
    group.add(fillLight);

    const rimLight = new THREE.DirectionalLight('#C5A059', 0.95);
    rimLight.position.set(0, 3, -4);
    group.add(rimLight);
  };

  useEffect(() => {
    if (lightsGroupRef.current) {
      updateSceneLights(lightsGroupRef.current, selectedLighting);
    }
  }, [selectedLighting]);

  // Rebuild 3D Model when parameters change (Skin, Hair, Body, Size, Footwear, Product)
  const rebuildAvatar = () => {
    if (!modelGroupRef.current || !sceneRef.current) return;
    const group = modelGroupRef.current;

    // Clear existing children
    while (group.children.length > 0) {
      const obj = group.children[0];
      group.remove(obj);
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
        else obj.material.dispose();
      }
    }

    const colorConfig = getProductColorConfig(product);
    const skinMat = new THREE.MeshStandardMaterial({
      color: selectedSkin.hex,
      roughness: selectedSkin.roughness,
      metalness: 0.05
    });

    const hairMat = new THREE.MeshStandardMaterial({
      color: selectedHairColor.hex,
      roughness: 0.6,
      metalness: 0.15
    });

    // Body & Size Factors
    const b = selectedBody;
    const sizeMultiplier = selectedSize === 'M' ? 1.0 : selectedSize === 'L' ? 1.07 : selectedSize === 'XL' ? 1.15 : 1.23;
    const heelLift = selectedFootwear.heelHeight;

    // --- A. LEGS & FEET ---
    const legGeo = new THREE.CylinderGeometry(0.09 * b.waistScale, 0.065, 1.05 * b.height, 24);
    
    // Left Leg
    const leftLeg = new THREE.Mesh(legGeo, skinMat);
    leftLeg.position.set(-0.16 * b.hipScale, 0.52 * b.height + heelLift, 0);
    leftLeg.castShadow = true;
    group.add(leftLeg);

    // Right Leg
    const rightLeg = new THREE.Mesh(legGeo, skinMat);
    rightLeg.position.set(0.16 * b.hipScale, 0.52 * b.height + heelLift, 0);
    rightLeg.castShadow = true;
    group.add(rightLeg);

    // Footwear Meshes
    const footMat = new THREE.MeshStandardMaterial({
      color: selectedFootwear.color === 'skin' ? selectedSkin.hex : selectedFootwear.color,
      roughness: 0.35,
      metalness: selectedFootwear.id === 'kolhapuri' ? 0.3 : 0.1
    });

    const footGeo = new THREE.BoxGeometry(0.12, 0.07 + heelLift, 0.26);
    const leftFoot = new THREE.Mesh(footGeo, footMat);
    leftFoot.position.set(-0.16 * b.hipScale, (0.035 + heelLift / 2), 0.06);
    leftFoot.castShadow = true;
    group.add(leftFoot);

    const rightFoot = new THREE.Mesh(footGeo, footMat);
    rightFoot.position.set(0.16 * b.hipScale, (0.035 + heelLift / 2), 0.06);
    rightFoot.castShadow = true;
    group.add(rightFoot);

    // --- B. GARMENT PALAZZO / TROUSERS ---
    const pantsMat = new THREE.MeshStandardMaterial({
      color: colorConfig.pants,
      roughness: 0.75,
      metalness: 0.05
    });

    // Flared Trousers around legs
    const pantLegGeo = new THREE.CylinderGeometry(0.14 * b.hipScale * sizeMultiplier, 0.19 * sizeMultiplier, 1.02 * b.height, 32);
    const leftPant = new THREE.Mesh(pantLegGeo, pantsMat);
    leftPant.position.set(-0.16 * b.hipScale, 0.53 * b.height + heelLift, 0);
    leftPant.castShadow = true;
    group.add(leftPant);

    const rightPant = new THREE.Mesh(pantLegGeo, pantsMat);
    rightPant.position.set(0.16 * b.hipScale, 0.53 * b.height + heelLift, 0);
    rightPant.castShadow = true;
    group.add(rightPant);

    // --- C. HIPS & WAIST ---
    const hipGeo = new THREE.CylinderGeometry(0.24 * b.waistScale, 0.31 * b.hipScale * sizeMultiplier, 0.32, 32);
    const hips = new THREE.Mesh(hipGeo, pantsMat);
    hips.position.set(0, 1.05 * b.height + heelLift, 0);
    hips.castShadow = true;
    group.add(hips);

    // --- D. TORSO & DRESS TUNIC ---
    const dressMat = new THREE.MeshStandardMaterial({
      color: colorConfig.primary,
      roughness: 0.7,
      metalness: 0.05
    });

    // Upper Bodice
    const torsoGeo = new THREE.CylinderGeometry(0.26 * b.bustScale * sizeMultiplier, 0.22 * b.waistScale * sizeMultiplier, 0.52 * b.height, 32);
    const torso = new THREE.Mesh(torsoGeo, dressMat);
    torso.position.set(0, 1.38 * b.height + heelLift, 0);
    torso.castShadow = true;
    group.add(torso);

    // Tunic Flared Hem / Drape Overlay
    const tunicSkirtGeo = new THREE.CylinderGeometry(0.23 * b.waistScale * sizeMultiplier, 0.38 * b.hipScale * sizeMultiplier, 0.65 * b.height, 32);
    const tunicSkirt = new THREE.Mesh(tunicSkirtGeo, dressMat);
    tunicSkirt.position.set(0, 0.95 * b.height + heelLift, 0);
    tunicSkirt.castShadow = true;
    group.add(tunicSkirt);

    // Contrasting Duo-Tone or Border Placket Accent
    if (colorConfig.secondary) {
      const placketGeo = new THREE.BoxGeometry(0.06 * sizeMultiplier, 0.52 * b.height, 0.02);
      const placketMat = new THREE.MeshStandardMaterial({ color: colorConfig.secondary, roughness: 0.6 });
      const placket = new THREE.Mesh(placketGeo, placketMat);
      placket.position.set(0, 1.38 * b.height + heelLift, 0.25 * b.bustScale * sizeMultiplier);
      group.add(placket);
    }

    // --- E. ARMS & SLEEVES ---
    const sleeveGeo = new THREE.CylinderGeometry(0.09 * sizeMultiplier, 0.1 * sizeMultiplier, 0.42 * b.height, 24);
    const armSkinGeo = new THREE.CylinderGeometry(0.065, 0.05, 0.32 * b.height, 24);

    // Left Sleeve & Arm
    const leftSleeve = new THREE.Mesh(sleeveGeo, dressMat);
    leftSleeve.position.set(-0.35 * b.bustScale * sizeMultiplier, 1.45 * b.height + heelLift, 0);
    leftSleeve.rotation.z = 0.2;
    group.add(leftSleeve);

    const leftForearm = new THREE.Mesh(armSkinGeo, skinMat);
    leftForearm.position.set(-0.42 * b.bustScale * sizeMultiplier, 1.15 * b.height + heelLift, 0.05);
    leftForearm.rotation.z = 0.15;
    group.add(leftForearm);

    // Right Sleeve & Arm
    const rightSleeve = new THREE.Mesh(sleeveGeo, dressMat);
    rightSleeve.position.set(0.35 * b.bustScale * sizeMultiplier, 1.45 * b.height + heelLift, 0);
    rightSleeve.rotation.z = -0.2;
    group.add(rightSleeve);

    const rightForearm = new THREE.Mesh(armSkinGeo, skinMat);
    rightForearm.position.set(0.42 * b.bustScale * sizeMultiplier, 1.15 * b.height + heelLift, 0.05);
    rightForearm.rotation.z = -0.15;
    group.add(rightForearm);

    // --- F. NECK & HEAD ---
    const neckGeo = new THREE.CylinderGeometry(0.075, 0.09, 0.18, 24);
    const neck = new THREE.Mesh(neckGeo, skinMat);
    neck.position.set(0, 1.68 * b.height + heelLift, 0);
    group.add(neck);

    // Head Face Structure with Face Type Modifiers
    const faceScaleX = selectedFace.id === 'chiseled' ? 0.92 : selectedFace.id === 'soft' ? 1.05 : 0.98;
    const headGeo = new THREE.SphereGeometry(0.165, 32, 32);
    headGeo.scale(faceScaleX, 1.22, 1.05);
    const head = new THREE.Mesh(headGeo, skinMat);
    head.position.set(0, 1.88 * b.height + heelLift, 0.02);
    head.castShadow = true;
    group.add(head);

    // --- G. HAIRSTYLE ---
    if (selectedHair.id === 'bun') {
      const hairCrownGeo = new THREE.SphereGeometry(0.18, 32, 24);
      hairCrownGeo.scale(1.02, 1.15, 1.08);
      const hairCrown = new THREE.Mesh(hairCrownGeo, hairMat);
      hairCrown.position.set(0, 1.93 * b.height + heelLift, -0.03);
      group.add(hairCrown);

      const bunGeo = new THREE.SphereGeometry(0.1, 24, 24);
      const bun = new THREE.Mesh(bunGeo, hairMat);
      bun.position.set(0, 1.82 * b.height + heelLift, -0.18);
      group.add(bun);
    } else if (selectedHair.id === 'waves') {
      const hairCrownGeo = new THREE.SphereGeometry(0.19, 32, 24);
      hairCrownGeo.scale(1.08, 1.25, 1.1);
      const hairCrown = new THREE.Mesh(hairCrownGeo, hairMat);
      hairCrown.position.set(0, 1.93 * b.height + heelLift, -0.02);
      group.add(hairCrown);

      // Cascading Side Locks
      const lockGeo = new THREE.CylinderGeometry(0.08, 0.05, 0.65, 24);
      const leftLock = new THREE.Mesh(lockGeo, hairMat);
      leftLock.position.set(-0.16, 1.65 * b.height + heelLift, 0.06);
      leftLock.rotation.z = -0.15;
      group.add(leftLock);

      const rightLock = new THREE.Mesh(lockGeo, hairMat);
      rightLock.position.set(0.16, 1.65 * b.height + heelLift, 0.06);
      rightLock.rotation.z = 0.15;
      group.add(rightLock);
    } else if (selectedHair.id === 'bob') {
      const bobGeo = new THREE.SphereGeometry(0.2, 32, 24);
      bobGeo.scale(1.05, 1.05, 1.1);
      const bob = new THREE.Mesh(bobGeo, hairMat);
      bob.position.set(0, 1.9 * b.height + heelLift, 0);
      group.add(bob);
    } else if (selectedHair.id === 'braid') {
      const crownGeo = new THREE.TorusGeometry(0.17, 0.04, 16, 32);
      crownGeo.rotation.x = Math.PI / 2;
      const crown = new THREE.Mesh(crownGeo, hairMat);
      crown.position.set(0, 2.02 * b.height + heelLift, 0);
      group.add(crown);
      const baseGeo = new THREE.SphereGeometry(0.175, 24, 24);
      const base = new THREE.Mesh(baseGeo, hairMat);
      base.position.set(0, 1.9 * b.height + heelLift, -0.03);
      group.add(base);
    } else { // afro curls
      const afroGeo = new THREE.DodecahedronGeometry(0.25, 2);
      const afro = new THREE.Mesh(afroGeo, hairMat);
      afro.position.set(0, 1.95 * b.height + heelLift, 0);
      group.add(afro);
    }
  };

  // Re-run avatar build when configuration changes
  useEffect(() => {
    rebuildAvatar();
  }, [product, selectedSkin, selectedFace, selectedHair, selectedHairColor, selectedBody, selectedSize, selectedFootwear]);

  // Camera preset switcher
  const handleCameraView = (view) => {
    setCameraView(view);
    if (!cameraRef.current) return;
    const cam = cameraRef.current;
    if (view === 'full') {
      cam.position.set(0, 1.35, 4.5);
      cam.lookAt(0, 1.15, 0);
    } else if (view === 'upper') {
      cam.position.set(0, 1.65, 2.2);
      cam.lookAt(0, 1.5, 0);
    } else if (view === 'shoes') {
      cam.position.set(0, 0.5, 2.0);
      cam.lookAt(0, 0.35, 0);
    }
    cam.updateProjectionMatrix();
  };

  // Interactive Pointer Drag to Rotate 360° (Mouse, Touch, Stylus)
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - previousMousePositionRef.current.x;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    setRotationAngle(prev => {
      let next = (prev + deltaX * 0.75) % 360;
      if (next < 0) next += 360;
      return Math.round(next);
    });
    if (modelGroupRef.current) {
      modelGroupRef.current.rotation.y += deltaX * 0.015;
    }
  };

  const handlePointerUp = (e) => {
    isDraggingRef.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  // Manual button step rotation (Left / Right 45 deg)
  const handleStepRotate = (direction) => {
    setIsAutoSpinning(false);
    setRotationAngle(prev => {
      let next = (prev + direction * 45) % 360;
      if (next < 0) next += 360;
      return Math.round(next);
    });
    if (modelGroupRef.current) {
      modelGroupRef.current.rotation.y += direction * (Math.PI / 4);
    }
  };

  // Jump to specific cardinal viewpoint (0, 90, 180, 270 deg)
  const handleSetAngle = (targetDeg) => {
    setIsAutoSpinning(false);
    setRotationAngle(targetDeg);
    if (modelGroupRef.current) {
      modelGroupRef.current.rotation.y = (targetDeg * Math.PI) / 180;
    }
  };

  // Snapshot Capture Feature
  const handleTakeSnapshot = () => {
    setIsSnapshotDone(true);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#493512', '#C5A059', '#FFF2DC']
      });
    } catch {
      // ignore
    }
    setTimeout(() => setIsSnapshotDone(false), 2000);
  };

  // Direct Add to Bag with customized size
  const handleAddCustomLook = () => {
    onAddToCart(product, selectedSize, 1);
    setAddedSuccess(true);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.5 },
        colors: ['#493512', '#C5A059', '#FFF2DC']
      });
    } catch {
      // ignore
    }
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 1200);
  };

  const convertedPrice = Math.round(product.price * currency.rate);
  const activeView = getActiveView();

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(24, 16, 7, 0.88)',
        backdropFilter: 'blur(12px)',
        zIndex: 1100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          background: 'var(--color-linen)',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '1240px',
          height: '92vh',
          display: 'grid',
          gridTemplateColumns: 'minmax(320px, 1.4fr) minmax(360px, 1fr)',
          border: '1px solid var(--color-linen-border)',
          boxShadow: 'var(--shadow-3d)',
          overflow: 'hidden',
          animation: 'fadeIn 0.3s ease',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* ================= LEFT: 3D VIEWPORT ================= */}
        <div 
          style={{
            position: 'relative',
            background: 'radial-gradient(ellipse at 50% 35%, #FFFDF8 0%, #F5ECDD 60%, #E8D9C0 100%)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            borderRight: '1px solid var(--color-linen-border)',
            cursor: isDraggingRef.current ? 'grabbing' : 'grab',
            height: '100%',
            minHeight: '400px',
            touchAction: 'none',
            userSelect: 'none'
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {/* Header Overlay: Studio Badge & Mode Switcher */}
          <div 
            style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              right: '16px',
              zIndex: 15,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              pointerEvents: 'none'
            }}
          >
            {/* Left: Studio Status */}
            <div 
              style={{
                pointerEvents: 'auto',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: 'rgba(255, 249, 238, 0.94)',
                backdropFilter: 'blur(8px)',
                padding: '8px 16px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--color-linen-border)',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <Sparkles size={16} color="#C5A059" />
              <div>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-espresso-dark)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  etmek 360° Studio • Virtual Try-On
                </span>
                <span style={{ display: 'block', fontSize: '0.66rem', color: 'var(--color-espresso-medium)' }}>
                  {renderMode === 'editorial360' ? `Authentic Model • ${activeView.label}` : `3D Mannequin Mesh • ${Math.round(rotationAngle)}°`}
                </span>
              </div>
            </div>

            {/* Right: Render Mode Switcher */}
            <div 
              style={{
                pointerEvents: 'auto',
                display: 'flex',
                alignItems: 'center',
                background: 'rgba(255, 249, 238, 0.94)',
                backdropFilter: 'blur(8px)',
                borderRadius: '20px',
                padding: '3px',
                border: '1px solid var(--color-linen-border)',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <button
                onClick={() => setRenderMode('editorial360')}
                style={{
                  padding: '5px 12px',
                  borderRadius: '16px',
                  border: 'none',
                  background: renderMode === 'editorial360' ? 'var(--color-espresso)' : 'transparent',
                  color: renderMode === 'editorial360' ? '#FFF2DC' : 'var(--color-espresso)',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                ✦ Photo 360°
              </button>
              <button
                onClick={() => setRenderMode('mesh3d')}
                style={{
                  padding: '5px 12px',
                  borderRadius: '16px',
                  border: 'none',
                  background: renderMode === 'mesh3d' ? 'var(--color-espresso)' : 'transparent',
                  color: renderMode === 'mesh3d' ? '#FFF2DC' : 'var(--color-espresso)',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                3D Mannequin
              </button>
            </div>
          </div>

          {/* Floating Drag Hint */}
          <div 
            style={{
              position: 'absolute',
              top: '68px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 12,
              background: 'rgba(73, 53, 18, 0.88)',
              color: '#FFF2DC',
              fontSize: '0.7rem',
              fontWeight: 600,
              padding: '5px 16px',
              borderRadius: '20px',
              pointerEvents: 'none',
              letterSpacing: '0.06em',
              boxShadow: 'var(--shadow-sm)',
              whiteSpace: 'nowrap'
            }}
          >
            Drag Left / Right to Rotate 360° • Or select angle below
          </div>

          {/* Quick 360° Angle Views */}
          <div 
            style={{
              position: 'absolute',
              top: '98px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 12,
              display: 'flex',
              gap: '6px'
            }}
          >
            {[
              { deg: 0, label: 'Front 0°' },
              { deg: 90, label: 'Right 90°' },
              { deg: 180, label: 'Back 180°' },
              { deg: 270, label: 'Left 270°' }
            ].map(a => {
              const isCurrentAngle = Math.abs((rotationAngle % 360) - a.deg) < 40 || (a.deg === 0 && Math.abs((rotationAngle % 360) - 360) < 40);
              return (
                <button
                  key={a.deg}
                  onClick={() => handleSetAngle(a.deg)}
                  style={{
                    background: isCurrentAngle ? 'var(--color-espresso)' : 'rgba(255, 249, 238, 0.94)',
                    color: isCurrentAngle ? '#FFF2DC' : 'var(--color-espresso)',
                    border: isCurrentAngle ? '1px solid var(--color-espresso)' : '1px solid var(--color-linen-border)',
                    padding: '3px 10px',
                    borderRadius: '12px',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    backdropFilter: 'blur(4px)',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.08)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {a.label}
                </button>
              );
            })}
          </div>

          {/* ================= PRIMARY PHOTOREALISTIC 360° DISPLAY ================= */}
          {renderMode === 'editorial360' && (
            <div 
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2,
                overflow: 'hidden'
              }}
            >
              {/* 3D Circular Turntable Pedestal under the feet */}
              <div 
                style={{
                  position: 'absolute',
                  bottom: '50px',
                  left: '50%',
                  transform: 'translateX(-50%) rotateX(66deg)',
                  width: '420px',
                  height: '140px',
                  borderRadius: '50%',
                  background: 'radial-gradient(ellipse at 50% 50%, #FAF0DE 0%, #E8D6B8 55%, #B89C70 100%)',
                  border: '4px solid #C5A059',
                  boxShadow: '0 28px 50px rgba(73, 53, 18, 0.32), inset 0 3px 6px rgba(255, 255, 255, 0.7)',
                  pointerEvents: 'none'
                }}
              >
                {/* Rotating degree ring marks */}
                <div 
                  style={{
                    position: 'absolute',
                    inset: '12px',
                    borderRadius: '50%',
                    border: '2px dashed rgba(73, 53, 18, 0.35)',
                    transform: `rotate(${rotationAngle}deg)`,
                    transition: isDraggingRef.current ? 'none' : 'transform 0.1s linear'
                  }}
                />
                {/* Contact shadow right under model */}
                <div 
                  style={{
                    position: 'absolute',
                    inset: '24px 50px',
                    borderRadius: '50%',
                    background: 'radial-gradient(ellipse at center, rgba(30, 20, 8, 0.6) 0%, rgba(30, 20, 8, 0) 70%)',
                    filter: 'blur(8px)'
                  }}
                />
              </div>

              {/* The Authentic Editorial Model & Dress Photography */}
              <div 
                style={{
                  position: 'relative',
                  height: '76%',
                  maxHeight: '620px',
                  width: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  perspective: '1200px'
                }}
              >
                <img 
                  src={activeView.src} 
                  alt={product.name} 
                  style={{
                    height: '100%',
                    width: 'auto',
                    objectFit: 'contain',
                    borderRadius: '12px',
                    transform: `perspective(1000px) rotateY(${activeView.tiltY}deg) scale(${cameraView === 'upper' ? 1.45 : cameraView === 'shoes' ? 1.55 : 1}) translateY(${cameraView === 'upper' ? '14%' : cameraView === 'shoes' ? '-24%' : '0%'}) ${activeView.flip ? 'scaleX(-1)' : ''}`,
                    transformOrigin: 'center bottom',
                    transition: isDraggingRef.current ? 'filter 0.3s ease' : 'transform 0.15s ease-out, filter 0.3s ease',
                    filter: selectedLighting.id === 'golden' 
                      ? 'sepia(0.2) saturate(1.22) brightness(1.05)' 
                      : selectedLighting.id === 'runway' 
                      ? 'contrast(1.1) brightness(1.04)' 
                      : 'brightness(1.02) contrast(1.02)',
                    boxShadow: '0 15px 35px rgba(73, 53, 18, 0.15)'
                  }}
                  draggable={false}
                />

                {/* Subtle Skin Tone Ambience Filter Glow */}
                <div 
                  style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    background: `radial-gradient(circle at 50% 25%, ${selectedSkin.hex}22 0%, transparent 65%)`,
                    mixBlendMode: 'color'
                  }}
                />

                {/* Size Drape Guidance Overlay (Visible when Size is selected) */}
                {activeTab === 'outfit' && (
                  <div 
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'rgba(73, 53, 18, 0.92)',
                      backdropFilter: 'blur(8px)',
                      color: '#FFF2DC',
                      padding: '6px 14px',
                      borderRadius: '20px',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                      pointerEvents: 'none',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.25)',
                      display: 'flex',
                      gap: '8px',
                      alignItems: 'center'
                    }}
                  >
                    <span style={{ color: '#C5A059' }}>✦ Size {selectedSize} Fit:</span>
                    <span>Chest {selectedSize === 'M' ? '38"' : selectedSize === 'L' ? '40"' : selectedSize === 'XL' ? '43"' : '46"'}</span>
                    <span>•</span>
                    <span>Waist {selectedSize === 'M' ? '32"' : selectedSize === 'L' ? '34"' : selectedSize === 'XL' ? '37"' : '40"'}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================= SECONDARY THREE.JS 3D CANVAS ================= */}
          <div 
            ref={containerRef} 
            style={{ 
              position: 'absolute', 
              inset: 0, 
              width: '100%', 
              height: '100%', 
              outline: 'none',
              zIndex: 1,
              display: renderMode === 'mesh3d' ? 'block' : 'none'
            }} 
          />

          {/* Floating Manual Step Rotation Buttons */}
          <div 
            style={{
              position: 'absolute',
              top: '50%',
              left: '16px',
              right: '16px',
              transform: 'translateY(-50%)',
              zIndex: 10,
              display: 'flex',
              justifyContent: 'space-between',
              pointerEvents: 'none'
            }}
          >
            <button
              onClick={() => handleStepRotate(-1)}
              style={{
                pointerEvents: 'auto',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'rgba(255, 249, 238, 0.9)',
                backdropFilter: 'blur(6px)',
                border: '1px solid var(--color-linen-border)',
                color: 'var(--color-espresso)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-sm)',
                transition: 'transform 0.15s'
              }}
              title="Rotate Left 45°"
            >
              <ArrowLeft size={16} />
            </button>

            <button
              onClick={() => handleStepRotate(1)}
              style={{
                pointerEvents: 'auto',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'rgba(255, 249, 238, 0.9)',
                backdropFilter: 'blur(6px)',
                border: '1px solid var(--color-linen-border)',
                color: 'var(--color-espresso)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-sm)',
                transition: 'transform 0.15s'
              }}
              title="Rotate Right 45°"
            >
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Floating Model Fit Spec Card */}
          <div 
            style={{
              position: 'absolute',
              bottom: '76px',
              left: '20px',
              zIndex: 10,
              background: 'rgba(255, 249, 238, 0.92)',
              backdropFilter: 'blur(8px)',
              padding: '10px 16px',
              borderRadius: '10px',
              border: '1px solid var(--color-linen-border)',
              maxWidth: '300px',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--color-espresso-dark)' }}>
              Fit Preview: Size {selectedSize} • {selectedBody.name.split(' ')[0]} Frame
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--color-espresso-muted)', marginTop: '2px' }}>
              Footwear: {selectedFootwear.name}
            </div>
          </div>

          {/* Bottom Viewport Control Toolbar */}
          <div 
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '20px',
              right: '20px',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'rgba(255, 249, 238, 0.92)',
              backdropFilter: 'blur(10px)',
              padding: '8px 14px',
              borderRadius: '12px',
              border: '1px solid var(--color-linen-border)'
            }}
          >
            {/* Camera Views */}
            <div style={{ display: 'flex', gap: '6px' }}>
              {[
                { id: 'full', label: 'Full Look' },
                { id: 'upper', label: 'Drape Detail' },
                { id: 'shoes', label: 'Footwear' }
              ].map(v => (
                <button
                  key={v.id}
                  onClick={() => handleCameraView(v.id)}
                  style={{
                    padding: '5px 10px',
                    borderRadius: '6px',
                    border: cameraView === v.id ? '1px solid var(--color-espresso)' : '1px solid transparent',
                    background: cameraView === v.id ? 'var(--color-espresso)' : 'transparent',
                    color: cameraView === v.id ? '#FFF2DC' : 'var(--color-espresso)',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {v.label}
                </button>
              ))}
            </div>

            {/* Turntable Auto Spin Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={() => setIsAutoSpinning(!isAutoSpinning)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '5px 10px',
                  borderRadius: '6px',
                  border: '1px solid var(--color-linen-border)',
                  background: isAutoSpinning ? '#FFF9EE' : 'transparent',
                  color: 'var(--color-espresso)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <RotateCw size={12} />
                <span>{isAutoSpinning ? 'Turntable Active' : 'Turntable Paused'}</span>
              </button>

              {/* Snapshot Button */}
              <button
                onClick={handleTakeSnapshot}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '5px 12px',
                  borderRadius: '6px',
                  background: 'var(--color-espresso)',
                  color: '#FFF2DC',
                  border: 'none',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
                title="Capture Look"
              >
                {isSnapshotDone ? <Check size={13} /> : <Camera size={13} />}
                <span>{isSnapshotDone ? 'Look Saved!' : 'Snapshot'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* ================= RIGHT: STUDIO CUSTOMIZATION DRAWER ================= */}
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            background: 'var(--color-linen)',
            overflow: 'hidden'
          }}
        >
          {/* Top Bar with Product Summary & Close */}
          <div 
            style={{
              padding: '16px 22px',
              borderBottom: '1px solid var(--color-linen-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'var(--color-linen-light)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img 
                src={product.image} 
                alt={product.name} 
                style={{ width: '42px', height: '52px', objectFit: 'cover', borderRadius: '6px', border: '1px solid var(--color-linen-border)' }} 
              />
              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-espresso-dark)', lineHeight: 1.25, maxWidth: '240px' }}>
                  {product.name}
                </h3>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-espresso)', marginTop: '2px' }}>
                  {currency.symbol}{convertedPrice.toLocaleString()}
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--color-espresso)',
                cursor: 'pointer',
                padding: '6px'
              }}
              aria-label="Close 3D Try-On"
            >
              <X size={22} />
            </button>
          </div>

          {/* Navigation Category Tabs */}
          <div 
            style={{
              display: 'flex',
              borderBottom: '1px solid var(--color-linen-border)',
              background: 'var(--color-linen-card)'
            }}
          >
            {[
              { id: 'model', label: 'Model', icon: User },
              { id: 'outfit', label: 'Size & Garment', icon: Shirt },
              { id: 'footwear', label: 'Footwear', icon: Footprints },
              { id: 'lighting', label: 'Ambience', icon: Sun }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '12px 6px',
                    background: isActive ? 'var(--color-linen)' : 'transparent',
                    border: 'none',
                    borderBottom: isActive ? '2px solid var(--color-espresso)' : '2px solid transparent',
                    color: isActive ? 'var(--color-espresso-dark)' : 'var(--color-espresso-muted)',
                    fontSize: '0.76rem',
                    fontWeight: isActive ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Icon size={14} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Panels (Scrollable) */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '22px' }}>
            
            {/* ====== TAB 1: MODEL CUSTOMIZATION ====== */}
            {activeTab === 'model' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                
                {/* 1. Skin Tones */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, color: 'var(--color-espresso)', marginBottom: '8px' }}>
                    1. Skin Complexion ({selectedSkin.name})
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '8px' }}>
                    {SKIN_TONES.map(tone => {
                      const isSelected = selectedSkin.id === tone.id;
                      return (
                        <button
                          key={tone.id}
                          onClick={() => setSelectedSkin(tone)}
                          title={tone.name}
                          style={{
                            height: '40px',
                            borderRadius: '8px',
                            background: tone.hex,
                            border: isSelected ? '2px solid var(--color-espresso)' : '1px solid rgba(0,0,0,0.15)',
                            cursor: 'pointer',
                            transform: isSelected ? 'scale(1.08)' : 'scale(1)',
                            boxShadow: isSelected ? 'var(--shadow-sm)' : 'none',
                            transition: 'all 0.15s ease'
                          }}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* 2. Face Types */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, color: 'var(--color-espresso)', marginBottom: '8px' }}>
                    2. Face Profile Structure
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    {FACE_TYPES.map(face => {
                      const isSelected = selectedFace.id === face.id;
                      return (
                        <div
                          key={face.id}
                          onClick={() => setSelectedFace(face)}
                          style={{
                            padding: '10px 12px',
                            borderRadius: '8px',
                            border: isSelected ? '2px solid var(--color-espresso)' : '1px solid var(--color-linen-border)',
                            background: isSelected ? '#FFF9EE' : '#FFFFFF',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-espresso-dark)' }}>{face.name}</div>
                          <div style={{ fontSize: '0.68rem', color: 'var(--color-espresso-muted)', marginTop: '2px' }}>{face.desc}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Hairstyles & Hair Color */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, color: 'var(--color-espresso)', marginBottom: '8px' }}>
                    3. Hairstyle & Color
                  </label>
                  
                  {/* Style Pills */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
                    {HAIRSTYLES.map(hair => {
                      const isSelected = selectedHair.id === hair.id;
                      return (
                        <button
                          key={hair.id}
                          onClick={() => setSelectedHair(hair)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '6px',
                            border: isSelected ? '1px solid var(--color-espresso)' : '1px solid var(--color-linen-border)',
                            background: isSelected ? 'var(--color-espresso)' : '#FFFFFF',
                            color: isSelected ? '#FFF2DC' : 'var(--color-espresso)',
                            fontSize: '0.74rem',
                            fontWeight: 600,
                            cursor: 'pointer'
                          }}
                        >
                          {hair.name}
                        </button>
                      );
                    })}
                  </div>

                  {/* Hair Color Dots */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--color-espresso-medium)' }}>Hair Hue:</span>
                    {HAIR_COLORS.map(c => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedHairColor(c)}
                        title={c.name}
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          background: c.hex,
                          border: selectedHairColor.id === c.id ? '2px solid var(--color-espresso)' : '1px solid rgba(0,0,0,0.2)',
                          cursor: 'pointer',
                          transform: selectedHairColor.id === c.id ? 'scale(1.15)' : 'scale(1)'
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* 4. Body Shape / Proportions */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, color: 'var(--color-espresso)', marginBottom: '8px' }}>
                    4. Body Shape & Proportions
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    {BODY_SHAPES.map(body => {
                      const isSelected = selectedBody.id === body.id;
                      return (
                        <div
                          key={body.id}
                          onClick={() => setSelectedBody(body)}
                          style={{
                            padding: '10px 12px',
                            borderRadius: '8px',
                            border: isSelected ? '2px solid var(--color-espresso)' : '1px solid var(--color-linen-border)',
                            background: isSelected ? '#FFF9EE' : '#FFFFFF',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-espresso-dark)' }}>{body.name}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}

            {/* ====== TAB 2: OUTFIT & SIZE ====== */}
            {activeTab === 'outfit' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                
                {/* Size Selector: M, L, XL, XXL only */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <label style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, color: 'var(--color-espresso)' }}>
                      Select Garment Size:
                    </label>
                    <span style={{ fontSize: '0.72rem', color: '#A64B2A', fontWeight: 700 }}>
                      Available in M, L, XL, XXL only
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                    {['M', 'L', 'XL', 'XXL'].map(size => {
                      const isSelected = selectedSize === size;
                      return (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          style={{
                            padding: '12px 0',
                            borderRadius: '8px',
                            border: isSelected ? '2px solid var(--color-espresso)' : '1px solid var(--color-linen-border)',
                            background: isSelected ? 'var(--color-espresso)' : '#FFFFFF',
                            color: isSelected ? '#FFF2DC' : 'var(--color-espresso)',
                            fontSize: '0.92rem',
                            fontWeight: 800,
                            cursor: 'pointer',
                            boxShadow: isSelected ? 'var(--shadow-sm)' : 'none',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>

                  {/* Fit Description Indicator */}
                  <div style={{ marginTop: '12px', background: '#FFF9EE', padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--color-linen-border)', fontSize: '0.76rem', color: 'var(--color-espresso-dark)' }}>
                    <strong>Fit Simulation:</strong> {selectedSize === 'M' ? 'Comfort Tailored drape with zero pulling along chest.' : selectedSize === 'L' ? 'Relaxed breathable drape ideal for warm climates.' : selectedSize === 'XL' ? 'Airy relaxed silhouette with generous ease in shoulders and palazzo hem.' : 'Voluminous statement drape with maximal comfort.'}
                  </div>
                </div>

                {/* Switch Between Available Garments in Studio */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, color: 'var(--color-espresso)', marginBottom: '8px' }}>
                    Try Another Creation On This Avatar:
                  </label>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {products.map(p => {
                      const isCurrent = p.id === product.id;
                      return (
                        <div
                          key={p.id}
                          onClick={() => onSelectProduct(p)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '8px 12px',
                            borderRadius: '8px',
                            border: isCurrent ? '2px solid var(--color-espresso)' : '1px solid var(--color-linen-border)',
                            background: isCurrent ? '#FFF9EE' : '#FFFFFF',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <img src={p.image} alt={p.name} style={{ width: '40px', height: '48px', objectFit: 'cover', borderRadius: '4px' }} />
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-espresso-dark)' }}>{p.name}</div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--color-espresso-muted)' }}>{currency.symbol}{Math.round(p.price * currency.rate).toLocaleString()} • {p.fabric.split(' ')[0]}</div>
                          </div>
                          {isCurrent && <Check size={16} color="#493512" />}
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}

            {/* ====== TAB 3: FOOTWEAR ====== */}
            {activeTab === 'footwear' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ fontSize: '0.82rem', color: 'var(--color-espresso-medium)', marginBottom: '4px' }}>
                  Pair your silhouette with artisanal footwear to test heel height proportions:
                </div>

                {FOOTWEAR.map(shoe => {
                  const isSelected = selectedFootwear.id === shoe.id;
                  return (
                    <div
                      key={shoe.id}
                      onClick={() => setSelectedFootwear(shoe)}
                      style={{
                        padding: '14px 16px',
                        borderRadius: '10px',
                        border: isSelected ? '2px solid var(--color-espresso)' : '1px solid var(--color-linen-border)',
                        background: isSelected ? '#FFF9EE' : '#FFFFFF',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-espresso-dark)' }}>
                          {shoe.name}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--color-espresso-muted)', marginTop: '2px' }}>
                          {shoe.desc}
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '0.72rem', background: 'rgba(73, 53, 18, 0.08)', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 }}>
                          +{Math.round(shoe.heelHeight * 100)} cm Lift
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* ====== TAB 4: LIGHTING & AMBIENCE ====== */}
            {activeTab === 'lighting' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ fontSize: '0.82rem', color: 'var(--color-espresso-medium)', marginBottom: '4px' }}>
                  Simulate different lighting environments to inspect textile colors under daylight & evening tones:
                </div>

                {LIGHTING_MODES.map(light => {
                  const isSelected = selectedLighting.id === light.id;
                  return (
                    <div
                      key={light.id}
                      onClick={() => setSelectedLighting(light)}
                      style={{
                        padding: '14px 16px',
                        borderRadius: '10px',
                        border: isSelected ? '2px solid var(--color-espresso)' : '1px solid var(--color-linen-border)',
                        background: isSelected ? '#FFF9EE' : '#FFFFFF',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-espresso-dark)' }}>
                        {light.name}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--color-espresso-muted)', marginTop: '2px' }}>
                        Curated photon warmth tuned to Espresso Brown & Warm Linen fibers
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>

          {/* Bottom Action Footer */}
          <div 
            style={{
              padding: '18px 24px',
              borderTop: '1px solid var(--color-linen-border)',
              background: 'var(--color-linen-light)',
              display: 'flex',
              gap: '12px'
            }}
          >
            <button
              onClick={handleAddCustomLook}
              style={{
                flex: 1,
                padding: '14px',
                borderRadius: '8px',
                background: addedSuccess ? '#3B5323' : 'var(--color-espresso)',
                color: '#FFF2DC',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.88rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-md)',
                transition: 'all 0.25s ease'
              }}
            >
              {addedSuccess ? (
                <>
                  <Check size={18} /> Added Size {selectedSize} to Bag!
                </>
              ) : (
                <>
                  <ShoppingBag size={17} /> Add Fitted Look to Bag • Size {selectedSize}
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
