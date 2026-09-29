import { useState, useEffect, useMemo, useCallback } from "react";
import {
  CloudRain, Users, Activity, Database, AlertTriangle, MapPin,
  TrendingUp, Clock, Zap, Radio, Camera, Droplets, Building2,
  ChevronRight, Bell, ShieldAlert, Gauge, PlayCircle, Cpu,
  RefreshCw, Trash2, CheckCircle, Power, Pause, CloudLightning, Box
} from "lucide-react";
import {
  wards, rainfallTimeline, drainageNodes as baseDrainageNodes, pandals as basePandals,
  crowdTimeline, iudxNodes as baseIUDXNodes, alerts as baseAlerts, simulationResults,
  kolkataStats,
  runFloodSimulation, getCrowdAtTime, refreshIUDXNodes, generateFloodAlertsFromWards,
  type Ward, type Pandal, type AlertItem, type IUDXNode
} from "../data/kolkataDemo";
import {
  defaultKolkataConfig, saveKolkataConfig, loadKolkataConfig,
  type KolkataLiveSnapshot, type KolkataLiveConfig
} from "../api/kolkataLive";
import { useKolkataLiveData } from "../hooks/useKolkataLiveData";
import { KolkataFeedConfigPanel } from "../components/KolkataFeedConfigPanel";
import Kolkata3DView from "../components/Kolkata3DView";

type Tab = "overview" | "flood" | "crowd" | "iudx" | "alerts" | "simulation" | "3d";

