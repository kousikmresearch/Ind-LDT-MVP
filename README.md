# India LDT Simulation Backend

Python FastAPI backend that integrates open-source simulation engines with the India LDT MVP.

- **DVC power grid**: [pandapower](https://pandapower.readthedocs.io/)
- **Kolkata urban flood**: [SWMM](https://www.epa.gov/water-research/storm-water-management-model-swmm) via [pyswmm](https://pyswmm.readthedocs.io/) and [swmmio](https://swmmio.readthedocs.io/)

## Quick start

```bash
# From the repo root
python -m venv services\.venv
services\.venv\Scripts\activate
pip install -r services\requirements.txt

# Run the server
uvicorn services.main:app --reload --port 8000
```

## Endpoints

| Method | Path | Description |
|---|---|---|
| `GET`  | `/health` | Backend status |
| `GET`  | `/dvc/power-flow` | DVC AC power flow |
| `POST` | `/dvc/dispatch` | Economic dispatch with power-flow validation |
| `POST` | `/dvc/contingency/{line_name}` | N-1 contingency on a named line |
| `POST` | `/kolkata/flood` | SWMM-aware flood simulation |
| `GET`  | `/kolkata/flood` | Flood simulation via query params |

## Example calls

```bash
# DVC dispatch
curl -X POST "http://localhost:8000/dvc/dispatch" \
  -H "Content-Type: application/json" \
  -d '{"demand": 3240, "solar_share": 100, "hydro_share": 100}'

# Kolkata flood (set include_inp=true to get a SWMM .inp file)
curl -X POST "http://localhost:8000/kolkata/flood" \
  -H "Content-Type: application/json" \
  -d '{"rainfall": 150, "duration": 3, "include_inp": true}'
```

## Architecture

- `dvc/network.py` builds a simplified pandapower model from the DVC dataset.
- `kolkata/swmm_model.py` generates a SWMM-compatible `.inp` and, when `pyswmm` is installed, executes it; a deterministic fallback is always available so the backend is usable without a SWMM binary.
- `main.py` wires the routers and enables CORS for the Vite dev server.

## Frontend integration

The Vite app expects the backend on `http://localhost:8000`. CORS is already configured for the default Vite ports.

### Using the backend simulation in the UI

1. Open the **Kolkata** or **DVC** demo.
2. Click **Live On** in the header — this toggles the feed config `enabled` state.
3. The `simulation` feed is enabled by default and calls `http://localhost:8000`.
4. When the backend is active, the status pill shows `Live · Backend Simulation`.
5. If the backend is unreachable, the frontend falls back to local simulated data and shows a `Live Error` badge.
6. Click **Simulate** to force local simulation, or use **Feeds** to adjust the `simulation` base URL or disable it.
