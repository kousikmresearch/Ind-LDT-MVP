// Complete dummy dataset for DVC Power Transmission & Load Despatch DT

export interface Substation {
  id: string;
  name: string;
  type: "Grid" | "Pool" | "Switching";
  voltage: number; // kV
  location: string;
  load: number; // MW
  maxCapacity: number; // MW
  status: "normal" | "overload" | "maintenance" | "fault";
  transformerHealth: number; // %
  temperature: number; // °C
}

export const substations: Substation[] = [
  { id: "S-001", name: "Mejia Right Bank", type: "Grid", voltage: 400, location: "Bankura, WB", load: 850, maxCapacity: 1500, status: "normal", transformerHealth: 94, temperature: 62 },
  { id: "S-002", name: "Durgapur Steel", type: "Grid", voltage: 400, location: "Bardhaman, WB", load: 1120, maxCapacity: 1500, status: "overload", transformerHealth: 78, temperature: 78 },
  { id: "S-003", name: "Bokaro B", type: "Pool", voltage: 220, location: "Bokaro, JH", load: 620, maxCapacity: 900, status: "normal", transformerHealth: 88, temperature: 55 },
  { id: "S-004", name: "Chandrapura", type: "Pool", voltage: 220, location: "Bokaro, JH", load: 450, maxCapacity: 700, status: "normal", transformerHealth: 91, temperature: 50 },
  { id: "S-005", name: "Maithon Right Bank", type: "Grid", voltage: 220, location: "Dhanbad, JH", load: 380, maxCapacity: 600, status: "normal", transformerHealth: 95, temperature: 48 },
  { id: "S-006", name: "Panchet", type: "Switching", voltage: 132, location: "Purulia, WB", load: 210, maxCapacity: 400, status: "normal", transformerHealth: 89, temperature: 45 },
  { id: "S-007", name: "Konar", type: "Switching", voltage: 132, location: "Hazaribagh, JH", load: 150, maxCapacity: 300, status: "maintenance", transformerHealth: 60, temperature: 42 },
  { id: "S-008", name: "Tilaiya", type: "Pool", voltage: 220, location: "Koderma, JH", load: 320, maxCapacity: 500, status: "normal", transformerHealth: 92, temperature: 52 },
];

export interface PowerPlant {
  id: string;
  name: string;
  type: "Thermal" | "Hydro" | "Solar";
  fuel?: string;
  capacity: number; // MW
  currentOutput: number; // MW
  availability: number; // %
  rampRate: number; // MW per minute
  unitCost: string; // ₹/kWh
  status: "online" | "startup" | "offline" | "derated";
}

export const powerPlants: PowerPlant[] = [
  { id: "P-001", name: "Mejia TPS", type: "Thermal", fuel: "Coal", capacity: 2340, currentOutput: 1980, availability: 85, rampRate: 6, unitCost: "₹4.20", status: "online" },
  { id: "P-002", name: "Durgapur TPS", type: "Thermal", fuel: "Coal", capacity: 390, currentOutput: 330, availability: 85, rampRate: 4, unitCost: "₹4.50", status: "online" },
  { id: "P-003", name: "Bokaro TPS", type: "Thermal", fuel: "Coal", capacity: 630, currentOutput: 540, availability: 86, rampRate: 5, unitCost: "₹4.10", status: "online" },
  { id: "P-004", name: "Chandrapura TPS", type: "Thermal", fuel: "Coal", capacity: 860, currentOutput: 0, availability: 0, rampRate: 0, unitCost: "—", status: "offline" },
  { id: "P-005", name: "Maithon Power Station", type: "Hydro", capacity: 60, currentOutput: 45, availability: 75, rampRate: 12, unitCost: "₹2.80", status: "online" },
  { id: "P-006", name: "Panchet Hydro", type: "Hydro", capacity: 80, currentOutput: 62, availability: 78, rampRate: 15, unitCost: "₹2.70", status: "online" },
  { id: "P-007", name: "Tilaiya Solar Park", type: "Solar", capacity: 200, currentOutput: 155, availability: 78, rampRate: 2, unitCost: "₹2.20", status: "online" },
  { id: "P-008", name: "DVC Floating Solar", type: "Solar", capacity: 50, currentOutput: 38, availability: 76, rampRate: 2, unitCost: "₹2.10", status: "online" },
];

