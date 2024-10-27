import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const GoogleMapComponent = ({ center, locations = [] }) => {
  const openGoogleMapsDirections = (lat, lng) => {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(googleMapsUrl, "_blank");
  };

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={10}
      options={{ mapTypeControl: false, streetViewControl: false }}
    >
      {locations.map((loc, index) => (
        <Marker
          key={index}
          position={{ lat: loc.latitude, lng: loc.longitude }}
          title={loc.name || "Location"}
          onClick={() => openGoogleMapsDirections(loc.latitude, loc.longitude)}
        />
      ))}
    </GoogleMap>
  );
};

export default GoogleMapComponent;
