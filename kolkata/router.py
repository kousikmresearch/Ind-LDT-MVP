from fastapi import APIRouter, HTTPException
from .swmm_model import simulate_flood
from ..shared.models import KolkataFloodRequest, KolkataFloodResponse

router = APIRouter()


@router.post("/flood")
def flood(req: KolkataFloodRequest) -> KolkataFloodResponse:
    try:
        result = simulate_flood(req.rainfall, req.duration, req.include_inp)
        return KolkataFloodResponse(**result)
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc))
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Kolkata flood simulation failed: {exc}")


@router.get("/flood")
def flood_get(rainfall: float = 150, duration: float = 3, include_inp: bool = False) -> KolkataFloodResponse:
    try:
        result = simulate_flood(rainfall, duration, include_inp)
        return KolkataFloodResponse(**result)
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc))
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Kolkata flood simulation failed: {exc}")
