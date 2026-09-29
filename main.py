from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from .dvc.router import router as dvc_router
from .kolkata.router import router as kolkata_router

app = FastAPI(
    title="India LDT Simulation Backend",
    description="Open-source simulation engine integration for DVC (pandapower) and Kolkata (SWMM).",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(dvc_router, prefix="/dvc", tags=["DVC Power"])
app.include_router(kolkata_router, prefix="/kolkata", tags=["Kolkata Flood"])


@app.get("/", include_in_schema=False)
def root() -> RedirectResponse:
    return RedirectResponse(url="/docs")


@app.get("/health")
def health() -> dict:
    return {"status": "ok", "engines": ["pandapower", "pyswmm"]}
