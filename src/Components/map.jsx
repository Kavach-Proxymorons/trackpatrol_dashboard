import { useState, useEffect, useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import blue_marker from "../Assests/blue_marker.png";
import grey_marker from "../Assests/grey_marker.png";
import blue_star_marker from "../Assests/blue_star_marker.png";
import orange_marker from "../Assests/orange_marker.png";

const stateColorMap = {
    GPS_inactive_RFID_inactive: grey_marker,
    GPS_active_RFID_active: blue_star_marker,
    GPS_active_RFID_inactive: blue_marker,
    GPS_inactive_RFID_active: orange_marker,
};

function RenderMap(props) {
    const staleThresholdGPS = process.env.REACT_APP_STALE_THRESHOLD_GPS // in seconds to marker will trun grey
    const staleThresholdRFID = process.env.REACT_APP_STALE_THRESHOLD_RFID // in seconds to marker will trun grey; to update it to a larger value
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

        if (shiftData && shiftData.personnel_assigned) {
            const markerDataTemp = [];
            const now = new Date(); // for comparing how old is the gps data

            shiftData.personnel_assigned.forEach(personnel => {

                if( personnel.gps_data.length === 0 ) // if there is no GPS data for the personnel no point of creating the marker
                    return;
                
                const lastGpsDataTime = new Date(lastGpsData.timestamp);
                const lastGpsData = personnel.gps_data[personnel.gps_data.length - 1];
                const timeDiffGPS = (now - lastGpsDataTime) / 1000; // in seconds
                const lat = Number(lastGpsData.location.split(",")[0]);
                const lng = Number(lastGpsData.location.split(",")[1]);

                if( personnel.rfid_data.length > 0 ){ // if there is RFID data for the personnel (GPS + RFID)
                    const latestRFIDData = personnel.rfid_data[personnel.rfid_data.length - 1];
                    const lastRFIDDataTime = new Date(latestRFIDData.timestamp);
                    const timeDiffRFID = (now - lastRFIDDataTime) / 1000; // in seconds
                
                    let state = "GPS_inactive_RFID_inactive";

                    if (timeDiffGPS < staleThresholdGPS && timeDiffRFID < staleThresholdRFID) {
                        state = "GPS_active_RFID_active";
                    } else if (timeDiffGPS < staleThresholdGPS && timeDiffRFID > staleThresholdRFID) {
                        state = "GPS_active_RFID_inactive";
                    } else if (timeDiffGPS > staleThresholdGPS && timeDiffRFID < staleThresholdRFID) {
                        state = "GPS_inactive_RFID_active";
                    }else {
                        state = "GPS_inactive_RFID_inactive";
                    }

                    markerDataTemp.push({
                        personnel: personnel._id,
                        lat,
                        lng,
                        state
                    });

                }else{ // if there is no RFID data for the personnel (only GPS data)
                    let state = "GPS_inactive_RFID_inactive";

                    if (timeDiffGPS < staleThresholdGPS) {
                        state = "GPS_active_RFID_inactive";
                    }else {
                        state = "GPS_inactive_RFID_inactive";
                    }

                    markerDataTemp.push({
                        personnel: personnel._id,
                        lat,
                        lng,
                        state
                    });
                }
            });
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
                return (
                    <Marker
                        key={index}
                        position={{ lat: point.lat, lng: point.lng }}
                        icon={stateColorMap[point.state]}
                    />
                );
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
