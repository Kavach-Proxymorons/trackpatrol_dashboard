import React, { useMemo } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '600px',
};

function LocationPicker({ selectedLocation, setSelectedLocation }) {

    const handleMapClick = (event) => {
        const { latLng } = event;
        setSelectedLocation({
            lat: latLng.lat(),
            lng: latLng.lng(),
        });
    };

    const mapCenter = useMemo(() => {
        return selectedLocation || { lat: 0, lng: 0 };
    }, []);

    return (
        <LoadScript googleMapsApiKey="">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={mapCenter}
                zoom={10}
                onClick={handleMapClick}
            >
                {selectedLocation && <Marker position={selectedLocation} />}
            </GoogleMap>
        </LoadScript>
    );
}

export default LocationPicker;