export interface TransmissionLine {
  id: string;
  name: string;
  from: string;
  to: string;
  voltage: number;
  length: number; // km
  load: number; // MW
  thermalLimit: number; // MW
  sag: number; // cm
  temperature: number; // °C
  status: "normal" | "high" | "critical" | "fault";
  faultRisk: number; // %
  lastFault?: string;
}

export const transmissionLines: TransmissionLine[] = [
  { id: "TL-001", name: "Mejia → Durgapur 400kV", from: "Mejia", to: "Durgapur", voltage: 400, length: 95, load: 1180, thermalLimit: 1800, sag: 145, temperature: 72, status: "high", faultRisk: 28, lastFault: "2025-03-14" },
  { id: "TL-002", name: "Durgapur → Bokaro 400kV", from: "Durgapur", to: "Bokaro", voltage: 400, length: 110, load: 820, thermalLimit: 1800, sag: 120, temperature: 58, status: "normal", faultRisk: 12 },
  { id: "TL-003", name: "Bokaro → Maithon 220kV", from: "Bokaro", to: "Maithon", voltage: 220, length: 85, load: 390, thermalLimit: 600, sag: 95, temperature: 51, status: "normal", faultRisk: 8 },
  { id: "TL-004", name: "Maithon → Panchet 132kV", from: "Maithon", to: "Panchet", voltage: 132, length: 55, load: 210, thermalLimit: 300, sag: 80, temperature: 46, status: "normal", faultRisk: 5 },
  { id: "TL-005", name: "Chandrapura → Konar 132kV", from: "Chandrapura", to: "Koner", voltage: 132, length: 40, load: 0, thermalLimit: 300, sag: 65, temperature: 38, status: "fault", faultRisk: 95, lastFault: "2025-08-23" },
  { id: "TL-006", name: "Tilaiya → Bokaro 220kV", from: "Tilaiya", to: "Bokaro", voltage: 220, length: 70, load: 315, thermalLimit: 500, sag: 88, temperature: 49, status: "normal", faultRisk: 7 },
  { id: "TL-007", name: "Panchet → Durgapur 220kV", from: "Panchet", to: "Durgapur", voltage: 220, length: 120, load: 410, thermalLimit: 700, sag: 105, temperature: 55, status: "normal", faultRisk: 15 },
];

export interface LoadCurvePoint {
  time: string;
  demand: number; // MW
  supply: number; // MW
  frequency: number; // Hz
  renewableShare: number; // %
}

export const loadCurve: LoadCurvePoint[] = [
  { time: "00:00", demand: 2150, supply: 2180, frequency: 50.02, renewableShare: 18 },
  { time: "02:00", demand: 1880, supply: 1910, frequency: 50.05, renewableShare: 19 },
  { time: "04:00", demand: 1780, supply: 1800, frequency: 50.06, renewableShare: 20 },
  { time: "06:00", demand: 2050, supply: 2070, frequency: 50.04, renewableShare: 22 },
  { time: "08:00", demand: 2620, supply: 2600, frequency: 49.95, renewableShare: 24 },
  { time: "10:00", demand: 2980, supply: 3010, frequency: 50.01, renewableShare: 28 },
  { time: "12:00", demand: 3240, supply: 3220, frequency: 49.97, renewableShare: 32 },
  { time: "14:00", demand: 3180, supply: 3190, frequency: 49.99, renewableShare: 34 },
  { time: "16:00", demand: 3080, supply: 3100, frequency: 50.00, renewableShare: 30 },
  { time: "18:00", demand: 3520, supply: 3490, frequency: 49.92, renewableShare: 25 },
  { time: "20:00", demand: 3360, supply: 3380, frequency: 49.98, renewableShare: 22 },
  { time: "22:00", demand: 2780, supply: 2800, frequency: 50.03, renewableShare: 20 },
];

