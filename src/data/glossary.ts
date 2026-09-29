export interface GlossaryTerm {
  term: string;
//  hindi: string;
  definition: string;
  category: string;
}

export const glossary: GlossaryTerm[] = [
  { term: "Digital Twin (DT)", definition: "A dynamic, virtual representation of a physical asset, process, or system that is continuously synchronised with its real-world counterpart through real-time data flows.", category: "Core Concept" },
  { term: "Local Digital Twin (LDT)",  definition: "A digital twin of a city's physical assets, infrastructure, and environment used for simulation, prediction, and evidence-based policymaking at the municipal level.", category: "Core Concept" },
  { term: "ICCC",  definition: "Integrated Command and Control Centre — a centralised facility in Smart Cities that aggregates data from IoT sensors, CCTV, and city systems for real-time monitoring and response.", category: "Infrastructure" },
  { term: "IUDX",  definition: "India Urban Data Exchange — an open-source platform built by IISc Bangalore for secure, authenticated data exchange among urban stakeholders.", category: "Infrastructure" },
  { term: "NUDM",  definition: "National Urban Digital Mission — MoHUA's initiative to build shared digital infrastructure for urban ecosystems with open standards.", category: "Policy" },
  { term: "Interoperability", definition: "The ability of different systems, tools, and data models to work together seamlessly using common standards and APIs.", category: "Core Concept" },
  { term: "TEVV",  definition: "Testing, Evaluation, Verification, Validation — a framework for ensuring digital twin accuracy, reliability, and ethical implementation.", category: "Standards" },
  { term: "VVUQ",  definition: "Verification, Validation, and Uncertainty Quantification — NIST framework for assessing model accuracy and confidence.", category: "Standards" },
  { term: "DPDP Act",  definition: "Digital Personal Data Protection Act, 2023 — India's data privacy law governing collection, processing, and storage of personal data.", category: "Policy" },
  { term: "India Stack", definition: "India's digital public infrastructure comprising Aadhaar (identity), UPI (payments), DigiLocker (documents), and e-KYC.", category: "Infrastructure" },
  { term: "Bhuvan",  definition: "ISRO's national geo-platform providing satellite imagery, thematic layers, 3D terrain, and geospatial services for India.", category: "Infrastructure" },
  { term: "PM GatiShakti",  definition: "National Master Plan for multimodal infrastructure planning using GIS-based integrated approach.", category: "Infrastructure" },
  { term: "SVAMITVA",  definition: "Scheme for drone survey of rural properties to establish clear property ownership and digital property records.", category: "Infrastructure" },
  { term: "ULB",  definition: "Urban Local Body — municipal corporation, council, or nagar panchayat responsible for city governance and service delivery.", category: "Governance" },
  { term: "MoHUA", definition: "Ministry of Housing and Urban Affairs — Government of India ministry responsible for urban development and Smart Cities Mission.", category: "Governance" },
  { term: "MeitY",  definition: "Ministry of Electronics and Information Technology — Government of India ministry for IT policy, NIC, and digital initiatives.", category: "Governance" },
  { term: "Federated Learning", definition: "A machine learning approach where models are trained across multiple cities without sharing raw data, preserving privacy.", category: "Technology" },
  { term: "CityGML",  definition: "Open Geospatial Consortium standard for representing 3D city models including buildings, vegetation, water bodies, and transportation.", category: "Standards" },
  { term: "SensorThings API",  definition: "OGC standard for managing IoT sensor data — providing a unified way to publish, subscribe to, and query sensor observations.", category: "Standards" },
  { term: "ISO/IEC 30186",  definition: "International standard for digital twin maturity model and assessment framework for cities.", category: "Standards" },
  { term: "Phygital Onboarding",  definition: "A blend of physical and digital approaches for user engagement — combining in-person training with digital tools for low digital literacy users.", category: "Methodology" },
  { term: "Edge Computing",  definition: "Processing data near the source (at city ICCCs) rather than in a centralised cloud, reducing latency for real-time digital twin applications.", category: "Technology" },
  { term: "LLM Interface",  definition: "Natural language interface using Large Language Models that allows non-technical ULB staff to query digital twin analysis in plain language.", category: "Technology" },
  { term: "Algorithm Marketplace",  definition: "A registry of reusable simulation models (flood, traffic, pollution) that cities can discover, download, and deploy with standardised APIs.", category: "Platform" },
  { term: "Digital Public Goods",  definition: "Open-source software that serves a public purpose, freely available for anyone to use, modify, and distribute.", category: "Governance" },
];
