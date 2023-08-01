import { useState, useEffect, useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import marker from '../Assests/marker.png';
import { useStateContext } from "../Contexts/ContextProvider";

function RenderMap() {
  const center = useMemo(() => ({ lat: 26.846, lng: 80.946 }), []);

  const defaultStyles = [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    }
  ];
  const defaultMapOptions = {
    fullscreenControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    zoomControl: false,
    styles: defaultStyles,
  };

  return (
      <GoogleMap
        zoom={15}
        center={center}
        options={defaultMapOptions}
        mapContainerClassName="w-full h-full"
      >
        <Marker position={center} icon={marker} />
      </GoogleMap>
  );
}


export default function Map() {
  const { isLoaded } = useLoadScript({
    // googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API,
  });


  if (!isLoaded) return <>Loading</>;
  else return <RenderMap />;
}
