import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  Rectangle,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Location = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  groundAQI: number;
  satelliteAQI: number;
  pm25: number;
  no2: number;
  totalPollutant: number;
};

type MapLayer = "aqi" | "satellite";

const locations: Location[] = [
  {
    id: "1",
    name: "Manhattan",
    lat: 40.7831,
    lng: -73.9712,
    groundAQI: 75,
    satelliteAQI: 80,
    pm25: 8.2,
    no2: 12.5,
    totalPollutant: 15.8,
  },
  {
    id: "2",
    name: "Brooklyn",
    lat: 40.6782,
    lng: -73.9442,
    groundAQI: 82,
    satelliteAQI: 78,
    pm25: 9.1,
    no2: 14.2,
    totalPollutant: 18.3,
  },
  {
    id: "3",
    name: "Queens",
    lat: 40.7282,
    lng: -73.7949,
    groundAQI: 65,
    satelliteAQI: 72,
    pm25: 6.3,
    no2: 8.7,
    totalPollutant: 11.2,
  },
  {
    id: "4",
    name: "Bronx",
    lat: 40.8448,
    lng: -73.8648,
    groundAQI: 70,
    satelliteAQI: 76,
    pm25: 7.5,
    no2: 10.3,
    totalPollutant: 13.6,
  },
  {
    id: "5",
    name: "Staten Island",
    lat: 40.5795,
    lng: -74.1502,
    groundAQI: 60,
    satelliteAQI: 68,
    pm25: 5.4,
    no2: 7.8,
    totalPollutant: 9.9,
  },
  {
    id: "6",
    name: "Long Island City",
    lat: 40.7447,
    lng: -73.9485,
    groundAQI: 95,
    satelliteAQI: 92,
    pm25: 11.8,
    no2: 18.4,
    totalPollutant: 24.1,
  },
  {
    id: "7",
    name: "Williamsburg",
    lat: 40.7081,
    lng: -73.9571,
    groundAQI: 88,
    satelliteAQI: 85,
    pm25: 10.2,
    no2: 15.7,
    totalPollutant: 20.5,
  },
  {
    id: "8",
    name: "Flushing",
    lat: 40.7674,
    lng: -73.8328,
    groundAQI: 55,
    satelliteAQI: 62,
    pm25: 4.8,
    no2: 6.9,
    totalPollutant: 8.7,
  },
  {
    id: "9",
    name: "Harlem",
    lat: 40.8116,
    lng: -73.9465,
    groundAQI: 78,
    satelliteAQI: 81,
    pm25: 8.6,
    no2: 13.1,
    totalPollutant: 16.4,
  },
  {
    id: "10",
    name: "Financial District",
    lat: 40.7074,
    lng: -74.0113,
    groundAQI: 92,
    satelliteAQI: 89,
    pm25: 10.9,
    no2: 16.8,
    totalPollutant: 22.3,
  },
  {
    id: "11",
    name: "Park Slope",
    lat: 40.6710,
    lng: -73.9778,
    groundAQI: 68,
    satelliteAQI: 71,
    pm25: 7.1,
    no2: 9.8,
    totalPollutant: 12.7,
  },
  {
    id: "12",
    name: "Astoria",
    lat: 40.7644,
    lng: -73.9235,
    groundAQI: 73,
    satelliteAQI: 77,
    pm25: 7.9,
    no2: 11.6,
    totalPollutant: 14.9,
  },
];

const highPollutionZones = [
  {
    id: "zone1",
    name: "Industrial Brooklyn",
    bounds: [
      [40.65, -73.96],
      [40.69, -73.92],
    ] as [[number, number], [number, number]],
    level: "high",
  },
  {
    id: "zone2",
    name: "Midtown Manhattan",
    bounds: [
      [40.74, -73.99],
      [40.77, -73.96],
    ] as [[number, number], [number, number]],
    level: "high",
  },
  {
    id: "zone3",
    name: "Upper West Side",
    bounds: [
      [40.77, -73.99],
      [40.80, -73.96],
    ] as [[number, number], [number, number]],
    level: "moderate",
  },
  {
    id: "zone4",
    name: "Lower Queens",
    bounds: [
      [40.70, -73.82],
      [40.73, -73.78],
    ] as [[number, number], [number, number]],
    level: "moderate",
  },
  {
    id: "zone5",
    name: "South Staten Island",
    bounds: [
      [40.54, -74.18],
      [40.57, -74.14],
    ] as [[number, number], [number, number]],
    level: "low",
  },
  {
    id: "zone6",
    name: "Northeast Bronx",
    bounds: [
      [40.87, -73.84],
      [40.90, -73.80],
    ] as [[number, number], [number, number]],
    level: "low",
  },
];

