import { useMemo, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, Stars } from "@react-three/drei";
import { Texture, TextureLoader } from "three";
import { Ward, Pandal } from "../data/kolkataDemo";

type Props = {
  wards: Ward[];
  pandals: Pandal[];
};

const alertColors: Record<string, string> = {
  safe: "#22c55e",
  watch: "#eab308",
  warning: "#f97316",
  critical: "#ef4444",
};

const crowdColors: Record<string, string> = {
  safe: "#22c55e",
  moderate: "#eab308",
  high: "#f97316",
  critical: "#ef4444",
};

const riskLevels: Ward["floodRisk"][] = ["low", "moderate", "high", "severe"];
const drainLevels: Ward["drainageStatus"][] = ["clear", "partial", "overflow"];
const alertLevels: Ward["alertLevel"][] = ["safe", "watch", "warning", "critical"];

function generateWard(n: number): Ward {
  const id = n <= 9 ? `W-0${n}` : `W-${n}`;
  const h = (n * 37) % 1000;
  return {
    id,
    name: `Ward ${n}`,
    population: 15000 + (h % 50000),
    area: 0.8 + (h % 400) / 100,
    floodRisk: riskLevels[h % 4],
    floodDepth: (h % 150) / 100,
    rainfall: 30 + (h % 120),
    drainageStatus: drainLevels[h % 3],
    waterLevel: 0.5 + (h % 500) / 100,
    alertLevel: alertLevels[h % 4],
  };
}

type WardCentroid = { id: string; ward: number; lat: number; lon: number };

function buildAllWards(seed: Ward[], centroids: WardCentroid[] | null): Ward[] {
  const byId: Record<string, Ward> = {};
  for (const w of seed) byId[w.id] = w;
  const list = centroids?.map((c) => c.id) ?? [];
  for (let n = 1; n <= 141; n++) {
    const id = n <= 9 ? `W-0${n}` : `W-${n}`;
    if (!list.includes(id)) list.push(id);
    if (!byId[id]) byId[id] = generateWard(n);
  }
  return list.map((id) => byId[id]).filter((w): w is Ward => !!w);
}

function buildWardPositions(
  wards: Ward[],
  centroids: WardCentroid[] | null
): Record<string, [number, number, number]> {
  const map: Record<string, [number, number, number]> = {};
  if (!centroids) return map;

  const lats = centroids.map((c) => c.lat);
  const lons = centroids.map((c) => c.lon);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLon = Math.min(...lons);
  const maxLon = Math.max(...lons);
  const centerLat = (minLat + maxLat) / 2;
  const centerLon = (minLon + maxLon) / 2;
  const scale = 55 / Math.max(maxLon - minLon, maxLat - minLat, 0.0001);

  wards.forEach((w) => {
    const c = centroids.find((x) => x.id === w.id);
    if (!c) return;
    const x = (c.lon - centerLon) * scale;
    const z = (centerLat - c.lat) * scale;
    map[w.id] = [x, 0, z];
  });
  return map;
}

function GroundPlane() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[60, 60]} />
      <meshStandardMaterial color="#0f172a" roughness={0.9} metalness={0.1} />
    </mesh>
  );
}

const MAP_IMAGE_URL = "/3dmap-kolkata.png";

function WaterPlane() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, 0]}>
      <planeGeometry args={[60, 60]} />
      <meshStandardMaterial color="#0ea5e9" transparent opacity={0.12} roughness={0.1} metalness={0.4} />
    </mesh>
  );
}

function MapPlane() {
  const [texture, setTexture] = useState<Texture | null>(null);

  useEffect(() => {
    const loader = new TextureLoader();
    loader.load(
      MAP_IMAGE_URL,
      (t) => setTexture(t),
      undefined,
      () => setTexture(null)
    );
  }, []);

  if (!texture) return null;
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
      <planeGeometry args={[60, 60]} />
      <meshStandardMaterial map={texture} roughness={0.9} />
    </mesh>
  );
}

