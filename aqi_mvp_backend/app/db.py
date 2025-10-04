import sqlite3

DB_FILE = "phase1_data.db"

# -------------------- Database Connection --------------------
def get_conn():
    """Return a connection to the SQLite database."""
    return sqlite3.connect(DB_FILE)

# -------------------- Initialize Database --------------------
def init_db():
    """Create tables if they do not exist."""
    conn = get_conn()
    cur = conn.cursor()

    # Weather data table
    cur.execute("""
        CREATE TABLE IF NOT EXISTS weather_data (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT,
            temp REAL,
            humidity REAL,
            wind_speed REAL
        )
    """)

    # Ground data table
    cur.execute("""
        CREATE TABLE IF NOT EXISTS ground_data (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT,
            lat REAL,
            lon REAL,
            pm25 REAL,
            no2 REAL
        )
    """)

    conn.commit()
    conn.close()

# -------------------- Fetch Data --------------------
def fetch_weather_data(limit=10):
    """Fetch latest weather data as JSON."""
    conn = get_conn()
    cur = conn.cursor()
    cur.execute(
        "SELECT timestamp, temp, humidity, wind_speed FROM weather_data ORDER BY timestamp DESC LIMIT ?",
        (limit,)
    )
    rows = cur.fetchall()
    conn.close()
    return [
        {"timestamp": r[0], "temp": r[1], "humidity": r[2], "wind_speed": r[3]}
        for r in rows
    ]

def fetch_ground_data(limit=10, bbox=None):
    """
    Fetch ground data as JSON.
    If bbox is provided, filter by bounding box: (minlat, maxlat, minlon, maxlon).
    """
    conn = get_conn()
    cur = conn.cursor()

    if bbox:
        minlat, maxlat, minlon, maxlon = bbox
        cur.execute(
            """
            SELECT timestamp, lat, lon, pm25, no2
            FROM ground_data
            WHERE lat BETWEEN ? AND ? AND lon BETWEEN ? AND ?
            ORDER BY timestamp DESC
            LIMIT ?
            """,
            (minlat, maxlat, minlon, maxlon, limit)
        )
    else:
        cur.execute(
            "SELECT timestamp, lat, lon, pm25, no2 FROM ground_data ORDER BY timestamp DESC LIMIT ?",
            (limit,)
        )

    rows = cur.fetchall()
    conn.close()
    return [
        {"timestamp": r[0], "lat": r[1], "lon": r[2], "pm25": r[3], "no2": r[4]}
        for r in rows
    ]
