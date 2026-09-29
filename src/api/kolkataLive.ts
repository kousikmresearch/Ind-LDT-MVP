// Live data client for Kolkata IUDX / smart city feeds
// This layer is a placeholder adapter; replace endpoint URLs with real KMC/IUDX APIs when available.

import {
  type Ward, type RainfallData, type Pandal, type IUDXNode, type AlertItem,
  wards, rainfallTimeline, pandals, iudxNodes, alerts, refreshIUDXNodes,
} from "../data/kolkataDemo";

const API_BASE =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ||
  (typeof window !== "undefined"
    ? `${window.location.protocol}//${window.location.hostname}:8000`
    : "http://localhost:8000");

export type KolkataFeedType = "rainfall" | "drainage" | "weather" | "cctv" | "crowd" | "iudx" | "alerts" | "traffic" | "simulation";

export interface KolkataFeed {
  id: KolkataFeedType;
  name: string;
  enabled: boolean;
  baseUrl: string;
  endpoint: string;
  method: "GET" | "POST";
  apiKey?: string;
  headers?: Record<string, string>;
  pollInterval: number;
  description: string;
}

export interface KolkataLiveConfig {
  enabled: boolean;
  globalPollInterval: number;
  feeds: KolkataFeed[];
}

export const kolkataFeedPresets: Record<string, KolkataFeed[]> = {
  dummy: [
    { id: "rainfall", name: "IMD Rainfall", enabled: false, baseUrl: "https://mausam.imd.gov.in/api", endpoint: "/kolkata/rainfall", method: "GET", pollInterval: 300000, description: "IMD Kolkata rainfall / cumulative precipitation" },
    { id: "drainage", name: "KMC Drainage Sensors", enabled: false, baseUrl: "https://kmc-iot.example.com", endpoint: "/drainage", method: "GET", pollInterval: 10000, description: "Drainage node flow and capacity telemetry" },
    { id: "weather", name: "Kolkata Weather", enabled: false, baseUrl: "https://iudx.example.com", endpoint: "/weather", method: "GET", pollInterval: 60000, description: "Temperature, humidity, wind, pressure" },
    { id: "cctv", name: "Kolkata CCTV Network", enabled: false, baseUrl: "https://kmc-cctv.example.com", endpoint: "/analytics/crowd", method: "GET", pollInterval: 5000, description: "Video analytics crowd density and queue length" },
    { id: "crowd", name: "Pandal Crowd Counters", enabled: false, baseUrl: "https://pujo-crowd.example.com", endpoint: "/pandals/live", method: "GET", pollInterval: 15000, description: "Pandal current visitors and density" },
    { id: "iudx", name: "IUDX Catalogue", enabled: false, baseUrl: "https://iudx.org.in/api", endpoint: "/kolkata/resources", method: "GET", pollInterval: 30000, description: "IUDX resource catalogue and node status" },
    { id: "alerts", name: "KMC Control Room", enabled: false, baseUrl: "https://kmc-control.example.com", endpoint: "/alerts", method: "GET", pollInterval: 20000, description: "KMC / ICCC active alerts and advisories" },
    { id: "traffic", name: "Traffic Signal System", enabled: false, baseUrl: "https://kmc-traffic.example.com", endpoint: "/signals", method: "GET", pollInterval: 10000, description: "Traffic signal latency and congestion data" },
    { id: "simulation", name: "SWMM Flood Simulation", enabled: true, baseUrl: API_BASE, endpoint: "/kolkata/flood", method: "POST", pollInterval: 15000, description: "SWMM flood simulation" },
  ],
};

export interface KolkataLiveSnapshot {
  timestamp: string;
  wards: Ward[];
  rainfall: RainfallData[];
  pandals: Pandal[];
  iudxNodes: IUDXNode[];
  alerts: AlertItem[];
}

const CONFIG_KEY = "kolkataLiveConfig";

export function saveKolkataConfig(config: KolkataLiveConfig): void {
  try { localStorage.setItem(CONFIG_KEY, JSON.stringify(config)); } catch { /* ignore */ }
}

export function loadKolkataConfig(): KolkataLiveConfig | null {
  try {
    const raw = localStorage.getItem(CONFIG_KEY);
    if (!raw) return null;
    const saved = JSON.parse(raw) as Partial<KolkataLiveConfig>;
    const base: KolkataLiveConfig = {
      enabled: false,
      globalPollInterval: 5000,
      feeds: kolkataFeedPresets.dummy,
    };
    const mergedFeeds = base.feeds.map((f) => {
      const savedFeed = saved.feeds?.find((x) => x.id === f.id);
      return savedFeed ? { ...f, ...savedFeed } : f;
    });
    return { ...base, ...saved, feeds: mergedFeeds };
  } catch { return null; }
}

export const defaultKolkataConfig: KolkataLiveConfig = loadKolkataConfig() || {
  enabled: false,
  globalPollInterval: 5000,
  feeds: kolkataFeedPresets.dummy,
};

function getFeedHeaders(feed: KolkataFeed): HeadersInit {
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (feed.apiKey) headers["Authorization"] = `Bearer ${feed.apiKey}`;
  for (const [k, v] of Object.entries(feed.headers || {})) headers[k] = v;
  return headers;
}

async function fetchJson<T>(feed: KolkataFeed): Promise<T> {
  const url = `${feed.baseUrl}${feed.endpoint}`;
  const response = await fetch(url, { method: feed.method, headers: getFeedHeaders(feed) });
  if (!response.ok) throw new Error(`Live fetch failed: ${url} (${response.status})`);
  return response.json() as Promise<T>;
}

