from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from app.db import fetch_weather_data, fetch_ground_data, init_db

app = FastAPI(title="AQI MVP Backend")

# Allow frontend (Vite/React) to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup():
    init_db()

@app.get("/weather/")
def get_weather_data(limit: int = 50):
    """Fetch recent weather data"""
    return fetch_weather_data(limit=limit)

@app.get("/ground/")
def get_ground_data(
    limit: int = 50,
    minlat: Optional[float] = Query(None),
    maxlat: Optional[float] = Query(None),
    minlon: Optional[float] = Query(None),
    maxlon: Optional[float] = Query(None),
):
    """
    Fetch recent AQI ground sensor data.
    If bounding box params are provided, filter by lat/lon.
    """
    bbox = None
    if all(v is not None for v in [minlat, maxlat, minlon, maxlon]):
        bbox = (minlat, maxlat, minlon, maxlon)

    return fetch_ground_data(limit=limit, bbox=bbox)

@app.get("/")
def root():
    return {"msg": "FastAPI backend for AQI MVP is running!"}
