import { useState, useEffect, useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import blue_marker from "../Assests/blue_marker.png";
import grey_marker from "../Assests/grey_marker.png";
import blue_star_marker from "../Assests/blue_star_marker.png";
import { useStateContext } from "../Contexts/ContextProvider";

function RenderMap(props) {
    const staleThreshold = 10 // in seconds to check i
    const { shiftData } = props ; // This shift Data is coming from Map Element which renders this map.
    const [ markerData, setMarkerData ] = useState([]); // This will be used to render markers on the map
    const [ dutyLocation, setDutyLocation ] = useState({}); // This is stored in separate state to prevent re-rendering of the map
    
    const center = useMemo(() => {
        if (Object.keys(dutyLocation).length !== 0) {
            return dutyLocation;
        } else {
            return { lat: 28.6756404, lng: 77.5035609 }; 
        }
    }, [dutyLocation]);  // Duty location updates only once, so useMemo is used to prevent re-rendering of the map

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

    useEffect(() => {
        // setting of the duty location as center of the map only once.
        if (shiftData && shiftData.duty?.location && Object.keys(dutyLocation).length === 0) { // once duty location is set, it will not be updated
            const lat = Number(shiftData.duty.location.split(",")[0]);
            const lng = Number(shiftData.duty.location.split(",")[1]);
            setDutyLocation({ lat, lng });
        }

        console.log(shiftData);

        if (shiftData && shiftData.personnel_assigned) {
            const markerDataTemp = [];
            const now = new Date(); // for comparing how old is the gps data

            shiftData.personnel_assigned.forEach(personnel => {
                const gpsData = personnel.gps_data;
                const lastGpsData = gpsData[gpsData.length - 1];
                const lastGpsDataTime = new Date(lastGpsData.timestamp);
                const timeDiff = (now - lastGpsDataTime) / 1000; // in seconds
                const lat = Number(lastGpsData.location.split(",")[0]);
                const lng = Number(lastGpsData.location.split(",")[1]);
            

                // if timeDiff is greater than 10 then the personnel is inactive
                if (timeDiff > staleThreshold ) {
                    markerDataTemp.push({
                        personnel: personnel._id,
                        lat,
                        lng,
                        state: "GPS_inactive"
                    });
                } else {
                    markerDataTemp.push({
                        personnel: personnel._id,
                        lat,
                        lng,
                        state: "GPS_active"
                    });
                }
            });

            console.log("Marker Data", markerDataTemp);
            setMarkerData(markerDataTemp);
        }
    }, [shiftData]);

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
                            icon={blue_marker} // Green Dot
                        />
                    );
                } else {
                    return (
                        <Marker
                            key={index}
                            position={{ lat: point.lat, lng: point.lng }}
                            icon={grey_marker} // Grey Dot
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
