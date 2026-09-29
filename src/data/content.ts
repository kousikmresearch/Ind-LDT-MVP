export interface NewsItem {
  date: string;
  title: string;
  category: string;
  description: string;
}

export const newsItems: NewsItem[] = [
  {
    date: "2025-01-15",
    title: "Guwahati Awards ₹13 Cr Digital Twin Project to Genesys",
    category: "City Update",
    description: "Guwahati has awarded Genesys International a ₹13 crore contract to build an urban digital twin map platform, marking another city joining India's digital twin movement.",
  },
  {
    date: "2025-01-08",
    title: "Varanasi Digital Twin Wins SKOCH Gold Award 2025",
    category: "Recognition",
    description: "Varanasi's 3D digital twin under KICCC, built by Genesys International, has been recognised with the SKOCH Gold Award 2025 for smart city innovation.",
  },
  {
    date: "2024-12-20",
    title: "Pune Water Distribution DT Funded by TDB (₹4.07 Cr)",
    category: "Funding",
    description: "Technology Development Board has approved ₹4.07 crore funding for Pune's water distribution digital twin project by Kapih Deep Tech and Reali (Israel).",
  },
  {
    date: "2024-11-10",
    title: "ISO/IEC 30186:2025 — DT Maturity Model Published",
    category: "Standards",
    description: "ISO/IEC has published the digital twin maturity model and assessment framework, providing a standard for cities to assess their DT readiness.",
  },
  {
    date: "2024-10-05",
    title: "India LDT Toolbox Consortium Formation Talks Begin",
    category: "Program",
    description: "Initial discussions underway between MoHUA, IISc, NIC, ISRO, and C-DAC for forming the India LDT Toolbox consortium.",
  },
  {
    date: "2024-09-15",
    title: "Chennai Begins AI-Powered Digital Twin Pilot (5 sqkm)",
    category: "City Update",
    description: "Greater Chennai Corporation has initiated a 5 sqkm AI-powered digital twin pilot, focusing on flood-prone areas and coastal vulnerability.",
  },
];

export interface FAQ {
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    question: "What is a Local Digital Twin (LDT)?",
    answer: "A Local Digital Twin is a dynamic, virtual representation of a city's physical assets, infrastructure, and environment. Unlike a static 3D model, an LDT maintains a bidirectional connection with the real city — receiving real-time data from sensors and sending back insights and control commands for optimisation.",
  },
  {
    question: "How is the India LDT Toolbox different from individual city digital twins?",
    answer: "Individual city digital twins (like Varanasi's) are built in isolation with vendor-specific data models. The India LDT Toolbox provides shared, interoperable tools, common standards (NUDM, IUDX, OGC), reusable algorithm models, and a community platform so cities don't have to build everything from scratch.",
  },
  {
    question: "What existing Indian infrastructure does the toolbox build on?",
    answer: "The toolbox leverages IUDX (data exchange), Bhuvan (geospatial), NIC MeghRaj (cloud), Aadhaar/UPI/DigiLocker (India Stack), Smart Cities Mission ICCCs (IoT/CCTV), PM GatiShakti (infrastructure GIS), and SVAMITVA (property records).",
  },
  {
    question: "Is the toolbox open source?",
    answer: "Yes. All tools and components are shared under the Apache 2.0 licence. The toolbox is designed as a Digital Public Good with community-driven contributions.",
  },
  {
    question: "How does the toolbox handle data privacy?",
    answer: "All components are designed with DPDP Act 2023 compliance — privacy-by-design, consent management, data anonymisation, and secure data exchange through IUDX's authenticated APIs.",
  },
  {
    question: "What is TEVV certification?",
    answer: "Testing, Evaluation, Verification, Validation (TEVV) is a framework adapted from NIST's VVUQ methodology. All algorithm models in the toolbox must pass TEVV certification to ensure accuracy, reliability, and ethical implementation before deployment.",
  },
  {
    question: "How can my city join the pilot programme?",
    answer: "Cities with operational ICCCs, IUDX deployment, and Smart Cities Mission membership are prioritised. Contact the consortium through the Community page or reach out to MoHUA Smart Cities Mission.",
  },
  {
    question: "What is the DT Maturity Assessor?",
    answer: "The DT Maturity Assessor is a tool based on ISO/IEC 30186 that evaluates a city's digital twin readiness across multiple dimensions — data infrastructure, technical capacity, governance, and use cases — and recommends a phased adoption path.",
  },
];
