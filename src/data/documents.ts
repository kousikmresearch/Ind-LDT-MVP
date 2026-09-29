export interface DocumentSection {
  heading: string;
  text?: string;
  bullets?: string[];
}

export interface Document {
  id: string;
  title: string;
  desc: string;
  sections: DocumentSection[];
}

export const documents: Document[] = [
  {
    id: "api-docs",
    title: "API Documentation",
    desc: "REST API reference for the India LDT Toolbox backend, live feeds, and simulation endpoints.",
    sections: [
      {
        heading: "Base URLs",
        text: "The frontend runs on the Vite dev server (default http://localhost:5173). The Python simulation backend runs on http://localhost:8000. All backend routes are prefixed with the domain they serve.",
      },
      {
        heading: "Simulation endpoints",
        bullets: [
          "GET /health — backend and engine status.",
          "GET /dvc/power-flow — AC power flow for the DVC network.",
          "POST /dvc/dispatch — economic dispatch and power-flow validation.",
          "POST /dvc/contingency/{line_name} — N-1 line contingency analysis.",
          "POST /kolkata/flood — flood simulation with optional SWMM .inp output.",
          "GET /kolkata/flood — flood simulation via query parameters.",
        ],
      },
      {
        heading: "Live feed API contract",
        text: "Live feeds are configured in the feed panels and follow the DvcFeed and KolkataFeed types. Requests include the configured base URL, endpoint, method, and optional bearer token. Responses must match the DvcLiveSnapshot or KolkataLiveSnapshot structures.",
      },
      {
        heading: "CORS and authentication",
        text: "The FastAPI backend allows Vite dev and preview origins. Real feeds should use IUDX-style OAuth2 tokens or API keys, passed as bearer tokens in the feed configuration.",
      },
    ],
  },
  {
    id: "nudm-schemas",
    title: "NUDM Data Schemas",
    desc: "National Urban Digital Mission data schema specifications used by the toolbox.",
    sections: [
      {
        heading: "What is NUDM?",
        text: "The National Urban Digital Mission provides a common data standard so city departments, state agencies, and private vendors can share and reuse urban datasets without building ad-hoc integrations for every project.",
      },
      {
        heading: "Core entities",
        bullets: [
          "City — name, ULB code, boundary, contact, maturity score.",
          "Asset — roads, drains, substations, transformers, buildings with geometry and attributes.",
          "Sensor — rainfall, water level, voltage, frequency, CCTV, with location and calibration metadata.",
          "Event — alerts, complaints, advisories, with timestamp, location, severity, and source.",
          "Service — permits, billing, maintenance work orders.",
        ],
      },
      {
        heading: "Tooling conventions",
        text: "All schema fields use snake_case in the API and camelCase in the React frontend. Geometry is exchanged as GeoJSON. Timestamps are ISO 8601 with the Asia/Kolkata time zone for city-facing displays.",
      },
    ],
  },
  {
    id: "iudx-guide",
    title: "IUDX Integration Guide",
    desc: "How to connect IUDX resource servers and exchange data securely with the toolbox.",
    sections: [
      {
        heading: "IUDX resource lifecycle",
        text: "A resource on IUDX is published as a Resource Group containing one or more Resources. Each resource has a unique ID, access policy, data descriptor, and adapter that normalises provider data to the IUDX schema.",
      },
      {
        heading: "Authentication",
        bullets: [
          "Obtain a client ID and certificate from the IUDX Auth server for your city.",
          "Request a token scoped to the resource IDs your demo will consume.",
          "Configure the token in the feed panel as an API key or bearer header.",
          "Refresh tokens before expiry; the toolbox will display a degraded status on 401 responses.",
        ],
      },
      {
        heading: "Mapping IUDX to toolbox fields",
        text: "Use the resource data descriptor to map IUDX attributes to the toolbox's expected keys. For example, 'Ward' resources must expose a ward id, timestamp, rainfall, water level, and location. 'Substation' resources must expose bus name, voltage, active power, and temperature.",
      },
      {
        heading: "Troubleshooting",
        text: "If the live feed does not return data, check CORS headers, token scope, rate limits, and whether the resource supports the requested temporal query. Use the backend /health endpoint to confirm that the simulation service itself is reachable.",
      },
    ],
  },
  {
    id: "iso-maturity",
    title: "ISO/IEC 30186 Maturity Model",
    desc: "Digital twin maturity model and assessment framework.",
    sections: [
      {
        heading: "Overview",
        text: "ISO/IEC 30186 provides a structured way to assess and improve digital twin capability. The toolbox's DT Maturity Assessor implements this model across six dimensions and five maturity levels.",
      },
      {
        heading: "Dimensions",
        bullets: [
          "Data — availability, quality, governance, and standardisation.",
          "Technology — compute, storage, network, IoT, and edge.",
          "Processes — workflows for operations, maintenance, and simulation.",
          "People — skills, training, and stakeholder engagement.",
          "Governance — policies, compliance, privacy, and funding.",
          "Use cases — breadth, depth, and demonstrated value.",
        ],
      },
      {
        heading: "Maturity levels",
        text: "Level 1 is ad-hoc, Level 2 managed, Level 3 defined, Level 4 measured, and Level 5 optimising. The assessor scores each dimension, highlights gaps, and recommends the next initiatives a city should adopt.",
      },
    ],
  },
  {
    id: "dpdp-compliance",
    title: "DPDP Act Compliance Guide",
    desc: "Data privacy compliance for urban digital twins.",
    sections: [
      {
        heading: "Applicability",
        text: "The Digital Personal Data Protection Act 2023 applies whenever the toolbox processes personal data — citizen complaints, WhatsApp messages, CCTV analytics, mobility traces, or property records.",
      },
      {
        heading: "Key obligations",
        bullets: [
          "Obtain explicit, informed, and revocable consent for data collection.",
          "Provide clear notice of purpose, retention, and rights before processing.",
          "Anonymise or pseudonymise data before using it in analytics and simulations.",
          "Implement data minimisation and purpose limitation.",
          "Honor access, correction, erasure, and grievance redressal rights.",
        ],
      },
      {
        heading: "Toolbox controls",
        text: "The toolbox supports DPDP through consent logging, role-based access, audit trails, configurable data retention, and the ability to mask or redact personal identifiers in demo datasets.",
      },
    ],
  },
  {
    id: "tevv-handbook",
    title: "TEVV Certification Handbook",
    desc: "Testing, Evaluation, Verification, Validation framework for algorithm models.",
    sections: [
      {
        heading: "Certification scope",
        text: "All algorithm models published in the Solutions Catalogue must pass TEVV. Certification covers correctness, reliability, fairness, safety, computational performance, and reproducibility of results.",
      },
      {
        heading: "Required evidence",
        bullets: [
          "Test plan — unit, integration, property-based, and adversarial cases.",
          "Evaluation report — metrics, confidence intervals, and error analysis.",
          "Verification memo — traceability from requirements to implementation.",
          "Validation report — comparison with ground truth and stakeholder sign-off.",
          "Reproducibility package — code, data, configuration, and run instructions.",
        ],
      },
      {
        heading: "Lifecycle",
        text: "A model is submitted, reviewed, tested in the sandbox, and either returned for remediation or awarded a TEVV badge. Certified models can be promoted to ICCC production and must be re-certified after major updates.",
      },
    ],
  },
];

export const documentById = (id: string): Document | undefined =>
  documents.find((d) => d.id === id);
