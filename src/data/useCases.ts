export interface UseCase {
  city: string;
  state: string;
  project: string;
  vendor: string;
  status: string;
  primaryUseCase: string;
  icon: string;
  description: string;
  highlights: string[];
}

export const useCases: UseCase[] = [
  {
    city: "Varanasi",
    state: "Uttar Pradesh",
    project: "3D Digital Twin under KICCC",
    vendor: "Genesys International",
    status: "Operational (SKOCH Gold 2025)",
    primaryUseCase: "Crowd density + heritage conservation",
    icon: "Landmark",
    description: "Varanasi has built India's first operational city-scale digital twin using Genesys International's 3D mapping technology. The Kashi Integrated Command and Control Centre (KICCC) integrates the digital twin with live CCTV feeds, crowd analytics, and heritage building monitoring.",
    highlights: [
      "First operational city-scale digital twin in India",
      "SKOCH Gold Award 2025 for smart city innovation",
      "3D models of ghats, temples, and heritage corridors",
      "Real-time crowd density monitoring for festival management",
      "Integrated with ICCC for live operations",
    ],
  },
  {
    city: "Kolkata",
    state: "West Bengal",
    project: "IUDX Pilot + Flood & Crowd DT (Planned)",
    vendor: "CDAC Kolkata / KMC",
    status: "IUDX deployed, DT planned",
    primaryUseCase: "Monsoon flood + festival crowd simulation",
    icon: "CloudRain",
    description: "Kolkata is an IUDX pilot city with severe monsoon flooding challenges and massive Durga Puja crowd management needs. The city has active IUDX nodes and is a target for flood simulation and crowd density digital twin models.",
    highlights: [
      "IUDX pilot city — data exchange infrastructure ready",
      "Monsoon flood simulation using IMD rainfall + drainage GIS",
      "Durga Puja crowd simulation (10M+ visitors across pandals)",
      "Mixed urban morphology — colonial, modern, informal settlements",
      "KMC smart city projects provide baseline data",
    ],
  },
  {
    city: "Bengaluru",
    state: "Karnataka",
    project: "Urban Mobility DT (Planned)",
    vendor: "IISc / BBMP",
    status: "IUDX HQ, DT planned",
    primaryUseCase: "Urban mobility + traffic simulation",
    icon: "Car",
    description: "Bengaluru hosts IISc Bangalore (IUDX creator) and has India's most severe traffic congestion. The city is ideal for a multi-modal traffic digital twin integrating metro, bus, auto-rickshaw, and private vehicle data.",
    highlights: [
      "Home to IISc Bangalore — IUDX creator and technical lead",
      "Severe traffic congestion — ranked among world's most congested cities",
      "Namma Metro expansion provides multi-modal data",
      "Strong tech ecosystem for citizen engagement and testing",
      "BBMP smart city initiatives provide baseline infrastructure",
    ],
  },
  {
    city: "Pune",
    state: "Maharashtra",
    project: "Water Distribution DT",
    vendor: "Kapih Deep Tech / Reali (Israel)",
    status: "TDB-funded ₹4.07 Cr",
    primaryUseCase: "Water distribution + AQI prediction",
    icon: "Droplets",
    description: "Pune is an IUDX pilot city and smart city leader with an active water distribution digital twin project funded by TDB. The city also has CPCB air quality monitoring stations suitable for AQI prediction models.",
    highlights: [
      "IUDX pilot city — data exchange operational",
      "Water distribution DT funded by TDB (₹4.07 Cr)",
      "Smart city leader with mature digital governance",
      "CPCB air quality stations for AQI prediction",
      "PMC has strong open data initiatives",
    ],
  },
  {
    city: "Chennai",
    state: "Tamil Nadu",
    project: "AI-powered Digital Twin (5 sqkm pilot)",
    vendor: "GCC / TBD",
    status: "In progress",
    primaryUseCase: "Monsoon flood + cyclone vulnerability",
    icon: "Waves",
    description: "Chennai is building an AI-powered digital twin pilot covering 5 sqkm. The city's 2015 flood disaster and coastal location make it critical for flood simulation and cyclone vulnerability modelling.",
    highlights: [
      "Digital twin pilot in progress (5 sqkm area)",
      "2015 flood disaster — critical need for flood simulation",
      "Coastal city — cyclone vulnerability modelling essential",
      "GCC smart city projects provide IoT baseline",
      "Bhuvan coastal GIS layers available",
    ],
  },
  {
    city: "Damodar Valley Corporation",
    state: "Jharkhand & West Bengal",
    project: "Power Transmission & Load Despatch DT",
    vendor: "DVC / POSOCO / Power Grid",
    status: "Proposed pilot",
    primaryUseCase: "Power transmission + load despatch optimisation",
    icon: "Zap",
    description: "The Damodar Valley Corporation operates thermal, hydro, and transmission infrastructure across the Damodar basin. A power transmission and load despatch digital twin will integrate SCADA, EMS, PMU, and weather data to simulate grid behaviour, predict transmission faults, and balance demand-supply across the Eastern Region grid.",
    highlights: [
      "Real-time SCADA and PMU data from DVC substations",
      "Load forecasting using weather and industrial demand models",
      "Transmission line fault prediction from vibration and thermal sensors",
      "Integrated with RLDC / SLDC control rooms for despatch",
      "Supports renewable integration (solar parks, hydro) in the Damodar basin",
    ],
  },
];
