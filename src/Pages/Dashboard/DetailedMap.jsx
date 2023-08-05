import { Map } from "../../Components";
import { useEffect, useState } from "react";
import { useStateContext } from "../../Contexts/ContextProvider";
import { useParams } from "react-router-dom";
import { IoIosArrowBack, IoIosCar } from "react-icons/io";
import { BiLogoChrome } from "react-icons/bi";
import Input from "../../Components/ui-components/input";
import { Link } from "react-router-dom";
import useWindowSize from "../../hooks/useWindowSize";
import toast from "react-hot-toast";

export default function DetailedMap() {
    const upadteFrequency = process.env.REACT_APP_MAP_UPDATE_FREQUENCY ; // in seconds // to store in env
    const { height } = useWindowSize();
    const { id, shift_id } = useParams(); // duty_id and shift_id from url to be used for fetching data
    const { token } = useStateContext();
    const [lastUpdated, setLastUpdated] = useState();
    const [ shiftData, setShiftData ] = useState({});
    const toastId = "asdkfjlaksd";

    
    const fetchShiftData = async () => {        
        /* Function to fetch shift data from shift_id */
        console.log("fetched");

        const now = new Date(); // current time for updating last updated time

        const baseUrl = process.env.NODE_ENV === "development" ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_PROD_URL;
        const response = await fetch(`${baseUrl}admin/shift/${shift_id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        });

        const res = await response.json();

        if (!res.success) {
        toast.error(res.message, { id: toastId });
            return;
        }
        setShiftData(res.data);
        setLastUpdated(now.toLocaleTimeString());
    }

    useEffect(() => {
        fetchShiftData();
        const interval = setInterval(fetchShiftData, upadteFrequency * 1000); 
        // Clean up interval when the component unmounts
        return () => {
            clearInterval(interval);
        };
    },[])

    return (
        <div
            className={`w-auto relative`}
            style={{ height: `${height - 150}px` }}
        >
            <div className="flex items-center">
                <Link to={`/dashboard/${id}`}>
                    <IoIosArrowBack
                        size={30}
                        className="hover:bg-[#efefefb3] rounded h-10 w-10 cursor-pointer"
                    />
                </Link>
                <Input
                    className="h-12 w-full focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded border-2 border-slate-100 bg-slate-50 hover:bg-secondary"
                    placeholder="🔍 Search a personnel by id..."
                />
            </div>
            <div className="border-t-3 absolute top-13 z-50 w-[280px] bg-background rounded-br-xl">
                <div className="flex flex-col justify-center items-start p-4 gap-y-4">
                    {/* To update below indexes as follows
                        blue Marker : GPS only
                        blue star Marker : RFID + GPS 
                        orange Marker : RFID only
                        Grey Marker : Inactive  */}
                    <div className="w-full border-2 rounded-md p-4">
                        <span className="flex items-center justify-start gap-x-2 font-medium mb-2">
                            <IoIosCar size={30} /> BB-8891776
                        </span>
                        <p className="text-sm">
                            <span className="text-base font-medium">
                                {" "}
                                Total:{" "}
                            </span>{" "}
                            500 Personnel in range
                        </p>
                        <p className="text-sm">4 Km radius covered</p>
                    </div>

                    <div className="w-full border-2 rounded-md p-4">
                        <span className="flex items-center justify-start gap-x-2 font-medium mb-2">
                            <div className="h-5 w-5 bg-[#5030E5] rounded-full"></div>{" "}
                            RFID Signal Update
                        </span>
                        <p className="text-sm">
                            <span className="text-base font-medium">
                                {" "}
                                Total:{" "}
                            </span>{" "}
                            240 Personnel Update
                        </p>
                    </div>

                    <div className="w-full border-2 rounded-md p-4">
                        <span className="flex items-center justify-start gap-x-2 font-medium mb-2">
                            <div className="h-5 w-5 bg-[#4ACE52] rounded-full"></div>{" "}
                            GPS Signal Update
                        </span>
                        <p className="text-sm">
                            <span className="text-base font-medium">
                                {" "}
                                Total:{" "}
                            </span>{" "}
                            240 Personnel Update
                        </p>
                    </div>

                    <div className="w-full border-2 rounded-md p-4">
                        <span className="flex items-center justify-start gap-x-2 font-medium mb-2">
                            <div className="h-5 w-5 bg-[#FE8235] rounded-full"></div>{" "}
                            Issues Tracking
                        </span>
                        <p className="text-sm">
                            <span className="text-base font-medium">
                                {" "}
                                Total:{" "}
                            </span>{" "}
                            240 Personnel Update
                        </p>
                    </div>
                    
                    {/* Update the styling of last updated time */}
                    <div className="w-full border-2 rounded-md p-4">
                        <span className="flex items-center justify-start gap-x-2 font-medium mb-2">
                            <div className="h-5 w-5 bg-[#FE8235] rounded-full"></div>{" "}
                            Last updated Time
                        </span>
                        <p className="text-sm">
                            <span className="text-base font-medium">
                                {" "}
                                {" "}
                            </span>{" "}
                            {lastUpdated}
                        </p>
                    </div>

                </div>
            </div>
            <Map 
                shiftData = {shiftData}
            />
        </div>
    );
}
