export type BlockType = "tool" | "algorithm" | "dataset";

export interface CatalogueItem {
  id: string;
  name: string;
  block: BlockType;
  purpose: string;
  builtOn: string;
  phase: 1 | 2 | 3 | 4;
  status: "planned" | "in-development" | "available";
  icon: string;
}

export const tools: CatalogueItem[] = [
  { id: "iam", name: "Identity & Access Management", block: "tool", purpose: "Aadhaar/e-KYC integration, DigiLocker for city staff auth", builtOn: "UIDAI APIs, OAuth 2.0", phase: 2, status: "planned", icon: "ShieldCheck" },
  { id: "data-exchange", name: "City Data Exchange", block: "tool", purpose: "IUDX as the core data exchange layer", builtOn: "IUDX (IISc)", phase: 2, status: "planned", icon: "Database" },
  { id: "visualiser", name: "3D City Visualiser", block: "tool", purpose: "Bhuvan 3D + Genesys-style 3D models + CCTV feeds", builtOn: "Bhuvan APIs, WebGL", phase: 2, status: "planned", icon: "Box" },
  { id: "data-modeller", name: "Data Modeller", block: "tool", purpose: "Schema builder for Indian city data (property, utility, traffic)", builtOn: "NUDM data schemas", phase: 2, status: "planned", icon: "FileCode" },
  { id: "ai-notebook", name: "AI/ML Notebook", block: "tool", purpose: "JupyterHub on MeghRaj cloud with Indian urban datasets", builtOn: "NIC Cloud, Jupyter", phase: 2, status: "planned", icon: "BrainCircuit" },
  { id: "sim-env", name: "Integrated Simulation Environment", block: "tool", purpose: "Docker/K8s-based orchestration for running multi-model simulations", builtOn: "Kubernetes, Helm", phase: 2, status: "planned", icon: "Container" },
  { id: "innovation-planner", name: "City Innovation Planner", block: "tool", purpose: "Scenario planning for Indian schemes (AMRUT, SBM, PMAY)", builtOn: "Custom React app", phase: 2, status: "planned", icon: "Lightbulb" },
  { id: "federated-learning", name: "Federated Learning", block: "tool", purpose: "Cross-city model training without sharing raw data", builtOn: "Flower / PySyft", phase: 3, status: "planned", icon: "Network" },
  { id: "marketplace", name: "Algorithm Marketplace", block: "tool", purpose: "Registry of reusable simulation models (flood, traffic, pollution)", builtOn: "IUDX catalogue", phase: 3, status: "planned", icon: "Store" },
  { id: "citizen-participate", name: "Citizen Participate", block: "tool", purpose: "WhatsApp-based citizen feedback, ULB grievance integration", builtOn: "WhatsApp Business API, MyGov", phase: 3, status: "planned", icon: "MessageCircle" },
  { id: "data-space-connector", name: "Data Space Connector", block: "tool", purpose: "Connect to data.gov.in, state open data portals, IUDX nodes", builtOn: "Open APIs", phase: 3, status: "planned", icon: "Plug" },
  { id: "scenario-manager", name: "Use Case & Scenario Manager", block: "tool", purpose: "Pre-built scenarios: monsoon flooding, Durga Puja crowd, traffic rerouting", builtOn: "Template library", phase: 3, status: "planned", icon: "ClipboardList" },
  { id: "llm-interface", name: "LLM Interface", block: "tool", purpose: "Natural language interface to DT analysis for non-technical ULB staff", builtOn: "Open-weights LLM, pandapower-style solvers", phase: 3, status: "planned", icon: "Sparkles" },
  { id: "tevv", name: "TEVV Certification Framework", block: "tool", purpose: "Verification, validation, uncertainty quantification for all algorithm models", builtOn: "NIST VVUQ framework, ISO 23247-7", phase: 1, status: "planned", icon: "BadgeCheck" },
  { id: "maturity-assessor", name: "DT Maturity Assessor", block: "tool", purpose: "Assess city's DT readiness, recommend phased adoption path", builtOn: "ISO/IEC 30186 maturity model", phase: 2, status: "planned", icon: "Gauge" },
  { id: "climate-engine", name: "Climate Scenario Engine", block: "tool", purpose: "IPCC RCP pathway modelling for Indian cities (2050/2070 horizons)", builtOn: "IPCC CMIP6, Meteonorm, BSEM", phase: 3, status: "planned", icon: "CloudSun" },
  { id: "subsurface-mapper", name: "Subsurface Utility Mapper", block: "tool", purpose: "Underground infrastructure modelling (water, sewerage, gas, metro tunnels)", builtOn: "GPR, Bhuvan, utility GIS", phase: 3, status: "planned", icon: "Layers" },
];

