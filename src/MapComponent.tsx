import React, { useEffect, useState, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import CurrentCoordinates from './CurrentCoordinates';
import countriesData from './Geo-Data/countries.geo.json'; // Path to GeoJSON file
import { GeoJSON } from 'geojson';
import CountryFacts from './CountryFacts'; // Import CountryFacts component

const MapComponent: React.FC = () => {
    const [lat, setLat] = useState(40); // Initial latitude
    const [lng, setLng] = useState(-74.5); // Initial longitude
    const [country, setCountry] = useState<string | null>(null); // Stores selected country name
    const mapRef = useRef<maplibregl.Map | null>(null);

    useEffect(() => {
        const map = new maplibregl.Map({
            container: 'map',
            style: 'https://demotiles.maplibre.org/style.json',
            center: [lng, lat],
            zoom: 3,
        });
        mapRef.current = map;

        map.on('load', () => {
            if (countriesData) {
                map.addSource('countries', {
                    type: 'geojson',
                    data: countriesData as GeoJSON,
                });

                map.addLayer({
                    id: 'countries-layer',
                    type: 'fill',
                    source: 'countries',
                    paint: {
                        'fill-color': '#888888',
                        'fill-opacity': 0.5,
                    },
                });

                map.addLayer({
                    id: 'countries-outline',
                    type: 'line',
                    source: 'countries',
                    paint: {
                        'line-color': '#000',
                        'line-width': 2,
                    },
                });

                map.on('click', 'countries-layer', (e) => {
                    const clickedFeature = e.features && e.features[0];
                    if (clickedFeature) {
                        const countryName = clickedFeature.properties?.name;
                        console.log('Clicked country name:', countryName); // Add this line
                        setCountry(countryName);
                    }
                });

                map.on('mouseenter', 'countries-layer', () => {
                    map.getCanvas().style.cursor = 'pointer';
                });

                map.on('mouseleave', 'countries-layer', () => {
                    map.getCanvas().style.cursor = '';
                });
            }
        });

        const updateCoordinates = () => {
            const center = map.getCenter();
            setLng(center.lng);
            setLat(center.lat);
        };
        const interval = setInterval(updateCoordinates, 300);

        return () => {
            clearInterval(interval);
            map.remove();
        };
    }, []);

    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
            <div id="map" style={{ width: '100%', height: '100%' }} />
            <CurrentCoordinates latitude={lat} longitude={lng} />
            <CountryFacts countryName={country} /> {/* Pass country name to CountryFacts */}
        </div>
    );
};

export default MapComponent;
