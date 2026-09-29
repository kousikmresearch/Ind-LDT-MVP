import { useState, useCallback } from "react";
import { X, Save, RefreshCw, CheckCircle } from "lucide-react";
import { type DvcLiveConfig, type DvcFeed } from "../api/dvcLive";

export interface FeedConfigPanelProps {
  config: DvcLiveConfig;
  onSave: (config: DvcLiveConfig) => void;
  onClose: () => void;
}

export function FeedConfigPanel({ config, onSave, onClose }: FeedConfigPanelProps) {
  const [draft, setDraft] = useState<DvcLiveConfig>({ ...config, feeds: config.feeds.map((f) => ({ ...f })) });

  const updateFeed = useCallback((index: number, patch: Partial<DvcFeed>) => {
    setDraft((prev) => {
      const next = { ...prev, feeds: prev.feeds.map((f) => ({ ...f })) };
      next.feeds[index] = { ...next.feeds[index], ...patch };
      return next;
    });
  }, []);

  const save = useCallback(() => {
    onSave(draft);
  }, [draft, onSave]);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-5 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Real Feed Configuration</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Enable and configure live data sources for DVC / WRLDC.</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400"><X size={20} /></button>
        </div>

        <div className="p-5 overflow-y-auto flex-1 space-y-5">
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-800">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Master Live Toggle</label>
              <div className="mt-2 flex items-center gap-3">
                <button
                  onClick={() => setDraft((p) => ({ ...p, enabled: !p.enabled }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${draft.enabled ? "bg-emerald-600" : "bg-gray-300 dark:bg-gray-700"}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${draft.enabled ? "translate-x-6" : "translate-x-1"}`} />
                </button>
                <span className="text-sm">{draft.enabled ? "Enabled" : "Disabled"}</span>
              </div>
            </div>
            <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-800">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Global Poll Interval (ms)</label>
              <input
                type="number"
                min={1000}
                step={1000}
                value={draft.globalPollInterval}
                onChange={(e) => setDraft((p) => ({ ...p, globalPollInterval: Number(e.target.value) }))}
                className="mt-2 w-full px-2 py-1 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-sm"
              />
            </div>
            <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 flex items-center gap-2">
              <CheckCircle size={18} className="text-emerald-600" />
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {draft.feeds.filter((f) => f.enabled).length} of {draft.feeds.length} feeds enabled
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {draft.feeds.map((feed, i) => (
              <div key={feed.id} className="border border-gray-200 dark:border-gray-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-medium">{feed.name}</div>
                    <div className="text-xs text-gray-400">{feed.description}</div>
                  </div>
                  <button
                    onClick={() => updateFeed(i, { enabled: !feed.enabled })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${feed.enabled ? "bg-emerald-600" : "bg-gray-300 dark:bg-gray-700"}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${feed.enabled ? "translate-x-6" : "translate-x-1"}`} />
                  </button>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div>
                    <label className="text-xs text-gray-500">Base URL</label>
                    <input
                      type="text"
                      value={feed.baseUrl}
                      onChange={(e) => updateFeed(i, { baseUrl: e.target.value })}
                      className="w-full mt-1 px-2 py-1 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-sm"
                      disabled={!feed.enabled}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Endpoint</label>
                    <input
                      type="text"
                      value={feed.endpoint}
                      onChange={(e) => updateFeed(i, { endpoint: e.target.value })}
                      className="w-full mt-1 px-2 py-1 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-sm"
                      disabled={!feed.enabled}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Method</label>
                    <select
                      value={feed.method}
                      onChange={(e) => updateFeed(i, { method: e.target.value as "GET" | "POST" })}
                      className="w-full mt-1 px-2 py-1 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-sm"
                      disabled={!feed.enabled}
                    >
                      <option>GET</option>
                      <option>POST</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Poll Interval (ms)</label>
                    <input
                      type="number"
                      min={500}
                      step={500}
                      value={feed.pollInterval}
                      onChange={(e) => updateFeed(i, { pollInterval: Number(e.target.value) })}
                      className="w-full mt-1 px-2 py-1 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-sm"
                      disabled={!feed.enabled}
                    />
                  </div>
                </div>
                <div className="mt-3 grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-500">API Key / Token (optional)</label>
                    <input
                      type="password"
                      value={feed.apiKey || ""}
                      onChange={(e) => updateFeed(i, { apiKey: e.target.value })}
                      className="w-full mt-1 px-2 py-1 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-sm"
                      disabled={!feed.enabled}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Extra Headers (JSON, optional)</label>
                    <input
                      type="text"
                      placeholder='{"X-Source": "dvc-twin"}'
                      value={feed.headers ? JSON.stringify(feed.headers) : ""}
                      onChange={(e) => {
                        try {
                          const h = e.target.value ? JSON.parse(e.target.value) : undefined;
                          updateFeed(i, { headers: h });
                        } catch {
                          // invalid JSON, ignore
                        }
                      }}
                      className="w-full mt-1 px-2 py-1 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-sm"
                      disabled={!feed.enabled}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <button onClick={() => setDraft((p) => ({ ...p, feeds: p.feeds.map((f) => ({ ...f, enabled: false })) }))} className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-sm hover:bg-gray-50 dark:hover:bg-gray-800">
            Disable All
          </button>
          <div className="flex gap-3">
            <button onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-sm hover:bg-gray-50 dark:hover:bg-gray-800">Cancel</button>
            <button onClick={save} className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium flex items-center gap-2 hover:bg-emerald-700">
              <Save size={16} /> Save & Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
