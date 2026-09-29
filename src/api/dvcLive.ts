// Live data client for DVC / WRLDC feeds
// This layer is a placeholder adapter; replace endpoint URLs with real DVC/WRLDC APIs when available.

import {
  type Substation,
  type PowerPlant,
  type TransmissionLine,
  type DataSource,
  type DER,
  type WeatherPoint,
  substations,
  powerPlants,
  transmissionLines,
  dataSources,
  distributedResources,
  weatherForecast,
} from "../data/dvcDemo";

const API_BASE =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ||
  (typeof window !== "undefined"
    ? `${window.location.protocol}//${window.location.hostname}:8000`
    : "http://localhost:8000");

export type FeedType = "scada" | "ems" | "pmu" | "weather" | "der" | "market" | "simulation";

export interface DvcFeed {
  id: FeedType;
  name: string;
  enabled: boolean;
  baseUrl: string;
  endpoint: string;
  method: "GET" | "POST";
  apiKey?: string;
  headers?: Record<string, string>;
  pollInterval: number; // ms
  description: string;
}

export const feedPresets: Record<string, DvcFeed[]> = {
  dummy: [
    { id: "scada", name: "DVC SCADA", enabled: false, baseUrl: "https://dvc-api.example.com", endpoint: "/scada/realtime", method: "GET", pollInterval: 5000, description: "Substation RTU / IEC 61850 telemetry" },
    { id: "ems", name: "WRLDC EMS", enabled: false, baseUrl: "https://wrldc-api.example.com", endpoint: "/ems/state", method: "GET", pollInterval: 5000, description: "Regional energy management state" },
    { id: "pmu", name: "PMU Grid", enabled: false, baseUrl: "https://pmu.example.com", endpoint: "/snapshot", method: "GET", pollInterval: 1000, description: "Synchrophasor stream (IEEE C37.118)" },
    { id: "weather", name: "IMD Weather", enabled: false, baseUrl: "https://mausam.imd.gov.in/api", endpoint: "/forecast", method: "GET", pollInterval: 60000, description: "IMD/WRF weather forecast" },
    { id: "der", name: "DER Aggregator", enabled: false, baseUrl: "https://der.example.com", endpoint: "/status", method: "GET", pollInterval: 10000, description: "Rooftop solar, EV, BESS telemetry" },
    { id: "market", name: "IEX DAM", enabled: false, baseUrl: "https://www.iexindia.com/api", endpoint: "/market/dam", method: "GET", pollInterval: 300000, description: "Day-ahead market clearing prices" },
    { id: "simulation", name: "pandapower Simulation", enabled: true, baseUrl: API_BASE, endpoint: "/dvc/dispatch", method: "POST", pollInterval: 10000, description: "Pandapower dispatch and power flow" },
  ],
};

export interface DvcLiveConfig {
  enabled: boolean;
  globalPollInterval: number; // ms
  feeds: DvcFeed[];
}

export const defaultConfig: DvcLiveConfig = loadLiveConfig() || {
  enabled: false,
  globalPollInterval: 5000,
  feeds: feedPresets.dummy,
};

const LIVE_CONFIG_KEY = "dvcLiveConfig";

export function saveLiveConfig(config: DvcLiveConfig): void {
  try {
    localStorage.setItem(LIVE_CONFIG_KEY, JSON.stringify(config));
  } catch {
    // ignore storage errors
  }
}

export function loadLiveConfig(): DvcLiveConfig | null {
  try {
    const raw = localStorage.getItem(LIVE_CONFIG_KEY);
    if (!raw) return null;
    const saved = JSON.parse(raw) as Partial<DvcLiveConfig>;
    const base: DvcLiveConfig = {
      enabled: false,
      globalPollInterval: 5000,
      feeds: feedPresets.dummy,
    };
    const mergedFeeds = base.feeds.map((f) => {
      const savedFeed = saved.feeds?.find((x) => x.id === f.id);
      return savedFeed ? { ...f, ...savedFeed } : f;
    });
    return { ...base, ...saved, feeds: mergedFeeds };
  } catch { return null; }
}

