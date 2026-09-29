import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Zap, Activity, Gauge, Server, TrendingUp, Clock, AlertTriangle,
  RefreshCw, Power, Pause, PlayCircle, Sun, Droplets, Flame,
  MapPin, CheckCircle, Trash2, Bolt, Network, Database, Wind, CloudRain,
  Leaf, Cpu, CloudLightning, Wallet, BarChart3, Box
} from "lucide-react";
import {
  substations, powerPlants, transmissionLines, loadCurve, faultAlerts,
  dvcStats, runDespatchSimulation, runEconomicDispatch, runWhatIf,
  refreshSubstations, refreshPlants, refreshDataSources,
  dataSources, cimModel, assetHealth, weatherForecast, distributedResources,
  whatIfScenarios, predictLineFaultRisk,
  type Substation, type PowerPlant, type TransmissionLine, type FaultAlert,
  type LoadCurvePoint, type DataSource, type CIMObject, type AssetHealth,
  type WeatherPoint, type DER, type WhatIfScenario
} from "../data/dvcDemo";
import {
  defaultConfig, saveLiveConfig, loadLiveConfig,
  type DvcLiveSnapshot, type DvcLiveConfig
} from "../api/dvcLive";
import { useDvcLiveData } from "../hooks/useDvcLiveData";
import { FeedConfigPanel } from "../components/FeedConfigPanel";
import Dvc3DView from "../components/Dvc3DView";

type Tab = "overview" | "despatch" | "transmission" | "substation" | "faults" | "network" | "economic" | "scenarios" | "health" | "resilience" | "3d";

