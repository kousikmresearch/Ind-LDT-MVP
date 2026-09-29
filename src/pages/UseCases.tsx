import * as Icons from "lucide-react";
import { MapPin, Building, CheckCircle2, PlayCircle } from "lucide-react";
import { useCases } from "../data/useCases";
import type { PageId } from "../App";

export default function UseCases({ onNavigate }: { onNavigate?: (p: PageId) => void }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Use Cases — Pilot City Implementations</h1>
        <p className="text-gray-500 dark:text-gray-400">
          5 cities selected for Phase 2 deployment of the India LDT Toolbox.
        </p>
      </div>

      <div className="space-y-6">
        {useCases.map((uc) => {
          const Icon = (Icons as any)[uc.icon] || Icons.Map;
          return (
            <div
              key={uc.city}
              className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden"
            >
              <div className="grid md:grid-cols-3 gap-0">
                {/* Left: City info */}
                <div className="bg-gradient-to-br from-brand-600 to-brand-800 text-white p-6">
                  <Icon size={36} className="mb-3" />
                  <h2 className="text-2xl font-bold">{uc.city}</h2>
                  <div className="flex items-center gap-1 text-brand-100 text-sm mt-1">
                    <MapPin size={14} />
                    {uc.state}
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <div className="text-xs text-brand-200 mb-1">Primary Use Case</div>
                    <div className="text-sm font-medium">{uc.primaryUseCase}</div>
                  </div>
                </div>

                {/* Right: Details */}
                <div className="md:col-span-2 p-6">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Project</div>
                      <div className="text-sm font-medium">{uc.project}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Vendor / Partner</div>
                      <div className="text-sm font-medium">{uc.vendor}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Status</div>
                      <div className="text-sm font-medium text-brand-600">{uc.status}</div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{uc.description}</p>

                  {onNavigate && uc.city === "Kolkata" && (
                    <button
                      onClick={() => onNavigate("kolkata-demo")}
                      className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
                    >
                      <PlayCircle size={18} />
                      Launch Interactive Demo
                    </button>
                  )}

                  {onNavigate && uc.city === "Damodar Valley Corporation" && (
                    <button
                      onClick={() => onNavigate("dvc-demo")}
                      className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors"
                    >
                      <PlayCircle size={18} />
                      Launch Power DT Demo
                    </button>
                  )}

                  <div>
                    <div className="text-xs font-semibold text-gray-400 mb-2">Key Highlights</div>
                    <ul className="space-y-1.5">
                      {uc.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="text-brand-600 shrink-0 mt-0.5" size={16} />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selection Criteria */}
      <div className="mt-10 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
        <h2 className="text-xl font-bold mb-4">Pilot City Selection Criteria</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { criterion: "Has operational ICCC", weight: "High" },
            { criterion: "Has IUDX deployment", weight: "High" },
            { criterion: "Smart City Mission city", weight: "Medium" },
            { criterion: "Diversity of challenges", weight: "Medium" },
            { criterion: "Geographic spread", weight: "Medium" },
            { criterion: "Political willingness", weight: "High" },
          ].map((c) => (
            <div key={c.criterion} className="flex items-center justify-between py-2 px-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
              <span className="text-sm">{c.criterion}</span>
              <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                c.weight === "High"
                  ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                  : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
              }`}>
                {c.weight}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
