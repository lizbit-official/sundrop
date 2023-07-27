import React, { useState } from 'react';

interface LocationInputProps {

}

const LocationInput = (props: LocationInputProps) => {
  const [location, setLocation] = useState('');

  return (
    <div className="LocationInput">
      <label htmlFor="location">Enter your location</label>
      <input
        type="search"
        role="searchbox"
        aria-label="location"
        aria-description="location results will appear below"
        name="location"
        value={location}
        onChange={(e) => { setLocation(e.target.value); }}
      />
    </div>
  );
};

export default LocationInput;