export default function DVCDemo() {
  const [tab, setTab] = useState<Tab>("overview");
  const [currentTime, setCurrentTime] = useState<string>(() =>
    new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
  );
  const [liveMode, setLiveMode] = useState(false);
  const [tick, setTick] = useState(0);
  const [liveConfig, setLiveConfig] = useState<DvcLiveConfig>(loadLiveConfig() || defaultConfig);
  const useLiveData = liveConfig.enabled;
  const [simulate, setSimulate] = useState(false);
  const [showFeedPanel, setShowFeedPanel] = useState(false);

  const { snapshot, loading, error, refresh } = useDvcLiveData({
    config: liveConfig,
    poll: liveMode,
    simulate: simulate || !useLiveData,
  });

  const saveConfig = useCallback((next: DvcLiveConfig) => {
    setLiveConfig(next);
    saveLiveConfig(next);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }));
      if (liveMode) setTick((x) => x + 1);
    }, 3000);
    return () => clearInterval(t);
  }, [liveMode]);

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: "overview", label: "Overview", icon: Activity },
    { id: "despatch", label: "Load Despatch", icon: Zap },
    { id: "economic", label: "Economic Dispatch", icon: Wallet },
    { id: "scenarios", label: "What-If Scenarios", icon: CloudLightning },
    { id: "resilience", label: "Resilience & DER", icon: CloudRain },
    { id: "transmission", label: "Transmission", icon: Bolt },
    { id: "substation", label: "Substations", icon: Server },
    { id: "health", label: "Asset Health", icon: BarChart3 },
    { id: "network", label: "Network Model", icon: Network },
    { id: "faults", label: "Faults", icon: AlertTriangle },
    { id: "3d", label: "3D Network", icon: Box },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-center gap-3 mb-2">
            <MapPin size={20} />
            <span className="text-emerald-100 text-sm">Damodar Valley, Jharkhand & West Bengal</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Power Transmission & Load Despatch DT</h1>
          <p className="text-emerald-100 max-w-2xl">
            Real-time digital twin of DVC generation, transmission, and load despatch — simulate demand,
            dispatch generation, and monitor grid health.
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur text-sm ${loading ? "bg-yellow-400/20" : error ? "bg-red-400/20" : "bg-green-400/20"}`}>
              <div className={`w-2 h-2 rounded-full animate-pulse ${loading ? "bg-yellow-400" : error ? "bg-red-400" : "bg-green-400"}`} />
              <span>
                {useLiveData
                  ? error
                    ? `Live Error: ${error}`
                    : liveConfig.feeds.some((f) => f.id === "simulation" && f.enabled) && !simulate
                      ? `Live Data · Backend Simulation`
                      : `Live Data · ${snapshot ? new Date(snapshot.timestamp).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" }) : "Connecting"}`
                  : "Simulated Data"}
              </span>
            </div>
            <button
              onClick={() => setLiveMode((m) => !m)}
              className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1.5 transition-colors ${
                liveMode ? "bg-red-500/80 hover:bg-red-500" : "bg-white/20 hover:bg-white/30"
              }`}
            >
              {liveMode ? <Pause size={14} /> : <Power size={14} />}
              {liveMode ? "Pause Simulation" : "Resume Simulation"}
            </button>
            <button
              onClick={() => saveConfig({ ...liveConfig, enabled: !liveConfig.enabled })}
              className="px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1.5 transition-colors bg-white/20 hover:bg-white/30"
              title={useLiveData ? "Switch to simulated data" : "Attempt to use live data feeds"}
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
              <Server size={14} /> Feeds
            </button>
            <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur text-sm">
              {currentTime} IST
            </div>
          </div>
        </div>
      </div>

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
                      ? "bg-emerald-600 text-white"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {tab === "overview" && <OverviewTab liveMode={liveMode} tick={tick} snapshot={snapshot} />}
        {tab === "despatch" && <DespatchTab liveMode={liveMode} tick={tick} />}
        {tab === "economic" && <EconomicTab />}
        {tab === "scenarios" && <WhatIfTab />}
        {tab === "resilience" && <ResilienceTab snapshot={snapshot} />}
        {tab === "transmission" && <TransmissionTab />}
        {tab === "substation" && <SubstationTab liveMode={liveMode} tick={tick} snapshot={snapshot} />}
        {tab === "health" && <AssetHealthTab />}
        {tab === "network" && <NetworkTab snapshot={snapshot} />}
        {tab === "faults" && <FaultsTab />}
        {tab === "3d" && (
          <Dvc3DView
            substations={snapshot?.substations ?? substations}
            powerPlants={snapshot?.powerPlants ?? powerPlants}
            transmissionLines={snapshot?.transmissionLines ?? transmissionLines}
          />
        )}
      </div>

      {showFeedPanel && (
        <FeedConfigPanel
          config={liveConfig}
          onSave={(next) => { saveConfig(next); setShowFeedPanel(false); }}
          onClose={() => setShowFeedPanel(false)}
        />
      )}
    </div>
  );
}

function OverviewTab({ liveMode, tick, snapshot }: { liveMode: boolean; tick: number; snapshot: DvcLiveSnapshot | null }) {
  const livePlants = useMemo(() => (snapshot ? snapshot.powerPlants : liveMode ? refreshPlants(powerPlants) : powerPlants), [liveMode, tick, snapshot]);
  const totalOutput = livePlants.reduce((sum, p) => sum + p.currentOutput, 0);
  const currentPoint = loadCurve[tick % loadCurve.length];

  const stats = [
    { label: "Total Generation", value: `${totalOutput.toLocaleString()} MW`, icon: Zap, color: "emerald" },
    { label: "Thermal Capacity", value: `${dvcStats.thermalCapacity} MW`, icon: Flame, color: "orange" },
    { label: "Hydro Capacity", value: `${dvcStats.hydroCapacity} MW`, icon: Droplets, color: "blue" },
    { label: "Solar Capacity", value: `${dvcStats.solarCapacity} MW`, icon: Sun, color: "yellow" },
    { label: "Current Demand", value: `${currentPoint.demand} MW`, icon: Activity, color: "purple" },
    { label: "Grid Frequency", value: `${currentPoint.frequency} Hz`, icon: Gauge, color: "teal" },
    { label: "Substations", value: dvcStats.monitoredSubstations, icon: Server, color: "indigo" },
    { label: "Faults", value: dvcStats.faultCount, icon: AlertTriangle, color: "red" },
  ];

  const colorMap: Record<string, string> = {
    emerald: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400",
    orange: "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400",
    blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
    yellow: "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400",
    purple: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
    teal: "bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400",
    indigo: "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400",
    red: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400",
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
          <TrendingUp size={18} className="text-emerald-600" />
          Load vs Supply Curve (24 Hours)
        </h3>
        <LoadCurveChart liveIndex={liveMode ? tick % loadCurve.length : undefined} />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Zap size={18} className="text-emerald-600" />
            Generation Mix
          </h3>
          <div className="space-y-2">
            {livePlants.map((p) => (
              <PlantBar key={p.id} plant={p} />
            ))}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <AlertTriangle size={18} className="text-red-600" />
            Recent Faults
          </h3>
          <div className="space-y-2">
            {faultAlerts.slice(0, 4).map((f) => (
              <FaultRow key={f.id} fault={f} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DespatchTab({ liveMode, tick }: { liveMode: boolean; tick: number }) {
  const [demand, setDemand] = useState(3240);
  const [solarShare, setSolarShare] = useState(78);
  const [hydroShare, setHydroShare] = useState(75);
  const [result, setResult] = useState<ReturnType<typeof runDespatchSimulation> | null>(null);

  const run = useCallback(() => {
    setResult(runDespatchSimulation(demand, solarShare, hydroShare));
  }, [demand, solarShare, hydroShare]);

  useEffect(() => {
    if (liveMode) {
      setDemand(loadCurve[tick % loadCurve.length].demand);
      run();
    }
  }, [liveMode, tick, run]);

  const presets = [
    { label: "Off-peak 1.8 GW", d: 1800 },
    { label: "Morning 2.6 GW", d: 2600 },
    { label: "Noon 3.2 GW", d: 3240 },
    { label: "Evening 3.5 GW", d: 3520 },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
        <h3 className="font-bold mb-2 flex items-center gap-2">
          <PlayCircle size={18} className="text-emerald-600" />
          Load Despatch Simulator
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Set system demand and renewable availability. The simulator dispatches thermal, hydro,
          and solar to balance the grid and estimates frequency impact.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Demand (MW)</label>
            <div className="flex items-center gap-3 mt-1">
              <input type="range" min={1200} max={4500} step={10} value={demand} onChange={(e) => setDemand(Number(e.target.value))} className="flex-1" />
              <span className="w-20 text-right font-mono text-sm">{demand} MW</span>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Solar Availability (%)</label>
            <div className="flex items-center gap-3 mt-1">
              <input type="range" min={0} max={100} step={5} value={solarShare} onChange={(e) => setSolarShare(Number(e.target.value))} className="flex-1" />
              <span className="w-12 text-right font-mono text-sm">{solarShare}%</span>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Hydro Availability (%)</label>
            <div className="flex items-center gap-3 mt-1">
              <input type="range" min={0} max={100} step={5} value={hydroShare} onChange={(e) => setHydroShare(Number(e.target.value))} className="flex-1" />
              <span className="w-12 text-right font-mono text-sm">{hydroShare}%</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          {presets.map((p) => (
            <button
              key={p.label}
              onClick={() => setDemand(p.d)}
              className="px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-800 text-xs font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              {p.label}
            </button>
          ))}
          <button
            onClick={run}
            className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors flex items-center gap-2"
          >
            <PlayCircle size={18} />
            Run Despatch
          </button>
        </div>

        {result && (
          <div className="border border-emerald-200 dark:border-emerald-800 rounded-lg p-5 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/10 dark:to-teal-900/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
              <Metric label="Total Supply" value={`${result.totalSupply.toLocaleString()} MW`} />
              <Metric label="Deficit" value={`${result.deficit} MW`} warning={result.deficit > 0} />
              <Metric label="Frequency" value={`${result.frequencyEstimate} Hz`} warning={result.frequencyEstimate < 49.9} />
              <Metric label="Thermal" value={`${result.thermalDispatch} MW`} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
              <Metric label="Hydro Dispatch" value={`${result.hydroDispatch} MW`} color="blue" />
              <Metric label="Solar Dispatch" value={`${result.solarDispatch} MW`} color="yellow" />
              <Metric label="Must-Run Units" value={(result.mustRun || []).length} color="red" />
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg p-3 border border-gray-200 dark:border-gray-800">
              <div className="text-xs font-semibold text-gray-500 mb-1">Recommendation</div>
              <p className="text-sm">{result.recommendation}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TransmissionTab() {
  const [lines, setLines] = useState(transmissionLines);
  const [selectedLine, setSelectedLine] = useState<string | null>("TL-005");

  const toggleFault = (lineId: string) => {
    setLines((prev) =>
      prev.map((line) =>
        line.id === lineId
          ? { ...line, status: line.status === "fault" ? "normal" : "fault", load: line.status === "fault" ? line.thermalLimit * 0.5 : 0 }
          : line
      )
    );
  };

  const loadRedistribute = () => {
    setLines((prev) =>
      prev.map((line) => ({
        ...line,
        load: Math.round(line.thermalLimit * (0.4 + Math.random() * 0.45)),
        temperature: Math.round(40 + Math.random() * 25),
      }))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Transmission Network</h2>
        <button
          onClick={loadRedistribute}
          className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium flex items-center gap-2 hover:bg-emerald-700"
        >
          <RefreshCw size={16} />
          Recompute Loading
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {lines.map((line) => (
          <TransmissionCard
            key={line.id}
            line={line}
            isSelected={selectedLine === line.id}
            onClick={() => setSelectedLine(line.id)}
            onToggle={() => toggleFault(line.id)}
          />
        ))}
      </div>

      {selectedLine && (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
          <h3 className="font-bold mb-4">Line Detail: {lines.find((l) => l.id === selectedLine)?.name}</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            {(() => {
              const line = lines.find((l) => l.id === selectedLine)!;
              const loadPct = Math.round((line.load / line.thermalLimit) * 100);
              return (
                <>
                  <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                    <div className="text-xs text-gray-400">Voltage</div>
                    <div className="font-semibold">{line.voltage} kV</div>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                    <div className="text-xs text-gray-400">Length</div>
                    <div className="font-semibold">{line.length} km</div>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                    <div className="text-xs text-gray-400">Loading</div>
                    <div className={`font-semibold ${loadPct > 75 ? "text-red-600" : loadPct > 50 ? "text-orange-600" : "text-emerald-600"}`}>
                      {line.load} / {line.thermalLimit} MW ({loadPct}%)
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}

function SubstationTab({ liveMode, tick, snapshot }: { liveMode: boolean; tick: number; snapshot: DvcLiveSnapshot | null }) {
  const [nodes, setNodes] = useState<Substation[]>(substations);

  useEffect(() => {
    if (snapshot) setNodes(snapshot.substations);
    else if (liveMode) setNodes((prev) => refreshSubstations(prev));
  }, [liveMode, tick, snapshot]);

  const refresh = useCallback(() => setNodes((prev) => refreshSubstations(prev)), []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Substation Health</h2>
        <button
          onClick={refresh}
          className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium flex items-center gap-2 hover:bg-emerald-700"
        >
          <RefreshCw size={16} />
          Refresh SCADA
        </button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {nodes.map((s) => (
          <SubstationCard key={s.id} substation={s} />
        ))}
      </div>
    </div>
  );
}

function FaultsTab() {
  const [faults, setFaults] = useState<FaultAlert[]>(faultAlerts);

  const dismiss = (id: string) => setFaults((prev) => prev.filter((f) => f.id !== id));
  const resolve = (id: string) => setFaults((prev) => prev.map((f) => (f.id === id ? { ...f, severity: "info" as const } : f)));

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-lg">Fault Alerts ({faults.length})</h3>
        <div className="flex gap-2 text-xs">
          <span className="px-2 py-1 rounded bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 font-medium">
            {faults.filter((f) => f.severity === "critical").length} Critical
          </span>
          <span className="px-2 py-1 rounded bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 font-medium">
            {faults.filter((f) => f.severity === "warning").length} Warning
          </span>
        </div>
      </div>
      {faults.map((f) => (
        <FaultCard key={f.id} fault={f} onDismiss={() => dismiss(f.id)} onResolve={() => resolve(f.id)} />
      ))}
    </div>
  );
}

// --- Helper Components ---

function LoadCurveChart({ liveIndex }: { liveIndex?: number }) {
  const max = Math.max(...loadCurve.map((p) => p.demand));
  return (
    <div>
      <div className="flex items-end gap-1 h-40">
        {loadCurve.map((p, i) => (
          <div key={p.time} className="flex-1 flex flex-col items-center gap-1">
            <div className="text-xs text-gray-400">{(p.demand / 1000).toFixed(1)}</div>
            <div className="flex w-full gap-0.5 h-full items-end">
              <div
                className={`w-1/2 rounded-t min-h-[2px] ${i === liveIndex ? "bg-emerald-500" : "bg-blue-600"}`}
                style={{ height: `${(p.demand / max) * 100}%` }}
              />
              <div
                className={`w-1/2 rounded-t min-h-[2px] ${i === liveIndex ? "bg-yellow-400" : "bg-cyan-400"}`}
                style={{ height: `${(p.supply / max) * 100}%` }}
              />
            </div>
            <div className={`text-xs ${i === liveIndex ? "font-bold text-emerald-600" : "text-gray-400"}`}>{p.time}</div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
        <span className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-600 rounded-sm" /> Demand (GW)</span>
        <span className="flex items-center gap-1"><div className="w-2 h-2 bg-cyan-400 rounded-sm" /> Supply (GW)</span>
      </div>
    </div>
  );
}

function PlantBar({ plant }: { plant: PowerPlant }) {
  const colors: Record<string, string> = {
    Thermal: "bg-orange-500",
    Hydro: "bg-blue-500",
    Solar: "bg-yellow-500",
  };
  const pct = (plant.currentOutput / plant.capacity) * 100;
  return (
    <div className="flex items-center gap-3">
      <div className="text-xs w-28 truncate">{plant.name}</div>
      <div className="flex-1 h-4 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <div className={`h-full rounded-full ${colors[plant.type]}`} style={{ width: `${Math.min(pct, 100)}%` }} />
      </div>
      <div className="text-xs font-medium w-20 text-right">{plant.currentOutput}/{plant.capacity}</div>
    </div>
  );
}

function Metric({ label, value, warning, color }: { label: string; value: string | number; warning?: boolean; color?: string }) {
  return (
    <div className="p-3 rounded-lg bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
      <div className="text-xs text-gray-400">{label}</div>
      <div className={`font-bold text-lg ${warning ? "text-red-600" : color === "blue" ? "text-blue-600" : color === "yellow" ? "text-yellow-600" : color === "red" ? "text-red-600" : ""}`}>
        {value}
      </div>
    </div>
  );
}

function TransmissionCard({ line, isSelected, onClick, onToggle }: { line: TransmissionLine; isSelected: boolean; onClick: () => void; onToggle: () => void }) {
  const colors: Record<string, { border: string; bg: string; text: string; bar: string }> = {
    normal: { border: "border-emerald-200 dark:border-emerald-800", bg: "bg-emerald-50 dark:bg-emerald-900/20", text: "text-emerald-700 dark:text-emerald-300", bar: "bg-emerald-500" },
    high: { border: "border-yellow-200 dark:border-yellow-800", bg: "bg-yellow-50 dark:bg-yellow-900/20", text: "text-yellow-700 dark:text-yellow-300", bar: "bg-yellow-500" },
    critical: { border: "border-orange-200 dark:border-orange-800", bg: "bg-orange-50 dark:bg-orange-900/20", text: "text-orange-700 dark:text-orange-300", bar: "bg-orange-500" },
    fault: { border: "border-red-200 dark:border-red-800", bg: "bg-red-50 dark:bg-red-900/20", text: "text-red-700 dark:text-red-300", bar: "bg-red-500" },
  };
  const c = colors[line.status];
  const loadPct = Math.round((line.load / line.thermalLimit) * 100);

  return (
    <div
      onClick={onClick}
      className={`rounded-xl border p-4 cursor-pointer transition-shadow hover:shadow-md ${isSelected ? "ring-2 ring-emerald-500 " : ""}${c.border} ${c.bg}`}
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="font-medium text-sm">{line.name}</div>
          <div className="text-xs text-gray-400">{line.voltage} kV · {line.length} km</div>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onToggle(); }}
          className={`text-xs px-2 py-0.5 rounded font-medium ${c.bg} ${c.text}`}
        >
          {line.status === "fault" ? "Restore" : "Trip"}
        </button>
      </div>
      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span className="text-gray-400">Load</span>
          <span className={`font-medium ${c.text}`}>{line.load} / {line.thermalLimit} MW ({loadPct}%)</span>
        </div>
        <div className="h-2 rounded-full bg-white/50 dark:bg-black/20 overflow-hidden">
          <div className={`h-full rounded-full ${c.bar}`} style={{ width: `${Math.min(loadPct, 100)}%` }} />
        </div>
        <div className="flex justify-between text-xs text-gray-400">
          <span>Temp: {line.temperature}°C</span>
          <span>Risk: {line.faultRisk}%</span>
        </div>
      </div>
    </div>
  );
}

function SubstationCard({ substation }: { substation: Substation }) {
  const colors: Record<string, { bg: string; text: string; border: string; bar: string }> = {
    normal: { bg: "bg-emerald-50 dark:bg-emerald-900/20", text: "text-emerald-700 dark:text-emerald-300", border: "border-emerald-200 dark:border-emerald-800", bar: "bg-emerald-500" },
    overload: { bg: "bg-orange-50 dark:bg-orange-900/20", text: "text-orange-700 dark:text-orange-300", border: "border-orange-200 dark:border-orange-800", bar: "bg-orange-500" },
    maintenance: { bg: "bg-yellow-50 dark:bg-yellow-900/20", text: "text-yellow-700 dark:text-yellow-300", border: "border-yellow-200 dark:border-yellow-800", bar: "bg-yellow-500" },
    fault: { bg: "bg-red-50 dark:bg-red-900/20", text: "text-red-700 dark:text-red-300", border: "border-red-200 dark:border-red-800", bar: "bg-red-500" },
  };
  const c = colors[substation.status];
  const loadPct = Math.round((substation.load / substation.maxCapacity) * 100);

  return (
    <div className={`rounded-xl border ${c.border} ${c.bg} p-4`}>
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="font-medium text-sm">{substation.name}</div>
          <div className="text-xs text-gray-400">{substation.voltage} kV · {substation.location}</div>
        </div>
        <span className={`text-xs px-2 py-0.5 rounded font-medium uppercase ${c.text}`}>{substation.status}</span>
      </div>
      <div className="space-y-2">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-400">Load</span>
            <span className="font-medium">{substation.load} / {substation.maxCapacity} MW</span>
          </div>
          <div className="h-2 rounded-full bg-white/50 dark:bg-black/20 overflow-hidden">
            <div className={`h-full rounded-full ${c.bar}`} style={{ width: `${loadPct}%` }} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <div className="text-gray-400">Transformer</div>
            <div className="font-medium">{substation.transformerHealth}%</div>
          </div>
          <div>
            <div className="text-gray-400">Temperature</div>
            <div className={`font-medium ${substation.temperature > 75 ? "text-red-600" : ""}`}>{substation.temperature}°C</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FaultRow({ fault }: { fault: FaultAlert }) {
  const colors: Record<string, string> = {
    critical: "border-l-red-500 bg-red-50 dark:bg-red-900/10",
    warning: "border-l-orange-500 bg-orange-50 dark:bg-orange-900/10",
    info: "border-l-blue-500 bg-blue-50 dark:bg-blue-900/10",
  };
  const icons: Record<string, any> = {
    transmission: Bolt, generation: Zap, substation: Server, frequency: Gauge,
  };
  const Icon = icons[fault.type] || AlertTriangle;

  return (
    <div className={`border-l-4 ${colors[fault.severity]} rounded-r-lg p-3 flex items-start gap-3`}>
      <Icon size={18} className="text-gray-400 shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium truncate">{fault.message}</div>
        <div className="text-xs text-gray-400 mt-1 flex items-center gap-2">
          <Clock size={12} /> {fault.timestamp} · {fault.asset}
        </div>
      </div>
    </div>
  );
}

function FaultCard({ fault, onDismiss, onResolve }: { fault: FaultAlert; onDismiss: () => void; onResolve: () => void }) {
  const colors: Record<string, { border: string; bg: string; text: string }> = {
    critical: { border: "border-red-200 dark:border-red-800", bg: "bg-red-50 dark:bg-red-900/10", text: "text-red-700 dark:text-red-300" },
    warning: { border: "border-orange-200 dark:border-orange-800", bg: "bg-orange-50 dark:bg-orange-900/10", text: "text-orange-700 dark:text-orange-300" },
    info: { border: "border-blue-200 dark:border-blue-800", bg: "bg-blue-50 dark:bg-blue-900/10", text: "text-blue-700 dark:text-blue-300" },
  };
  const c = colors[fault.severity];
  const icons: Record<string, any> = {
    transmission: Bolt, generation: Zap, substation: Server, frequency: Gauge,
  };
  const Icon = icons[fault.type] || AlertTriangle;

  return (
    <div className={`rounded-xl border ${c.border} ${c.bg} p-4`}>
      <div className="flex items-start gap-3 mb-3">
        <div className={`w-10 h-10 rounded-lg ${c.bg} ${c.text} flex items-center justify-center shrink-0`}>
          <Icon size={20} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-bold uppercase ${c.text}`}>{fault.severity}</span>
            <span className="text-xs text-gray-400">·</span>
            <span className="text-xs text-gray-400 capitalize">{fault.type}</span>
            <span className="text-xs text-gray-400">· {fault.asset}</span>
          </div>
          <p className="text-sm">{fault.message}</p>
          <div className="text-xs text-gray-400 mt-2 flex items-center gap-1">
            <Clock size={12} /> {fault.timestamp}
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          <button onClick={onResolve} className="p-1.5 rounded hover:bg-white/50 dark:hover:bg-white/10 text-gray-400 hover:text-green-600" title="Resolve"><CheckCircle size={18} /></button>
          <button onClick={onDismiss} className="p-1.5 rounded hover:bg-white/50 dark:hover:bg-white/10 text-gray-400 hover:text-red-600" title="Dismiss"><Trash2 size={18} /></button>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-900 rounded-lg p-3 border border-gray-100 dark:border-gray-800">
        <div className="text-xs font-semibold text-gray-500 mb-1">Recommended Action</div>
        <p className="text-sm">{fault.action}</p>
      </div>
    </div>
  );
}

