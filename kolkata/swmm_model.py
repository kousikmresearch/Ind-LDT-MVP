from datetime import datetime
from typing import List, Dict, Any, Optional, Tuple

# Ward data mirrored from src/data/kolkataDemo.ts
_WARDS = [
    {"id": "W-01", "name": "Ward 1 — Jorabagan", "population": 28450, "area": 1.2, "floodRisk": "moderate", "drainageStatus": "partial"},
    {"id": "W-05", "name": "Ward 5 — Bowbazar", "population": 32100, "area": 0.9, "floodRisk": "high", "drainageStatus": "overflow"},
    {"id": "W-12", "name": "Ward 12 — Park Street", "population": 19800, "area": 1.5, "floodRisk": "low", "drainageStatus": "clear"},
    {"id": "W-23", "name": "Ward 23 — Ballygunge", "population": 35600, "area": 2.1, "floodRisk": "moderate", "drainageStatus": "partial"},
    {"id": "W-34", "name": "Ward 34 — Behala East", "population": 52300, "area": 3.8, "floodRisk": "severe", "drainageStatus": "overflow"},
    {"id": "W-45", "name": "Ward 45 — Garden Reach", "population": 41700, "area": 2.5, "floodRisk": "severe", "drainageStatus": "overflow"},
    {"id": "W-56", "name": "Ward 56 — Jadavpur", "population": 38900, "area": 2.8, "floodRisk": "high", "drainageStatus": "partial"},
    {"id": "W-67", "name": "Ward 67 — Salt Lake", "population": 24500, "area": 3.2, "floodRisk": "low", "drainageStatus": "clear"},
    {"id": "W-78", "name": "Ward 78 — Tollygunge", "population": 33200, "area": 2.0, "floodRisk": "moderate", "drainageStatus": "partial"},
    {"id": "W-89", "name": "Ward 89 — Kasba", "population": 29800, "area": 1.8, "floodRisk": "high", "drainageStatus": "overflow"},
]

_RISK_SCORE = {"low": 0, "moderate": 0.4, "high": 0.8, "severe": 1.2}
_DRAIN_DIVISOR = {"clear": 140, "partial": 90, "overflow": 60}


def _drainage_status(depth: float, capacity: float) -> str:
    ratio = depth / capacity if capacity > 0 else 0
    if ratio < 0.33:
        return "clear"
    if ratio < 0.66:
        return "partial"
    return "overflow"


def _alert_level(water_level: float, depth: float) -> str:
    if depth >= 0.9 or water_level >= 3.5:
        return "critical"
    if depth >= 0.6 or water_level >= 2.7:
        return "warning"
    if depth >= 0.3 or water_level >= 1.8:
        return "watch"
    return "safe"


def _heuristic_flood(rainfall: float, duration: float) -> Tuple[List[Dict[str, Any]], int, int, str, str]:
    ward_results = []
    for w in _WARDS:
        base = _RISK_SCORE[w["floodRisk"]] + (rainfall / _DRAIN_DIVISOR[w["drainageStatus"]]) + (duration * 0.08)
        # Water level estimate: base + ward area attenuation
        water_level = max(0.5, base * (1.0 + w["area"] / 5.0) * 0.6)
        flood_depth = max(0.0, (water_level - 1.5) * 0.5)
        drainage = _drainage_status(flood_depth, 1.0)
        alert = _alert_level(water_level, flood_depth)
        ward_results.append(
            {
                "id": w["id"],
                "name": w["name"],
                "population": w["population"],
                "area": w["area"],
                "flood_risk": w["floodRisk"],
                "water_level": round(water_level, 2),
                "flood_depth": round(flood_depth, 2),
                "rainfall": rainfall,
                "drainage_status": drainage,
                "alert_level": alert,
            }
        )

    # Sort by risk and determine affected count
    sorted_results = sorted(ward_results, key=lambda x: x["water_level"], reverse=True)
    intensity_factor = rainfall / duration
    if intensity_factor > 80:
        affected_count = min(10, int(intensity_factor / 12))
    elif intensity_factor > 50:
        affected_count = min(10, int(intensity_factor / 15))
    else:
        affected_count = min(10, int(intensity_factor / 22))
    affected_count = max(1, affected_count)

    affected = sorted_results[:affected_count]
    affected_population = sum(w["population"] for w in affected)
    affected_ids = {w["id"] for w in affected}

    for wr in ward_results:
        wr["in_affected_list"] = wr["id"] in affected_ids

    base_damage = affected_count * 0.5
    rain_damage = (rainfall - 50) * 0.12 if rainfall > 50 else 0
    pop_factor = (affected_population / 100000) * 0.8
    total = base_damage + rain_damage + pop_factor
    damage = f"₹{(total * 0.8):.1f}–{(total * 1.2):.1f} Cr"

    if intensity_factor > 60:
        response_time = "20 min (emergency protocol)"
    elif intensity_factor > 35:
        response_time = "45 min (drainage response)"
    else:
        response_time = "90 min (standard response)"

    labels = [(130, "Extreme"), (100, "Severe"), (70, "High"), (40, "Moderate"), (0, "Low")]
    scenario_label = next(l for t, l in labels if rainfall >= t)
    scenario = f"{rainfall}mm rainfall in {duration} hours ({scenario_label})"

    ward_names = [w["name"].replace("Ward ", "").split(" — ")[-1] for w in affected]
    recommendation = f"Pre-deploy pumps in {', '.join(ward_names[:3])}. Activate emergency protocol for {affected_count} ward(s)."

    return ward_results, affected_count, affected_population, damage, scenario, response_time, recommendation