function WardBar({ ward, position }: { ward: Ward; position: [number, number, number] }) {
  const [hovered, setHovered] = useState(false);
  const height = Math.max(0.05, ward.waterLevel * 0.15);
  const color = alertColors[ward.alertLevel] ?? "#22c55e";
  return (
    <group position={[position[0], 0, position[2]]}>
      <mesh
        position={[0, height / 2 + (hovered ? 0.6 : 0), 0]}
        castShadow
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={(e) => { e.stopPropagation(); setHovered(false); }}
        scale={hovered ? [1.08, 1.2, 1.08] : [1, 1, 1]}
      >
        <boxGeometry args={[1.6, height, 1.6]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.9}
          roughness={0.6}
          metalness={0.2}
          emissive={hovered ? color : "#000000"}
          emissiveIntensity={hovered ? 0.25 : 0}
        />
      </mesh>
      {hovered && (
        <Html position={[0, height + 1.2, 0]} center distanceFactor={14}>
          <div className="bg-slate-900/90 text-white text-[10px] px-2 py-1 rounded border border-slate-600 min-w-[160px]">
            <div className="font-semibold border-b border-slate-600 pb-0.5 mb-0.5">{ward.name}</div>
            <div className="text-slate-300 grid grid-cols-2 gap-x-2 gap-y-0.5">
              <span>Pop:</span><span className="text-right">{ward.population.toLocaleString()}</span>
              <span>Area:</span><span className="text-right">{ward.area} km²</span>
              <span>Water Lvl:</span><span className="text-right">{ward.waterLevel.toFixed(1)} m</span>
              <span>Rainfall:</span><span className="text-right">{ward.rainfall} mm</span>
              <span>Flood:</span><span className="text-right">{ward.floodRisk}</span>
              <span>Drainage:</span><span className="text-right">{ward.drainageStatus}</span>
              <span>Alert:</span><span className="text-right font-semibold" style={{ color }}>{ward.alertLevel}</span>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

function PandalSphere({ pandal, wardPositions, wards }: { pandal: Pandal; wardPositions: Record<string, [number, number, number]>; wards: Ward[] }) {
  const [hovered, setHovered] = useState(false);
  const base = wardPositions[pandal.ward];
  if (!base) return null;
  const ward = wards.find((w) => w.id === pandal.ward);
  const waterLevel = ward?.waterLevel ?? 0;
  const idx = Number(pandal.id.replace(/\D/g, "")) || 0;
  const dx = idx % 2 === 0 ? 0.45 : -0.45;
  const dz = (idx % 3 === 0 ? 1 : idx % 3 === 1 ? -1 : 0) * 0.45;
  const capacityRatio = pandal.crowdDensity / pandal.maxCapacity;
  const radius = 0.15 + capacityRatio * 0.35;
  const height = Math.max(0.05, waterLevel * 0.15);
  const position: [number, number, number] = [base[0] + dx, height + radius, base[2] + dz];
  const color = crowdColors[pandal.safetyStatus] ?? "#22c55e";
  return (
    <group position={position}>
      <mesh
        castShadow
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={(e) => { e.stopPropagation(); setHovered(false); }}
        scale={hovered ? 1.3 : 1}
      >
        <sphereGeometry args={[radius, 16, 16]} />
        <meshStandardMaterial
          color={color}
          metalness={0.4}
          roughness={0.5}
          emissive={hovered ? color : "#000000"}
          emissiveIntensity={hovered ? 0.35 : 0}
        />
      </mesh>
      {hovered && (
        <Html position={[0, radius + 0.8, 0]} center distanceFactor={14}>
          <div className="bg-slate-900/90 text-white text-[10px] px-2 py-1 rounded border border-slate-600 min-w-[160px]">
            <div className="font-semibold border-b border-slate-600 pb-0.5 mb-0.5">{pandal.name}</div>
            <div className="text-slate-300 grid grid-cols-2 gap-x-2 gap-y-0.5">
              <span>Visitors:</span><span className="text-right">{pandal.currentVisitors.toLocaleString()}</span>
              <span>Capacity:</span><span className="text-right">{pandal.maxCapacity.toLocaleString()}</span>
              <span>Density:</span><span className="text-right">{pandal.crowdDensity.toFixed(1)}</span>
              <span>Wait:</span><span className="text-right">{pandal.avgWaitTime} min</span>
              <span>Parking:</span><span className="text-right">{pandal.parkingAvailable}</span>
              <span>CCTV:</span><span className="text-right">{pandal.cctvCameras}</span>
              <span>Status:</span><span className="text-right font-semibold" style={{ color }}>{pandal.safetyStatus}</span>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

export default function Kolkata3DView(_props: Props) {
  return (
    <div className="h-[520px] w-full rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white">
      <iframe
        src="/kolkata-plot.html"
        title="Kolkata 141 Ward Conditions"
        className="h-full w-full border-0"
        loading="lazy"
      />
    </div>
  );
}
