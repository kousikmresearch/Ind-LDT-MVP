import { Database, Cpu, Map, ArrowRight, Box, ShieldCheck, Sparkles, Users, Cloud } from "lucide-react";
import type { PageId } from "../App";
import { allItems, tools, algorithms, datasets } from "../data/catalogue";
import { useCases } from "../data/useCases";

export default function Home({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 text-white">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.4%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur text-sm mb-6">
              <Sparkles size={14} />
              <span>Built on India's Digital Public Infrastructure</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              India Local Digital Twin Toolbox
            </h1>
            <p className="text-lg sm:text-xl text-brand-100 mb-8">
              A national, open-source collection of interoperable tools, data models, and algorithms
              tailored to Indian urban challenges — built on IUDX, Bhuvan, India Stack, and Smart Cities Mission infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate("catalogue")}
                className="px-6 py-3 bg-white text-brand-700 rounded-lg font-semibold hover:bg-brand-50 transition-colors flex items-center justify-center gap-2"
              >
                Explore Solutions <ArrowRight size={18} />
              </button>
              <button
                onClick={() => onNavigate("maturity")}
                className="px-6 py-3 bg-brand-900/40 backdrop-blur text-white rounded-lg font-semibold hover:bg-brand-900/60 transition-colors border border-white/20"
              >
                Assess Your City's DT Readiness
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-brand-600">{tools.length}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Platform Tools</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-600">{algorithms.length}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Algorithm Models</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-600">{datasets.length}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">India-Specific Datasets</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-600">50+</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Target Cities</div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Building Blocks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Three Building Blocks</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            The India LDT Toolbox is organised into three interconnected blocks — tools for platform building,
            algorithm models for simulation, and India-specific datasets for ground truth.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div
            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onNavigate("catalogue")}
          >
            <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
              <Box className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Block 1: Tools</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Platform components — identity, data exchange, visualiser, simulation environment, marketplace, and more.
            </p>
            <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
              {tools.length} tools →
            </div>
          </div>
          <div
            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onNavigate("catalogue")}
          >
            <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
              <Cpu className="text-green-600 dark:text-green-400" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Block 2: Algorithm Models</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Simulation engines — flood, traffic, air quality, water, energy, disaster, crowd, waste, and more.
            </p>
            <div className="text-sm font-medium text-green-600 dark:text-green-400">
              {algorithms.length} models →
            </div>
          </div>
          <div
            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onNavigate("catalogue")}
          >
            <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-4">
              <Database className="text-orange-600 dark:text-orange-400" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Block 3: Datasets</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              India-specific data layers — buildings, infrastructure, demographics, transport, utilities, sensors.
            </p>
            <div className="text-sm font-medium text-orange-600 dark:text-orange-400">
              {datasets.length} datasets →
            </div>
          </div>
        </div>
      </section>

      {/* Built On */}
      <section className="bg-gray-100 dark:bg-gray-900/50 border-y border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <h2 className="text-3xl font-bold text-center mb-3">Built on India's Digital Infrastructure</h2>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
            No need to build from scratch. The toolbox leverages existing, proven Indian digital public infrastructure.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: "IUDX", desc: "Data Exchange", icon: Database },
              { name: "Bhuvan", desc: "ISRO Geo-Platform", icon: Map },
              { name: "India Stack", desc: "Aadhaar · UPI · DigiLocker", icon: ShieldCheck },
              { name: "NIC MeghRaj", desc: "Government Cloud", icon: Cloud },
              { name: "Smart Cities", desc: "100 City ICCCs", icon: Users },
              { name: "PM GatiShakti", desc: "Infrastructure GIS", icon: Box },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.name} className="bg-white dark:bg-gray-900 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-800">
                  <Icon className="mx-auto mb-2 text-brand-600" size={28} />
                  <div className="font-semibold text-sm">{item.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pilot Cities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Pilot Cities</h2>
            <p className="text-gray-500 dark:text-gray-400">5 cities selected for Phase 2 deployment</p>
          </div>
          <button
            onClick={() => onNavigate("usecases")}
            className="text-brand-600 hover:text-brand-700 font-medium text-sm flex items-center gap-1"
          >
            View all <ArrowRight size={16} />
          </button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {useCases.map((uc) => (
            <div
              key={uc.city}
              className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onNavigate("usecases")}
            >
              <div className="text-lg font-bold mb-1">{uc.city}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">{uc.state}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{uc.primaryUseCase}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-brand-600 to-brand-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to build your city's digital twin?</h2>
          <p className="text-brand-100 mb-8 max-w-2xl mx-auto">
            Start with the DT Maturity Assessor to understand your city's readiness, then explore the Solutions Catalogue
            for tools and algorithms you can deploy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate("maturity")}
              className="px-6 py-3 bg-white text-brand-700 rounded-lg font-semibold hover:bg-brand-50 transition-colors"
            >
              Start DT Maturity Assessment
            </button>
            <button
              onClick={() => onNavigate("catalogue")}
              className="px-6 py-3 bg-brand-900/40 backdrop-blur text-white rounded-lg font-semibold hover:bg-brand-900/60 transition-colors border border-white/20"
            >
              Browse Solutions Catalogue
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
