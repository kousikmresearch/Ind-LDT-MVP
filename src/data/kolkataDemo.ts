// Complete dummy dataset for Kolkata IUDX Pilot + Flood & Crowd DT

export interface Ward {
  id: string;
  name: string;
  population: number;
  area: number;
  floodRisk: "low" | "moderate" | "high" | "severe";
  floodDepth: number;
  rainfall: number;
  drainageStatus: "clear" | "partial" | "overflow";
  waterLevel: number;
  alertLevel: "safe" | "watch" | "warning" | "critical";
}

export const wards: Ward[] = [
  { id: "W-01", name: "Ward 1 — Jorabagan", population: 28450, area: 1.2, floodRisk: "moderate", floodDepth: 0.35, rainfall: 85, drainageStatus: "partial", waterLevel: 2.1, alertLevel: "watch" },
  { id: "W-05", name: "Ward 5 — Bowbazar", population: 32100, area: 0.9, floodRisk: "high", floodDepth: 0.72, rainfall: 112, drainageStatus: "overflow", waterLevel: 3.4, alertLevel: "warning" },
  { id: "W-12", name: "Ward 12 — Park Street", population: 19800, area: 1.5, floodRisk: "low", floodDepth: 0.08, rainfall: 65, drainageStatus: "clear", waterLevel: 1.2, alertLevel: "safe" },
  { id: "W-23", name: "Ward 23 — Ballygunge", population: 35600, area: 2.1, floodRisk: "moderate", floodDepth: 0.28, rainfall: 78, drainageStatus: "partial", waterLevel: 1.8, alertLevel: "watch" },
  { id: "W-34", name: "Ward 34 — Behala East", population: 52300, area: 3.8, floodRisk: "severe", floodDepth: 1.15, rainfall: 145, drainageStatus: "overflow", waterLevel: 4.2, alertLevel: "critical" },
  { id: "W-45", name: "Ward 45 — Garden Reach", population: 41700, area: 2.5, floodRisk: "severe", floodDepth: 0.95, rainfall: 132, drainageStatus: "overflow", waterLevel: 3.8, alertLevel: "critical" },
  { id: "W-56", name: "Ward 56 — Jadavpur", population: 38900, area: 2.8, floodRisk: "high", floodDepth: 0.68, rainfall: 105, drainageStatus: "partial", waterLevel: 2.9, alertLevel: "warning" },
  { id: "W-67", name: "Ward 67 — Salt Lake", population: 24500, area: 3.2, floodRisk: "low", floodDepth: 0.05, rainfall: 52, drainageStatus: "clear", waterLevel: 0.9, alertLevel: "safe" },
  { id: "W-78", name: "Ward 78 — Tollygunge", population: 33200, area: 2.0, floodRisk: "moderate", floodDepth: 0.42, rainfall: 88, drainageStatus: "partial", waterLevel: 2.3, alertLevel: "watch" },
  { id: "W-89", name: "Ward 89 — Kasba", population: 29800, area: 1.8, floodRisk: "high", floodDepth: 0.61, rainfall: 98, drainageStatus: "overflow", waterLevel: 3.1, alertLevel: "warning" },
];

export interface RainfallData {
  time: string;
  rainfall: number;
  cumulative: number;
}

export const rainfallTimeline: RainfallData[] = [
  { time: "06:00", rainfall: 5, cumulative: 5 },
  { time: "07:00", rainfall: 12, cumulative: 17 },
  { time: "08:00", rainfall: 25, cumulative: 42 },
  { time: "09:00", rainfall: 38, cumulative: 80 },
  { time: "10:00", rainfall: 45, cumulative: 125 },
  { time: "11:00", rainfall: 52, cumulative: 177 },
  { time: "12:00", rainfall: 48, cumulative: 225 },
  { time: "13:00", rainfall: 35, cumulative: 260 },
  { time: "14:00", rainfall: 28, cumulative: 288 },
  { time: "15:00", rainfall: 18, cumulative: 306 },
  { time: "16:00", rainfall: 10, cumulative: 316 },
  { time: "17:00", rainfall: 6, cumulative: 322 },
];

