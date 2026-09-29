export interface TutorialSection {
  heading: string;
  text?: string;
  bullets?: string[];
}

export interface Tutorial {
  id: string;
  title: string;
  desc: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  prerequisites: string[];
  sections: TutorialSection[];
}

export const tutorials: Tutorial[] = [
  {
    id: "getting-started",
    title: "Getting Started with India LDT Toolbox",
    desc: "Overview of the toolbox, architecture, and how to begin exploring demos and use cases.",
    duration: "15 min",
    level: "Beginner",
    prerequisites: [
      "A modern web browser",
      "Basic understanding of digital twins and smart cities",
      "Access to the India LDT Toolbox web app",
    ],
    sections: [
      {
        heading: "What is the India LDT Toolbox?",
        text: "The India LDT Toolbox is an open-source, national Digital Public Good for building Local Digital Twins. It provides reusable components — use case templates, an algorithm catalogue, a DT maturity assessor, a knowledge center, and live city demos — so cities can build interoperable twins without starting from scratch.",
      },
      {
        heading: "Architecture at a glance",
        text: "The toolbox is a React + Vite single-page application. Simulation and live-data processing is handled by optional Python backends (e.g., pandapower for power and SWMM for flood). Data exchange follows IUDX, NUDM, OGC, and CIM standards.",
      },
      {
        heading: "Your first walk-through",
        bullets: [
          "Open the app and navigate through the Home page to understand the value proposition.",
          "Visit the Solutions Catalogue to see the algorithm and component marketplace.",
          "Try the DT Maturity Assessor to score your city's readiness.",
          "Open the Use Cases page and select Kolkata Flood or DVC Power to launch a live demo.",
          "Toggle between simulated, live, and backend simulation feeds in the demo feed panel.",
        ],
      },
      {
        heading: "Next steps",
        text: "After the walk-through, continue with 'Connecting Your City's IUDX Node' to bring real data into the toolbox, or 'Deploying Your First Algorithm Model' if you are a model developer.",
      },
    ],
  },
  {
    id: "iudx-node",
    title: "Connecting Your City's IUDX Node",
    desc: "Step-by-step guide to integrate IUDX data exchange with the toolbox.",
    duration: "30 min",
    level: "Intermediate",
    prerequisites: [
      "An active IUDX resource server or demo access",
      "API credentials (client ID and token) for your city",
      "A dataset you want to expose, e.g., rainfall or substation telemetry",
    ],
    sections: [
      {
        heading: "Register a resource on IUDX",
        text: "Log in to your city's IUDX Resource Server. Create a new resource group for the dataset and add at least one resource with a descriptive name, tags, and an access policy (open, secure, or paid). Note the resource ID and the adapter endpoint.",
      },
      {
        heading: "Map data to toolbox schemas",
        text: "The toolbox expects standard fields for each domain. For example, a rainfall resource should expose timestamp, ward id, cumulative rainfall, and location. For power, expose bus name, voltage, load or generation, and line status.",
      },
      {
        heading: "Configure the live feed",
        bullets: [
          "Open the demo page (Kolkata or DVC) and enable the feed configuration panel.",
          "Select the IUDX feed type: rainfall/drainage for Kolkata, SCADA/EMS/PMU for DVC.",
          "Set the base URL to your IUDX server, e.g., https://iudx.example.com.",
          "Set the endpoint path from the resource API documentation.",
          "Enter the API token or key if the resource is secure.",
          "Save the config to localStorage, then enable Live mode.",
        ],
      },
      {
        heading: "Test and troubleshoot",
        text: "If the fetch fails, the app automatically falls back to the configured simulation. Check the browser console for CORS errors, 401/403 token issues, or JSON schema mismatches. Use the feed panel latency and status indicators to debug.",
      },
    ],
  },
  {
    id: "first-algorithm",
    title: "Deploying Your First Algorithm Model",
    desc: "How to package, test, and register a flood or power simulation model using the toolbox.",
    duration: "45 min",
    level: "Intermediate",
    prerequisites: [
      "A working algorithm (Python, JavaScript, or containerised service)",
      "Input and output JSON schemas",
      "Familiarity with the Solutions Catalogue and TEVV checklist",
    ],
    sections: [
      {
        heading: "Package the algorithm",
        text: "A toolbox-ready algorithm is an executable that reads a standard input JSON and writes a standard output JSON. Include a manifest with name, version, author, domain (e.g., flood, power, traffic), dependencies, and an entrypoint command.",
      },
      {
        heading: "Bind the schemas",
        bullets: [
          "Define required inputs: rainfall in mm, duration in hours, ward GeoJSON for a flood model.",
          "Define outputs: ward id, water level, flood depth, alert level.",
          "For power, define inputs as demand, renewable share, and line status; outputs as dispatch, line loading, and frequency.",
          "Upload the schemas along with sample requests and responses.",
        ],
      },
      {
        heading: "Connect to the simulation backend",
        text: "The toolbox now includes a Python FastAPI backend with pandapower and SWMM adapters. Expose your model as an HTTP endpoint under /api/v1/models/<domain>/<name> and register it in the Catalogue. The backend acts as a sandbox, so the model can be tested without touching production data.",
      },
      {
        heading: "Validate and publish",
        text: "Run the built-in smoke tests and complete the TEVV checklist. Once passed, the model is published to the Catalogue with a TEVV badge and can be used in city demos.",
      },
    ],
  },
  {
    id: "tevv",
    title: "TEVV Certification Process",
    desc: "Understanding and completing TEVV certification for algorithm models.",
    duration: "20 min",
    level: "Advanced",
    prerequisites: [
      "An algorithm model registered in the Catalogue",
      "Historical ground-truth data for the target domain",
      "Access to the TEVV checklist in the Catalogue",
    ],
    sections: [
      {
        heading: "What is TEVV?",
        text: "Testing, Evaluation, Verification, and Validation (TEVV) is the quality gate for every algorithm in the toolbox. It is adapted from NIST's VVUQ methodology and ensures models are accurate, reliable, fair, and documented before deployment.",
      },
      {
        heading: "The four phases",
        bullets: [
          "Testing: unit, integration, and property-based tests for normal, edge, and adversarial inputs.",
          "Evaluation: quantitative metrics such as RMSE, MAPE, precision, recall, contingency-table scores, and compute latency.",
          "Verification: confirm that the implementation matches the documented specification and mathematical model.",
          "Validation: compare outputs against real-world ground truth and city stakeholder acceptance criteria.",
        ],
      },
      {
        heading: "Completing certification",
        text: "Upload test reports, evaluation charts, and a validation memo to the Catalogue. A reviewer from the consortium will verify the evidence and either issue a TEVV badge or request remediation. Certified models can be promoted to production and used in ICCC dashboards.",
      },
    ],
  },
  {
    id: "edge-computing",
    title: "Setting Up Edge Computing at Your ICCC",
    desc: "Deploy edge nodes for low-latency digital twin processing.",
    duration: "40 min",
    level: "Advanced",
    prerequisites: [
      "Access to the ICCC or a city operations centre",
      "Edge hardware (industrial PC, NUC, or gateway) with Ubuntu 22.04",
      "VPN or secure backhaul to the central cloud",
    ],
    sections: [
      {
        heading: "Why edge?",
        text: "Edge computing brings inference and control closer to sensors and actuators. It reduces latency for time-critical use cases such as flood pump control, traffic signal optimisation, and distribution grid stabilisation.",
      },
      {
        heading: "Edge node layout",
        bullets: [
          "Install the Edge Runtime container on the ICCC gateway.",
          "Configure local message broker (e.g., Eclipse Mosquitto or RabbitMQ) for sensor telemetry.",
          "Register the node in the toolbox admin panel with a unique edge ID and public key.",
          "Deploy certified models to the node via the Catalogue's edge distribution API.",
          "Set up offline buffering and store-and-forward for network outages.",
        ],
      },
      {
        heading: "Security and DPDP compliance",
        text: "Edge nodes must enforce the same privacy-by-design controls as the cloud: data minimisation, consent logs, encryption at rest and in transit, and automated deletion of raw sensor data after the retention window.",
      },
      {
        heading: "Monitoring",
        text: "Use the Edge Health dashboard to monitor CPU, memory, model latency, and drift. Set alerts for offline nodes and degraded model confidence.",
      },
    ],
  },
  {
    id: "whatsapp-citizen",
    title: "Citizen Engagement via WhatsApp",
    desc: "Configure the Citizen Participate tool for your city.",
    duration: "25 min",
    level: "Beginner",
    prerequisites: [
      "A WhatsApp Business Account (or Meta test account)",
      "A city helpline number approved for messaging",
      "Citizen contact list and consent records",
    ],
    sections: [
      {
        heading: "Connect the WhatsApp Business API",
        text: "Link your verified business number to the toolbox's Citizen Participate module. For the sandbox, use the Meta developer test number. For production, obtain a BSP-approved business number and configure message templates.",
      },
      {
        heading: "Configure alerts and two-way feedback",
        bullets: [
          "Map alert levels from demos to WhatsApp message templates (e.g., 'Flood watch in Ward 5').",
          "Enable citizen reporting by setting a dedicated keyword, e.g., FLOOD <ward> <photo>.",
          "Route citizen reports to the ICCC dashboard as IUDX-compliant event records.",
          "Send proactive advisories using the simulation backend's predicted risk windows.",
          "Track delivery, read receipts, and response rates in the engagement report.",
        ],
      },
      {
        heading: "Privacy and consent",
        text: "Before sending any message, ensure citizens have opted in and that the DPDP Act 2023 consent metadata is stored. Provide an easy OPT-OUT keyword. Anonymise any user-submitted photos or location pins before analysis.",
      },
    ],
  },
];

export const tutorialById = (id: string): Tutorial | undefined =>
  tutorials.find((t) => t.id === id);
