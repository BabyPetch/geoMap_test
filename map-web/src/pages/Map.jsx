import { useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import Navbar from "../components/navbar";

function App() {
    const [map, setMap] = useState(null);
    const [data, setData] = useState([]);
    const [apiUrl, setApiUrl] = useState(" ");
    const [inputApiUrl, setInputApiUrl] = useState(apiUrl);

    useEffect(() => {
        
        fetch(apiUrl)
            .then((res) => res.json())
            .then((result) => {
                setData(result.features);
            });

        // สร้างแผนที่
        const mapInstance = new maplibregl.Map({
            container: "map",
            style: "https://api.maptiler.com/maps/basic-v2/style.json?key=pyQd39Pg2Gmdrjguc7bM", 
            center: [100.523186, 13.736717], 
            zoom: 6,
        });

        setMap(mapInstance);

        return () => mapInstance.remove(); 
    }, [apiUrl]);

    useEffect(() => {
        if (map && data.length > 0) {
            data.forEach((feature) => {
                const [lon, lat] = feature.geometry.coordinates;
                new maplibregl.Marker().setLngLat([lon, lat]).addTo(map);
            });
        }
    }, [map, data]);

    const handleApiUrlChange = (e) => {
        setInputApiUrl(e.target.value);
    };

    const handleApiUrlSubmit = (e) => {
        e.preventDefault();
        setApiUrl(inputApiUrl);
    };

    return (
        <div style={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column" }}>
            <Navbar />
            <form onSubmit={handleApiUrlSubmit} style={{ padding: "10px", backgroundColor: "#fff", zIndex: 1 }}>
                <input
                    type="text"
                    value={inputApiUrl}
                    onChange={handleApiUrlChange}
                    placeholder="Enter API URL"
                    style={{ width: "70%", padding: "5px" }}
                />
                <button type="submit" style={{ padding: "5px 10px", marginLeft: "10px" }}>Load Data</button>
            </form>
            <div id="map" style={{ flexGrow: 1 }} />
        </div>
    );
}

export default App;
