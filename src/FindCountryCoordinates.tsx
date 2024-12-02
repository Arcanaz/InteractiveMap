import { FeatureCollection, Point, Polygon, MultiPolygon, Geometry } from 'geojson';
import * as turf from '@turf/turf';

// Import the GeoJSON file containing the country boundaries
import countryGeoJSON from './Geo-Data/countries.geojson';

/**
 * Type guard to check if a geometry is a Polygon or MultiPolygon
 */
const isPolygonOrMultiPolygon = (geometry: Geometry): geometry is Polygon | MultiPolygon => {
    return geometry && (geometry.type === 'Polygon' || geometry.type === 'MultiPolygon');
};

/**
 * Function to find which country was clicked based on the coordinates.
 * @param lng The longitude of the clicked point.
 * @param lat The latitude of the clicked point.
 * @param setCountry Callback to update the country state.
 */
const FindCountryCoordinates = (lng: number, lat: number, setCountry: React.Dispatch<React.SetStateAction<string | null>>) => {
    const point: Point = {
        type: 'Point',
        coordinates: [lng, lat],
    };

    const countryCollection: FeatureCollection = countryGeoJSON as FeatureCollection;

    // Iterate through each country in the GeoJSON data
    for (const feature of countryCollection.features) {
        // Check if properties exist
        if (feature.properties) {
            // Check if the feature geometry is a Polygon or MultiPolygon
            if (isPolygonOrMultiPolygon(feature.geometry)) {
                // Check if the point is in the polygon
                if (turf.booleanPointInPolygon(point, feature.geometry)) {
                    const countryName = feature.properties.ADMIN; // Assuming the 'ADMIN' property contains the country name
                    setCountry(countryName);
                    return;
                }
            }
        }
    }

    setCountry('Unknown'); // If no country is found, set to 'Unknown'
};

export default FindCountryCoordinates;