export function buildEndpointsFromFeeds(feeds: DvcFeed[]): Record<FeedType, { url: string; method: DvcFeed["method"]; headers?: Record<string, string> } | undefined> {
  const map: Record<FeedType, { url: string; method: DvcFeed["method"]; headers?: Record<string, string> } | undefined> = {
    scada: undefined,
    ems: undefined,
    pmu: undefined,
    weather: undefined,
    der: undefined,
    market: undefined,
    simulation: undefined,
  };
  for (const f of feeds.filter((f) => f.enabled)) {
    map[f.id] = { url: `${f.baseUrl}${f.endpoint}`, method: f.method, headers: f.headers };
  }
  return map;
}

export interface DvcLiveSnapshot {
  timestamp: string;
  substations: Substation[];
  powerPlants: PowerPlant[];
  transmissionLines: TransmissionLine[];
  dataSources: DataSource[];
  distributedResources: DER[];
  weatherForecast: WeatherPoint[];
}

export interface EmsResponse {
  powerPlants?: PowerPlant[];
  transmissionLines?: TransmissionLine[];
  substations?: Substation[];
  frequency?: number;
}

function getFeedHeaders(feed: DvcFeed): HeadersInit {
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (feed.apiKey) headers["Authorization"] = `Bearer ${feed.apiKey}`;
  for (const [k, v] of Object.entries(feed.headers || {})) {
    headers[k] = v;
  }
  return headers;
}

async function fetchJson<T>(feed: DvcFeed): Promise<T> {
  const url = `${feed.baseUrl}${feed.endpoint}`;
  const response = await fetch(url, { method: feed.method, headers: getFeedHeaders(feed) });
  if (!response.ok) throw new Error(`Live fetch failed: ${url} (${response.status})`);
  return response.json() as Promise<T>;
}

function getFeedOrThrow(feeds: DvcFeed[], id: FeedType): DvcFeed | undefined {
  return feeds.find((f) => f.id === id && f.enabled);
}

export async function fetchDvcBackendSnapshot(baseUrl: string): Promise<DvcLiveSnapshot> {
  const url = `${baseUrl}/dvc/dispatch`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ demand: 3240, solar_share: 100, hydro_share: 100 }),
  });
  if (!response.ok) throw new Error(`DVC backend failed: ${url} (${response.status})`);
  const payload = (await response.json()) as any;

  const now = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const updatedPlants = powerPlants.map((p) => {
    const go = payload.generator_outputs?.find((g: any) => g.name === p.name);
    if (!go) return p;
    const currentOutput = Math.round(go.p_mw);
    return {
      ...p,
      currentOutput,
      availability: Math.min(100, Math.max(0, Math.round((currentOutput / p.capacity) * 100))),
    };
  });
  const updatedLines = transmissionLines.map((l) => {
    const line = payload.line_loadings?.find((x: any) => x.name === l.name);
    if (!line) return l;
    const loading = line.loading_percent ?? 0;
    const status: TransmissionLine["status"] = l.status === "fault" ? "fault" : loading > 90 ? "critical" : loading > 60 ? "high" : "normal";
    return {
      ...l,
      load: Math.round(Math.abs(line.p_from_mw ?? l.load)),
      status,
      temperature: Math.round(40 + loading * 0.5),
    };
  });
  const updatedSources = dataSources.map((s) => {
    const status: DataSource["status"] = s.type === "SCADA" || s.type === "EMS" || s.type === "PMU" ? "online" : s.type === "AMI" ? "degraded" : s.status;
    return { ...s, status, latency: Math.round(50 + Math.random() * 100), lastSync: now, dataPoints: s.dataPoints };
  });

  return {
    timestamp: new Date().toISOString(),
    substations,
    powerPlants: updatedPlants,
    transmissionLines: updatedLines,
    dataSources: updatedSources,
    distributedResources,
    weatherForecast,
  };
}

