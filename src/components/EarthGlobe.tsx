import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
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
];

function AppIcon({ position, color, emoji }: { position: [number, number, number]; color: string; emoji: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.lookAt(0, 0, 0);
      // Subtle floating animation
      const offset = position[0] * 100 + position[1] * 50;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + offset) * 0.02;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.22, 0.22, 0.04]} />
      <meshStandardMaterial
        ref={materialRef}
        color={color}
        emissive={color}
        emissiveIntensity={0.3}
        transparent
        opacity={0.85}
        roughness={0.2}
        metalness={0.5}
      />
    </mesh>
  );
}

function GlobeWithIcons() {
  const globeRef = useRef<THREE.Group>(null);

  const iconPositions = useMemo(() => {
    return appIcons.map((_, i) => {
      const phi = Math.acos(-1 + (2 * (i + 1)) / (appIcons.length + 2));
      const theta = Math.sqrt(appIcons.length * Math.PI) * phi;
      const radius = 1.35;
      return [
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi) * 0.8,
        radius * Math.cos(phi),
      ] as [number, number, number];
    });
  }, []);

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <group ref={globeRef}>
      {/* Earth sphere */}
      <Sphere args={[1, 64, 64]}>
        <meshStandardMaterial
          color="#0f3460"
          emissive="#06b6d4"
          emissiveIntensity={0.08}
          roughness={0.7}
          metalness={0.3}
          transparent
          opacity={0.85}
        />
      </Sphere>

      {/* Wireframe overlay */}
      <Sphere args={[1.01, 24, 24]}>
        <meshBasicMaterial
          color="#22d3ee"
          wireframe
          transparent
          opacity={0.12}
        />
      </Sphere>

      {/* Atmosphere glow */}
      <Sphere args={[1.08, 32, 32]}>
        <meshBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* App icons on the globe */}
      {appIcons.map((app, i) => (
        <AppIcon
          key={app.name}
          position={iconPositions[i]}
          color={app.color}
          emoji={app.emoji}
        />
      ))}
    </group>
  );
}

interface EarthGlobeProps {
  className?: string;
}

export default function EarthGlobe({ className }: EarthGlobeProps) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 3.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 3, 5]} intensity={1} color="#22d3ee" />
        <pointLight position={[-5, -3, -5]} intensity={0.5} color="#818cf8" />
        <directionalLight position={[2, 5, 2]} intensity={0.6} />
        <GlobeWithIcons />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
}