export const algorithms: CatalogueItem[] = [
  { id: "flood-sim", name: "Monsoon Flood Simulation", block: "algorithm", purpose: "Ward-level flood prediction using IMD rainfall + drainage GIS", builtOn: "IMD, SWD networks, Bhuvan DEM", phase: 2, status: "planned", icon: "CloudRain" },
  { id: "traffic-sim", name: "Urban Mobility & Traffic", block: "algorithm", purpose: "Multi-modal traffic simulation with auto-rickshaw, bus, metro, ferry", builtOn: "MoRTH, city traffic police, Google Maps API", phase: 2, status: "planned", icon: "Car" },
  { id: "aqi-prediction", name: "Air Quality Prediction", block: "algorithm", purpose: "AQI forecasting using CPCB sensor data + wind models", builtOn: "CPCB, SAFAR, meteorological data", phase: 2, status: "planned", icon: "Wind" },
  { id: "building-energy", name: "Building Energy Demand", block: "algorithm", purpose: "Indian climate zones (hot-dry, warm-humid, composite) + DISCOM data", builtOn: "State DISCOMs, BEE ECBC", phase: 2, status: "planned", icon: "Zap" },
  { id: "heat-island", name: "Urban Heat Island", block: "algorithm", purpose: "Surface temperature modelling for Indian summer conditions", builtOn: "Landsat/MODIS, Bhuvan", phase: 3, status: "planned", icon: "Thermometer" },
  { id: "disaster-vuln", name: "Disaster Vulnerability", block: "algorithm", purpose: "Earthquake (Zone IV/V), cyclone (East coast), flood (Ganga/Brahmaputra)", builtOn: "NDMA, GSI, Bhuvan", phase: 3, status: "planned", icon: "AlertTriangle" },
  { id: "water-dist", name: "Water Distribution", block: "algorithm", purpose: "NRW (non-revenue water) detection, leak prediction, pressure optimisation", builtOn: "Smart water meters, SCADA", phase: 2, status: "planned", icon: "Droplets" },
  { id: "crowd-density", name: "Crowd Density & Event Planning", block: "algorithm", purpose: "Mela/Puja/festival crowd simulation for safety planning", builtOn: "CCTV analytics, mobile density", phase: 3, status: "planned", icon: "Users" },
  { id: "waste-routing", name: "Waste Management Routing", block: "algorithm", purpose: "Optimised garbage collection routes using GIS + vehicle telemetry", builtOn: "ULB fleet data, GIS", phase: 3, status: "planned", icon: "Trash2" },
  { id: "property-tax", name: "Property Tax Simulation", block: "algorithm", purpose: "Revenue impact modelling of property tax reforms", builtOn: "SVAMITVA records, ULB tax data", phase: 4, status: "planned", icon: "Calculator" },
  { id: "power-grid", name: "Power Grid DT", block: "algorithm", purpose: "Distribution grid state estimation, fault location, PV hosting capacity, smart meter analytics", builtOn: "DISCOM SCADA, smart meters, IEC 61850", phase: 3, status: "planned", icon: "Plug" },
  { id: "port-maritime", name: "Port & Maritime DT", block: "algorithm", purpose: "Port operations, vessel scheduling, hinterland logistics, carbon emission tracking", builtOn: "Port trust data, AIS, Sagarmala", phase: 4, status: "planned", icon: "Ship" },
  { id: "agri-dt", name: "Precision Agriculture DT", block: "algorithm", purpose: "Crop simulation at meter-scale, irrigation scheduling, fertilizer optimisation", builtOn: "WOFOST, soil sensors, satellite NDVI", phase: 4, status: "planned", icon: "Sprout" },
  { id: "ghg-inventory", name: "GHG Emission Inventory", block: "algorithm", purpose: "Spatial subnational greenhouse gas accounting for Indian cities", builtOn: "CPCB, DISCOM fuel data, transport surveys", phase: 3, status: "planned", icon: "Factory" },
  { id: "decarbonisation", name: "Decarbonisation Policy Validator", block: "algorithm", purpose: "Test climate action plan targets before policy implementation", builtOn: "UBEM, transport models, grid models", phase: 3, status: "planned", icon: "Leaf" },
];

export const datasets: CatalogueItem[] = [
  { id: "building-db", name: "India Building Database", block: "dataset", purpose: "Building footprints, heights, usage, property records", builtOn: "SVAMITVA + city property tax records + PMAY data", phase: 2, status: "planned", icon: "Building" },
  { id: "infra-gis", name: "City Infrastructure GIS", block: "dataset", purpose: "Roads, utilities, civic amenities GIS layers", builtOn: "Bhuvan, PM GatiShakti, city ICCC GIS layers", phase: 1, status: "planned", icon: "Map" },
  { id: "demographic", name: "Demographic & Census Layer", block: "dataset", purpose: "Population, households, socio-economic indicators", builtOn: "Census 2011 + projected, e-governance registrations", phase: 2, status: "planned", icon: "Users" },
  { id: "transport-network", name: "Transport Network", block: "dataset", purpose: "Road, rail, metro, bus, ferry networks", builtOn: "OSM India, MoRTH, city transport APIs", phase: 2, status: "planned", icon: "Route" },
  { id: "utility-networks", name: "Utility Networks", block: "dataset", purpose: "Water, sewerage, electricity, gas networks", builtOn: "Water, sewerage, electricity, gas — from DISCOMs and ULBs", phase: 2, status: "planned", icon: "Cable" },
  { id: "env-sensors", name: "Environmental Sensors", block: "dataset", purpose: "Air quality, weather, IoT sensor data streams", builtOn: "CPCB AQI, IMD weather, city IoT sensors via IUDX", phase: 1, status: "planned", icon: "Radio" },
  { id: "satellite", name: "Satellite & Remote Sensing", block: "dataset", purpose: "Satellite imagery, DEM, land use/land cover", builtOn: "Bhuvan (ISRO), Sentinel (Copernicus), Landsat", phase: 1, status: "planned", icon: "Satellite" },
];

export const allItems: CatalogueItem[] = [...tools, ...algorithms, ...datasets];
