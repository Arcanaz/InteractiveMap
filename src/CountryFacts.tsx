import React, { useState, useEffect } from 'react';
import countryFacts from './Geo-Data/countryfacts.json';

interface CountryFactsProps {
    countryName: string | null;
}

const CountryFacts: React.FC<CountryFactsProps> = ({ countryName }) => {
    const [fact, setFact] = useState<string | null>(null);
    const [flag, setFlag] = useState<string | null>(null);

    useEffect(() => {
        if (!countryName) {
            setFact(null);
            setFlag(null);
            return;
        }

        // Find the country object
        const country = countryFacts.find(item => item.name === countryName);

        if (country && country.facts.length > 0) {
            // Randomly select a fact
            const randomIndex = Math.floor(Math.random() * country.facts.length);
            const randomFact = country.facts[randomIndex];
            setFact(randomFact);
            setFlag(country.flag); // Set the flag
        } else {
            setFact(`No fact available for: ${countryName}`);
            setFlag(null);
        }
    }, [countryName]);

    if (!countryName) {
        return <div>Select a country to view facts</div>;
    }

    return (
        <div style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            padding: '10px',
            borderRadius: '5px',
            zIndex: 1,
        }}>
            <h3>{countryName}</h3>
            {flag && <img src={flag} alt={`${countryName} flag`} style={{ width: '50px', height: 'auto' }} />}
            <p>{fact || `No fact available for: ${countryName}`}</p>
        </div>
    );
};

export default CountryFacts;
