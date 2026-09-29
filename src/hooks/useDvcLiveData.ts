import { useState, useEffect, useCallback, useRef } from "react";
import {
  fetchLiveSnapshot,
  fetchDvcBackendSnapshot,
  generateSimulatedSnapshot,
  type DvcLiveConfig,
  type DvcLiveSnapshot,
} from "../api/dvcLive";

export interface UseDvcLiveDataOptions {
  config: DvcLiveConfig;
  simulate?: boolean;
  poll?: boolean;
}

export interface UseDvcLiveDataResult {
  snapshot: DvcLiveSnapshot | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
  lastRefresh: Date | null;
}

export function useDvcLiveData({ config, simulate = true, poll = false }: UseDvcLiveDataOptions): UseDvcLiveDataResult {
  const [snapshot, setSnapshot] = useState<DvcLiveSnapshot | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const mounted = useRef(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const simFeed = config.feeds.find((f) => f.id === "simulation" && f.enabled);
      const data = config.enabled && !simulate && simFeed
        ? await fetchDvcBackendSnapshot(simFeed.baseUrl)
        : simulate || !config.enabled
          ? generateSimulatedSnapshot()
          : await fetchLiveSnapshot(config);
      setSnapshot(data);
      setLastRefresh(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch live data");
      // Fall back to simulated snapshot on error
      setSnapshot(generateSimulatedSnapshot());
      setLastRefresh(new Date());
    } finally {
      setLoading(false);
    }
  }, [config, simulate]);

  useEffect(() => {
    mounted.current = true;
    load();
    return () => { mounted.current = false; };
  }, [load]);

  useEffect(() => {
    if (!poll) return;
    const interval = setInterval(() => {
      if (mounted.current) load();
    }, config.globalPollInterval);
    return () => clearInterval(interval);
  }, [poll, config.globalPollInterval, load]);

  return { snapshot, loading, error, refresh: load, lastRefresh };
}