export interface DrainageNode {
  id: string;
  location: string;
  ward: string;
  status: "clear" | "partial" | "overflow";
  capacity: number;
  currentFlow: number;
  lastMaintenance: string;
}

export const drainageNodes: DrainageNode[] = [
  { id: "DN-001", location: "BB Ganguly Street", ward: "W-01", status: "partial", capacity: 100, currentFlow: 72, lastMaintenance: "2025-06-15" },
  { id: "DN-002", location: "Central Avenue", ward: "W-05", status: "overflow", capacity: 120, currentFlow: 145, lastMaintenance: "2025-05-20" },
  { id: "DN-003", location: "Park Street", ward: "W-12", status: "clear", capacity: 80, currentFlow: 35, lastMaintenance: "2025-07-01" },
  { id: "DN-004", location: "Ballygunge Circular Rd", ward: "W-23", status: "partial", capacity: 100, currentFlow: 68, lastMaintenance: "2025-06-28" },
  { id: "DN-005", location: "Behala Chowrasta", ward: "W-34", status: "overflow", capacity: 150, currentFlow: 185, lastMaintenance: "2025-04-10" },
  { id: "DN-006", location: "Garden Reach Rd", ward: "W-45", status: "overflow", capacity: 110, currentFlow: 138, lastMaintenance: "2025-05-05" },
  { id: "DN-007", location: "Jadavpur Station Rd", ward: "W-56", status: "partial", capacity: 90, currentFlow: 76, lastMaintenance: "2025-06-20" },
  { id: "DN-008", location: "Salt Lake Sector V", ward: "W-67", status: "clear", capacity: 130, currentFlow: 42, lastMaintenance: "2025-07-10" },
];

export interface Pandal {
  id: string;
  name: string;
  ward: string;
  location: string;
  theme: string;
  crowdDensity: number;
  maxCapacity: number;
  currentVisitors: number;
  safetyStatus: "safe" | "moderate" | "high" | "critical";
  avgWaitTime: number;
  parkingAvailable: number;
  cctvCameras: number;
}

export const pandals: Pandal[] = [
  { id: "P-001", name: "Bagbazar Sarbojonin", ward: "W-01", location: "Bagbazar", theme: "Ancient Temple Architecture", crowdDensity: 8.5, maxCapacity: 15000, currentVisitors: 12750, safetyStatus: "high", avgWaitTime: 45, parkingAvailable: 120, cctvCameras: 24 },
  { id: "P-002", name: "College Square", ward: "W-05", location: "College Street", theme: "Vedic Heritage", crowdDensity: 6.2, maxCapacity: 8000, currentVisitors: 4960, safetyStatus: "moderate", avgWaitTime: 20, parkingAvailable: 45, cctvCameras: 16 },
  { id: "P-003", name: "Md. Ali Park", ward: "W-05", location: "Central Avenue", theme: "Tribal Art of Bengal", crowdDensity: 7.8, maxCapacity: 12000, currentVisitors: 9360, safetyStatus: "high", avgWaitTime: 35, parkingAvailable: 80, cctvCameras: 20 },
  { id: "P-004", name: "Ekdalia Evergreen", ward: "W-23", location: "Ballygunge", theme: "Egyptian Pyramid", crowdDensity: 9.2, maxCapacity: 18000, currentVisitors: 16560, safetyStatus: "critical", avgWaitTime: 65, parkingAvailable: 30, cctvCameras: 32 },
  { id: "P-005", name: "Suruchi Sangha", ward: "W-23", location: "New Road", theme: "Hampi Ruins", crowdDensity: 5.5, maxCapacity: 10000, currentVisitors: 5500, safetyStatus: "moderate", avgWaitTime: 15, parkingAvailable: 95, cctvCameras: 18 },
  { id: "P-006", name: "Behala Notun Dal", ward: "W-34", location: "Behala", theme: "Solar System", crowdDensity: 4.8, maxCapacity: 9000, currentVisitors: 4320, safetyStatus: "safe", avgWaitTime: 10, parkingAvailable: 150, cctvCameras: 14 },
  { id: "P-007", name: "Sreebhumi Sporting", ward: "W-67", location: "Lake Town", theme: "Burj Khalifa Replica", crowdDensity: 8.8, maxCapacity: 16000, currentVisitors: 14080, safetyStatus: "high", avgWaitTime: 50, parkingAvailable: 200, cctvCameras: 28 },
  { id: "P-008", name: "Salt Lake FD Block", ward: "W-67", location: "FD Block", theme: "Mughal Taj Mahal", crowdDensity: 3.5, maxCapacity: 6000, currentVisitors: 2100, safetyStatus: "safe", avgWaitTime: 5, parkingAvailable: 180, cctvCameras: 12 },
  { id: "P-009", name: "Topsia Aanchal", ward: "W-56", location: "Topsia", theme: "Rural Bengal", crowdDensity: 6.8, maxCapacity: 11000, currentVisitors: 7480, safetyStatus: "moderate", avgWaitTime: 25, parkingAvailable: 60, cctvCameras: 16 },
  { id: "P-010", name: "Kasba Milan Sangha", ward: "W-89", location: "Kasba", theme: "Underwater World", crowdDensity: 5.2, maxCapacity: 8500, currentVisitors: 4420, safetyStatus: "safe", avgWaitTime: 12, parkingAvailable: 75, cctvCameras: 14 },
];

