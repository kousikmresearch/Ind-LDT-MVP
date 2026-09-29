import { useState, useMemo } from "react";
import { Search, BookA } from "lucide-react";
import { glossary } from "../data/glossary";

export default function Glossary() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(() => {
    const cats = new Set(glossary.map((g) => g.category));
    return ["All", ...Array.from(cats).sort()];
  }, []);

  const filtered = useMemo(() => {
    return glossary
      .filter((g) => {
        if (category !== "All" && g.category !== category) return false;
        if (search) {
          const q = search.toLowerCase();
          if (!g.term.toLowerCase().includes(q) && !g.definition.toLowerCase().includes(q))
            return false;
        }
        return true;
      })
      .sort((a, b) => a.term.localeCompare(b.term));
  }, [search, category]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <BookA className="text-brand-600" size={28} />
          Glossary
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Terminology for digital twin concepts used across the India LDT Toolbox.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search terms..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-sm focus:outline-none focus:border-brand-500"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-sm focus:outline-none focus:border-brand-500"
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Terms */}
      <div className="space-y-3">
        {filtered.map((g, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4"
          >
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <h3 className="font-semibold">{g.term}</h3>
              </div>
              <span className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 shrink-0">
                {g.category}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">{g.definition}</p>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p>No terms match your search.</p>
        </div>
      )}
    </div>
  );
}
