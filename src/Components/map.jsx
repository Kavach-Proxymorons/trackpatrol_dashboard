import { useState, useEffect, useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useStateContext } from "../Contexts/ContextProvider";

function RenderMap(props) {
    const { shiftData } = props ; // This shift Data is coming from Map Element which renders this map.
    

    const defaultStyles = [
        {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
        }
    ];
    const defaultMapOptions = {
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        zoomControl: false,
        styles: defaultStyles
    };

    return (
        <GoogleMap
            zoom={15}
            center={center}
            options={defaultMapOptions}
            mapContainerClassName="w-full h-full"
        >   
            {markerData.map((point, index) => {
                if (point.state === "GPS_active") {
                    return (
                        <Marker
                            key={index}
                            position={{ lat: point.lat, lng: point.lng }}
                            icon={marker_blue} // Green Dot
                        />
                    );
                } else {
                    return (
                        <Marker
                            key={index}
                            position={{ lat: point.lat, lng: point.lng }}
                            icon={marker_blue} // Grey Dot
                        />
                    );
                }
            })}
            {/* <Marker position={center} icon={marker} /> */}
        </GoogleMap>
    );
}

export default function Map(props) {
    const { shiftData } = props ; // This shift Data is coming from DetailedMap Element which renders this map.
    const { isLoaded } = useLoadScript({
        // googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API,
    });

    if (!isLoaded) return <>Loading</>;
    else return <RenderMap
        shiftData = {shiftData}
    />;
}