export interface CrowdTimelinePoint {
  time: string;
  totalVisitors: number;
  peakPandal: string;
  peakDensity: number;
}

export const crowdTimeline: CrowdTimelinePoint[] = [
  { time: "16:00", totalVisitors: 18500, peakPandal: "Bagbazar Sarbojonin", peakDensity: 3.2 },
  { time: "17:00", totalVisitors: 28200, peakPandal: "Ekdalia Evergreen", peakDensity: 4.5 },
  { time: "18:00", totalVisitors: 42100, peakPandal: "Ekdalia Evergreen", peakDensity: 5.8 },
  { time: "19:00", totalVisitors: 58600, peakPandal: "Ekdalia Evergreen", peakDensity: 7.2 },
  { time: "20:00", totalVisitors: 72400, peakPandal: "Sreebhumi Sporting", peakDensity: 8.1 },
  { time: "21:00", totalVisitors: 81500, peakPandal: "Ekdalia Evergreen", peakDensity: 9.2 },
  { time: "22:00", totalVisitors: 76800, peakPandal: "Ekdalia Evergreen", peakDensity: 8.5 },
  { time: "23:00", totalVisitors: 54300, peakPandal: "Bagbazar Sarbojonin", peakDensity: 6.8 },
  { time: "00:00", totalVisitors: 32100, peakPandal: "College Square", peakDensity: 4.2 },
  { time: "01:00", totalVisitors: 15600, peakPandal: "College Square", peakDensity: 2.5 },
];

export interface IUDXNode {
  id: string;
  name: string;
  type: string;
  provider: string;
  status: "online" | "offline" | "degraded";
  dataPoints: number;
  lastUpdate: string;
  latency: number;
}

