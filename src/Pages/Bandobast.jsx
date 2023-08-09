import { useEffect, useState, useContext } from "react";
import { Sidebar, Navbar } from "../Components";
import { useStateContext } from "../Contexts/ContextProvider";
import AuthContext from "../Contexts/AuthContext";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const baseUrl =
    process.env.NODE_ENV === "development"
        ? process.env.REACT_APP_DEV_URL
        : process.env.REACT_APP_PROD_URL;

const MapBackground = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API
    });
    const markers = [
        { lat: 28.6400783, lng: 77.2215704 },
        { lat: 28.6411988, lng:77.205048 },
        { lat: 28.6411988, lng: 77.205048 }
    ];

    const onLoad = (map) => {
        const bounds = new window.google.maps.LatLngBounds();
        markers?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
        map.fitBounds(bounds);
    };

    return (
        <div style={{ height: "50vh", width: "88vw" }}>
            {!isLoaded ? (
                <h1>Loading...</h1>
            ) : (
                <GoogleMap
                    mapContainerClassName="map-container"
                    disabled
                    onLoad={onLoad}
                >
                    {markers.map(({ lat, lng }, index) => (
                        <Marker key={index} position={{ lat, lng }} />
                    ))}
                </GoogleMap>
            )}
        </div>
    );
};

export default function Bandobast() {
    const { activeMenu } = useStateContext();
    const { isLoggedIn } = useContext(AuthContext);
    const [dashBoardStats, setDashBoardStats] = useState({});

    const getStats = async () => {
        const response = await fetch(`${baseUrl}/dashboardStats`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const res = await response.json();
        console.log(res.data);
        setDashBoardStats(res.data);
    };

    useEffect(() => {
        document.title = "Hardware's List | Bandobast";
        getStats();
    }, []);
    return (
        <>
            {isLoggedIn && <Sidebar />}
            <div
                className={`${
                    isLoggedIn ? (activeMenu ? "ml-52" : "ml-[84px]") : ""
                } `}
            >
                <Navbar />
                <div classsName="m-3 rounded-lg">
                    <MapBackground />
                </div>
                <div class="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 my-16">
                    <div class="grid grid-cols-2 row-gap-8 md:grid-cols-4">
                        <div class="text-center md:border-r">
                            <h6 class="text-4xl font-bold lg:text-5xl xl:text-6xl">
                            {dashBoardStats["duty"]}
                            </h6>
                            <p class="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
                                Duties Tracked
                            </p>
                        </div>
                        <div class="text-center md:border-r">
                            <h6 class="text-4xl font-bold lg:text-5xl xl:text-6xl">
                            {dashBoardStats["hardware"]}+
                            </h6>
                            <p class="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
                                Hardware Attached
                            </p>
                        </div>
                        <div class="text-center md:border-r">
                            <h6 class="text-4xl font-bold lg:text-5xl xl:text-6xl">
                                {dashBoardStats["personnel"]}+
                            </h6>
                            <p class="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
                                Personnel Registered
                            </p>
                        </div>
                        <div class="text-center">
                            <h6 class="text-4xl font-bold lg:text-5xl xl:text-6xl">
                                {dashBoardStats["issue"]}+
                            </h6>
                            <p class="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
                                Issue Resolved
                            </p>
                        </div>
                    </div>
                </div>
                {/* <div>
                    <div
                        className="h-screen overflow-hidden flex items-center justify-center"
                        style={{ background: "#ffffff" }}
                    >
                        <h1 className="xl:text-5xl md:text-4xl text-2xl font-semibold leading-tight text-center text-gray-800 sm:mb-0 mb-12">
                            More Than 10 Years We Provide Service{" "}
                            <br className="md:block hidden" />
                            in Real State Industry
                        </h1> 
                         <div className="md:mt-14 mt-4 relative sm:flex items-center justify-center">
                            <img
                                src="https://i.ibb.co/KjrPCyW/map.png"
                                alt="world map image"
                                className="w-full xl:h-full h-96 object-cover object-fill sm:block hidden"
                            />
                            <img
                                src="https://i.ibb.co/SXKj9Mf/map-bg.png"
                                alt="mobile-image"
                                className="sm:hidden -mt-10 block w-full h-96 object-cover object-fill absolute z-0"
                            />

                            <div className="shadow-lg xl:p-6 p-4 sm:w-auto w-full bg-white sm:absolute relative z-20 sm:mt-0 mt-4 left-0 xl:ml-56 sm:ml-12 xl:-mt-40 sm:-mt-12">
                                <p className="text-3xl font-semibold text-gray-800">
                                    {dashBoardStats["duty"]}+
                                </p>
                                <p className="text-base leading-4 xl:mt-4 mt-2 text-gray-600">
                                    Duties tracked
                                </p>
                            </div>
                            <div className="shadow-lg xl:p-6 p-4 w-48 sm:w-auto w-full bg-white sm:absolute relative z-20 sm:mt-0 mt-4 xl:mt-80 sm:mt-56 xl:-ml-0 sm:-ml-12">
                                <p className="text-3xl font-semibold text-gray-800">
                                    
                                </p>
                                <p className="text-base leading-4 xl:mt-4 mt-2 text-gray-600">
                                    Hardwares Registered
                                </p>
                            </div>
                            <div className="shadow-lg xl:p-6 p-4 sm:w-auto w-full bg-white sm:absolute relative z-20 md:mt-0 sm:-mt-5 mt-4 right-0 xl:mr-56 sm:mr-24">
                                <p className="text-3xl font-semibold text-gray-800">
                                    {dashBoardStats["personnel"]}+
                                </p>
                                <p className="text-base leading-4 xl:mt-4 mt-2 text-gray-600">
                                    Personnels Registered
                                </p>
                            </div>
                            <div className="shadow-lg xl:p-6 p-4 sm:w-auto w-full bg-white sm:absolute relative z-20 md:mt-0 sm:-mt-5 mt-4 right-0 xl:mr-56 sm:mr-24">
                                <p className="text-3xl font-semibold text-gray-800">
                                    {dashBoardStats["personnel"]}+
                                </p>
                                <p className="text-base leading-4 xl:mt-4 mt-2 text-gray-600">
                                    Personnels Registered
                                </p>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </>
    );
}
