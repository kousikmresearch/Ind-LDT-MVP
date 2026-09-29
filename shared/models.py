from typing import List, Optional
from pydantic import BaseModel, Field


class DvcDispatchRequest(BaseModel):
    demand: float = 3240
    solar_share: float = Field(100, ge=0, le=100)
    hydro_share: float = Field(100, ge=0, le=100)


class GeneratorOutput(BaseModel):
    name: str
    p_mw: float
    q_mvar: float
    status: str


class DvcDispatchResponse(BaseModel):
    converged: bool = True
    total_supply: float
    deficit: float
    frequency_estimate: float
    thermal_dispatch: float
    hydro_dispatch: float
    solar_dispatch: float
    must_run: List[str]
    recommendation: str
    generator_outputs: List[GeneratorOutput]
    line_loadings: List[dict]
    bus_voltages: List[dict]


class DvcPowerFlowResponse(BaseModel):
    converged: bool
    buses: List[dict]
    lines: List[dict]
    n_minus_1_result: Optional[str] = None


class KolkataFloodRequest(BaseModel):
    rainfall: float = Field(150, gt=0)
    duration: float = Field(3, gt=0)
    include_inp: bool = False


class WardResult(BaseModel):
    id: str
    name: str
    population: int
    area: float
    flood_risk: str
    water_level: float
    flood_depth: float
    rainfall: float
    drainage_status: str
    alert_level: str


class KolkataFloodResponse(BaseModel):
    scenario: str
    rainfall: float
    duration: float
    affected_wards: int
    affected_population: int
    estimated_damage: str
    response_time: str
    recommendation: str
    wards: List[WardResult]
    swmm_inp: Optional[str] = None
    swmm_note: str = "SWMM .inp is generated but not executed in this build. Install pyswmm+swmmio to run it."
