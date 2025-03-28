import { useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import Navbar from "../components/navbar";

function Map() {
    const [map, setMap] = useState(null);
    const [data, setData] = useState([]);
    const [apiUrl, setApiUrl] = useState("");
    const [inputApiUrl, setInputApiUrl] = useState("");


    useEffect(() => {
        const mapInstance = new maplibregl.Map({
            container: "map",
            style: "https://api.maptiler.com/maps/basic-v2/style.json?key=pyQd39Pg2Gmdrjguc7bM",
            center: [100.523186, 13.736717],
            zoom: 6,
        });

        mapInstance.addControl(new maplibregl.NavigationControl(), "top-left");
        setMap(mapInstance);

        return () => mapInstance.remove();
    }, []);

    useEffect(() => {
        if (!apiUrl.trim()) return;
        fetch(apiUrl)
            .then((res) => {
                if (!res.ok) {
                    alert(`Error: HTTP Status ${res.status}`);
                    return null;
                }
                return res.json();
            })
            .then((result) => {
                if (!result || !result.features) {
                    alert("Invalid data format: Missing 'features' array.");
                    setData([]);
                    return; 
                }
                setData(result.features);
            })
            .catch((error) => {
                console.error("Error loading data:", error);
                alert(`Error loading data: ${error.message}`);
                setData([]);
            });
    }, [apiUrl]);
    

    
    useEffect(() => {
        if (map && data.length > 0) {
            data.forEach((feature) => {
                const [lon, lat] = feature.geometry.coordinates;
                new maplibregl.Marker().setLngLat([lon, lat]).addTo(map);
            });
        }
    }, [map, data]);

    const handleApiUrlChange = (e) => setInputApiUrl(e.target.value);

    const handleApiUrlSubmit = (e) => {
        e.preventDefault();
        if (inputApiUrl.trim()) setApiUrl(inputApiUrl);
        else alert("Please enter a valid API URL.");
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
                <button type="submit" style={{ padding: "5px 10px", marginLeft: "10px" }}>Load API</button>
            </form>
            <div id="map" style={{ flexGrow: 1 }} />
        </div>
    );
}

export default Map;