export interface FaultAlert {
  id: string;
  type: "transmission" | "generation" | "substation" | "frequency";
  severity: "info" | "warning" | "critical";
  message: string;
  asset: string;
  timestamp: string;
  action: string;
}

export const faultAlerts: FaultAlert[] = [
  { id: "FA-001", type: "transmission", severity: "critical", message: "TL-005 Chandrapura → Konar 132kV line tripped on overcurrent. Zone 1 protection operated.", asset: "TL-005", timestamp: "14:23:18", action: "Transfer load to TL-006 via Bokaro 220kV. Dispatch maintenance crew to Konar." },
  { id: "FA-002", type: "transmission", severity: "warning", message: "TL-001 Mejia → Durgapur 400kV loading at 65%. High sag observed at 145cm.", asset: "TL-001", timestamp: "14:20:05", action: "Reduce loading by 100 MW via Durgapur TPS dispatch." },
  { id: "FA-003", type: "substation", severity: "warning", message: "S-002 Durgapur Steel transformer temperature at 78°C, approaching 85°C limit.", asset: "S-002", timestamp: "14:18:33", action: "Switch capacitor banks and transfer 150 MW to S-006 Panchet." },
  { id: "FA-004", type: "generation", severity: "info", message: "P-007 Tilaiya Solar Park output dropped 15% due to passing cloud cover.", asset: "P-007", timestamp: "14:15:42", action: "Compensate with hydro ramp: Maithon +20 MW, Panchet +15 MW." },
  { id: "FA-005", type: "frequency", severity: "warning", message: "System frequency touched 49.92 Hz at 18:00 peak. Secondary response activated.", asset: "Eastern Region Grid", timestamp: "18:05:11", action: "Spinning reserve from Mejia TPS Unit 5 committed; 80 MW ramp initiated." },
];

export interface DespatchScenario {
  demand: number;
  solarOutput: number;
  thermalBase: number;
  hydroBase: number;
  result: {
    totalSupply: number;
    deficit: number;
    frequencyEstimate: number;
    thermalDispatch: number;
    hydroDispatch: number;
    solarDispatch: number;
    mustRun?: string[];
    recommendation: string;
  };
}

export function runDespatchSimulation(
  demand: number,
  solarShare: number,
  hydroShare: number
): DespatchScenario["result"] {
  const totalSolar = Math.round(
    (powerPlants
      .filter((p) => p.type === "Solar")
      .reduce((sum, p) => sum + p.capacity, 0) * solarShare) / 100
  );
  const totalHydro = Math.round(
    (powerPlants
      .filter((p) => p.type === "Hydro")
      .reduce((sum, p) => sum + p.capacity, 0) * hydroShare) / 100
  );
  const totalRenewable = totalSolar + totalHydro;

  // Thermal must fill the gap. Cap at available thermal capacity (excluding offline Chandrapura)
  const availableThermal = powerPlants
    .filter((p) => p.type === "Thermal" && p.status !== "offline")
    .reduce((sum, p) => sum + p.capacity, 0);
  const requiredThermal = Math.max(0, demand - totalRenewable);
  const thermalDispatch = Math.min(requiredThermal, availableThermal);

  const totalSupply = totalRenewable + thermalDispatch;
  const deficit = demand - totalSupply;

  // Frequency estimate: 50 Hz nominal, drops 0.02 Hz per 100 MW deficit
  const freqDrop = (deficit / 100) * 0.04;
  const frequencyEstimate = +(50 - freqDrop).toFixed(2);

  // Must-run plants
  const mustRun: string[] = [];
  if (totalSolar < demand * 0.15) mustRun.push("Tilaiya Solar", "DVC Floating Solar");
  if (totalHydro < demand * 0.10) mustRun.push("Maithon", "Panchet");
  if (thermalDispatch < demand * 0.60) mustRun.push("Mejia TPS");

  const recommendation =
    deficit > 300
      ? `Critical deficit ${deficit} MW. Import from ER grid and shed non-critical load. Max out thermal dispatch and hydro.`
      : deficit > 0
      ? `Deficit ${deficit} MW. Ramp hydro, call spinning reserve from Mejia TPS, and issue DSM notice. Solar at ${totalSolar} MW covers ${solarShare}% of installed capacity.`
      : totalSupply - demand > 200
      ? `Surplus ${totalSupply - demand} MW. Curtail non-must-run thermal and export to neighbouring states. Renewable share ${Math.round((totalRenewable / totalSupply) * 100)}%.`
      : `Balanced. Maintain thermal at ${thermalDispatch} MW and hydro at ${totalHydro} MW. Frequency stable at ~${frequencyEstimate} Hz.`;

  return {
    totalSupply,
    deficit,
    frequencyEstimate,
    thermalDispatch,
    hydroDispatch: totalHydro,
    solarDispatch: totalSolar,
    mustRun,
    recommendation,
  };
}