export const iudxNodes: IUDXNode[] = [
  { id: "IUDX-KMC-01", name: "KMC Drainage Sensors", type: "IoT Sensor", provider: "Kolkata Municipal Corp", status: "online", dataPoints: 1240, lastUpdate: "2 sec ago", latency: 45 },
  { id: "IUDX-IMD-01", name: "IMD Weather Station", type: "Weather Data", provider: "India Meteorological Dept", status: "online", dataPoints: 18, lastUpdate: "5 sec ago", latency: 120 },
  { id: "IUDX-CCTV-01", name: "Kolkata CCTV Network", type: "Video Analytics", provider: "Kolkata Police", status: "online", dataPoints: 3200, lastUpdate: "1 sec ago", latency: 30 },
  { id: "IUDX-CPCB-01", name: "CPCB Air Quality", type: "Environmental", provider: "CPCB", status: "online", dataPoints: 12, lastUpdate: "15 sec ago", latency: 200 },
  { id: "IUDX-Traffic-01", name: "Traffic Signal System", type: "Transport", provider: "Kolkata Traffic Police", status: "degraded", dataPoints: 450, lastUpdate: "45 sec ago", latency: 850 },
  { id: "IUDX-Water-01", name: "Water Level Sensors", type: "IoT Sensor", provider: "KMC / IISc", status: "online", dataPoints: 85, lastUpdate: "3 sec ago", latency: 55 },
  { id: "IUDX-Mobile-01", name: "Mobile Density Heatmap", type: "Telecom", provider: "BSNL / Reliance Jio", status: "online", dataPoints: 1, lastUpdate: "30 sec ago", latency: 500 },
  { id: "IUDX-Emergency-01", name: "Emergency Services", type: "Emergency", provider: "KMC Control Room", status: "online", dataPoints: 24, lastUpdate: "10 sec ago", latency: 80 },
];

export interface AlertItem {
  id: string;
  type: "flood" | "crowd" | "drainage" | "system";
  severity: "info" | "warning" | "critical";
  message: string;
  ward: string;
  timestamp: string;
  action: string;
}

export const alerts: AlertItem[] = [
  { id: "AL-001", type: "flood", severity: "critical", message: "Ward 34 (Behala East) — Water level at 4.2m, exceeding danger threshold of 3.5m. Immediate evacuation recommended for low-lying areas.", ward: "W-34", timestamp: "14:32:18", action: "Trigger evacuation alert via WhatsApp to Ward 34 residents" },
  { id: "AL-002", type: "flood", severity: "critical", message: "Ward 45 (Garden Reach) — Flood depth 0.95m. Drainage system overflow at 3 nodes. Deploy emergency pumps.", ward: "W-45", timestamp: "14:30:05", action: "Dispatch KMC emergency pump units to Garden Reach" },
  { id: "AL-003", type: "crowd", severity: "critical", message: "Ekdalia Evergreen pandal — Crowd density 9.2/m² exceeds critical threshold. 16,560 visitors (92% capacity).", ward: "W-23", timestamp: "21:15:42", action: "Activate crowd control barriers; divert to Suruchi Sangha" },
  { id: "AL-004", type: "crowd", severity: "warning", message: "Sreebhumi Sporting — Crowd density 8.8/m². 14,080 visitors (88% capacity). Wait time 50 min.", ward: "W-67", timestamp: "21:12:30", action: "Open additional entry gate; deploy 2 additional police units" },
  { id: "AL-005", type: "drainage", severity: "warning", message: "Drainage node DN-005 (Behala Chowrasta) — Flow at 185% capacity. Structural overflow detected.", ward: "W-34", timestamp: "14:28:11", action: "Dispatch drainage maintenance team" },
  { id: "AL-006", type: "drainage", severity: "warning", message: "Drainage node DN-006 (Garden Reach Rd) — Flow at 138% capacity. Overflow imminent.", ward: "W-45", timestamp: "14:27:45", action: "Pre-position emergency pumps" },
  { id: "AL-007", type: "system", severity: "info", message: "IUDX Traffic Signal System node degraded — Latency 850ms (threshold: 500ms). Data stale by 45 sec.", ward: "N/A", timestamp: "14:25:00", action: "Notify KMC IT team; switch to backup data source" },
  { id: "AL-008", type: "flood", severity: "warning", message: "Ward 56 (Jadavpur) — Water level rising at 0.3m/hr. Current: 2.9m. Estimated threshold breach in 2 hours.", ward: "W-56", timestamp: "14:22:33", action: "Issue watch alert to Ward 56 residents via WhatsApp" },
];

export interface SimulationResult {
  scenario: string;
  rainfall: number;
  duration: string;
  affectedWards: number;
  affectedPopulation: number;
  estimatedDamage: string;
  responseTime: string;
  recommendation: string;
}

