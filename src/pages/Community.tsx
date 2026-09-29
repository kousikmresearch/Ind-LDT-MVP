import { Users, MessageSquare, Code, GitPullRequest, BookOpen, Heart } from "lucide-react";

export default function Community() {
  const contributionSteps = [
    { icon: Code, title: "Develop a Tool", desc: "Build a new platform component using NUDM/IUDX standards and submit via pull request." },
    { icon: GitPullRequest, title: "Contribute an Algorithm", desc: "Develop a simulation model, pass TEVV certification, and publish to the marketplace." },
    { icon: BookOpen, title: "Share a Use Case", desc: "Document your city's digital twin implementation for the Use Cases gallery." },
    { icon: MessageSquare, title: "Answer Questions", desc: "Help other cities on the community forum with implementation guidance." },
  ];

  const guidelines = [
    "All code contributions must be under Apache 2.0 licence",
    "Algorithm models must pass TEVV certification before marketplace listing",
    "Tools must comply with NUDM data schemas and IUDX API standards",
    "All components must be DPDP Act 2023 compliant",
    "Documentation must be bilingual (English + Hindi) at minimum",
    "Code must include tests and CI/CD pipeline configuration",
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Community</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Join the India LDT Toolbox community — contribute tools, share use cases, and help cities build digital twins.
        </p>
      </div>

      {/* Forum CTA */}
      <div className="bg-gradient-to-r from-brand-600 to-brand-800 text-white rounded-xl p-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
            <Users size={28} />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold">Community Forum</h2>
            <p className="text-brand-100 text-sm mt-1">
              Discuss implementations, ask questions, share showcases, and connect with other cities.
            </p>
          </div>
          <button className="px-4 py-2 bg-white text-brand-700 rounded-lg font-semibold text-sm hover:bg-brand-50 transition-colors shrink-0">
            Join Forum
          </button>
        </div>
      </div>

      {/* How to Contribute */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">How to Contribute</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {contributionSteps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={i}
                className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 flex items-start gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center shrink-0">
                  <Icon className="text-brand-600 dark:text-brand-400" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">{step.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Contribution Guidelines */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Contribution Guidelines</h2>
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <ul className="space-y-3">
            {guidelines.map((g, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <Heart className="text-saffron-500 shrink-0 mt-0.5" size={16} />
                <span>{g}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* City Showcases */}
      <section>
        <h2 className="text-xl font-bold mb-4">City Showcases</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { city: "Varanasi", desc: "Heritage + crowd management with 3D digital twin" },
            { city: "Pune", desc: "Water distribution DT with leak detection" },
            { city: "Chennai", desc: "Flood simulation for coastal vulnerability" },
          ].map((s) => (
            <div
              key={s.city}
              className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center mx-auto mb-3">
                <Users className="text-brand-600 dark:text-brand-400" size={24} />
              </div>
              <h3 className="font-semibold text-sm">{s.city}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