export function getTransmissionLinesAfterFault(lineId: string, offline: boolean): TransmissionLine[] {
  return transmissionLines.map((line) =>
    line.id === lineId ? { ...line, status: offline ? "fault" : "normal", load: offline ? 0 : line.load } : line
  );
}

export function refreshSubstations(nodes: Substation[]): Substation[] {
  return nodes.map((s) => ({
    ...s,
    load: Math.round(s.load + (Math.random() * 40 - 20)),
    temperature: Math.round(s.temperature + (Math.random() * 6 - 3)),
    transformerHealth: Math.min(100, Math.max(40, Math.round(s.transformerHealth + (Math.random() * 2 - 1)))),
  }));
}

export function refreshPlants(plants: PowerPlant[]): PowerPlant[] {
  return plants.map((p) => ({
    ...p,
    currentOutput: p.status === "offline" ? 0 : Math.round(Math.min(p.capacity, p.currentOutput + (Math.random() * 40 - 20))),
    availability: Math.min(100, Math.max(0, Math.round(p.availability + (Math.random() * 4 - 2)))),
  }));
}

export const dvcStats = {
  totalGeneration: 4150,
  thermalCapacity: 5020,
  hydroCapacity: 140,
  solarCapacity: 250,
  monitoredSubstations: substations.length,
  transmissionLines: transmissionLines.length,
  totalLoad: 3240,
  coverageArea: 24000, // sq km
  servedDistricts: 17,
  industrialConsumers: 84,
  faultCount: faultAlerts.length,
  criticalFaults: faultAlerts.filter((f) => f.severity === "critical").length,
};

// --- Global best-practice extensions (CIM, economic dispatch, weather, DER, asset health) ---

export interface DataSource {
  id: string;
  name: string;
  type: "SCADA" | "EMS" | "PMU" | "Weather" | "AMI" | "GIS" | "Market";
  status: "online" | "degraded" | "offline";
  latency: number; // ms
  lastSync: string;
  dataPoints: number;
  standard: string; // e.g., CIM, IEC 61970, IEEE C37.118
}

export const dataSources: DataSource[] = [
  { id: "DS-001", name: "DVC SCADA", type: "SCADA", status: "online", latency: 80, lastSync: "14:24:03", dataPoints: 14500, standard: "IEC 61850" },
  { id: "DS-002", name: "WRLDC EMS", type: "EMS", status: "online", latency: 120, lastSync: "14:24:01", dataPoints: 2800, standard: "IEC 61970 CIM" },
  { id: "DS-003", name: "PMU Grid", type: "PMU", status: "online", latency: 50, lastSync: "14:23:59", dataPoints: 3600, standard: "IEEE C37.118" },
  { id: "DS-004", name: "IMD Weather", type: "Weather", status: "online", latency: 300, lastSync: "14:22:15", dataPoints: 720, standard: "WMO / GRIB" },
  { id: "DS-005", name: "AMI Meters", type: "AMI", status: "degraded", latency: 450, lastSync: "14:19:42", dataPoints: 125000, standard: "DLMS/COSEM" },
  { id: "DS-006", name: "Bhuvan GIS", type: "GIS", status: "online", latency: 200, lastSync: "14:23:30", dataPoints: 4200, standard: "OGC / GeoJSON" },
  { id: "DS-007", name: "IEX DAM", type: "Market", status: "online", latency: 250, lastSync: "14:20:00", dataPoints: 96, standard: "MMBG" },
];