export default function KolkataDemo() {
  const [tab, setTab] = useState<Tab>("overview");
  const [currentTime, setCurrentTime] = useState<string>(() =>
    new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
  );
  const [liveMode, setLiveMode] = useState(false);
  const [tick, setTick] = useState(0);
  const [liveConfig, setLiveConfig] = useState<KolkataLiveConfig>(loadKolkataConfig() || defaultKolkataConfig);
  const useLiveData = liveConfig.enabled;
  const [simulate, setSimulate] = useState(false);
  const [showFeedPanel, setShowFeedPanel] = useState(false);

  const { snapshot, loading, error, refresh } = useKolkataLiveData({
    config: liveConfig,
    poll: liveMode,
    simulate: simulate || !useLiveData,
  });

  const saveConfig = useCallback((next: KolkataLiveConfig) => {
    setLiveConfig(next);
    saveKolkataConfig(next);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }));
      if (liveMode) setTick((x) => x + 1);
    }, 2000);
    return () => clearInterval(t);
  }, [liveMode]);

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: "overview", label: "Overview", icon: Activity },
    { id: "flood", label: "Flood Simulation", icon: CloudRain },
    { id: "crowd", label: "Crowd Density", icon: Users },
    { id: "iudx", label: "IUDX Data Exchange", icon: Database },
    { id: "alerts", label: "Alerts", icon: Bell },
    { id: "simulation", label: "Scenario Lab", icon: PlayCircle },
    { id: "3d", label: "3D City", icon: Box },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-center gap-3 mb-2">
            <MapPin size={20} />
            <span className="text-blue-100 text-sm">Kolkata, West Bengal · IUDX Pilot City</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">IUDX Pilot + Flood & Crowd DT</h1>
          <p className="text-blue-100 max-w-2xl">
            Interactive digital twin simulation — adjust rainfall and time, run what-if scenarios,
            and watch the twin respond in real-time.
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur text-sm ${loading ? "bg-yellow-400/20" : error ? "bg-red-400/20" : "bg-green-400/20"}`}>
              <div className={`w-2 h-2 rounded-full animate-pulse ${loading ? "bg-yellow-400" : error ? "bg-red-400" : "bg-green-400"}`} />
              <span>
                {useLiveData
                  ? error
                    ? `Live Error: ${error}`
                    : liveConfig.feeds.some((f) => f.id === "simulation" && f.enabled) && !simulate
                      ? `Live · Backend Simulation`
                      : `Live · ${snapshot ? new Date(snapshot.timestamp).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" }) : "Connecting"}`
                  : "Simulated"}
              </span>
            </div>
            <button
              onClick={() => setLiveMode((m) => !m)}
              className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1.5 transition-colors ${
                liveMode
                  ? "bg-red-500/80 hover:bg-red-500"
                  : "bg-white/20 hover:bg-white/30"
              }`}
            >
              {liveMode ? <Pause size={14} /> : <Power size={14} />}
              {liveMode ? "Pause" : "Resume"}
            </button>
            <button
              onClick={() => saveConfig({ ...liveConfig, enabled: !liveConfig.enabled })}
              className="px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1.5 transition-colors bg-white/20 hover:bg-white/30"
            >
              {useLiveData ? <Database size={14} /> : <Cpu size={14} />}
              {useLiveData ? "Live On" : "Live Off"}
            </button>
            <button
              onClick={() => setSimulate((v) => !v)}
              className="px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1.5 transition-colors bg-white/20 hover:bg-white/30"
            >
              {simulate ? <CloudRain size={14} /> : <CloudLightning size={14} />}
              {simulate ? "Simulate" : "Real API"}
            </button>
            <button onClick={refresh} className="px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1.5 transition-colors bg-white/20 hover:bg-white/30">
              <RefreshCw size={14} /> Refresh
            </button>
            <button
              onClick={() => setShowFeedPanel(true)}
              className="px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1.5 transition-colors bg-white/20 hover:bg-white/30"
            >
              <Database size={14} /> Feeds
            </button>
            <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur text-sm">
              {currentTime} IST
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-16 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex gap-1 overflow-x-auto py-2">
            {tabs.map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap flex items-center gap-2 transition-colors ${
                    tab === t.id
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <Icon size={16} />
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {tab === "overview" && <OverviewTab liveMode={liveMode} tick={tick} snapshot={snapshot} />}
        {tab === "flood" && <FloodTab liveMode={liveMode} tick={tick} snapshot={snapshot} />}
        {tab === "crowd" && <CrowdTab snapshot={snapshot} />}
        {tab === "iudx" && <IUDXTab liveMode={liveMode} tick={tick} snapshot={snapshot} />}
        {tab === "alerts" && <AlertsTab liveMode={liveMode} tick={tick} snapshot={snapshot} />}
        {tab === "simulation" && <SimulationTab />}
        {tab === "3d" && (
          <Kolkata3DView
            wards={snapshot?.wards ?? wards}
            pandals={snapshot?.pandals ?? basePandals}
          />
        )}
      </div>

      {showFeedPanel && (
        <KolkataFeedConfigPanel
          config={liveConfig}
          onSave={(next) => { saveConfig(next); setShowFeedPanel(false); }}
          onClose={() => setShowFeedPanel(false)}
        />
      )}
    </div>
  );
}

function OverviewTab({ liveMode, tick, snapshot }: { liveMode: boolean; tick: number; snapshot: KolkataLiveSnapshot | null }) {
  const liveRainfall = snapshot
    ? snapshot.rainfall[snapshot.rainfall.length - 1].cumulative
    : liveMode ? rainfallTimeline[Math.min(tick % 12, 11)].cumulative : kolkataStats.rainfallToday;
  const liveAlerts = snapshot ? snapshot.alerts.length : liveMode ? kolkataStats.alertCount + (tick % 3) : kolkataStats.alertCount;

  const stats = [
    { label: "Monitored Wards", value: `${kolkataStats.monitoredWards}/${kolkataStats.totalWards}`, icon: Building2, color: "blue" },
    { label: "Population Covered", value: `${(kolkataStats.monitoredPopulation / 1000000).toFixed(2)}M`, icon: Users, color: "green" },
    { label: "IUDX Data Points", value: kolkataStats.iudxDataPoints.toLocaleString(), icon: Database, color: "purple" },
    { label: "Rainfall Today", value: `${liveRainfall} mm`, icon: CloudRain, color: "cyan" },
    { label: "Active Alerts", value: liveAlerts, icon: Bell, color: "orange" },
    { label: "Critical Alerts", value: kolkataStats.criticalAlerts, icon: ShieldAlert, color: "red" },
    { label: "CCTV Cameras", value: kolkataStats.cctvCameras, icon: Camera, color: "indigo" },
    { label: "Drainage Sensors", value: kolkataStats.drainageSensors.toLocaleString(), icon: Droplets, color: "teal" },
  ];

  const colorMap: Record<string, string> = {
    blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
    green: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400",
    purple: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
    cyan: "bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400",
    orange: "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400",
    red: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400",
    indigo: "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400",
    teal: "bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400",
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
              <div className={`w-10 h-10 rounded-lg ${colorMap[s.color]} flex items-center justify-center mb-3`}>
                <Icon size={20} />
              </div>
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{s.label}</div>
            </div>
          );
        })}
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <TrendingUp size={18} className="text-blue-600" />
          Rainfall Timeline {liveMode && <span className="text-xs text-green-600 font-medium ml-2 animate-pulse">● live</span>}
        </h3>
        <RainfallChart highlight={liveMode ? (snapshot ? snapshot.rainfall[snapshot.rainfall.length - 1].time : rainfallTimeline[Math.min(tick % 12, 11)].time) : undefined} />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <CloudRain size={18} className="text-blue-600" />
            Flood Risk by Ward
          </h3>
          <div className="space-y-2">
            {wards.slice(0, 5).map((w) => (
              <WardRiskBar key={w.id} ward={w} />
            ))}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Users size={18} className="text-orange-600" />
            Top Crowd Density Pandals
          </h3>
          <div className="space-y-2">
            {[...basePandals].sort((a, b) => b.crowdDensity - a.crowdDensity).slice(0, 5).map((p) => (
              <PandalDensityBar key={p.id} pandal={p} />
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <Bell size={18} className="text-red-600" />
          Recent Alerts
        </h3>
        <div className="space-y-2">
          {baseAlerts.slice(0, 4).map((a) => (
            <AlertRow key={a.id} alert={a} />
          ))}
        </div>
      </div>
    </div>
  );
}

function FloodTab({ liveMode, tick, snapshot }: { liveMode: boolean; tick: number; snapshot: KolkataLiveSnapshot | null }) {
  const [customRainfall, setCustomRainfall] = useState(322);
  const [rainfallMinutes, setRainfallMinutes] = useState(5);

  const liveWards = useMemo(() => {
    if (snapshot) return snapshot.wards;
    if (!liveMode) return wards;
    const rainfall = rainfallTimeline[Math.min(tick % 12, 11)].cumulative;
    return wards.map((w) => ({
      ...w,
      rainfall: rainfall + Math.round(Math.random() * 30 - 15),
      waterLevel: Math.max(0.5, Math.min(5, w.waterLevel + (Math.random() * 0.6 - 0.2))),
      floodDepth: Math.max(0, Math.min(1.3, w.floodDepth + (Math.random() * 0.3 - 0.1))),
    }));
  }, [liveMode, tick, snapshot]);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold flex items-center gap-2">
            <CloudRain size={18} className="text-blue-600" />
            Hourly Rainfall
          </h3>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-gray-400">Custom total: {customRainfall} mm</span>
            <input
              type="range"
              min={0}
              max={500}
              value={customRainfall}
              onChange={(e) => setCustomRainfall(Number(e.target.value))}
              className="w-32"
            />
          </div>
        </div>
        <RainfallChart />
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
        <h3 className="font-bold mb-4">Ward-Level Flood Status</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 text-left text-xs text-gray-500 dark:text-gray-400">
                <th className="px-3 py-2 font-semibold">Ward</th>
                <th className="px-3 py-2 font-semibold">Population</th>
                <th className="px-3 py-2 font-semibold">Rainfall (mm)</th>
                <th className="px-3 py-2 font-semibold">Water Level (m)</th>
                <th className="px-3 py-2 font-semibold">Flood Depth (m)</th>
                <th className="px-3 py-2 font-semibold">Drainage</th>
                <th className="px-3 py-2 font-semibold">Alert</th>
              </tr>
            </thead>
            <tbody>
              {liveWards.map((w) => (
                <tr key={w.id} className="border-t border-gray-100 dark:border-gray-800">
                  <td className="px-3 py-2.5 font-medium">{w.name}</td>
                  <td className="px-3 py-2.5 text-gray-500">{w.population.toLocaleString()}</td>
                  <td className="px-3 py-2.5">
                    <span className={w.rainfall > 100 ? "text-red-600 font-medium" : ""}>{w.rainfall}</span>
                  </td>
                  <td className="px-3 py-2.5">
                    <span className={w.waterLevel > 3.5 ? "text-red-600 font-medium" : ""}>{w.waterLevel.toFixed(1)}</span>
                  </td>
                  <td className="px-3 py-2.5">{w.floodDepth.toFixed(2)}</td>
                  <td className="px-3 py-2.5"><DrainageBadge status={w.drainageStatus} /></td>
                  <td className="px-3 py-2.5"><AlertBadge level={w.alertLevel} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <Droplets size={18} className="text-teal-600" />
          Drainage Network Status
        </h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {baseDrainageNodes.map((dn) => {
            const pct = Math.round((dn.currentFlow / dn.capacity) * 100);
            const overCapacity = pct > 100;
            return (
              <div key={dn.id} className="border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="font-medium text-sm">{dn.location}</div>
                    <div className="text-xs text-gray-400">{dn.id} · {dn.ward}</div>
                  </div>
                  <DrainageBadge status={dn.status} />
                </div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-400">Flow: {dn.currentFlow}/{dn.capacity} cusecs</span>
                  <span className={overCapacity ? "text-red-600 font-bold" : "text-gray-500"}>{pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                  <div className={`h-full rounded-full ${overCapacity ? "bg-red-500" : pct > 70 ? "bg-orange-500" : "bg-green-500"}`} style={{ width: `${Math.min(pct, 100)}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function CrowdTab({ snapshot }: { snapshot: KolkataLiveSnapshot | null }) {
  const [timeIndex, setTimeIndex] = useState(5);
  const dynamicPandals = useMemo(() => getCrowdAtTime(timeIndex), [timeIndex]);
  const point = crowdTimeline[timeIndex];

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold flex items-center gap-2">
            <Users size={18} className="text-orange-600" />
            Durga Puja Crowd Timeline
          </h3>
          <div className="text-sm text-gray-500">
            {point.time} · {point.totalVisitors.toLocaleString()} total visitors
          </div>
        </div>
        <div className="mb-4">
          <label className="text-xs text-gray-400 mb-1 block">Select time of day</label>
          <input
            type="range"
            min={0}
            max={crowdTimeline.length - 1}
            step={1}
            value={timeIndex}
            onChange={(e) => setTimeIndex(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            {crowdTimeline.map((p, i) => (
              <span key={i} className={i === timeIndex ? "font-bold text-orange-600" : ""}>{p.time}</span>
            ))}
          </div>
        </div>
        <CrowdChart timeIndex={timeIndex} />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {dynamicPandals.map((p) => (
          <PandalCard key={p.id} pandal={p} />
        ))}
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
        <h3 className="font-bold mb-4">Safety Status at {point.time}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Safe", count: dynamicPandals.filter(p => p.safetyStatus === "safe").length, color: "green" },
            { label: "Moderate", count: dynamicPandals.filter(p => p.safetyStatus === "moderate").length, color: "yellow" },
            { label: "High", count: dynamicPandals.filter(p => p.safetyStatus === "high").length, color: "orange" },
            { label: "Critical", count: dynamicPandals.filter(p => p.safetyStatus === "critical").length, color: "red" },
          ].map((s) => (
            <div key={s.label} className={`rounded-lg p-4 text-center ${
              s.color === "green" ? "bg-green-50 dark:bg-green-900/20" :
              s.color === "yellow" ? "bg-yellow-50 dark:bg-yellow-900/20" :
              s.color === "orange" ? "bg-orange-50 dark:bg-orange-900/20" :
              "bg-red-50 dark:bg-red-900/20"
            }`}>
              <div className={`text-3xl font-bold ${
                s.color === "green" ? "text-green-600" :
                s.color === "yellow" ? "text-yellow-600" :
                s.color === "orange" ? "text-orange-600" :
                "text-red-600"
              }`}>{s.count}</div>
              <div className="text-xs text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function IUDXTab({ liveMode, tick, snapshot }: { liveMode: boolean; tick: number; snapshot: KolkataLiveSnapshot | null }) {
  const [nodes, setNodes] = useState<IUDXNode[]>(baseIUDXNodes);

  const refresh = useCallback(() => {
    setNodes((prev) => refreshIUDXNodes(prev));
  }, []);

  useEffect(() => {
    if (snapshot) setNodes(snapshot.iudxNodes);
    else if (liveMode) refresh();
  }, [liveMode, tick, refresh, snapshot]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">IUDX Data Exchange — Active Nodes</h2>
        <button
          onClick={refresh}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium flex items-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <RefreshCw size={16} />
          Refresh Data
        </button>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {nodes.map((node) => (
          <div key={node.id} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="font-medium text-sm">{node.name}</div>
                <div className="text-xs text-gray-400 mt-0.5">{node.id} · {node.provider}</div>
              </div>
              <StatusBadge status={node.status} />
            </div>
            <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
              <div>
                <div className="text-gray-400">Type</div>
                <div className="font-medium">{node.type}</div>
              </div>
              <div>
                <div className="text-gray-400">Data Points</div>
                <div className="font-medium">{node.dataPoints.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-gray-400">Latency</div>
                <div className={`font-medium ${node.latency > 500 ? "text-red-600" : "text-green-600"}`}>
                  {node.latency}ms
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-400 mt-2">
              <Clock size={12} />
              Last update: {node.lastUpdate}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <Radio size={18} className="text-blue-600" />
          Data Flow Architecture
        </h3>
        <div className="flex flex-col md:flex-row items-stretch gap-3">
          {[
            { label: "Physical Sensors", items: ["Drainage", "CCTV", "Weather", "Water Level"], icon: Radio, color: "blue" },
            { label: "IUDX Exchange", items: ["Auth & Access", "Data Routing", "Schema Validation"], icon: Database, color: "purple" },
            { label: "DT Models", items: ["Flood Sim", "Crowd Sim", "Alert Engine"], icon: Cpu, color: "green" },
            { label: "Action Layer", items: ["WhatsApp Alerts", "ICCC Control", "KMC Dashboard"], icon: Zap, color: "orange" },
          ].map((block, i) => {
            const Icon = block.icon;
            const colors: Record<string, string> = {
              blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-600",
              purple: "bg-purple-50 dark:bg-purple-900/20 text-purple-600",
              green: "bg-green-50 dark:bg-green-900/20 text-green-600",
              orange: "bg-orange-50 dark:bg-orange-900/20 text-orange-600",
            };
            return (
              <div key={i} className="flex-1 relative">
                <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                  <div className={`w-10 h-10 rounded-lg ${colors[block.color]} flex items-center justify-center mb-3`}>
                    <Icon size={20} />
                  </div>
                  <div className="font-semibold text-sm mb-2">{block.label}</div>
                  <ul className="space-y-1">
                    {block.items.map((item) => (
                      <li key={item} className="text-xs text-gray-500 flex items-center gap-1">
                        <ChevronRight size={12} /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function AlertsTab({ liveMode, tick, snapshot }: { liveMode: boolean; tick: number; snapshot: KolkataLiveSnapshot | null }) {
  const [alerts, setAlerts] = useState<AlertItem[]>(baseAlerts);

  useEffect(() => {
    if (snapshot) setAlerts(snapshot.alerts);
    else if (liveMode) {
      const timestamp = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
      const newAlerts = generateFloodAlertsFromWards(wards, timestamp);
      setAlerts((prev) => {
        const filtered = prev.filter((a) => !a.id.startsWith("SIM-"));
        return [...newAlerts.slice(0, 2), ...filtered];
      });
    } else {
      setAlerts(baseAlerts);
    }
  }, [liveMode, tick, snapshot]);

  const dismiss = (id: string) => setAlerts((prev) => prev.filter((a) => a.id !== id));
  const resolve = (id: string) => setAlerts((prev) => prev.map((a) => a.id === id ? { ...a, severity: "info" as const } : a));

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-lg">Active Alerts ({alerts.length})</h3>
        <div className="flex gap-2 text-xs">
          <span className="px-2 py-1 rounded bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 font-medium">
            {alerts.filter(a => a.severity === "critical").length} Critical
          </span>
          <span className="px-2 py-1 rounded bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 font-medium">
            {alerts.filter(a => a.severity === "warning").length} Warning
          </span>
          <span className="px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium">
            {alerts.filter(a => a.severity === "info").length} Info
          </span>
        </div>
      </div>
      {alerts.map((a) => (
        <AlertCard key={a.id} alert={a} onDismiss={() => dismiss(a.id)} onResolve={() => resolve(a.id)} />
      ))}
    </div>
  );
}

function SimulationTab() {
  const [rainfall, setRainfall] = useState(150);
  const [duration, setDuration] = useState(3);
  const [result, setResult] = useState<typeof simulationResults[0] | null>(simulationResults[1]);

  const run = useCallback(() => {
    setResult(runFloodSimulation(rainfall, duration));
  }, [rainfall, duration]);

  const presets = [
    { label: "100mm / 2h", r: 100, d: 2 },
    { label: "150mm / 3h", r: 150, d: 3 },
    { label: "200mm / 4h", r: 200, d: 4 },
    { label: "250mm / 5h", r: 250, d: 5 },
    { label: "300mm / 6h", r: 300, d: 6 },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
        <h3 className="font-bold mb-2 flex items-center gap-2">
          <PlayCircle size={18} className="text-brand-600" />
          Flood Scenario Simulator
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Adjust rainfall and duration to simulate different monsoon scenarios. The model uses IMD data,
          drainage status, and ward elevation profiles to predict affected wards and damage.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Rainfall (mm)</label>
            <div className="flex items-center gap-3 mt-1">
              <input
                type="range"
                min={20}
                max={400}
                value={rainfall}
                onChange={(e) => setRainfall(Number(e.target.value))}
                className="flex-1"
              />
              <span className="w-16 text-right font-mono text-sm">{rainfall}</span>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Duration (hours)</label>
            <div className="flex items-center gap-3 mt-1">
              <input
                type="range"
                min={1}
                max={8}
                step={0.5}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="flex-1"
              />
              <span className="w-16 text-right font-mono text-sm">{duration}h</span>
            </div>
          </div>
          <div className="flex items-end">
            <button
              onClick={run}
              className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <PlayCircle size={18} />
              Run Simulation
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {presets.map((p) => (
            <button
              key={p.label}
              onClick={() => { setRainfall(p.r); setDuration(p.d); }}
              className="px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-800 text-xs font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              {p.label}
            </button>
          ))}
        </div>

        {result && (
          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-5 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <Gauge size={16} className="text-blue-600" />
                {result.scenario}
              </h4>
              <span className={`text-xs px-2 py-1 rounded font-medium ${
                result.rainfall >= 200 ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300" :
                result.rainfall >= 150 ? "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300" :
                "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
              }`}>
                {result.rainfall >= 200 ? "High Risk" : result.rainfall >= 150 ? "Severe" : "Moderate"}
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
              <div>
                <div className="text-xs text-gray-400">Affected Wards</div>
                <div className="font-bold text-lg">{result.affectedWards}</div>
              </div>
              <div>
                <div className="text-xs text-gray-400">Affected Population</div>
                <div className="font-bold text-lg">{result.affectedPopulation.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-xs text-gray-400">Est. Damage</div>
                <div className="font-bold text-sm">{result.estimatedDamage}</div>
              </div>
              <div>
                <div className="text-xs text-gray-400">Response Time</div>
                <div className="font-bold text-sm">{result.responseTime}</div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg p-3 border border-gray-200 dark:border-gray-800">
              <div className="text-xs font-semibold text-gray-500 mb-1">Recommendation</div>
              <p className="text-sm text-gray-700 dark:text-gray-300">{result.recommendation}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// --- Shared Helper Components ---

function RainfallChart({ highlight }: { highlight?: string }) {
  const max = Math.max(...rainfallTimeline.map((r) => r.rainfall));
  return (
    <div>
      <div className="flex items-end gap-1 h-40">
        {rainfallTimeline.map((r) => (
          <div key={r.time} className="flex-1 flex flex-col items-center gap-1">
            <div className="text-xs text-gray-400">{r.rainfall}</div>
            <div
              className={`w-full rounded-t min-h-[2px] transition-all duration-500 ${
                highlight === r.time
                  ? "bg-gradient-to-t from-green-500 to-emerald-300"
                  : "bg-gradient-to-t from-blue-600 to-cyan-400"
              }`}
              style={{ height: `${(r.rainfall / max) * 100}%` }}
            />
            <div className={`text-xs ${highlight === r.time ? "font-bold text-green-600" : "text-gray-400"}`}>{r.time}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
        <span>Hourly rainfall (mm)</span>
        <span>Cumulative: {rainfallTimeline[rainfallTimeline.length - 1].cumulative} mm</span>
      </div>
    </div>
  );
}

function CrowdChart({ timeIndex }: { timeIndex: number }) {
  const max = Math.max(...crowdTimeline.map((c) => c.totalVisitors));
  return (
    <div>
      <div className="flex items-end gap-1 h-40">
        {crowdTimeline.map((c, i) => (
          <div key={c.time} className="flex-1 flex flex-col items-center gap-1">
            <div className="text-xs text-gray-400">{(c.totalVisitors / 1000).toFixed(0)}k</div>
            <div
              className={`w-full rounded-t min-h-[2px] transition-all duration-300 ${
                i === timeIndex
                  ? "bg-gradient-to-t from-green-500 to-emerald-300"
                  : c.totalVisitors > 70000 ? "bg-gradient-to-t from-red-600 to-orange-400" :
                    c.totalVisitors > 40000 ? "bg-gradient-to-t from-orange-600 to-yellow-400" :
                    "bg-gradient-to-t from-blue-600 to-cyan-400"
              }`}
              style={{ height: `${(c.totalVisitors / max) * 100}%` }}
            />
            <div className={`text-xs ${i === timeIndex ? "font-bold text-green-600" : "text-gray-400"}`}>{c.time}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
        <span>Total visitors across monitored pandals</span>
        <span>Peak: {Math.max(...crowdTimeline.map((c) => c.peakDensity))} persons/m²</span>
      </div>
    </div>
  );
}

function WardRiskBar({ ward }: { ward: Ward }) {
  const colors: Record<string, string> = {
    low: "bg-green-500",
    moderate: "bg-yellow-500",
    high: "bg-orange-500",
    severe: "bg-red-500",
  };
  const pct = (ward.floodDepth / 1.2) * 100;
  return (
    <div className="flex items-center gap-3">
      <div className="text-xs w-32 truncate">{ward.name.replace(/^Ward \d+ — /, "")}</div>
      <div className="flex-1 h-4 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <div className={`h-full rounded-full ${colors[ward.floodRisk]}`} style={{ width: `${Math.min(pct, 100)}%` }} />
      </div>
      <div className="text-xs font-medium w-16 text-right">{ward.floodDepth.toFixed(2)}m</div>
    </div>
  );
}

function PandalDensityBar({ pandal }: { pandal: Pandal }) {
  const colors: Record<string, string> = {
    safe: "bg-green-500",
    moderate: "bg-yellow-500",
    high: "bg-orange-500",
    critical: "bg-red-500",
  };
  const pct = (pandal.crowdDensity / 10) * 100;
  return (
    <div className="flex items-center gap-3">
      <div className="text-xs w-32 truncate">{pandal.name}</div>
      <div className="flex-1 h-4 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <div className={`h-full rounded-full ${colors[pandal.safetyStatus]}`} style={{ width: `${Math.min(pct, 100)}%` }} />
      </div>
      <div className="text-xs font-medium w-12 text-right">{pandal.crowdDensity}/m²</div>
    </div>
  );
}

function PandalCard({ pandal }: { pandal: Pandal }) {
  const colors: Record<string, { bg: string; text: string; border: string; bar: string }> = {
    safe: { bg: "bg-green-50 dark:bg-green-900/20", text: "text-green-700 dark:text-green-300", border: "border-green-200 dark:border-green-800", bar: "bg-green-500" },
    moderate: { bg: "bg-yellow-50 dark:bg-yellow-900/20", text: "text-yellow-700 dark:text-yellow-300", border: "border-yellow-200 dark:border-yellow-800", bar: "bg-yellow-500" },
    high: { bg: "bg-orange-50 dark:bg-orange-900/20", text: "text-orange-700 dark:text-orange-300", border: "border-orange-200 dark:border-orange-800", bar: "bg-orange-500" },
    critical: { bg: "bg-red-50 dark:bg-red-900/20", text: "text-red-700 dark:text-red-300", border: "border-red-200 dark:border-red-800", bar: "bg-red-500" },
  };
  const c = colors[pandal.safetyStatus];
  const fillPct = Math.round((pandal.currentVisitors / pandal.maxCapacity) * 100);

  return (
    <div className={`rounded-xl border ${c.border} p-4`}>
      <div className="flex items-start justify-between mb-2">
        <div>
          <h4 className="font-semibold text-sm">{pandal.name}</h4>
          <div className="text-xs text-gray-400">{pandal.location} · {pandal.ward}</div>
        </div>
        <span className={`text-xs px-2 py-0.5 rounded font-medium ${c.bg} ${c.text}`}>
          {pandal.safetyStatus.toUpperCase()}
        </span>
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400 mb-3 italic">Theme: {pandal.theme}</div>
      <div className="space-y-2">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-400">Capacity</span>
            <span className="font-medium">{pandal.currentVisitors.toLocaleString()} / {pandal.maxCapacity.toLocaleString()}</span>
          </div>
          <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
            <div className={`h-full rounded-full ${c.bar}`} style={{ width: `${fillPct}%` }} />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 text-xs pt-2">
          <div>
            <div className="text-gray-400">Density</div>
            <div className="font-medium">{pandal.crowdDensity}/m²</div>
          </div>
          <div>
            <div className="text-gray-400">Wait</div>
            <div className="font-medium">{pandal.avgWaitTime}min</div>
          </div>
          <div>
            <div className="text-gray-400">CCTV</div>
            <div className="font-medium">{pandal.cctvCameras}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AlertRow({ alert }: { alert: AlertItem }) {
  const colors: Record<string, string> = {
    critical: "border-l-red-500 bg-red-50 dark:bg-red-900/10",
    warning: "border-l-orange-500 bg-orange-50 dark:bg-orange-900/10",
    info: "border-l-blue-500 bg-blue-50 dark:bg-blue-900/10",
  };
  const icons: Record<string, any> = {
    flood: CloudRain, crowd: Users, drainage: Droplets, system: Activity,
  };
  const Icon = icons[alert.type] || AlertTriangle;

  return (
    <div className={`border-l-4 ${colors[alert.severity]} rounded-r-lg p-3 flex items-start gap-3`}>
      <Icon size={18} className="text-gray-400 shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium truncate">{alert.message}</div>
        <div className="text-xs text-gray-400 mt-1 flex items-center gap-2">
          <Clock size={12} /> {alert.timestamp}
          {alert.ward !== "N/A" && <span>· {alert.ward}</span>}
        </div>
      </div>
    </div>
  );
}

function AlertCard({ alert, onDismiss, onResolve }: { alert: AlertItem; onDismiss: () => void; onResolve: () => void }) {
  const colors: Record<string, { border: string; bg: string; text: string; bar: string }> = {
    critical: { border: "border-red-200 dark:border-red-800", bg: "bg-red-50 dark:bg-red-900/10", text: "text-red-700 dark:text-red-300", bar: "bg-red-500" },
    warning: { border: "border-orange-200 dark:border-orange-800", bg: "bg-orange-50 dark:bg-orange-900/10", text: "text-orange-700 dark:text-orange-300", bar: "bg-orange-500" },
    info: { border: "border-blue-200 dark:border-blue-800", bg: "bg-blue-50 dark:bg-blue-900/10", text: "text-blue-700 dark:text-blue-300", bar: "bg-blue-500" },
  };
  const c = colors[alert.severity];
  const icons: Record<string, any> = {
    flood: CloudRain, crowd: Users, drainage: Droplets, system: Activity,
  };
  const Icon = icons[alert.type] || AlertTriangle;

  return (
    <div className={`rounded-xl border ${c.border} ${c.bg} p-4`}>
      <div className="flex items-start gap-3 mb-3">
        <div className={`w-10 h-10 rounded-lg ${c.bg} ${c.text} flex items-center justify-center shrink-0`}>
          <Icon size={20} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-bold uppercase ${c.text}`}>{alert.severity}</span>
            <span className="text-xs text-gray-400">·</span>
            <span className="text-xs text-gray-400 capitalize">{alert.type}</span>
            {alert.ward !== "N/A" && <span className="text-xs text-gray-400">· {alert.ward}</span>}
          </div>
          <p className="text-sm">{alert.message}</p>
          <div className="text-xs text-gray-400 mt-2 flex items-center gap-1">
            <Clock size={12} /> {alert.timestamp}
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={onResolve}
            className="p-1.5 rounded hover:bg-white/50 dark:hover:bg-white/10 text-gray-400 hover:text-green-600"
            title="Resolve"
          >
            <CheckCircle size={18} />
          </button>
          <button
            onClick={onDismiss}
            className="p-1.5 rounded hover:bg-white/50 dark:hover:bg-white/10 text-gray-400 hover:text-red-600"
            title="Dismiss"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-900 rounded-lg p-3 border border-gray-100 dark:border-gray-800">
        <div className="text-xs font-semibold text-gray-500 mb-1">Recommended Action</div>
        <p className="text-sm">{alert.action}</p>
      </div>
    </div>
  );
}

function DrainageBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    clear: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
    partial: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300",
    overflow: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300",
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded font-medium capitalize ${colors[status]}`}>
      {status}
    </span>
  );
}

function AlertBadge({ level }: { level: string }) {
  const colors: Record<string, string> = {
    safe: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
    watch: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300",
    warning: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300",
    critical: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300",
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded font-medium uppercase ${colors[level]}`}>
      {level}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    online: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
    degraded: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300",
    offline: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300",
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded font-medium capitalize flex items-center gap-1 ${colors[status]}`}>
      <div className={`w-1.5 h-1.5 rounded-full ${
        status === "online" ? "bg-green-500" : status === "degraded" ? "bg-yellow-500" : "bg-red-500"
      } ${status === "online" ? "animate-pulse" : ""}`} />
      {status}
    </span>
  );
}