def _build_swmm_inp(
    rainfall: float,
    duration: float,
    imperv_scale: float = 1.0,
    infil_scale: float = 1.0,
    roughness: float = 0.015,
    pump_junction: Optional[int] = None,
) -> str:
    """Generate a minimal SWMM 5 .inp file for a single synthetic event.

    Optional parameters support parameter calibration (imperv_scale,
    infil_scale, roughness) and control experiments (pump_junction —
    1-based index of a ward junction to equip with a controllable pump
    discharging to the outfall).
    """
    start = "08/01/2025"
    end_hour = int(duration) + 1
    end_time = f"{end_hour:02d}:00:00"
    report_end = f"{end_hour + 1:02d}:00:00"
    rain_rate = rainfall / duration if duration > 0 else 0.0

    sections = [
        "[TITLE]",
        ";; Kolkata Ward Runoff — generated by India LDT Simulation Backend",
        "",
        "[OPTIONS]",
        "FLOW_UNITS CMS",
        "INFILTRATION HORTON",
        "FLOW_ROUTING KINWAVE",
        "LINK_OFFSETS DEPTH",
        "MIN_SURFAREA 0.0",
        "ALLOW_PONDING NO",
        f"START_DATE {start}",
        "START_TIME 00:00:00",
        f"END_DATE {start}",
        f"END_TIME {end_time}",
        f"REPORT_START_DATE {start}",
        "REPORT_START_TIME 00:00:00",
        "SWEEP_START 01/01",
        "SWEEP_END 12/31",
        "DRY_DAYS 5",
        "REPORT_STEP 00:15:00",
        "WET_STEP 00:15:00",
        "DRY_STEP 01:00:00",
        "ROUTING_STEP 0:01:00",
        "",
        "[EVAPORATION]",
        "CONSTANT 0.0",
        "DRY_ONLY NO",
        "",
        "[RAINGAGES]",
        ";; Name Type Intvl SnowCatch DataSource",
        "RG-01 INTENSITY 0:15 1.0 TIMESERIES TS-01",
        "",
        "[TIMESERIES]",
        ";; Name Date Time Value",
        f"TS-01 {start} 00:00 {rain_rate:.4f}",
        f"TS-01 {start} {end_time} {rain_rate:.4f}",
        "",
        "[SUBCATCHMENTS]",
        ";; Name Raingage Outlet Area(ha) %Imperv Width(m) %Slope CurbLen",
    ]

    for i, w in enumerate(_WARDS, 1):
        imp = (60.0 if w["floodRisk"] in ["high", "severe"] else 40.0) * imperv_scale
        imp = min(100.0, max(0.0, imp))
        # SWMM subcatchment width ~ overland flow path; use ~35% of sqrt(area in m^2)
        width = 350.0 * (w["area"] ** 0.5)
        sections.append(
            f"{w['id']} RG-01 J-{i:03d} {w['area'] * 100.0:.2f} {imp:.0f} {width:.0f} 0.5 0"
        )

    sections.extend(["", "[SUBAREAS]", ";; Name NImperv NPerv SImperv SPerv PctZero RouteTo"])
    for w in _WARDS:
        sections.append(f"{w['id']} 0.02 0.25 2.5 10.0 25 OUTLET")

    sections.extend(["", "[INFILTRATION]", ";; Name MaxRate MinRate Decay DryTime MaxInfilVol"])
    for w in _WARDS:
        sections.append(f"{w['id']} {40.0 * infil_scale:.2f} {1.0 * infil_scale:.2f} 5.0 7.0 0")

    sections.extend(["", "[JUNCTIONS]", ";; Name Invert MaxDepth"])
    for i in range(1, len(_WARDS) + 1):
        sections.append(f"J-{i:03d} 0 3.0")

    sections.extend(["", "[OUTFALLS]", ";; Name Invert Type StageData Gated"])
    sections.append("O-01 -1.0 FREE NO")

    sections.extend(["", "[CONDUITS]", ";; Name From To Length Roughness InOffset OutOffset"])
    for i in range(1, len(_WARDS) + 1):
        if pump_junction == i:
            continue  # ward drains via controllable pump instead of gravity conduit
        sections.append(f"C-{i:03d} J-{i:03d} O-01 1000 {roughness:.4f} 0 0")

    sections.extend(["", "[XSECTIONS]", ";; Link Shape Geom1 Geom2 Geom3 Geom4"])
    for i in range(1, len(_WARDS) + 1):
        if pump_junction == i:
            continue
        sections.append(f"C-{i:03d} CIRCULAR 1.5 0 0 0")

    if pump_junction is not None:
        sections.extend([
            "", "[PUMPS]",
            ";; Name FromNode ToNode Pcurve Status Startup Shutoff",
            f"P-001 J-{pump_junction:03d} O-01 PC1 ON 0 0.0",
            "", "[CURVES]",
            ";; Name Type X-Value Y-Value",
            "PC1 PUMP3 0.0 1.0",
            "PC1       1.0 0.7",
            "PC1       2.5 0.0",
        ])

    sections.extend(["", "[REPORT]", "INPUT NO", "CONTROLS NO", "SUBCATCHMENTS ALL", "NODES ALL", "LINKS ALL", ""])
    return "\n".join(sections)


