import { Calendar, Tag } from "lucide-react";
import { newsItems } from "../data/content";

export default function NewsEvents() {
  const categories = [...new Set(newsItems.map((n) => n.category))];

  const categoryColors: Record<string, string> = {
    "City Update": "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
    "Recognition": "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300",
    "Funding": "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
    "Standards": "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
    "Program": "bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300",
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">News & Events</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Latest updates from India's digital twin ecosystem — city projects, funding, standards, and programme milestones.
        </p>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {newsItems.map((news, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Calendar size={14} />
                {news.date}
              </div>
              <span className={`text-xs px-2 py-0.5 rounded font-medium ${categoryColors[news.category] || "bg-gray-100 dark:bg-gray-800 text-gray-500"}`}>
                <Tag size={10} className="inline mr-1" />
                {news.category}
              </span>
            </div>
            <h3 className="font-semibold mb-1">{news.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{news.description}</p>
          </div>
        ))}
      </div>

      {/* Upcoming Events */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { title: "India LDT Toolbox Consortium Meeting", date: "Q1 2026", desc: "Stakeholder consultation with MoHUA, IISc, NIC, ISRO, C-DAC, and pilot cities." },
            { title: "First India LDT Hackathon", date: "Q3 2026", desc: "National hackathon for developing algorithm models for Indian urban challenges." },
            { title: "TEVV Certification Workshop", date: "Q2 2026", desc: "Training workshop on NIST VVUQ framework adaptation for urban digital twins." },
            { title: "Smart Cities Mission Conference", date: "Annual", desc: "Showcase India LDT Toolbox progress at the national Smart Cities conference." },
          ].map((event, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-brand-50 to-brand-100 dark:from-brand-900/20 dark:to-brand-900/10 rounded-xl border border-brand-200 dark:border-brand-800 p-5"
            >
              <div className="text-xs font-medium text-brand-600 mb-1">{event.date}</div>
              <h3 className="font-semibold text-sm mb-2">{event.title}</h3>
              <p className="text-xs text-gray-600 dark:text-gray-300">{event.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
