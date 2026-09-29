import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun, Github } from "lucide-react";
import Home from "./pages/Home";
import Catalogue from "./pages/Catalogue";
import KnowledgeCenter from "./pages/KnowledgeCenter";
import UseCases from "./pages/UseCases";
import NewsEvents from "./pages/NewsEvents";
import Community from "./pages/Community";
import Glossary from "./pages/Glossary";
import About from "./pages/About";
import MaturityAssessor from "./pages/MaturityAssessor";
import KolkataDemo from "./pages/KolkataDemo";
import DVCDemo from "./pages/DVCDemo";

export type PageId =
  | "home"
  | "catalogue"
  | "knowledge"
  | "usecases"
  | "news"
  | "community"
  | "glossary"
  | "about"
  | "maturity"
  | "kolkata-demo"
  | "dvc-demo";

const navItems: { id: PageId; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "catalogue", label: "Solutions" },
  { id: "maturity", label: "DT Assessor" },
  { id: "usecases", label: "Use Cases" },
  { id: "knowledge", label: "Knowledge" },
  { id: "glossary", label: "Glossary" },
  { id: "news", label: "News" },
  { id: "community", label: "Community" },
  { id: "about", label: "About" },
];

export default function App() {
  const [page, setPage] = useState<PageId>("home");
  const [dark, setDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("ldt-theme");
    if (stored === "dark") setDark(true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("ldt-theme", dark ? "dark" : "light");
  }, [dark]);

  const navigate = (p: PageId) => {
    setPage(p);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button onClick={() => navigate("home")} className="flex items-center gap-2 shrink-0">
              <div className="w-9 h-9 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold text-sm">
                DT
              </div>
              <span className="hidden sm:block font-bold text-lg">
                India LDT <span className="text-brand-600">Toolbox</span>
              </span>
            </button>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    page === item.id
                      ? "bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDark(!dark)}
                className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
              >
                {dark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener"
                className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors hidden sm:block"
              >
                <Github size={18} />
              </a>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Nav */}
          {mobileOpen && (
            <div className="lg:hidden py-3 border-t border-gray-200 dark:border-gray-800">
              <div className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => navigate(item.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium text-left transition-colors ${
                      page === item.id
                        ? "bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Page Content */}
      <main>
        {page === "home" && <Home onNavigate={navigate} />}
        {page === "catalogue" && <Catalogue />}
        {page === "maturity" && <MaturityAssessor />}
        {page === "usecases" && <UseCases onNavigate={navigate} />}
        {page === "knowledge" && <KnowledgeCenter />}
        {page === "glossary" && <Glossary />}
        {page === "news" && <NewsEvents />}
        {page === "community" && <Community />}
        {page === "about" && <About />}
        {page === "kolkata-demo" && <KolkataDemo />}
        {page === "dvc-demo" && <DVCDemo />}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold text-xs">
                  DT
                </div>
                <span className="font-bold">India LDT Toolbox</span>
              </div>
              <p className="text-sm text-gray-400">
                National, open-source toolbox for building Local Digital Twins in Indian cities.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-white">Explore</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => navigate("catalogue")} className="hover:text-brand-400">Solutions Catalogue</button></li>
                <li><button onClick={() => navigate("maturity")} className="hover:text-brand-400">DT Maturity Assessor</button></li>
                <li><button onClick={() => navigate("usecases")} className="hover:text-brand-400">Use Cases</button></li>
                <li><button onClick={() => navigate("knowledge")} className="hover:text-brand-400">Knowledge Center</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-white">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => navigate("glossary")} className="hover:text-brand-400">Glossary</button></li>
                <li><button onClick={() => navigate("news")} className="hover:text-brand-400">News & Events</button></li>
                <li><button onClick={() => navigate("community")} className="hover:text-brand-400">Community</button></li>
                <li><button onClick={() => navigate("about")} className="hover:text-brand-400">About / Consortium</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-white">Standards</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>ISO/IEC 30186 · IEEE 3144</li>
                <li>OGC CityGML · SensorThings</li>
                <li>NUDM · IUDX · DPDP Act 2023</li>
                <li>Apache 2.0 Licence</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-sm text-gray-500 flex flex-col sm:flex-row justify-between gap-2">
            <span>© 2026 India LDT Toolbox — A Digital Public Good for Indian Cities</span>
            <span>Built on India Stack · IUDX · Bhuvan · NIC MeghRaj</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
