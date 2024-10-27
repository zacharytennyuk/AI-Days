import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const GoogleMapComponent = ({ center, locations = [] }) => {
  const openGoogleMapsDirections = (lat, lng) => {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(googleMapsUrl, "_blank"); // Opens Google Maps in a new tab
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={10}
        options={{ mapTypeControl: false, streetViewControl: false }}
      >
        {/* Place markers for each location */}
        {locations.map((loc, index) => (
          <Marker
            key={index}
            position={{ lat: loc.latitude, lng: loc.longitude }}
            title={loc.name || "Location"}
            onClick={() => openGoogleMapsDirections(loc.latitude, loc.longitude)}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
