import { useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const API_URL =
  "https://v2k-dev.vallarismaps.com/core/api/features/1.1/collections/658cd4f88a4811f10a47cea7/items?api_key=bLNytlxTHZINWGt1GIRQBUaIlqz9X45XykLD83UkzIoN6PFgqbH7M7EDbsdgKVwC";

function App() {
  const [map, setMap] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    // ดึงข้อมูลจาก API
    fetch(API_URL)
      .then((res) => res.json())
      .then((result) => {
        setData(result.features);
      });

    // สร้างแผนที่
    const mapInstance = new maplibregl.Map({
      container: "map", // ต้องมี div id="map" ใน JSX
      style: "https://demotiles.maplibre.org/style.json", // สไตล์พื้นฐาน
      center: [100.523186, 13.736717], // พิกัดเริ่มต้น (กรุงเทพฯ)
      zoom: 6,
    });

    setMap(mapInstance);

    return () => mapInstance.remove(); // Cleanup
  }, []);

  useEffect(() => {
    if (map && data.length > 0) {
      data.forEach((feature) => {
        const [lon, lat] = feature.geometry.coordinates;
        new maplibregl.Marker().setLngLat([lon, lat]).addTo(map);
      });
    }
  }, [map, data]);

  return <div id="map" style={{ width: "100vw", height: "100vh" }} />;
}

export default App;
