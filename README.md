# India Local Digital Twin (LDT) Toolbox — MVP

A national, open-source toolbox for building **Local Digital Twins** of Indian
cities. The MVP ships two working demonstrations — **Kolkata urban flood** and
**DVC power transmission** — plus a digital-twin maturity assessor, a solutions
catalogue, and a knowledge centre, all wrapped in a local-first React SPA with
an optional FastAPI simulation backend.

## What's inside

| Layer | Stack | Location |
|---|---|---|
| Frontend SPA | React 18 + TypeScript + Vite + Tailwind | `src/` |
| Simulation backend | FastAPI + PySWMM + pandapower | `services/` |
| Research experiments | scikit-learn + matplotlib + PySWMM | `scripts/` |
| Manuscript & figures | Markdown + DOCX + PNG | `docs/papers/` |

### Frontend pages

- **Home** — overview and entry points
- **Solutions Catalogue** — browse tools, algorithms, datasets
- **DT Maturity Assessor** — interactive readiness assessment
- **Use Cases** — sector-specific scenarios
- **Knowledge Centre** — documents, tutorials, standards
- **Glossary** — digital-twin terminology
- **Kolkata Demo** — flood / crowd / IUDX / alerts / simulation / 3D ward view
- **DVC Demo** — power-flow, economic dispatch, N-1 contingency

### Backend endpoints

| Method | Path | Description |
|---|---|---|
| `GET`  | `/health` | Backend status |
| `GET`  | `/dvc/power-flow` | DVC AC power flow |
| `POST` | `/dvc/dispatch` | Economic dispatch with power-flow validation |
| `POST` | `/dvc/contingency/{line_name}` | N-1 contingency on a named line |
| `POST` | `/kolkata/flood` | SWMM-aware flood simulation |
| `GET`  | `/kolkata/flood` | Flood simulation via query params |

The backend always returns a deterministic heuristic result and, when
`pyswmm`+`swmmio` are installed, additionally executes a real SWMM run.

## Quick start

### 1. Frontend

```bash
npm install
npm run dev          # http://localhost:5173
# or production build
npm run build && npm run preview
```

### 2. Backend (optional, enables live simulation)

```bash
# Windows
run-backend.bat
# Linux/macOS
./run-backend.sh
```

This creates `services/.venv`, installs `services/requirements.txt`, and starts
uvicorn on `http://0.0.0.0:8000`. The frontend auto-detects the backend and
falls back to local simulated data when it is unreachable.

### 3. Research experiments

```bash
services\.venv\Scripts\python.exe scripts\train_surrogate.py      # surrogate + LOSO
services\.venv\Scripts\python.exe scripts\extended_experiments.py  # CQR + BO + RL
services\.venv\Scripts\python.exe scripts\real_network_study.py    # 141-ward study
services\.venv\Scripts\python.exe scripts\make_figures.py          # paper figures
```

Outputs are written to `scripts/*.json` and `docs/papers/figures/*.png`.

## Research output

The repository produces the manuscript
**"A hybrid physics–ML surrogate for real-time urban pluvial flood nowcasting
in data-scarce Indian cities"** (`docs/papers/hybrid_surrogate_flood_nowcasting.md`),
with a companion glossary (`docs/papers/paper_glossary.md`) and six figures.
Key results:

- Direct GBDT surrogate: MAE 0.020 m, R² 0.985 (10-ward synthetic network)
- Real 141-ward network: MAE 0.133 m, R² 0.954
- Conformal calibration lifts interval coverage from ~57% to ~85% (nominal 80%)
- Q-learning pump control cuts cumulative flooding ~90% vs always-off

See `docs/papers/paper_glossary.md` for term definitions.

## Project layout

```
india-ldt-mvp/
├── src/                  # React frontend
│   ├── pages/            # one file per route
│   ├── components/       # 3D views, feed panels
│   ├── data/             # static demo data
│   ├── api/              # live-feed clients
│   └── hooks/            # live-data hooks
├── services/             # FastAPI backend
│   ├── kolkata/          # SWMM flood model + router
│   ├── dvc/              # pandapower network + router
│   └── shared/           # pydantic models
├── scripts/              # research experiments & figures
├── docs/                 # SRS, proposal, paper, figures
├── public/               # static assets (geojson, plot html)
├── run-backend.bat/.sh   # backend launcher
└── package.json
```

## Notes

- The SWMM drainage model is a **reduced-order, ward-aggregated** network, not a
  fully calibrated municipal drainage model. Validation against the 2 Sep 2023
  Kolkata event is preliminary and documented in the paper.
- The frontend works fully without the backend (simulation fallback).
- Licensed under Apache 2.0.