export const simulationResults: SimulationResult[] = [
  {
    scenario: "100mm rainfall in 2 hours",
    rainfall: 100,
    duration: "2 hr",
    affectedWards: 4,
    affectedPopulation: 168600,
    estimatedDamage: "₹12-15 Cr (property + infrastructure)",
    responseTime: "45 min (drainage response)",
    recommendation: "Pre-deploy pumps in Wards 34, 45, 56. Issue evacuation advisory for Behala East low-lying areas.",
  },
  {
    scenario: "150mm rainfall in 3 hours (current)",
    rainfall: 150,
    duration: "3 hr",
    affectedWards: 6,
    affectedPopulation: 237000,
    estimatedDamage: "₹25-30 Cr (property + infrastructure + business loss)",
    responseTime: "30 min (drainage response)",
    recommendation: "Activate full emergency protocol. Evacuate Wards 34, 45. Deploy NDRF teams. Open relief camps in Wards 12, 67.",
  },
  {
    scenario: "200mm rainfall in 4 hours (worst case)",
    rainfall: 200,
    duration: "4 hr",
    affectedWards: 8,
    estimatedDamage: "₹45-55 Cr",
    affectedPopulation: 312000,
    responseTime: "60 min (overwhelmed drainage)",
    recommendation: "City-wide emergency. Full evacuation of Wards 34, 45, 56, 89. Deploy NDRF + Army. Activate all relief camps.",
  },
];

// Interactive simulation engine

export function runFloodSimulation(rainfall: number, duration: number): SimulationResult {
  // Sort wards by how vulnerable they are (lower elevation + worse drainage = worse)
  const wardRisk = wards.map((w) => {
    const riskScore =
      (rainfall / (w.drainageStatus === "overflow" ? 60 : w.drainageStatus === "partial" ? 90 : 140)) +
      (duration * 0.08) +
      (w.floodRisk === "severe" ? 1.2 : w.floodRisk === "high" ? 0.8 : w.floodRisk === "moderate" ? 0.4 : 0);
    return { ward: w, score: riskScore };
  }).sort((a, b) => b.score - a.score);

  // Determine how many wards are affected based on intensity + duration
  const intensityFactor = rainfall / duration;
  let affectedCount = 0;
  if (intensityFactor > 80) affectedCount = Math.min(10, Math.floor(intensityFactor / 12));
  else if (intensityFactor > 50) affectedCount = Math.min(10, Math.floor(intensityFactor / 15));
  else affectedCount = Math.min(10, Math.floor(intensityFactor / 22));
  affectedCount = Math.max(1, affectedCount);

  const affectedWards = wardRisk.slice(0, affectedCount).map((x) => x.ward);
  const affectedPopulation = affectedWards.reduce((sum, w) => sum + w.population, 0);

  // Damage estimate: base ₹5L per ward + ₹20L per mm above 50mm + population factor
  const baseDamage = affectedCount * 0.5;
  const rainDamage = rainfall > 50 ? (rainfall - 50) * 0.12 : 0;
  const popFactor = (affectedPopulation / 100000) * 0.8;
  const totalDamageCr = (baseDamage + rainDamage + popFactor);
  const estimatedDamage = `₹${(totalDamageCr * 0.8).toFixed(1)}–${(totalDamageCr * 1.2).toFixed(1)} Cr`;

  const responseTime = intensityFactor > 60 ? "20 min (emergency protocol)" :
                       intensityFactor > 35 ? "45 min (drainage response)" :
                       "90 min (standard response)";

  const scenarios = [
    { threshold: 130, label: "Extreme" },
    { threshold: 100, label: "Severe" },
    { threshold: 70, label: "High" },
    { threshold: 40, label: "Moderate" },
    { threshold: 0, label: "Low" },
  ];
  const scenarioLabel = scenarios.find((s) => rainfall >= s.threshold)!.label;
  const scenario = `${rainfall}mm rainfall in ${duration} hours (${scenarioLabel})`;

  const wardNames = affectedWards.map((w) => w.name.replace(/^Ward \d+ — /, ""));
  const criticalWards = affectedWards.filter((w) => w.alertLevel === "critical").map((w) => w.name.replace(/^Ward \d+ — /, ""));
  const recommendation = criticalWards.length
    ? `Immediate: Deploy emergency pumps to ${criticalWards.slice(0, 2).join(", ")}${criticalWards.length > 2 ? " and others" : ""}; issue evacuation advisory for ${wardNames.slice(0, 3).join(", ")}${wardNames.length > 3 ? " and other affected wards" : ""}.`
    : `Monitor ${wardNames.slice(0, 3).join(", ")}${wardNames.length > 3 ? " and other affected wards" : ""}; pre-position KMC drainage teams and open relief camps. Keep IUDX sensors on high-frequency polling.`;

  return {
    scenario,
    rainfall,
    duration: `${duration} hr`,
    affectedWards: affectedCount,
    affectedPopulation,
    estimatedDamage,
    responseTime,
    recommendation,
  };
}

