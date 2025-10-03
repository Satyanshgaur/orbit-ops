import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";

export default function NYCMap() {
  useEffect(() => {
    const map = L.map("map").setView([40.7128, -74.0060], 11);

    const normalLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
    const satelliteLayer = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}");

    const heat = L.heatLayer([], { radius: 25 }).addTo(map);

    // Fetch predicted data
    fetch("/predictions")
      .then(res => res.json())
      .then(data => heat.setLatLngs(data));

    L.control.layers(
      { "Normal": normalLayer, "Satellite": satelliteLayer },
      { "Predicted Heatmap": heat }
    ).addTo(map);

  }, []);

  return <div id="map" style={{ height: "100vh", width: "100%" }}></div>;
}
