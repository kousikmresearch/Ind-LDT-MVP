import { Building2, GraduationCap, Cpu, Shield, Clock, CheckCircle2 } from "lucide-react";
import { partners, standards, phases } from "../data/about";

export default function About() {
  const partnerIcons: Record<string, any> = {
    government: Building2,
    academic: GraduationCap,
    technology: Cpu,
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">About / Consortium</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Governance structure, consortium partners, standards, and phased rollout plan.
        </p>
      </div>

      {/* Vision */}
      <div className="bg-gradient-to-br from-brand-600 to-brand-800 text-white rounded-xl p-6 mb-8">
        <h2 className="text-xl font-bold mb-2">Vision</h2>
        <p className="text-brand-100">
          A national, open-source toolbox of interoperable tools, data models, and algorithms that enables Indian cities
          to build, operate, and scale Local Digital Twins — grounded in Indian digital public infrastructure, aligned
          with national standards, and governed as a public good.
        </p>
      </div>

      {/* Governance Structure */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Governance Structure</h2>
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <div className="space-y-3">
            {[
              { name: "Steering Committee", desc: "MoHUA + MeitY + NITI Aayog — strategic direction, funding approval", level: 1 },
              { name: "Technical Council", desc: "IISc, NIC, C-DAC, ISRO, SOI — technical standards, architecture decisions", level: 2 },
              { name: "City Advisory Group", desc: "Smart City CEOs, ULB Commissioners — city requirements, use case validation", level: 3 },
              { name: "Industry & Academic Consortium", desc: "Tech partners, universities, NGOs — development, research, innovation", level: 4 },
              { name: "Open Source Community", desc: "Developers, contributors, cities — tool contributions, forum, showcases", level: 5 },
            ].map((layer) => (
              <div
                key={layer.name}
                className="flex items-center gap-4 py-2"
                style={{ paddingLeft: `${(layer.level - 1) * 1.5}rem` }}
              >
                <div
                  className={`w-3 h-3 rounded-full shrink-0 ${
                    layer.level === 1 ? "bg-brand-600" : layer.level === 2 ? "bg-brand-400" : "bg-brand-300"
                  }`}
                />
                <div>
                  <div className="font-semibold text-sm">{layer.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{layer.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consortium Partners */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Consortium Partners</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {partners.map((p) => {
            const Icon = partnerIcons[p.type] || Building2;
            return (
              <div
                key={p.name}
                className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4 flex items-start gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center shrink-0">
                  <Icon className="text-brand-600 dark:text-brand-400" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{p.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{p.role}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Standards */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Shield size={20} className="text-brand-600" />
          Interoperability Standards
        </h2>
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 text-left">
                <th className="px-4 py-3 font-semibold">Standard</th>
                <th className="px-4 py-3 font-semibold">Source</th>
                <th className="px-4 py-3 font-semibold hidden sm:table-cell">Purpose</th>
              </tr>
            </thead>
            <tbody>
              {standards.map((s, i) => (
                <tr key={i} className="border-t border-gray-100 dark:border-gray-800">
                  <td className="px-4 py-3 font-medium">{s.name}</td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{s.source}</td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400 hidden sm:table-cell">{s.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Phased Rollout */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Clock size={20} className="text-brand-600" />
          Phased Rollout Plan (24 Months)
        </h2>
        <div className="space-y-4">
          {phases.map((phase) => (
            <div
              key={phase.phase}
              className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold">
                  {phase.phase}: {phase.title}
                </h3>
                <span className="text-xs px-2 py-1 rounded bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 font-medium">
                  {phase.duration}
                </span>
              </div>
              <ul className="space-y-2">
                {phase.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <CheckCircle2 className="text-brand-600 shrink-0 mt-0.5" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Funding */}
      <section>
        <h2 className="text-xl font-bold mb-4">Funding Model</h2>
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 text-left">
                <th className="px-4 py-3 font-semibold">Source</th>
                <th className="px-4 py-3 font-semibold">Type</th>
                <th className="px-4 py-3 font-semibold">Amount (Indicative)</th>
              </tr>
            </thead>
            <tbody>
              {[
                { source: "MoHUA / Smart Cities Mission", type: "Government grant", amount: "₹50-100 Cr (phase 1)" },
                { source: "MeitY / NIC", type: "Infrastructure (cloud, hosting)", amount: "In-kind" },
                { source: "NDMA / DST", type: "Research grants for disaster models", amount: "₹20-50 Cr" },
                { source: "World Bank / ADB", type: "International development loans", amount: "TBD" },
                { source: "Industry consortium membership", type: "Annual fees", amount: "₹5-10 Cr/year" },
                { source: "Algorithm marketplace fees", type: "Revenue share", amount: "Self-sustaining (phase 3)" },
              ].map((f, i) => (
                <tr key={i} className="border-t border-gray-100 dark:border-gray-800">
                  <td className="px-4 py-3 font-medium">{f.source}</td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{f.type}</td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{f.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
