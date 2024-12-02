# Interactive Country Map

An interactive map application built with React, TypeScript, and MapLibre, providing geographic insights and fun facts for clicked countries.

## Features

- Displays real-time map using **MapLibre GL**.
- Shows facts and flags for selected countries.
- Updates coordinates dynamically as the map moves.
- Uses GeoJSON for country data and Turf.js for geographic calculations.

## Tech Stack

- **React** & **TypeScript** for UI and type safety.
- **MapLibre GL** for map rendering.
- **Turf.js** for geospatial utilities.

## File Structure

- `src/Geo-Data/`: Contains GeoJSON and facts data.
- `src/components/`: Includes modular React components like `CountryFacts`, `CurrentCoordinates`, and `FindCountryCoordinates`.
