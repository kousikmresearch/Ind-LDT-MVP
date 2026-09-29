export interface Partner {
  name: string;
  role: string;
  type: "government" | "academic" | "technology";
}

export const partners: Partner[] = [
  { name: "MoHUA", role: "Smart Cities Mission, NUDM, funding", type: "government" },
  { name: "MeitY / NIC", role: "Cloud (MeghRaj), digital infrastructure", type: "government" },
  { name: "NITI Aayog", role: "Policy guidance, strategic alignment", type: "government" },
  { name: "IISc Bangalore", role: "IUDX creator, technical lead", type: "academic" },
  { name: "ISRO / NRSC", role: "Bhuvan geo-platform, satellite data", type: "government" },
  { name: "C-DAC", role: "Technology development, HPC", type: "government" },
  { name: "Survey of India", role: "Geospatial standards, mapping", type: "government" },
  { name: "NDMA", role: "Disaster management domain expertise", type: "government" },
];

export interface Standard {
  name: string;
  source: string;
  purpose: string;
}

export const standards: Standard[] = [
  { name: "NUDM Data Standards", source: "MoHUA", purpose: "Urban data schemas, API specifications" },
  { name: "IUDX API Standards", source: "IISc / MoHUA", purpose: "Secure data exchange APIs" },
  { name: "BIS GIS Standards", source: "Bureau of Indian Standards", purpose: "Geospatial data formats" },
  { name: "WFS / WMS / WMTS", source: "OGC", purpose: "Web map services" },
  { name: "CityGML", source: "OGC", purpose: "3D city model exchange" },
  { name: "SensorThings API", source: "OGC", purpose: "IoT sensor data standard" },
  { name: "DPDP Act 2023", source: "MeitY", purpose: "Data privacy compliance" },
  { name: "ISO/IEC 30186", source: "ISO/IEC", purpose: "DT maturity model for city assessment" },
  { name: "IEEE 3144", source: "IEEE", purpose: "DT maturity model for industrial applications" },
  { name: "ISO 23247 (Parts 1-5)", source: "ISO", purpose: "DT framework + digital thread for lifecycle integration" },
  { name: "Gemini Principles", source: "UK DFTF", purpose: "Foundational principles (purpose, trust, function)" },
  { name: "IEC 61850", source: "IEC", purpose: "Power utility automation data modeling" },
  { name: "NGSI-LD", source: "ETSI", purpose: "Context information management (evaluate for interoperability)" },
];

export interface PhaseInfo {
  phase: string;
  duration: string;
  title: string;
  items: string[];
}

export const phases: PhaseInfo[] = [
  {
    phase: "Phase 1",
    duration: "Months 1-6",
    title: "Foundation",
    items: [
      "Establish consortium (MoHUA, IISc, NIC, ISRO, C-DAC, 3-5 pilot cities)",
      "Define India LDT interoperability standards",
      "Adopt DT maturity model (ISO/IEC 30186)",
      "Launch portal MVP",
      "Catalogue existing tools: IUDX, Bhuvan, city ICCC dashboards",
      "Document 3 showcase use cases",
      "Create bilingual glossary (English + Hindi)",
      "Establish TEVV certification framework",
    ],
  },
  {
    phase: "Phase 2",
    duration: "Months 6-12",
    title: "Core Toolbox",
    items: [
      "Develop/port 7 core tools",
      "Develop 5 algorithm models (hybrid mechanistic-ML)",
      "Publish India Building Database v1",
      "Onboard 5 pilot cities for testing",
      "Launch community forum + contribution guidelines",
      "Edge-cloud architecture: deploy edge nodes at city ICCCs",
    ],
  },
  {
    phase: "Phase 3",
    duration: "Months 12-18",
    title: "Expansion",
    items: [
      "Add 7 more algorithm models",
      "Develop Citizen Participate tool (WhatsApp + MyGov)",
      "Launch Algorithm Marketplace (with UPI integration)",
      "Add Federated Learning capability",
      "Add LLM Interface tool",
      "Add Climate Scenario Engine",
      "Add Subsurface Utility Mapper",
      "Onboard 20+ cities",
      "First India LDT Conference / Hackathon",
    ],
  },
  {
    phase: "Phase 4",
    duration: "Months 18-24",
    title: "Scale & Sustainability",
    items: [
      "Add remaining algorithm models",
      "Transition governance to Section 8 non-profit",
      "Full toolbox: 17+ tools, 15+ algorithms, 7+ datasets",
      "50+ cities onboarded",
      "International collaboration (NIST, Singapore, ISO/IEC, Global South)",
      "Certification program for LDT practitioners",
      "Self-sustaining revenue model operational",
    ],
  },
];