export interface CIMObject {
  id: string;
  name: string;
  type: "Substation" | "Line" | "PowerTransformer" | "Breaker" | "GeneratingUnit" | "EnergyConsumer";
  mRID: string;
  lastUpdated: string;
  validationStatus: "valid" | "warning" | "error";
}

export const cimModel: CIMObject[] = [
  { id: "CIM-S001", name: "Mejia Right Bank Substation", type: "Substation", mRID: "dvc:sub:mejia-rb", lastUpdated: "2026-08-28T09:00:00Z", validationStatus: "valid" },
  { id: "CIM-TL001", name: "Mejia → Durgapur 400kV", type: "Line", mRID: "dvc:line:mejia-dgp", lastUpdated: "2026-08-28T09:00:00Z", validationStatus: "valid" },
  { id: "CIM-PT001", name: "Mejia 315MVA Transformer", type: "PowerTransformer", mRID: "dvc:tx:mejia-t1", lastUpdated: "2026-08-28T08:30:00Z", validationStatus: "valid" },
  { id: "CIM-BR001", name: "Mejia 400kV Breaker 1", type: "Breaker", mRID: "dvc:br:mejia-b1", lastUpdated: "2026-08-28T09:15:00Z", validationStatus: "warning" },
  { id: "CIM-GU001", name: "Mejia TPS Unit 1", type: "GeneratingUnit", mRID: "dvc:gen:mejia-u1", lastUpdated: "2026-08-28T09:00:00Z", validationStatus: "valid" },
  { id: "CIM-EC001", name: "Durgapur Steel Load", type: "EnergyConsumer", mRID: "dvc:load:dgp-steel", lastUpdated: "2026-08-28T08:45:00Z", validationStatus: "valid" },
];

export interface AssetHealth {
  assetId: string;
  assetName: string;
  category: "transformer" | "line" | "plant";
  healthScore: number; // 0-100
  remainingLife: number; // years
  risk: "low" | "medium" | "high";
  nextMaintenance: string;
  anomaly: string;
}

export const assetHealth: AssetHealth[] = [
  { assetId: "S-002", assetName: "Durgapur Steel Transformer", category: "transformer", healthScore: 78, remainingLife: 4.2, risk: "medium", nextMaintenance: "2026-09-15", anomaly: "Hot-spot temperature trend above 75°C for 30 days" },
  { assetId: "TL-001", assetName: "Mejia → Durgapur 400kV", category: "line", healthScore: 71, remainingLife: 6.8, risk: "medium", nextMaintenance: "2026-10-01", anomaly: "Sag growth 5% above nominal; conductor annealing risk" },
  { assetId: "TL-005", assetName: "Chandrapura → Konar 132kV", category: "line", healthScore: 42, remainingLife: 2.1, risk: "high", nextMaintenance: "2026-08-30", anomaly: "Frequent overcurrent trips; pole foundation ageing" },
  { assetId: "P-001", assetName: "Mejia TPS Unit 5", category: "plant", healthScore: 89, remainingLife: 12.5, risk: "low", nextMaintenance: "2027-01-10", anomaly: "Blade erosion minor; vibration within limits" },
  { assetId: "S-007", assetName: "Konar 132kV Transformer", category: "transformer", healthScore: 60, remainingLife: 3.5, risk: "high", nextMaintenance: "2026-09-05", anomaly: "Oil DGA elevated acetylene; maintenance scheduled" },
];

export interface WeatherPoint {
  time: string;
  temp: number; // °C
  wind: number; // km/h
  humidity: number; // %
  storm: boolean;
  solarIrradiance: number; // W/m²
}

