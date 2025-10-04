# ========== IMPORTS ==========
import os
import requests
import sqlite3
import datetime
import zoneinfo
from typing import Tuple
from meteostat import Point, Daily
import pandas as pd

# ========== CONFIG ==========
# Prefer env vars; fall back to inline strings if provided.
EPA_EMAIL = os.getenv("EPA_EMAIL", "iamvaibhav192@gmail.com")
EPA_KEY = os.getenv("EPA_KEY", "tealwolf49")  # <-- consider moving to env var
TOMORROW_API_KEY = os.getenv("TOMORROW_API_KEY", "T0i9Wcg7rnHmtwg1GuUgT7QqEBfu3wTU")  # <-- env var recommended

DB_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "phase1_data.db"))

# NYC bounding box (south/north, west/east)
MIN_LAT, MAX_LAT = 40.4774, 40.9176
MIN_LON, MAX_LON = -74.2591, -73.7004

# Center point of NYC bbox (used for weather snapshot)
CENTER_LAT = (MIN_LAT + MAX_LAT) / 2.0  # 40.6975
CENTER_LON = (MIN_LON + MAX_LON) / 2.0  # -73.97975

# Pollutant param codes (EPA AQS)
POLLUTANTS = {
    "pm25": 88101,   # PM2.5
    "no2":  42602,   # NO2
    "so2":  42401,   # SO2
    "o3":   44201,   # Ozone
    "co":   42101    # CO
}

# Date range for EPA data (YYYYMMDD)
BDATE = "20230401"
EDATE = "20230630"

NY_TZ = zoneinfo.ZoneInfo("America/New_York")


# ========== DB HELPERS ==========
def get_conn(db_path: str = DB_PATH) -> Tuple[sqlite3.Connection, sqlite3.Cursor]:
    conn = sqlite3.connect(db_path)
    cur = conn.cursor()
    return conn, cur


def ensure_tables(cur: sqlite3.Cursor) -> None:
    cur.execute("""
    CREATE TABLE IF NOT EXISTS ground_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp TEXT,
        latitude REAL,
        longitude REAL,
        pm25 REAL,
        no2 REAL,
        so2 REAL,
        o3 REAL,
        co REAL
    )
    """)
    cur.execute("""
    CREATE TABLE IF NOT EXISTS weather_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp TEXT,
        temperature REAL,
        humidity REAL,
        wind_speed REAL
    )
    """)


def inspect_db(db_path: str = DB_PATH) -> None:
    conn = sqlite3.connect(db_path)
    cur = conn.cursor()
    for table in ["ground_data", "weather_data"]:
        print(f"--- {table} ---")
        for row in cur.execute(f"SELECT * FROM {table} LIMIT 10"):
            print(row)
    conn.close()


# ========== EPA AQS FETCH ==========
def fetch_epa(param_code: int, minlat: float, maxlat: float, minlon: float, maxlon: float,
              bdate: str, edate: str, email: str, key: str) -> dict:
    url = (
        "https://aqs.epa.gov/data/api/sampleData/byBox"
        f"?param={param_code}"
        f"&bdate={bdate}&edate={edate}"
        f"&minlat={minlat}&maxlat={maxlat}&minlon={minlon}&maxlon={maxlon}"
        f"&email={email}&key={key}"
    )
    r = requests.get(url, timeout=180)
    r.raise_for_status()
    return r.json()


def ingest_ground_data(cur: sqlite3.Cursor) -> None:
    # Fetch all pollutants
    data_map = {}
    for pol_name, pol_code in POLLUTANTS.items():
        print(f"[EPA] Fetching {pol_name.upper()} ...")
        json_data = fetch_epa(pol_code, MIN_LAT, MAX_LAT, MIN_LON, MAX_LON, BDATE, EDATE, EPA_EMAIL, EPA_KEY)
        data_map[pol_name] = {}
        for row in json_data.get("Data", []) or []:
            key = (row.get("latitude"), row.get("longitude"), f"{row.get('date_local')} {row.get('time_local')}")
            data_map[pol_name][key] = row.get("sample_measurement")
        print(f"[EPA] {pol_name.upper()} records fetched: {len(data_map[pol_name])}")

    # Insert combined pollutant data (driven by PM2.5 as anchor)
    insert_sql = """
        INSERT INTO ground_data (timestamp, latitude, longitude, pm25, no2, so2, o3, co) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """
    cnt = 0
    for key, pm25_value in data_map["pm25"].items():
        lat, lon, timestamp = key[0], key[1], key[2]
        values = {
            "pm25": pm25_value,
            "no2": data_map["no2"].get(key),
            "so2": data_map["so2"].get(key),
            "o3":  data_map["o3"].get(key),
            "co":  data_map["co"].get(key)
        }

        # Avoid duplicates
        cur.execute(
            "SELECT 1 FROM ground_data WHERE timestamp=? AND latitude=? AND longitude=?",
            (timestamp, lat, lon)
        )
        if cur.fetchone() is None:
            cur.execute(insert_sql, (timestamp, lat, lon, values["pm25"], values["no2"], values["so2"], values["o3"], values["co"]))
            cnt += 1
    print(f"[EPA] Inserted {cnt} ground_data rows.")


# ========== METEOSTAT HISTORICAL WEATHER ==========
def ingest_historical_weather(cur: sqlite3.Cursor, lat: float, lon: float, start_date: str, end_date: str):
    start = pd.Timestamp(start_date)
    end = pd.Timestamp(end_date)
    point = Point(lat, lon)
    data = Daily(point, start, end)
    df = data.fetch()
    cnt = 0
    for idx, row in df.iterrows():
        timestamp = idx.isoformat()
        temp = row.get('tavg') if not pd.isna(row.get('tavg')) else row.get('tmax')
        humidity = row.get('rhum') if 'rhum' in row else None
        wind = row.get('wspd') if 'wspd' in row else None
        if temp is not None:
            cur.execute(
                "INSERT INTO weather_data (timestamp, temperature, humidity, wind_speed) VALUES (?, ?, ?, ?)",
                (timestamp, temp, humidity, wind)
            )
            cnt += 1
    print(f"[Meteostat] Inserted {cnt} historical weather rows.")


# ========== MAIN ==========
if __name__ == "__main__":
    conn, cur = get_conn(DB_PATH)
    try:
        ensure_tables(cur)

        # Clear old data
        cur.execute("DELETE FROM ground_data")
        cur.execute("DELETE FROM weather_data")
        conn.commit()

        # Ingest EPA ground monitor data
        ingest_ground_data(cur)
        conn.commit()

        # Ingest historical weather data for NYC
        ingest_historical_weather(cur, CENTER_LAT, CENTER_LON, BDATE, EDATE)
        conn.commit()

        # Preview few rows
        print("\nPreview after ingest:")
        inspect_db(DB_PATH)

    finally:
        conn.close()
