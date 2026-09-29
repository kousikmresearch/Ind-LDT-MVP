export interface MaturityQuestion {
  id: string;
  dimension: string;
  question: string;
  options: { label: string; score: number }[];
}

export const maturityQuestions: MaturityQuestion[] = [
  {
    id: "iccc",
    dimension: "Data Infrastructure",
    question: "Does your city have an operational Integrated Command and Control Centre (ICCC)?",
    options: [
      { label: "No ICCC", score: 0 },
      { label: "ICCC under construction", score: 1 },
      { label: "ICCC operational with limited sensors", score: 2 },
      { label: "ICCC operational with comprehensive IoT/CCTV coverage", score: 3 },
    ],
  },
  {
    id: "iudx",
    dimension: "Data Infrastructure",
    question: "Is IUDX (India Urban Data Exchange) deployed in your city?",
    options: [
      { label: "No IUDX", score: 0 },
      { label: "IUDX planned", score: 1 },
      { label: "IUDX deployed with few data providers", score: 2 },
      { label: "IUDX operational with multiple active data nodes", score: 3 },
    ],
  },
  {
    id: "gis",
    dimension: "Data Infrastructure",
    question: "What is the maturity of your city's GIS / geospatial data?",
    options: [
      { label: "No digital GIS data", score: 0 },
      { label: "Basic 2D maps (Bhuvan/city GIS)", score: 1 },
      { label: "Detailed 2D GIS with utility layers", score: 2 },
      { label: "3D city models (CityGML/BIM) + utility GIS + satellite imagery", score: 3 },
    ],
  },
  {
    id: "sensors",
    dimension: "Data Infrastructure",
    question: "What is the coverage of IoT sensors in your city?",
    options: [
      { label: "No IoT sensors deployed", score: 0 },
      { label: "Few sensors (< 100) at key locations", score: 1 },
      { label: "Moderate sensor network (100-500) covering major areas", score: 2 },
      { label: "Extensive sensor network (500+) with real-time data streaming", score: 3 },
    ],
  },
  {
    id: "dt-existing",
    dimension: "Digital Twin Capability",
    question: "Does your city have any existing digital twin or 3D city model initiative?",
    options: [
      { label: "No digital twin initiative", score: 0 },
      { label: "Exploring / planning stage", score: 1 },
      { label: "Pilot digital twin in limited area", score: 2 },
      { label: "Operational city-scale digital twin", score: 3 },
    ],
  },
  {
    id: "simulation",
    dimension: "Digital Twin Capability",
    question: "Does your city use any simulation models for urban planning?",
    options: [
      { label: "No simulation models", score: 0 },
      { label: "Basic spreadsheets / static analysis", score: 1 },
      { label: "Some simulation models (traffic/flood) from vendors", score: 2 },
      { label: "Multiple integrated simulation models with real-time data", score: 3 },
    ],
  },
  {
    id: "standards",
    dimension: "Standards & Interoperability",
    question: "Does your city follow standardised data schemas (NUDM, IUDX, OGC)?",
    options: [
      { label: "No data standards", score: 0 },
      { label: "Ad-hoc / vendor-specific formats", score: 1 },
      { label: "Some standards adopted (NUDM or OGC)", score: 2 },
      { label: "Comprehensive standards compliance (NUDM + IUDX + OGC + ISO)", score: 3 },
    ],
  },
  {
    id: "governance",
    dimension: "Governance & Capacity",
    question: "What is the digital governance maturity of your ULB?",
    options: [
      { label: "Manual / paper-based processes", score: 0 },
      { label: "Some digital services (website, basic e-gov)", score: 1 },
      { label: "Multiple digital services with data-driven decisions", score: 2 },
      { label: "Mature digital governance with dedicated data/analytics team", score: 3 },
    ],
  },
  {
    id: "staff-capacity",
    dimension: "Governance & Capacity",
    question: "What is the technical capacity of your ULB staff?",
    options: [
      { label: "No technical staff for digital tools", score: 0 },
      { label: "Basic IT staff (system administration)", score: 1 },
      { label: "Some data/analytics staff with GIS or data skills", score: 2 },
      { label: "Dedicated data science / DT team with ML/GIS expertise", score: 3 },
    ],
  },
  {
    id: "citizen-engagement",
    dimension: "Citizen Engagement",
    question: "How does your city engage citizens digitally?",
    options: [
      { label: "No digital citizen engagement", score: 0 },
      { label: "Website / email for grievances", score: 1 },
      { label: "Mobile app or WhatsApp for citizen services", score: 2 },
      { label: "Multi-channel digital engagement with feedback integration to ICCC", score: 3 },
    ],
  },
];

export interface MaturityResult {
  level: string;
  score: number;
  maxScore: number;
  percentage: number;
  description: string;
  recommendations: string[];
}

export function calculateMaturity(answers: Record<string, number>): MaturityResult {
  const totalQuestions = maturityQuestions.length;
  const maxScore = totalQuestions * 3;
  const score = Object.values(answers).reduce((sum, v) => sum + v, 0);
  const percentage = Math.round((score / maxScore) * 100);

  let level: string;
  let description: string;
  let recommendations: string[];

  if (percentage < 25) {
    level = "Level 0 — Nascent";
    description = "Your city is at the beginning of its digital twin journey. Basic digital infrastructure may exist but is not ready for digital twin adoption.";
    recommendations = [
      "Establish an ICCC with basic IoT sensors and CCTV coverage",
      "Begin IUDX deployment planning with IISc Bangalore",
      "Start GIS data digitisation using Bhuvan as the base layer",
      "Train ULB staff on basic digital governance tools",
      "Join the India LDT Toolbox community as an observer",
    ];
  } else if (percentage < 50) {
    level = "Level 1 — Emerging";
    description = "Your city has basic digital infrastructure in place. Foundations for digital twin adoption are being built but significant gaps remain.";
    recommendations = [
      "Upgrade ICCC with comprehensive sensor coverage",
      "Deploy IUDX with at least 3-4 data providers",
      "Adopt NUDM data standards for all new digital initiatives",
      "Conduct DT awareness workshops for ULB leadership",
      "Start with one pilot use case (e.g., flood simulation or traffic monitoring)",
      "Apply for Smart Cities Mission or MoHUA funding for Phase 1",
    ];
  } else if (percentage < 75) {
    level = "Level 2 — Developing";
    description = "Your city has substantial digital infrastructure and some simulation capabilities. Ready for structured digital twin adoption.";
    recommendations = [
      "Adopt ISO/IEC 30186 maturity model for structured assessment",
      "Deploy 3-5 algorithm models from the India LDT Toolbox",
      "Establish TEVV certification process for all models",
      "Integrate citizen engagement via WhatsApp Business API",
      "Participate in federated learning with peer cities",
      "Onboard to the Algorithm Marketplace as both consumer and contributor",
    ];
  } else {
    level = "Level 3 — Advanced";
    description = "Your city is ready for advanced digital twin operations. You have the infrastructure, standards, and capacity to be a toolbox contributor and leader.";
    recommendations = [
      "Deploy full toolbox: 17+ tools, 15+ algorithms, 7+ datasets",
      "Contribute your custom models to the Algorithm Marketplace",
      "Host edge computing nodes for regional cities",
      "Lead federated learning initiatives for your region",
      "Mentor Level 0/1 cities in phygital onboarding",
      "Pursue LLM Interface for non-technical staff DT queries",
      "Implement climate scenario modelling (IPCC RCP pathways)",
    ];
  }

  return { level, score, maxScore, percentage, description, recommendations };
}
