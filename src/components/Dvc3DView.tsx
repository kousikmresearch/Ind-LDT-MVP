import { useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Line, OrbitControls, Html, Stars } from "@react-three/drei";
import { Substation, PowerPlant, TransmissionLine } from "../data/dvcDemo";

type Props = {
  substations: Substation[];
  powerPlants: PowerPlant[];
  transmissionLines: TransmissionLine[];
};

const plantColors: Record<string, string> = {
  online: "#22c55e",
  startup: "#eab308",
  offline: "#94a3b8",
  derated: "#f97316",
};

const subColors: Record<string, string> = {
  normal: "#22c55e",
  overload: "#f97316",
  maintenance: "#eab308",
  fault: "#ef4444",
};

const lineColors: Record<string, string> = {
  normal: "#22c55e",
  high: "#f97316",
  critical: "#ef4444",
  fault: "#ef4444",
};

function buildNodeMap(
  substations: Substation[],
  powerPlants: PowerPlant[]
): Record<string, [number, number, number]> {
  const all: { name: string; kind: string }[] = [
    ...powerPlants.map((p) => ({ name: p.name, kind: "plant" })),
    ...substations.map((s) => ({ name: s.name, kind: "sub" })),
  ];
  const perRow = 4;
  const map: Record<string, [number, number, number]> = {};
  all.forEach((item, i) => {
    const x = (i % perRow) * 4 - (perRow * 2 - 2);
    const z = Math.floor(i / perRow) * 4 - (Math.floor((all.length - 1) / perRow) * 2);
    const y = item.kind === "plant" ? 0.8 : 0.4;
    map[item.name] = [x, y, z];
  });
  return map;
}

function findPosition(
  short: string,
  positions: Record<string, [number, number, number]>
): [number, number, number] | null {
  const s = short.toLowerCase();
  for (const [name, pos] of Object.entries(positions)) {
    const n = name.toLowerCase();
    if (n.startsWith(s) || n.includes(` ${s}`) || n.includes(`-${s}`)) {
      return pos;
    }
  }
  return null;
}

function GroundPlane() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[48, 48]} />
      <meshStandardMaterial color="#0f172a" roughness={0.9} metalness={0.1} />
    </mesh>
  );
}

function PowerPlantMesh({ p, position, color }: { p: PowerPlant; position: [number, number, number]; color: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <group position={position}>
      <mesh
        castShadow
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={(e) => { e.stopPropagation(); setHovered(false); }}
        scale={hovered ? 1.2 : 1}
      >
        <cylinderGeometry args={[0.5, 0.5, 1.2, 16]} />
        <meshStandardMaterial
          color={color}
          metalness={0.5}
          roughness={0.4}
          emissive={hovered ? color : "#000000"}
          emissiveIntensity={hovered ? 0.35 : 0}
        />
      </mesh>
      {hovered && (
        <Html position={[0, 1.6, 0]} center distanceFactor={14}>
          <div className="bg-slate-900/90 text-white text-[10px] px-2 py-1 rounded border border-slate-600 whitespace-nowrap">
            <div className="font-semibold">{p.name}</div>
            <div className="text-slate-300">{p.currentOutput}/{p.capacity} MW · {p.status}</div>
          </div>
        </Html>
      )}
    </group>
  );
}

function SubstationMesh({ s, position, color }: { s: Substation; position: [number, number, number]; color: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <group position={position}>
      <mesh
        castShadow
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={(e) => { e.stopPropagation(); setHovered(false); }}
        scale={hovered ? 1.2 : 1}
      >
        <boxGeometry args={[0.9, 0.9, 0.9]} />
        <meshStandardMaterial
          color={color}
          metalness={0.3}
          roughness={0.6}
          emissive={hovered ? color : "#000000"}
          emissiveIntensity={hovered ? 0.35 : 0}
        />
      </mesh>
      {hovered && (
        <Html position={[0, 1.2, 0]} center distanceFactor={14}>
          <div className="bg-slate-900/90 text-white text-[10px] px-2 py-1 rounded border border-slate-600 whitespace-nowrap">
            <div className="font-semibold">{s.name}</div>
            <div className="text-slate-300">{s.load}/{s.maxCapacity} MW · {s.status}</div>
          </div>
        </Html>
      )}
    </group>
  );
}

export default function Dvc3DView({ substations, powerPlants, transmissionLines }: Props) {
  const positions = useMemo(() => buildNodeMap(substations, powerPlants), [substations, powerPlants]);

  return (
    <div className="h-[520px] w-full rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-900">
      <Canvas shadows camera={{ position: [0, 18, 32], fov: 45 }}>
        <fog attach="fog" args={["#0f172a", 25, 70]} />
        <Stars radius={90} depth={50} count={2500} factor={5} saturation={0} fade speed={0.5} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[12, 24, 12]} intensity={1.2} castShadow shadow-mapSize={[1024, 1024]} />
        <pointLight position={[0, 12, 0]} intensity={0.5} color="#38bdf8" />
        <GroundPlane />
        <gridHelper args={[48, 48, "#475569", "#1e293b"]} />

        {powerPlants.map((p) => {
          const pos = positions[p.name];
          if (!pos) return null;
          return <PowerPlantMesh key={p.id} p={p} position={pos} color={plantColors[p.status] ?? "#94a3b8"} />;
        })}

        {substations.map((s) => {
          const pos = positions[s.name];
          if (!pos) return null;
          return <SubstationMesh key={s.id} s={s} position={pos} color={subColors[s.status] ?? "#22c55e"} />;
        })}

        {transmissionLines.map((l) => {
          const start = findPosition(l.from, positions);
          const end = findPosition(l.to, positions);
          if (!start || !end) return null;
          return (
            <Line
              key={l.id}
              points={[start, end]}
              color={lineColors[l.status] ?? "#22c55e"}
              lineWidth={2}
            />
          );
        })}

        <OrbitControls
          enableDamping
          enablePan
          enableZoom
          autoRotate
          autoRotateSpeed={0.4}
          minDistance={12}
          maxDistance={60}
        />
      </Canvas>
    </div>
  );
}
