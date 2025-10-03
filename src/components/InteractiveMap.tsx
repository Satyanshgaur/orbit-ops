import { useState } from "react";
import {MapContainer,
  TileLayer,
  Marker,
  Popup,
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
  },
  {
    id: "2",
    name: "Brooklyn",
    lat: 40.6782,
    lng: -73.9442,
    groundAQI: 82,
    satelliteAQI: 78,
  },
  {
    id: "3",
    name: "Queens",
    lat: 40.7282,
    lng: -73.7949,
    groundAQI: 65,
    satelliteAQI: 72,
  },
  {
    id: "4",
    name: "Bronx",
    lat: 40.8448,
    lng: -73.8648,
    groundAQI: 70,
    satelliteAQI: 76,
  },
  {
    id: "5",
    name: "Staten Island",
    lat: 40.5795,
    lng: -74.1502,
    groundAQI: 60,
    satelliteAQI: 68,
  },
];

// Default Leaflet icon fix (otherwise markers may be broken in Vite/React projects)
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
      {/* Main Map */}
      <Card className="relative flex h-full flex-1 flex-col rounded-none border-0">
        <CardContent className="p-0 h-full">
          <MapContainer
            center={[40.7128, -74.006]} // NYC center
            zoom={11}
            className="h-full w-full rounded-[32px] overflow-hidden"
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

            {/* Markers */}
            {locations.map((location) => (
              <Marker
                key={location.id}
                position={[location.lat, location.lng]}
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
            ))}
          </MapContainer>
        </CardContent>

        {/* Controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-4">
          <Button
            variant="outline"
            className={cn(
              "rounded-full px-6",
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
              "rounded-full px-6",
              mapLayer === "satellite" &&
                "bg-[#2563EB] text-white hover:bg-[#2563EB]/90"
            )}
            onClick={() => setMapLayer("satellite")}
          >
            Satellite AQI
          </Button>
        </div>
      </Card>

      {/* Sidebar with details */}
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
                    getAQIValue(location, mapLayer) > 80
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
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
            <p>
              {mapLayer === "aqi"
                ? `Ground AQI: ${selectedLocation.groundAQI}`
                : `Satellite AQI: ${selectedLocation.satelliteAQI}`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
