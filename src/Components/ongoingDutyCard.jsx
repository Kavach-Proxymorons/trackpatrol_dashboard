import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { PiHandTap } from "react-icons/pi";

import { Link } from "react-router-dom";
import TitlePersonal from "./titlePersonal";
import LocationTime from "./locationTime";

export default function OngoingDutyCard() {
  const { isLoaded } = useLoadScript({
    // googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API,
  });

  if (!isLoaded) return <>Loading</>;
  else return <RenderMap />;
}

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
    <div className="w-auto h-[12rem] rounded-2xl p-[4px] bg-[#0d77d3e0] relative">
      <GoogleMap
        zoom={15}
        center={center}
        mapContainerClassName="w-full h-full brightness-[.85] rounded-2xl"
        options={defaultMapOptions}
        styles={defaultStyles}
      >
        <Marker position={center} />
      </GoogleMap>
      <div className="absolute top-6 left-12 w-auto drop-shadow-xl">
        <div className="flex gap-x-10">
          <TitlePersonal />
          <LocationTime />
        </div>
      </div>
      <Link
        to="/dashboard/monitor"
        className=" bg-neutral-100 rounded-lg flex justify-between items-center px-3 py-2 gap-x-2
        absolute bottom-20 right-16"
      >
        <span className="text-xl text-neutral-800 font-medium">Monitor</span>
        <PiHandTap size={28} color="#000" />
      </Link>
    </div>
  );
}
