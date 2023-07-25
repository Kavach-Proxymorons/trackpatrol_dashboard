import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { PiHandTap } from "react-icons/pi";
import { FaLocationDot } from "react-icons/fa6";
import { BiSolidTimeFive } from "react-icons/bi";
import { FaBuilding, FaUser } from "react-icons/fa";

export default function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API,
  });

  if (!isLoaded) return <>Loading</>;
  else return <RenderMap />;
}

function RenderMap() {
  const center = useMemo(() => ({ lat: 26.846, lng: 80.946 }), []);
  const defaultMapOptions = {
    fullscreenControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    zoomControl: false,
  };

  return (
    <div className="w-auto h-[16rem] rounded-2xl p-[4px] bg-[#0d77d3e0] relative ">
      <GoogleMap
        zoom={15}
        center={center}
        mapContainerClassName="w-full h-full brightness-[.85] rounded-2xl"
        options={defaultMapOptions}
      >
        <Marker position={center} />
      </GoogleMap>
      <div className="absolute top-12 w-auto drop-shadow-xl">
        <div className="flex justify-between items-center gap-x-96 ml-14">
          <div className="flex gap-x-10">
            <div className="h-40 w-80 flex flex-col justify-between items-start p-3 bg-neutral-100 rounded-xl">
              <div className="flex items-center justify-between gap-x-4">
                <div className="bg-[#DD81120d] rounded-lg p-2">
                  <div className="p-2 bg-[#DD8112] rounded-full flex justify-center items-center">
                    <FaBuilding size={25} color="#fff" />
                  </div>
                </div>
                <span className="bg-[#DD81120d] rounded-lg p-3">
                  PM Narendra Modi's arrival for the speech
                </span>
              </div>

              <div className="flex items-center justify-between gap-x-4">
                <div className="bg-[#DD81120d] rounded-lg p-2">
                  <div className="p-2 bg-[#DD8112] rounded-full flex justify-center items-center">
                    <FaUser size={25} color="#fff" />
                  </div>
                </div>
                <span className="bg-[#DD81120d] rounded-lg p-3">
                  2000 police personnels
                </span>
              </div>
            </div>

            <div className="h-40 w-80 flex flex-col justify-between items-start p-3 bg-neutral-100 rounded-xl">
              <div className="flex items-center justify-between gap-x-4">
                <div className="bg-[rgba(13,119,211,0.05)] rounded-lg p-2">
                  <div className="p-2 bg-[#0D76D3] rounded-full flex justify-center items-center">
                    <FaLocationDot size={25} color="#fff" />
                  </div>
                </div>
                <span className="bg-[rgba(13,119,211,0.05)] rounded-lg p-3">
                  Pune city's Cantonment area, Maharashtra
                </span>
              </div>

              <div className="flex items-center justify-between gap-x-4">
                <div className="bg-[rgba(13,119,211,0.05)] rounded-lg p-2">
                  <div className="p-2 bg-[#0D76D3] rounded-full flex justify-center items-center">
                    <BiSolidTimeFive size={25} color="#fff" />
                  </div>
                </div>
                <span className="bg-[rgba(13,119,211,0.05)] rounded-lg p-3">
                  7 AM - 4 PM
                </span>
              </div>
            </div>
          </div>
          <button className="ml-24 bg-neutral-100 rounded-lg flex justify-between items-center px-3 py-2 gap-x-2">
            <span className="text-xl font-medium">Monitor</span>
            <PiHandTap size={28} />
          </button>
        </div>
      </div>
    </div>
  );
}