function getFeedOrThrow(feeds: KolkataFeed[], id: KolkataFeedType): KolkataFeed | undefined {
  return feeds.find((f) => f.id === id && f.enabled);
}

export async function fetchKolkataBackendSnapshot(baseUrl: string): Promise<KolkataLiveSnapshot> {
  const url = `${baseUrl}/kolkata/flood`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rainfall: 150, duration: 3 }),
  });
  if (!response.ok) throw new Error(`Kolkata backend failed: ${url} (${response.status})`);
  const payload = (await response.json()) as any;

  const updatedWards: Ward[] = (payload.wards ?? []).map((w: any) => ({
    id: w.id,
    name: w.name,
    population: w.population,
    area: w.area,
    floodRisk: w.flood_risk,
    floodDepth: w.flood_depth,
    rainfall: w.rainfall,
    drainageStatus: w.drainage_status,
    waterLevel: w.water_level,
    alertLevel: w.alert_level,
  }));

  return {
    timestamp: new Date().toISOString(),
    wards: updatedWards.length ? updatedWards : wards,
    rainfall: rainfallTimeline,
    pandals,
    iudxNodes: refreshIUDXNodes(iudxNodes),
    alerts,
  };
}

export async function fetchKolkataLiveSnapshot(config: KolkataLiveConfig = defaultKolkataConfig): Promise<KolkataLiveSnapshot> {
  if (!config.enabled) throw new Error("Kolkata live data is not enabled");

  const simFeed = getFeedOrThrow(config.feeds, "simulation");
  if (simFeed) return fetchKolkataBackendSnapshot(simFeed.baseUrl);

  const rainfallFeed = getFeedOrThrow(config.feeds, "rainfall");
  const drainageFeed = getFeedOrThrow(config.feeds, "drainage");
  const weatherFeed = getFeedOrThrow(config.feeds, "weather");
  const cctvFeed = getFeedOrThrow(config.feeds, "cctv");
  const crowdFeed = getFeedOrThrow(config.feeds, "crowd");
  const iudxFeed = getFeedOrThrow(config.feeds, "iudx");
  const alertsFeed = getFeedOrThrow(config.feeds, "alerts");
  const trafficFeed = getFeedOrThrow(config.feeds, "traffic");

  const [rainfall, drainage, weather, cctv, crowd, iudx, alertsResult, traffic] = await Promise.allSettled([
    rainfallFeed ? fetchJson<RainfallData[]>(rainfallFeed) : Promise.resolve<RainfallData[]>([]),
    drainageFeed ? fetchJson<Partial<KolkataLiveSnapshot>>(drainageFeed) : Promise.resolve<Partial<KolkataLiveSnapshot>>({}),
    weatherFeed ? fetchJson<Partial<KolkataLiveSnapshot>>(weatherFeed) : Promise.resolve<Partial<KolkataLiveSnapshot>>({}),
    cctvFeed ? fetchJson<Pandal[]>(cctvFeed) : Promise.resolve<Pandal[]>([]),
    crowdFeed ? fetchJson<Pandal[]>(crowdFeed) : Promise.resolve<Pandal[]>([]),
    iudxFeed ? fetchJson<IUDXNode[]>(iudxFeed) : Promise.resolve<IUDXNode[]>([]),
    alertsFeed ? fetchJson<AlertItem[]>(alertsFeed) : Promise.resolve<AlertItem[]>([]),
    trafficFeed ? fetchJson<{ latency: number }>(trafficFeed) : Promise.resolve<{ latency: number }>({ latency: 50 }),
  ]);

  const liveWards = drainage.status === "fulfilled" && drainage.value.wards ? drainage.value.wards :
                    weather.status === "fulfilled" && weather.value.wards ? weather.value.wards : wards;
  const liveRainfall = rainfall.status === "fulfilled" && rainfall.value.length ? rainfall.value : rainfallTimeline;
  const liveCCTV = cctv.status === "fulfilled" ? cctv.value : pandals;
  const liveCrowd = crowd.status === "fulfilled" ? crowd.value : liveCCTV;
  const liveIUDX = iudx.status === "fulfilled" ? iudx.value : refreshIUDXNodes(iudxNodes);
  const liveAlerts = alertsResult.status === "fulfilled" ? alertsResult.value : alerts;

  return {
    timestamp: new Date().toISOString(),
    wards: liveWards,
    rainfall: liveRainfall,
    pandals: liveCrowd,
    iudxNodes: liveIUDX,
    alerts: liveAlerts,
  };
}

// Simulation mode when real APIs are not yet available
export function generateSimulatedKolkataSnapshot(): KolkataLiveSnapshot {
  const now = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  return {
    timestamp: new Date().toISOString(),
    wards: wards.map((w) => ({
      ...w,
      rainfall: Math.max(0, Math.round(w.rainfall + (Math.random() * 20 - 10))),
      waterLevel: Math.max(0.5, Math.min(5, w.waterLevel + (Math.random() * 0.4 - 0.2))),
      floodDepth: Math.max(0, Math.min(1.5, w.floodDepth + (Math.random() * 0.2 - 0.1))),
    })),
    rainfall: rainfallTimeline,
    pandals: pandals.map((p) => ({
      ...p,
      currentVisitors: Math.round(Math.max(0, Math.min(p.maxCapacity, p.currentVisitors + (Math.random() * 800 - 400)))),
      crowdDensity: Math.max(0, +(p.crowdDensity + (Math.random() * 0.6 - 0.3)).toFixed(1)),
    })),
    iudxNodes: refreshIUDXNodes(iudxNodes),
    alerts,
  };
}
