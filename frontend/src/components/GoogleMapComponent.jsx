import React from 'react';
import { GoogleMap, MarkerF } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '650px',
};

const GoogleMapComponent = ({ center, locations = [] }) => {
  // const { isLoaded, loadError } = useLoadScript({
  //   googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  //   version: "3.53.2",
  // });

  // if (loadError) return <div>Error loading maps</div>;
  // if (!isLoaded) return <div>Loading...</div>;

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
        <MarkerF
          key={index}
          position={{ lat: loc.latitude, lng: loc.longitude }}
          title={loc.name || "Location"}
          onClick={() => openGoogleMapsDirections(loc.latitude, loc.longitude)}
          icon={{
            url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
          }}
        />
      ))}
    </GoogleMap>
  );
};

export default GoogleMapComponent;