function EconomicTab() {
  const [demand, setDemand] = useState(3240);
  const [solarShare, setSolarShare] = useState(78);
  const [hydroShare, setHydroShare] = useState(75);
  const [result, setResult] = useState<ReturnType<typeof runEconomicDispatch> | null>(null);

  const run = useCallback(() => {
    setResult(runEconomicDispatch(demand, solarShare, hydroShare));
  }, [demand, solarShare, hydroShare]);

  useEffect(() => {
    run();
  }, [run]);

  return (
    <div className="space-y-5">
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
        <h3 className="font-bold mb-2 flex items-center gap-2">
          <Wallet size={18} className="text-emerald-600" />
          Economic Dispatch Optimizer
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Merit-order dispatch minimizing fuel cost while meeting demand. Inspired by global control room optimizers.
        </p>
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Demand (MW)</label>
            <input type="range" min={1200} max={4500} step={10} value={demand} onChange={(e) => setDemand(Number(e.target.value))} className="w-full" />
            <div className="text-right font-mono text-sm">{demand} MW</div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Solar Availability (%)</label>
            <input type="range" min={0} max={100} step={5} value={solarShare} onChange={(e) => setSolarShare(Number(e.target.value))} className="w-full" />
            <div className="text-right font-mono text-sm">{solarShare}%</div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Hydro Availability (%)</label>
            <input type="range" min={0} max={100} step={5} value={hydroShare} onChange={(e) => setHydroShare(Number(e.target.value))} className="w-full" />
            <div className="text-right font-mono text-sm">{hydroShare}%</div>
          </div>
        </div>
        <button onClick={run} className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 flex items-center gap-2">
          <PlayCircle size={18} /> Optimize Dispatch
        </button>
      </div>

      {result && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Metric label="Total Cost" value={`₹${(result.totalCost / 1000000).toFixed(2)} Cr`} />
            <Metric label="Fuel Cost" value={`₹${(result.fuelCost / 1000000).toFixed(2)} Cr`} />
            <Metric label="CO₂ Emissions" value={`${result.carbonTons} t`} color="red" />
            <Metric label="Marginal Price" value={`₹${result.marginalPrice}/MWh`} color="yellow" />
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
            <h4 className="font-semibold mb-3">Merit-Order Schedule</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-800 text-gray-500">
                  <tr><th className="text-left p-2">Plant</th><th className="text-right p-2">Output (MW)</th><th className="text-right p-2">Cost (₹/hr)</th><th className="text-right p-2">% of Cost</th></tr>
                </thead>
                <tbody>
                  {result.schedule.filter((s) => s.output > 0).map((s) => (
                    <tr key={s.plantId} className="border-t border-gray-100 dark:border-gray-800">
                      <td className="p-2">{s.name}</td>
                      <td className="p-2 text-right font-mono">{s.output}</td>
                      <td className="p-2 text-right font-mono">{s.cost.toLocaleString()}</td>
                      <td className="p-2 text-right font-mono">{((s.cost / result.totalCost) * 100).toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function WhatIfTab() {
  const [selected, setSelected] = useState<string>(whatIfScenarios[0].id);
  const [demand, setDemand] = useState(3240);
  const [solarShare, setSolarShare] = useState(78);
  const [hydroShare, setHydroShare] = useState(75);
  const [result, setResult] = useState<ReturnType<typeof runWhatIf> | null>(null);

  const run = useCallback(() => {
    const scenario = whatIfScenarios.find((s) => s.id === selected)!;
    setResult(runWhatIf(scenario, demand, solarShare, hydroShare));
  }, [selected, demand, solarShare, hydroShare]);

  useEffect(() => {
    run();
  }, [run]);

  return (
    <div className="space-y-5">
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
        <h3 className="font-bold mb-2 flex items-center gap-2">
          <CloudLightning size={18} className="text-emerald-600" />
          What-If Scenario Lab
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Stress test the DVC grid against global scenarios: monsoon storm, EV peak, heat wave, and baseload trips.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          {whatIfScenarios.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelected(s.id)}
              className={`p-3 rounded-lg border text-left text-sm transition-colors ${
                selected === s.id
                  ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300"
                  : "border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              <div className="font-medium">{s.name}</div>
              <div className="text-xs text-gray-400 mt-1 line-clamp-2">{s.description}</div>
            </button>
          ))}
        </div>
        <button onClick={run} className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 flex items-center gap-2">
          <PlayCircle size={18} /> Run Stress Test
        </button>
      </div>

      {result && (
        <>
          <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/10 dark:to-red-900/10 border border-orange-200 dark:border-orange-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold flex items-center gap-2"><AlertTriangle size={18} className="text-orange-600" /> Scenario Risk</h4>
              <div className={`text-2xl font-bold ${result.riskScore >= 75 ? "text-red-600" : result.riskScore >= 50 ? "text-orange-600" : "text-emerald-600"}`}>{result.riskScore}/100</div>
            </div>
            <p className="text-sm">{result.recommendation}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Metric label="Adjusted Demand" value={`${result.adjustedDemand} MW`} />
            <Metric label="Total Supply" value={`${result.despatch.totalSupply} MW`} />
            <Metric label="Deficit" value={`${result.despatch.deficit} MW`} warning={result.despatch.deficit > 0} />
            <Metric label="Frequency" value={`${result.despatch.frequencyEstimate} Hz`} warning={result.despatch.frequencyEstimate < 49.9} />
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
            <h4 className="font-semibold mb-2">Economic Impact</h4>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div><div className="text-gray-400 text-xs">Total Cost</div><div className="font-bold">₹{(result.economic.totalCost / 1000000).toFixed(2)} Cr</div></div>
              <div><div className="text-gray-400 text-xs">Fuel Cost</div><div className="font-bold">₹{(result.economic.fuelCost / 1000000).toFixed(2)} Cr</div></div>
              <div><div className="text-gray-400 text-xs">Carbon</div><div className="font-bold">{result.economic.carbonTons} t</div></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function AssetHealthTab() {
  return (
    <div className="space-y-5">
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
        <h3 className="font-bold mb-2 flex items-center gap-2">
          <BarChart3 size={18} className="text-emerald-600" />
          Predictive Asset Health
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Remaining useful life, health scores, and anomaly detection for transformers, lines, and plants.
        </p>
        <div className="space-y-3">
          {assetHealth.map((asset) => (
            <AssetHealthCard key={asset.assetId} asset={asset} />
          ))}
        </div>
      </div>
    </div>
  );
}

function AssetHealthCard({ asset }: { asset: AssetHealth }) {
  const colors: Record<string, { bar: string; bg: string; text: string }> = {
    low: { bar: "bg-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/20", text: "text-emerald-700 dark:text-emerald-300" },
    medium: { bar: "bg-yellow-500", bg: "bg-yellow-50 dark:bg-yellow-900/20", text: "text-yellow-700 dark:text-yellow-300" },
    high: { bar: "bg-red-500", bg: "bg-red-50 dark:bg-red-900/20", text: "text-red-700 dark:text-red-300" },
  };
  const c = colors[asset.risk];
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
        <div>
          <div className="font-medium">{asset.assetName}</div>
          <div className="text-xs text-gray-400 uppercase">{asset.category} · ID: {asset.assetId}</div>
        </div>
        <div className="flex gap-3 text-sm">
          <div><div className="text-gray-400 text-xs">Health</div><div className={`font-bold ${c.text}`}>{asset.healthScore}/100</div></div>
          <div><div className="text-gray-400 text-xs">RUL</div><div className="font-bold">{asset.remainingLife} yrs</div></div>
          <div><div className="text-gray-400 text-xs">Next PM</div><div className="font-bold">{asset.nextMaintenance}</div></div>
        </div>
      </div>
      <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden mb-2">
        <div className={`h-full rounded-full ${c.bar}`} style={{ width: `${asset.healthScore}%` }} />
      </div>
      <div className={`text-sm p-2 rounded-lg ${c.bg} ${c.text}`}>
        <span className="font-medium">Anomaly:</span> {asset.anomaly}
      </div>
    </div>
  );
}

function NetworkTab({ snapshot }: { snapshot: DvcLiveSnapshot | null }) {
  const [sources, setSources] = useState<DataSource[]>(snapshot?.dataSources ?? dataSources);
  const [cim] = useState<CIMObject[]>(cimModel);

  useEffect(() => { if (snapshot) setSources(snapshot.dataSources); }, [snapshot]);

  const refresh = useCallback(() => setSources((prev) => refreshDataSources(prev)), []);

  return (
    <div className="space-y-5">
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
        <h3 className="font-bold mb-2 flex items-center gap-2">
          <Network size={18} className="text-emerald-600" />
          CIM Network Model — Single Source of Truth
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          IEC 61970 CIM model federation: substations, lines, transformers, breakers, generating units, and consumers.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800 text-gray-500">
              <tr><th className="text-left p-2">Type</th><th className="text-left p-2">Name</th><th className="text-left p-2">mRID</th><th className="text-left p-2">Validation</th><th className="text-left p-2">Last Updated</th></tr>
            </thead>
            <tbody>
              {cim.map((obj) => (
                <tr key={obj.id} className="border-t border-gray-100 dark:border-gray-800">
                  <td className="p-2">{obj.type}</td>
                  <td className="p-2 font-medium">{obj.name}</td>
                  <td className="p-2 font-mono text-xs text-gray-400">{obj.mRID}</td>
                  <td className="p-2"><span className={`text-xs px-2 py-0.5 rounded ${obj.validationStatus === "valid" ? "bg-emerald-100 text-emerald-700" : "bg-yellow-100 text-yellow-700"}`}>{obj.validationStatus}</span></td>
                  <td className="p-2 text-gray-400">{obj.lastUpdated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold flex items-center gap-2">
            <Database size={18} className="text-emerald-600" />
            Live Data Federation
          </h3>
          <button onClick={refresh} className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-sm flex items-center gap-2 hover:bg-emerald-700">
            <RefreshCw size={14} /> Refresh
          </button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {sources.map((s) => (
            <DataSourceCard key={s.id} source={s} />
          ))}
        </div>
      </div>
    </div>
  );
}

function DataSourceCard({ source }: { source: DataSource }) {
  const statusColors: Record<string, string> = {
    online: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
    degraded: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
    offline: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  };
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-3">
      <div className="flex items-center justify-between mb-1">
        <span className="font-medium text-sm">{source.name}</span>
        <span className={`text-xs px-2 py-0.5 rounded ${statusColors[source.status]}`}>{source.status}</span>
      </div>
      <div className="text-xs text-gray-400 mb-2">{source.type} · {source.standard}</div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div><div className="text-gray-400">Latency</div><div className="font-medium">{source.latency} ms</div></div>
        <div><div className="text-gray-400">Points</div><div className="font-medium">{source.dataPoints.toLocaleString()}</div></div>
        <div><div className="text-gray-400">Last Sync</div><div className="font-medium">{source.lastSync}</div></div>
      </div>
    </div>
  );
}

function ResilienceTab({ snapshot }: { snapshot: DvcLiveSnapshot | null }) {
  const [timeIndex, setTimeIndex] = useState(0);
  const [ders, setDers] = useState<DER[]>(snapshot?.distributedResources ?? distributedResources);
  const liveWeather = snapshot?.weatherForecast ?? weatherForecast;
  const liveLines = snapshot?.transmissionLines ?? transmissionLines;
  const weather = liveWeather[timeIndex];

  useEffect(() => { if (snapshot) setDers(snapshot.distributedResources); }, [snapshot]);

  const linePredictions = useMemo(() => {
    return liveLines.map((line) => ({
      line,
      risk: predictLineFaultRisk(line, weather, 1),
    }));
  }, [liveLines, weather]);

  const refreshDERs = () => setDers((prev) => prev.map((d) => ({
    ...d,
    currentOutput: Math.round(Math.max(0, Math.min(d.capacity, d.currentOutput + (Math.random() * 20 - 10)))),
    predictedOutput: Math.round(Math.max(0, Math.min(d.capacity, d.predictedOutput + (Math.random() * 20 - 10)))),
  })));

  const derTypeIcon = (type: DER["type"]) => {
    if (type === "Solar") return <Sun size={16} className="text-yellow-600" />;
    if (type === "Wind") return <Wind size={16} className="text-blue-600" />;
    if (type === "Storage") return <Zap size={16} className="text-emerald-600" />;
    return <Activity size={16} className="text-purple-600" />;
  };

  return (
    <div className="space-y-5">
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <CloudRain size={18} className="text-emerald-600" />
          Climate Resilience & Weather-Driven Line Risk
        </h3>
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Forecast Time</label>
          <input type="range" min={0} max={weatherForecast.length - 1} step={1} value={timeIndex} onChange={(e) => setTimeIndex(Number(e.target.value))} className="w-full" />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            {weatherForecast.map((w, i) => <span key={i} className={i === timeIndex ? "font-bold text-emerald-600" : ""}>{w.time}</span>)}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <Metric label="Temperature" value={`${weather.temp}°C`} color="red" />
          <Metric label="Wind" value={`${weather.wind} km/h`} color="blue" />
          <Metric label="Humidity" value={`${weather.humidity}%`} color="teal" />
          <Metric label="Solar Irradiance" value={`${weather.solarIrradiance} W/m²`} color="yellow" />
        </div>
        {weather.storm && (
          <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm mb-4">
            <CloudLightning size={18} className="inline mr-2" />
            Storm warning active. Expect elevated line fault risk and solar curtailment.
          </div>
        )}
        <h4 className="font-semibold mb-2 text-sm">Predicted Line Fault Risk</h4>
        <div className="space-y-2">
          {linePredictions.map(({ line, risk }) => (
            <div key={line.id} className="flex items-center gap-3 text-sm">
              <div className="w-48 truncate">{line.name}</div>
              <div className="flex-1 h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                <div className={`h-full rounded-full ${risk > 70 ? "bg-red-500" : risk > 40 ? "bg-yellow-500" : "bg-emerald-500"}`} style={{ width: `${risk}%` }} />
              </div>
              <div className="w-10 text-right font-mono text-xs">{risk}%</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold flex items-center gap-2"><Leaf size={18} className="text-emerald-600" /> Distributed Energy Resources</h3>
          <button onClick={refreshDERs} className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-sm flex items-center gap-2 hover:bg-emerald-700"><RefreshCw size={14} /> Refresh</button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {ders.map((d) => (
            <div key={d.id} className="border border-gray-200 dark:border-gray-800 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                {derTypeIcon(d.type)}
                <span className="font-medium text-sm">{d.name}</span>
              </div>
              <div className="text-xs text-gray-400 mb-2">{d.type} · {d.location}</div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between"><span className="text-gray-400">Current</span><span className="font-mono">{d.currentOutput}/{d.capacity} MW</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Predicted</span><span className="font-mono">{d.predictedOutput} MW</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Status</span><span className="font-medium capitalize">{d.status}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