export const weatherForecast: WeatherPoint[] = [
  { time: "14:00", temp: 34, wind: 18, humidity: 72, storm: false, solarIrradiance: 820 },
  { time: "15:00", temp: 35, wind: 20, humidity: 70, storm: false, solarIrradiance: 780 },
  { time: "16:00", temp: 34, wind: 22, humidity: 75, storm: false, solarIrradiance: 650 },
  { time: "17:00", temp: 32, wind: 28, humidity: 80, storm: false, solarIrradiance: 420 },
  { time: "18:00", temp: 30, wind: 35, humidity: 85, storm: true, solarIrradiance: 120 },
  { time: "19:00", temp: 29, wind: 42, humidity: 90, storm: true, solarIrradiance: 0 },
  { time: "20:00", temp: 28, wind: 30, humidity: 88, storm: false, solarIrradiance: 0 },
];

export interface DER {
  id: string;
  name: string;
  type: "Solar" | "EV" | "Storage" | "Wind";
  capacity: number; // MW or MWh
  currentOutput: number;
  predictedOutput: number;
  status: "online" | "offline" | "charging" | "discharging";
  location: string;
}

export const distributedResources: DER[] = [
  { id: "DER-001", name: "Tilaiya Rooftop Solar", type: "Solar", capacity: 50, currentOutput: 42, predictedOutput: 48, status: "online", location: "Tilaiya" },
  { id: "DER-002", name: "Dhanbad EV Bus Depot", type: "EV", capacity: 20, currentOutput: 15, predictedOutput: 25, status: "charging", location: "Dhanbad" },
  { id: "DER-003", name: "Durgapur BESS 50MWh", type: "Storage", capacity: 50, currentOutput: 0, predictedOutput: 30, status: "discharging", location: "Durgapur" },
  { id: "DER-004", name: "Purulia Small Wind", type: "Wind", capacity: 25, currentOutput: 8, predictedOutput: 12, status: "online", location: "Purulia" },
];

export interface WhatIfScenario {
  id: string;
  name: string;
  description: string;
  demandDelta: number; // %
  solarDelta: number; // %
  lineOutage?: string;
  storm: boolean;
  evLoad: number; // MW
}

export const whatIfScenarios: WhatIfScenario[] = [
  { id: "WIS-001", name: "Monsoon Storm", description: "Heavy rain and wind increase line temperature, reduce solar by 60%, trip one 132kV line.", demandDelta: 5, solarDelta: -60, lineOutage: "TL-005", storm: true, evLoad: 0 },
  { id: "WIS-002", name: "EV Charging Peak", description: "Evening EV fleet charging adds 200 MW and solar is ramping down.", demandDelta: 8, solarDelta: -40, lineOutage: undefined, storm: false, evLoad: 200 },
  { id: "WIS-003", name: "Heat Wave + High AC", description: "Demand rises 15%, solar at peak, transmission thermal limits reduced.", demandDelta: 15, solarDelta: 0, lineOutage: undefined, storm: false, evLoad: 0 },
  { id: "WIS-004", name: "Baseload Trip", description: "Mejia TPS Unit 1 trips. Test spinning reserve and hydro ramp response.", demandDelta: 0, solarDelta: 0, lineOutage: undefined, storm: false, evLoad: 0 },
];

export interface EconomicDispatch {
  totalCost: number; // ₹
  fuelCost: number;
  carbonTons: number;
  marginalPrice: number; // ₹/MWh
  schedule: { plantId: string; name: string; output: number; cost: number }[];
}

