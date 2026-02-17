import { useRef, useMemo, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Sphere, Html } from "@react-three/drei";
import * as THREE from "three";

const appIcons = [
  { name: "Messages", emoji: "💬", color: "#22d3ee" },
  { name: "Camera", emoji: "📷", color: "#f472b6" },
  { name: "Music", emoji: "🎵", color: "#a78bfa" },
  { name: "Weather", emoji: "🌤", color: "#fbbf24" },
  { name: "Maps", emoji: "🗺", color: "#34d399" },
  { name: "Calendar", emoji: "📅", color: "#f87171" },
  { name: "Notes", emoji: "📝", color: "#fb923c" },
  { name: "Health", emoji: "❤️", color: "#ec4899" },
  { name: "Photos", emoji: "🖼", color: "#60a5fa" },
  { name: "Settings", emoji: "⚙️", color: "#94a3b8" },
  { name: "Mail", emoji: "✉️", color: "#2dd4bf" },
  { name: "Clock", emoji: "⏰", color: "#e879f9" },
  { name: "Wallet", emoji: "💳", color: "#4ade80" },
  { name: "Store", emoji: "🛍", color: "#38bdf8" },
  { name: "News", emoji: "📰", color: "#f59e0b" },
  { name: "Phone", emoji: "📞", color: "#10b981" },
  { name: "Video", emoji: "🎬", color: "#ef4444" },
  { name: "Browser", emoji: "🌐", color: "#6366f1" },
  { name: "Games", emoji: "🎮", color: "#8b5cf6" },
  { name: "Fitness", emoji: "🏋️", color: "#14b8a6" },
  { name: "Books", emoji: "📚", color: "#f97316" },
  { name: "Translate", emoji: "🌍", color: "#0ea5e9" },
  { name: "Podcast", emoji: "🎙", color: "#d946ef" },
  { name: "Files", emoji: "📁", color: "#64748b" },
];

function AppIconOnGlobe({
  position,
  color,
  emoji,
  name,
  onSelect,
  isSelected,
}: {
  position: [number, number, number];
  color: string;
  emoji: string;
  name: string;
  onSelect: () => void;
  isSelected: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { camera } = useThree();
  const [visible, setVisible] = useState(true);

  useFrame(() => {
    if (groupRef.current) {
      const worldPos = new THREE.Vector3();
      groupRef.current.getWorldPosition(worldPos);
      const camDir = camera.position.clone().normalize();
      const iconDir = worldPos.clone().normalize();
      const dot = camDir.dot(iconDir);
      setVisible(dot > -0.2);

      // Face outward from globe
      groupRef.current.lookAt(worldPos.clone().multiplyScalar(2));
    }
  });

  const scale = hovered ? 1.2 : isSelected ? 1.1 : 1;

  return (
    <group ref={groupRef} position={position}>
      {/* App icon tile */}
      <mesh
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = "auto"; }}
        onClick={(e) => { e.stopPropagation(); onSelect(); }}
        scale={scale}
      >
        <boxGeometry args={[0.14, 0.14, 0.015]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.5 : isSelected ? 0.4 : 0.2}
          transparent
          opacity={visible ? 0.9 : 0.05}
          roughness={0.15}
          metalness={0.6}
        />
      </mesh>

      {/* Emoji + label using Html - only show when visible */}
      {visible && (
        <Html
          center
          distanceFactor={4}
          style={{
            pointerEvents: "none",
            userSelect: "none",
          }}
          occlude={false}
        >
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1px",
            pointerEvents: "none",
          }}>
            <span style={{ fontSize: "16px", lineHeight: 1 }}>{emoji}</span>
            <span style={{
              fontSize: "7px",
              color: "hsl(195, 100%, 90%)",
              fontWeight: 600,
              textShadow: "0 0 4px rgba(0,0,0,0.9)",
              whiteSpace: "nowrap",
            }}>
              {name}
            </span>
          </div>
        </Html>
      )}

      {/* Glow when selected */}
      {isSelected && visible && (
        <mesh scale={1.3}>
          <ringGeometry args={[0.08, 0.1, 32]} />
          <meshBasicMaterial color={color} transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
}

function GlobeWithApps({
  onSelectApp,
  selectedApp,
}: {
  onSelectApp: (name: string) => void;
  selectedApp: string | null;
}) {
  // Fibonacci sphere distribution
  const iconPositions = useMemo(() => {
    const n = appIcons.length;
    const positions: [number, number, number][] = [];
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const radius = 1.15;

    for (let i = 0; i < n; i++) {
      const theta = (2 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / n);
      positions.push([
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta),
      ]);
    }
    return positions;
  }, []);

  return (
    <group>
      {/* Core sphere */}
      <Sphere args={[1, 64, 64]}>
        <meshStandardMaterial
          color="#0a1628"
          emissive="#0891b2"
          emissiveIntensity={0.05}
          roughness={0.8}
          metalness={0.2}
          transparent
          opacity={0.9}
        />
      </Sphere>

      {/* Wireframe grid */}
      <Sphere args={[1.005, 32, 32]}>
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.06} />
      </Sphere>

      {/* Atmosphere */}
      <Sphere args={[1.08, 32, 32]}>
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.04} side={THREE.BackSide} />
      </Sphere>

      {/* App icons */}
      {appIcons.map((app, i) => (
        <AppIconOnGlobe
          key={app.name}
          position={iconPositions[i]}
          color={app.color}
          emoji={app.emoji}
          name={app.name}
          onSelect={() => onSelectApp(app.name)}
          isSelected={selectedApp === app.name}
        />
      ))}
    </group>
  );
}

interface EarthGlobeProps {
  className?: string;
  interactive?: boolean;
  onSelectApp?: (name: string) => void;
  selectedApp?: string | null;
}

export default function EarthGlobe({
  className,
  interactive = false,
  onSelectApp,
  selectedApp = null,
}: EarthGlobeProps) {
  const handleSelect = useCallback(
    (name: string) => { onSelectApp?.(name); },
    [onSelectApp]
  );

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 3.8], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 3, 5]} intensity={1.2} color="#22d3ee" />
        <pointLight position={[-5, -3, -5]} intensity={0.4} color="#818cf8" />
        <directionalLight position={[2, 5, 2]} intensity={0.5} />

        <GlobeWithApps onSelectApp={handleSelect} selectedApp={selectedApp} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={!interactive}
          autoRotateSpeed={0.8}
          rotateSpeed={0.6}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.3}
          dampingFactor={0.08}
          enableDamping
        />
      </Canvas>
    </div>
  );
}