export function getCrowdAtTime(timeIndex: number): Pandal[] {
  const point = crowdTimeline[timeIndex];
  const total = point.totalVisitors;
  const baseTotal = 81500; // 21:00 peak
  const ratio = total / baseTotal;

  return pandals.map((p) => {
    const isPeak = point.peakPandal === p.name;
    const pRatio = isPeak ? 1 : 0.6 + Math.random() * 0.35;
    const visitors = Math.round(p.maxCapacity * (p.crowdDensity / 10) * pRatio * ratio);
    const density = +(visitors / (p.maxCapacity / 8.5)).toFixed(1); // approximate area
    const safety: Pandal["safetyStatus"] =
      density >= 8.5 ? "critical" : density >= 7 ? "high" : density >= 5 ? "moderate" : "safe";
    const waitTime = Math.round(density * 7 + (Math.random() * 10));
    return {
      ...p,
      currentVisitors: visitors,
      crowdDensity: +density,
      safetyStatus: safety,
      avgWaitTime: waitTime,
    };
  });
}

export function refreshIUDXNodes(nodes: IUDXNode[]): IUDXNode[] {
  return nodes.map((n) => {
    const jitter = Math.round(Math.random() * 40 - 20);
    const latency = Math.max(10, Math.min(900, n.latency + jitter));
    const dataPoints = n.dataPoints + Math.round(Math.random() * 10);
    const status: IUDXNode["status"] =
      latency > 500 ? "degraded" :
      Math.random() > 0.95 ? "offline" :
      "online";
    return { ...n, latency, dataPoints, status, lastUpdate: `${Math.max(1, Math.round(Math.random() * 60))} sec ago` };
  });
}

export function generateFloodAlertsFromWards(affectedWards: Ward[], timestamp: string): AlertItem[] {
  return affectedWards
    .filter((w) => w.alertLevel !== "safe")
    .map((w, i) => ({
      id: `SIM-${100 + i}`,
      type: "flood" as const,
      severity: w.alertLevel === "critical" ? "critical" : "warning" as const,
      message: `${w.name} — Simulated flood depth ${w.floodDepth}m with water level ${w.waterLevel}m (${w.drainageStatus} drainage).`,
      ward: w.id,
      timestamp,
      action: w.alertLevel === "critical"
        ? `Evacuate low-lying areas and deploy emergency pumps to ${w.name}.`
        : `Issue watch alert and pre-position drainage teams in ${w.name}.`,
    }));
}

export const kolkataStats = {
  totalWards: 144,
  monitoredWards: 10,
  totalPopulation: 4500000,
  monitoredPopulation: 336300,
  iudxNodes: 8,
  iudxDataPoints: 5030,
  activePandals: 10,
  totalPandals: 3500,
  cctvCameras: 194,
  drainageSensors: 1240,
  rainfallToday: 322,
  alertCount: 8,
  criticalAlerts: 3,
};