export function runEconomicDispatch(demand: number, solarShare: number, hydroShare: number): EconomicDispatch {
  // Plant costs (₹/MWh) from unit cost strings
  const costMap: Record<string, number> = {
    "P-001": 4200,
    "P-002": 4500,
    "P-003": 4100,
    "P-004": 0, // offline
    "P-005": 2800,
    "P-006": 2700,
    "P-007": 2200,
    "P-008": 2100,
  };

  const onlinePlants = powerPlants.filter((p) => p.status !== "offline");
  let remaining = demand;
  const schedule: { plantId: string; name: string; output: number; cost: number }[] = [];

  // Merit order: solar, hydro, then thermal sorted by cost
  const renewables = onlinePlants
    .filter((p) => p.type === "Solar" || p.type === "Hydro")
    .sort((a, b) => costMap[a.id] - costMap[b.id]);
  const thermals = onlinePlants.filter((p) => p.type === "Thermal").sort((a, b) => costMap[a.id] - costMap[b.id]);

  for (const p of renewables) {
    const share = p.type === "Solar" ? solarShare / 100 : hydroShare / 100;
    const output = Math.min(remaining, p.capacity * share);
    remaining = Math.max(0, remaining - output);
    schedule.push({ plantId: p.id, name: p.name, output, cost: Math.round(output * costMap[p.id]) });
  }

  for (const p of thermals) {
    const output = Math.min(remaining, p.capacity);
    remaining = Math.max(0, remaining - output);
    schedule.push({ plantId: p.id, name: p.name, output, cost: Math.round(output * costMap[p.id]) });
  }

  const totalCost = schedule.reduce((sum, s) => sum + s.cost, 0);
  const fuelCost = schedule
    .filter((s) => s.plantId.startsWith("P-00") && s.plantId <= "P-004")
    .reduce((sum, s) => sum + s.cost, 0);
  const carbonTons = +((fuelCost / 1000000) * 0.85).toFixed(1); // ~0.85 tCO2 per ₹10L
  const marginalPrice = schedule.length > 0 ? costMap[schedule[schedule.length - 1].plantId] : 0;

  return { totalCost, fuelCost, carbonTons, marginalPrice, schedule };
}

export function runWhatIf(scenario: WhatIfScenario, baseDemand: number, solarShare: number, hydroShare: number) {
  const adjustedDemand = Math.round(baseDemand * (1 + scenario.demandDelta / 100) + scenario.evLoad);
  const adjustedSolar = Math.max(0, Math.min(100, solarShare + scenario.solarDelta));

  const despatch = runDespatchSimulation(adjustedDemand, adjustedSolar, hydroShare);
  const economic = runEconomicDispatch(adjustedDemand, adjustedSolar, hydroShare);

  const lines = scenario.lineOutage
    ? transmissionLines.map((l) => (l.id === scenario.lineOutage ? { ...l, status: "fault" as const, load: 0 } : l))
    : transmissionLines;

  // Transmission overload check
  const overloads = lines.filter((l) => l.load / l.thermalLimit > 0.75);
  const riskScore = Math.min(100, overloads.length * 25 + (despatch.deficit > 0 ? 40 : 0) + (scenario.storm ? 25 : 0));

  const recommendation =
    riskScore >= 75
      ? `High risk scenario. Initiate emergency load shedding, ramp hydro to max, and import from ER grid. Outage: ${scenario.lineOutage || "none"}.`
      : riskScore >= 50
      ? `Moderate risk. Reconfigure topology, shift 100 MW from ${scenario.lineOutage || "overloaded corridors"}, and dispatch lower-cost thermal.`
      : `Scenario manageable with normal reserves. Maintain merit-order dispatch and continue monitoring.`;

  return {
    scenario,
    adjustedDemand,
    adjustedSolar,
    despatch,
    economic,
    overloads,
    riskScore,
    recommendation,
  };
}

export function predictLineFaultRisk(line: TransmissionLine, weather: WeatherPoint, hoursInFuture: number): number {
  // Simple heuristic: temp + wind + current load -> fault risk
  const loadFactor = (line.load / line.thermalLimit) * 100;
  const thermalStress = Math.max(0, (weather.temp - 25) * 2);
  const windEffect = Math.max(0, (40 - weather.wind) * 1.5);
  const stormEffect = weather.storm ? 25 : 0;
  const ageFactor = line.lastFault ? 15 : 0;
  const prediction = Math.min(100, Math.round(loadFactor * 0.5 + thermalStress + windEffect + stormEffect + ageFactor));
  return prediction;
}

export function refreshDataSources(sources: DataSource[]): DataSource[] {
  return sources.map((s) => ({
    ...s,
    latency: Math.max(10, Math.round(s.latency + (Math.random() * 50 - 25))),
    dataPoints: Math.round(s.dataPoints + (Math.random() * 200 - 100)),
    status: s.latency > 400 ? "degraded" : s.status,
  }));
}
