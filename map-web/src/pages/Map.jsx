import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import Navbar from "../components/navbar";

const API_URL =
    "https://v2k-dev.vallarismaps.com/core/api/features/1.1/collections/658cd4f88a4811f10a47cea7/items?api_key=bLNytlxTHZINWGt1GIRQBUaIlqz9X45XykLD83UkzIoN6PFgqbH7M7EDbsdgKVwC";

function MapComponent() {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const [features, setFeatures] = useState([]);

    useEffect(() => {
        if (!mapContainerRef.current) return;

        // สร้างแผนที่
        const map = new maplibregl.Map({
            container: mapContainerRef.current,
            style:
                "https://api.maptiler.com/maps/streets-v2/style.json?key=pyQd39Pg2Gmdrjguc7bM",
            center: [100.20222, 15.22218],
            zoom: 5.7,
        });

        mapRef.current = map;

        // ดึงข้อมูลจาก API
        fetch(API_URL)
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched Data:", data);
                if (data && data.features) {
                    setFeatures(data.features);
                }
            })
            .catch((error) => console.error("Error fetching data:", error));

        return () => map.remove();
    }, []);

    useEffect(() => {
        if (!mapRef.current || features.length === 0) return;

        // วาด Marker ลงบนแผนที่
        features.forEach((feature) => {
            const coordinates = feature.geometry.coordinates; // [lng, lat]
            new maplibregl.Marker()
                .setLngLat(coordinates)
                .setPopup(new maplibregl.Popup().setText(feature.properties.name || "No Name")) // เพิ่ม popup แสดงชื่อ
                .addTo(mapRef.current);
        });
    }, [features]);

    return <div ref={mapContainerRef} className="map-container" style={{ width: "100%", height: "100vh" }} />;
}

function MapPage() {
    return (
        <div className="web-map">

            <MapComponent />
        </div>
    );
}

export default MapPage;