const getMarkerIcon = (aqi: number) => {
  let color = "#10B981";
  if (aqi > 100) color = "#DC2626";
  else if (aqi > 80) color = "#F59E0B";
  else if (aqi > 50) color = "#EAB308";

  return L.divIcon({
    className: "custom-marker",
    html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

const getAQIColor = (aqi: number) => {
  if (aqi > 100) return "bg-red-100 text-red-700";
  if (aqi > 80) return "bg-orange-100 text-orange-700";
  if (aqi > 50) return "bg-yellow-100 text-yellow-700";
  return "bg-green-100 text-green-700";
};

const getZoneColor = (level: string) => {
  if (level === "high") {
    return {
      color: "#DC2626",
      fillColor: "#DC2626",
      fillOpacity: 0.2,
    };
  } else if (level === "moderate") {
    return {
      color: "#F59E0B",
      fillColor: "#F59E0B",
      fillOpacity: 0.2,
    };
  } else {
    return {
      color: "#10B981",
      fillColor: "#10B981",
      fillOpacity: 0.15,
    };
  }
};

const getZoneLabel = (level: string) => {
  if (level === "high") return "High Pollution Zone";
  if (level === "moderate") return "Moderate Pollution Zone";
  return "Low Pollution Zone";
};

const DefaultIcon = L.icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function InteractiveMap() {
  const [mapLayer, setMapLayer] = useState<MapLayer>("aqi");
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );

  const getAQIValue = (location: Location, layer: MapLayer) => {
    return layer === "aqi" ? location.groundAQI : location.satelliteAQI;
  };

  const currentLayerLabel =
    mapLayer === "aqi" ? "Ground AQI Data" : "Satellite AQI Data";

  return (
    <div className="relative flex h-screen w-full overflow-hidden bg-[#F8F9FD]">
      <Card className="relative flex h-full flex-1 flex-col rounded-none border-0">
        <CardContent className="p-4 h-full">
          <MapContainer
            center={[40.7128, -74.006]}
            zoom={11}
            scrollWheelZoom={true}
            className="h-full w-full rounded-[32px] overflow-hidden"
            style={{ position: 'relative', zIndex: 0 }}
          >
            {mapLayer === "aqi" ? (
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
            ) : (
              <TileLayer
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                attribution="&copy; Esri & contributors"
              />
            )}

            {highPollutionZones.map((zone) => (
              <Rectangle
                key={zone.id}
                bounds={zone.bounds}
                pathOptions={getZoneColor(zone.level)}
              >
                <Popup>
                  <strong>{zone.name}</strong>
                  <br />
                  {getZoneLabel(zone.level)}
                </Popup>
              </Rectangle>
            ))}

            {locations.map((location) => {
              const aqiValue = getAQIValue(location, mapLayer);
              return (
                <Marker
                  key={location.id}
                  position={[location.lat, location.lng]}
                  icon={getMarkerIcon(aqiValue)}
                  eventHandlers={{
                    click: () => setSelectedLocation(location),
                  }}
                >
                  <Popup>
                    <strong>{location.name}</strong>
                    <br />
                    {mapLayer === "aqi"
                      ? `Ground AQI: ${location.groundAQI}`
                      : `Satellite AQI: ${location.satelliteAQI}`}
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </CardContent>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-4 z-[1000]">
          <Button
            variant="outline"
            className={cn(
              "rounded-full px-6 shadow-lg",
              mapLayer === "aqi" &&
                "bg-[#2563EB] text-white hover:bg-[#2563EB]/90"
            )}
            onClick={() => setMapLayer("aqi")}
          >
            Ground AQI
          </Button>
          <Button
            variant="outline"
            className={cn(
              "rounded-full px-6 shadow-lg",
              mapLayer === "satellite" &&
                "bg-[#2563EB] text-white hover:bg-[#2563EB]/90"
            )}
            onClick={() => setMapLayer("satellite")}
          >
            Satellite AQI
          </Button>
        </div>
      </Card>

      <div className="relative w-96 border-l bg-white p-6 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">{currentLayerLabel}</h2>

        {locations.map((location) => (
          <Card
            key={location.id}
            className="mb-4 cursor-pointer hover:shadow-md transition"
            onClick={() => setSelectedLocation(location)}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{location.name}</h3>
                <span
                  className={cn(
                    "px-2 py-1 rounded text-sm font-medium",
                    getAQIColor(getAQIValue(location, mapLayer))
                  )}
                >
                  {getAQIValue(location, mapLayer)}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}

        {selectedLocation && (
          <div className="mt-6 p-4 border rounded-lg bg-gray-50">
            <h3 className="text-lg font-bold mb-2">
              {selectedLocation.name} Details
            </h3>
            <div className="space-y-1 text-sm">
              <p>PM2.5: {selectedLocation.pm25.toFixed(4)} μg/m³</p>
              <p>NO2: {selectedLocation.no2.toFixed(4)} ppb</p>
              <p>Total Pollutant: {selectedLocation.totalPollutant.toFixed(4)}</p>
              <p className="mt-2 font-semibold">
                {mapLayer === "aqi"
                  ? `Ground AQI: ${selectedLocation.groundAQI}`
                  : `Satellite AQI: ${selectedLocation.satelliteAQI}`}
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 p-4 border rounded-lg bg-white">
          <h4 className="font-semibold mb-3">AQI Legend</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <span>Good (0-50)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
              <span>Moderate (51-80)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-orange-500"></div>
              <span>Unhealthy for Sensitive (81-100)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-600"></div>
              <span>Unhealthy (100+)</span>
            </div>
          </div>
          
          <h4 className="font-semibold mt-4 mb-3">Pollution Zones</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 opacity-30 border-2 border-green-600"></div>
              <span>Low Pollution Zone</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 opacity-30 border-2 border-orange-600"></div>
              <span>Moderate Pollution Zone</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-600 opacity-30 border-2 border-red-700"></div>
              <span>High Pollution Zone</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}