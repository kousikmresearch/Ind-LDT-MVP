import { useState } from "react";
import { BookOpen, ChevronDown, ChevronUp, HelpCircle, FileText, GraduationCap, X } from "lucide-react";
import { faqs } from "../data/content";
import { tutorials, type Tutorial } from "../data/tutorials";
import { documents, type Document } from "../data/documents";

export default function KnowledgeCenter() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const [activeTutorial, setActiveTutorial] = useState<Tutorial | null>(null);

  const [activeDoc, setActiveDoc] = useState<Document | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Knowledge Center</h1>
        <p className="text-gray-500 dark:text-gray-400">
          FAQs, tutorials, documentation, and learning resources for the India LDT Toolbox.
        </p>
      </div>

      {/* FAQs */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <HelpCircle size={20} className="text-brand-600" />
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full text-left px-5 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <span className="font-medium text-sm pr-4">{faq.question}</span>
                {openFaq === i ? (
                  <ChevronUp size={18} className="text-gray-400 shrink-0" />
                ) : (
                  <ChevronDown size={18} className="text-gray-400 shrink-0" />
                )}
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4 text-sm text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Tutorials */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <GraduationCap size={20} className="text-brand-600" />
          Tutorials
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tutorials.map((t, i) => (
            <div
              key={i}
              onClick={() => { setActiveTutorial(t); setActiveDoc(null); }}
              className={`bg-white dark:bg-gray-900 rounded-xl border p-5 hover:shadow-md transition-shadow cursor-pointer ${
                activeTutorial?.id === t.id
                  ? "border-brand-400 ring-1 ring-brand-400"
                  : "border-gray-200 dark:border-gray-800"
              }`}>
              <h3 className="font-semibold text-sm mb-2">{t.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{t.desc}</p>
              <div className="flex items-center gap-3 text-xs">
                <span className="text-gray-400">{t.duration}</span>
                <span className={`px-2 py-0.5 rounded font-medium ${
                  t.level === "Beginner"
                    ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                    : t.level === "Intermediate"
                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                    : "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                }`}>
                  {t.level}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {activeTutorial && (
        <section className="mb-10">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="text-lg font-bold mb-1">{activeTutorial.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{activeTutorial.desc}</p>
              </div>
              <button
                onClick={() => setActiveTutorial(null)}
                className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 shrink-0"
                aria-label="Close tutorial"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs mb-6">
              <span className="text-gray-400">{activeTutorial.duration}</span>
              <span className={`px-2 py-0.5 rounded font-medium ${
                activeTutorial.level === "Beginner"
                  ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                  : activeTutorial.level === "Intermediate"
                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                  : "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
              }`}>
                {activeTutorial.level}
              </span>
            </div>

            {activeTutorial.prerequisites.length > 0 && (
              <div className="mb-6 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                <h4 className="font-semibold text-sm mb-2">Prerequisites</h4>
                <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  {activeTutorial.prerequisites.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-6">
              {activeTutorial.sections.map((s, i) => (
                <div key={i}>
                  <h4 className="font-semibold text-sm mb-2">{s.heading}</h4>
                  {s.text && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{s.text}</p>
                  )}
                  {s.bullets && (
                    <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      {s.bullets.map((b, j) => (
                        <li key={j}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Documentation */}
      <section>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <BookOpen size={20} className="text-brand-600" />
          Documentation
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((d, i) => (
            <div
              key={i}
              onClick={() => { setActiveDoc(d); setActiveTutorial(null); }}
              className={`bg-white dark:bg-gray-900 rounded-xl border p-5 hover:shadow-md transition-shadow cursor-pointer flex items-start gap-3 ${
                activeDoc?.id === d.id
                  ? "border-brand-400 ring-1 ring-brand-400"
                  : "border-gray-200 dark:border-gray-800"
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center shrink-0">
                <FileText className="text-brand-600 dark:text-brand-400" size={20} />
              </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">{d.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{d.desc}</p>
                </div>
            </div>
          ))}
        </div>

        {activeDoc && (
          <div className="mt-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="text-lg font-bold mb-1">{activeDoc.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{activeDoc.desc}</p>
              </div>
              <button
                onClick={() => setActiveDoc(null)}
                className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 shrink-0"
                aria-label="Close document"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-6">
              {activeDoc.sections.map((s, i) => (
                <div key={i}>
                  <h4 className="font-semibold text-sm mb-2">{s.heading}</h4>
                  {s.text && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{s.text}</p>
                  )}
                  {s.bullets && (
                    <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      {s.bullets.map((b, j) => (
                        <li key={j}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