def simulate_flood(rainfall: float, duration: float, include_inp: bool = False) -> Dict[str, Any]:
    """
    Run a SWMM-aware flood simulation.
    If pyswmm + swmmio are installed, the generated .inp is run; otherwise the heuristic is used.
    """
    if rainfall <= 0 or duration <= 0:
        raise ValueError("rainfall and duration must be positive")

    (
        ward_results,
        affected_count,
        affected_population,
        damage,
        scenario,
        response_time,
        recommendation,
    ) = _heuristic_flood(rainfall, duration)

    result = {
        "scenario": scenario,
        "rainfall": rainfall,
        "duration": duration,
        "affected_wards": affected_count,
        "affected_population": affected_population,
        "estimated_damage": damage,
        "response_time": response_time,
        "recommendation": recommendation,
        "wards": ward_results,
    }

    if include_inp:
        result["swmm_inp"] = _build_swmm_inp(rainfall, duration)

    # Attempt SWMM execution only if pyswmm is available (not required for MVP)
    try:
        from pyswmm import Simulation
        import tempfile, os
        with tempfile.NamedTemporaryFile("w", suffix=".inp", delete=False, encoding="utf-8") as f:
            f.write(_build_swmm_inp(rainfall, duration))
            inp_path = f.name
        try:
            with Simulation(inp_path) as sim:
                for _ in sim:
                    pass
            result["swmm_note"] = "SWMM simulation executed successfully (heuristic still returned for compatibility)."
        finally:
            for ext in (".inp", ".rpt", ".out"):
                if os.path.exists(inp_path.replace(".inp", ext)):
                    os.remove(inp_path.replace(".inp", ext))
    except ImportError:
        pass  # Heuristic already populated the result

    return result
