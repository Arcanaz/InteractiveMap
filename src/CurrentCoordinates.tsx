import React from 'react';

interface CoordinatesProps {
    latitude: number;
    longitude: number;
}

const Coordinates: React.FC<CoordinatesProps> = ({ latitude, longitude }) => {
    return (
        <div style={{
            position: 'absolute',
            bottom: '10px',
            left: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
            padding: '5px',
            borderRadius: '5px',
            zIndex: 1, // Ensure it sits on top of the map
        }}>
            Latitude: {latitude.toFixed(4)}, Longitude: {longitude.toFixed(4)}
        </div>
    );
};

export default Coordinates;
