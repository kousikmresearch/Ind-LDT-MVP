import { useState, useEffect, useCallback, useRef } from "react";
import {
  fetchKolkataLiveSnapshot,
  fetchKolkataBackendSnapshot,
  generateSimulatedKolkataSnapshot,
  type KolkataLiveConfig,
  type KolkataLiveSnapshot,
} from "../api/kolkataLive";

export interface UseKolkataLiveDataOptions {
  config: KolkataLiveConfig;
  simulate?: boolean;
  poll?: boolean;
}

export interface UseKolkataLiveDataResult {
  snapshot: KolkataLiveSnapshot | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
  lastRefresh: Date | null;
}

export function useKolkataLiveData({ config, simulate = true, poll = false }: UseKolkataLiveDataOptions): UseKolkataLiveDataResult {
  const [snapshot, setSnapshot] = useState<KolkataLiveSnapshot | null>(null);
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
        ? await fetchKolkataBackendSnapshot(simFeed.baseUrl)
        : simulate || !config.enabled
          ? generateSimulatedKolkataSnapshot()
          : await fetchKolkataLiveSnapshot(config);
      setSnapshot(data);
      setLastRefresh(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch Kolkata live data");
      setSnapshot(generateSimulatedKolkataSnapshot());
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
