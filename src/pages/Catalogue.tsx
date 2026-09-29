import { useState, useMemo } from "react";
import * as Icons from "lucide-react";
import { Search, Filter, Box, Cpu, Database } from "lucide-react";
import { allItems, tools, algorithms, datasets, type CatalogueItem, type BlockType } from "../data/catalogue";

type FilterType = "all" | BlockType;
type PhaseFilter = "all" | 1 | 2 | 3 | 4;

export default function Catalogue() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [phaseFilter, setPhaseFilter] = useState<PhaseFilter>("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<CatalogueItem | null>(null);

  const filtered = useMemo(() => {
    return allItems.filter((item) => {
      if (filter !== "all" && item.block !== filter) return false;
      if (phaseFilter !== "all" && item.phase !== phaseFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!item.name.toLowerCase().includes(q) && !item.purpose.toLowerCase().includes(q) && !item.builtOn.toLowerCase().includes(q))
          return false;
      }
      return true;
    });
  }, [filter, phaseFilter, search]);

  const blockConfig = {
    tool: { label: "Tools", icon: Box, color: "blue", count: tools.length },
    algorithm: { label: "Algorithms", icon: Cpu, color: "green", count: algorithms.length },
    dataset: { label: "Datasets", icon: Database, color: "orange", count: datasets.length },
  };

  const colorClasses: Record<string, { bg: string; text: string; border: string; badge: string }> = {
    blue: { bg: "bg-blue-50 dark:bg-blue-900/20", text: "text-blue-600 dark:text-blue-400", border: "border-blue-200 dark:border-blue-800", badge: "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300" },
    green: { bg: "bg-green-50 dark:bg-green-900/20", text: "text-green-600 dark:text-green-400", border: "border-green-200 dark:border-green-800", badge: "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300" },
    orange: { bg: "bg-orange-50 dark:bg-orange-900/20", text: "text-orange-600 dark:text-orange-400", border: "border-orange-200 dark:border-orange-800", badge: "bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300" },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Solutions Catalogue</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Browse all {allItems.length} tools, algorithm models, and datasets in the India LDT Toolbox.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        {/* Block filter */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === "all"
                ? "bg-brand-600 text-white"
                : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-brand-300"
            }`}
          >
            All ({allItems.length})
          </button>
          {(Object.keys(blockConfig) as BlockType[]).map((block) => {
            const cfg = blockConfig[block];
            const Icon = cfg.icon;
            return (
              <button
                key={block}
                onClick={() => setFilter(block)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  filter === block
                    ? "bg-brand-600 text-white"
                    : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-brand-300"
                }`}
              >
                <Icon size={16} />
                {cfg.label} ({cfg.count})
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search tools, algorithms, datasets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-sm focus:outline-none focus:border-brand-500"
          />
        </div>

        {/* Phase filter */}
        <select
          value={phaseFilter}
          onChange={(e) => setPhaseFilter(e.target.value === "all" ? "all" : Number(e.target.value) as PhaseFilter)}
          className="px-4 py-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-sm focus:outline-none focus:border-brand-500"
        >
          <option value="all">All Phases</option>
          <option value="1">Phase 1 (Foundation)</option>
          <option value="2">Phase 2 (Core Toolbox)</option>
          <option value="3">Phase 3 (Expansion)</option>
          <option value="4">Phase 4 (Scale)</option>
        </select>
      </div>

      {/* Results */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => {
          const cfg = blockConfig[item.block];
          const colors = colorClasses[cfg.color];
          const Icon = (Icons as any)[item.icon] || Icons.Box;

          return (
            <div
              key={item.id}
              onClick={() => setSelected(item)}
              className={`bg-white dark:bg-gray-900 rounded-xl border ${colors.border} p-5 hover:shadow-lg transition-shadow cursor-pointer group`}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center shrink-0`}>
                  <Icon className={colors.text} size={20} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-sm leading-tight group-hover:text-brand-600 transition-colors">
                    {item.name}
                  </h3>
                  <div className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium ${colors.badge}`}>
                    {cfg.label}
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{item.purpose}</p>
              <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
                <span className="text-gray-400">Phase {item.phase}</span>
                <span className="text-gray-400">{item.status}</span>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <Filter className="mx-auto mb-3" size={32} />
          <p>No items match your filters.</p>
        </div>
      )}

      {/* Detail Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-xl max-w-lg w-full p-6 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-3 mb-4">
              {(() => {
                const Icon = (Icons as any)[selected.icon] || Icons.Box;
                const cfg = blockConfig[selected.block];
                const colors = colorClasses[cfg.color];
                return (
                  <>
                    <div className={`w-12 h-12 rounded-lg ${colors.bg} flex items-center justify-center shrink-0`}>
                      <Icon className={colors.text} size={24} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{selected.name}</h2>
                      <div className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium ${colors.badge}`}>
                        {cfg.label} · Phase {selected.phase}
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Purpose</h4>
                <p className="text-sm">{selected.purpose}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Built On</h4>
                <p className="text-sm">{selected.builtOn}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Status</h4>
                <p className="text-sm capitalize">{selected.status}</p>
              </div>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="mt-6 w-full py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