export async function fetchLiveSnapshot(config: DvcLiveConfig = defaultConfig): Promise<DvcLiveSnapshot> {
  if (!config.enabled) throw new Error("Live data is not enabled in config");

  const simFeed = getFeedOrThrow(config.feeds, "simulation");
  if (simFeed) return fetchDvcBackendSnapshot(simFeed.baseUrl);

  const scadaFeed = getFeedOrThrow(config.feeds, "scada");
  const emsFeed = getFeedOrThrow(config.feeds, "ems");
  const pmuFeed = getFeedOrThrow(config.feeds, "pmu");
  const weatherFeed = getFeedOrThrow(config.feeds, "weather");
  const derFeed = getFeedOrThrow(config.feeds, "der");

  const [scada, ems, pmu, weather, der] = await Promise.allSettled([
    scadaFeed ? fetchJson<Substation[]>(scadaFeed) : Promise.resolve<Substation[]>([]),
    emsFeed ? fetchJson<EmsResponse>(emsFeed) : Promise.resolve<EmsResponse>({}),
    pmuFeed ? fetchJson<{ frequency: number }>(pmuFeed) : Promise.resolve<{ frequency: number }>({ frequency: 50.0 }),
    weatherFeed ? fetchJson<WeatherPoint[]>(weatherFeed) : Promise.resolve<WeatherPoint[]>([]),
    derFeed ? fetchJson<DER[]>(derFeed) : Promise.resolve<DER[]>([]),
  ]);

  const liveSubstations = scada.status === "fulfilled" ? scada.value : substations;
  const livePlants = ems.status === "fulfilled" && ems.value.powerPlants ? ems.value.powerPlants : powerPlants;
  const liveLines = ems.status === "fulfilled" && ems.value.transmissionLines ? ems.value.transmissionLines : transmissionLines;
  const liveDERs = der.status === "fulfilled" ? der.value : distributedResources;
  const liveWeather = weather.status === "fulfilled" ? weather.value : weatherForecast;

  const now = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const sources: DataSource[] = dataSources.map((s) => {
    const feed = config.feeds.find((f) => f.id.toLowerCase() === s.type.toLowerCase());
    const latency = feed ? Math.round(50 + Math.random() * 100) : 999;
    const status: DataSource["status"] = feed && feed.enabled && latency < 400 ? "online" : feed && feed.enabled ? "degraded" : "offline";
    return { ...s, latency, status, lastSync: now };
  });

  return {
    timestamp: new Date().toISOString(),
    substations: liveSubstations,
    powerPlants: livePlants,
    transmissionLines: liveLines,
    dataSources: sources,
    distributedResources: liveDERs,
    weatherForecast: liveWeather,
  };
}

// Simulation mode: useful when real APIs are not yet available
export function generateSimulatedSnapshot(): DvcLiveSnapshot {
  const now = new Date().toISOString();
  return {
    timestamp: now,
    substations: substations.map((s) => ({
      ...s,
      load: Math.round(s.load + (Math.random() * 40 - 20)),
      temperature: Math.round(s.temperature + (Math.random() * 6 - 3)),
      transformerHealth: Math.min(100, Math.max(40, Math.round(s.transformerHealth + (Math.random() * 2 - 1)))),
    })),
    powerPlants: powerPlants.map((p) => ({
      ...p,
      currentOutput: p.status === "offline" ? 0 : Math.round(Math.min(p.capacity, p.currentOutput + (Math.random() * 40 - 20))),
      availability: Math.min(100, Math.max(0, Math.round(p.availability + (Math.random() * 4 - 2)))),
    })),
    transmissionLines: transmissionLines.map((l) => ({
      ...l,
      load: Math.round(Math.max(0, l.load + (Math.random() * 60 - 30))),
      temperature: Math.round(l.temperature + (Math.random() * 6 - 3)),
      sag: Math.round(l.sag + (Math.random() * 10 - 5)),
    })),
    dataSources: dataSources.map((s) => ({
      ...s,
      latency: Math.max(10, Math.round(s.latency + (Math.random() * 50 - 25))),
      dataPoints: Math.round(s.dataPoints + (Math.random() * 200 - 100)),
      lastSync: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    })),
    distributedResources: distributedResources.map((d) => ({
      ...d,
      currentOutput: Math.round(Math.max(0, Math.min(d.capacity, d.currentOutput + (Math.random() * 20 - 10)))),
      predictedOutput: Math.round(Math.max(0, Math.min(d.capacity, d.predictedOutput + (Math.random() * 20 - 10)))),
    })),
    weatherForecast,
  };
}
