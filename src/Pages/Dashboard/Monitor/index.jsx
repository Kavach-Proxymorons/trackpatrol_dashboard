import { TitlePersonal, LocationTime } from "../../../Components";
import { Map } from "../../../Components";
import { LuCalendar } from "react-icons/lu";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
// import { Info } from "lucide-react";
import Input from "../../../Components/ui-components/input";
import Label from "../../../Components/ui-components/label";
import { Button } from "../../../Components/ui-components/button";
import { IoIosInformationCircle } from "react-icons/io";
import HardwareList from "./hardwarelist";
import PersonnelList from "./personnelList";
import { useStateContext } from "../../../Contexts/ContextProvider";
import { useEffect, useState } from "react";
import { DatePickerWithRange } from "../../../Components/ui-components/datePickerwithRange";
import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { toast } from "react-hot-toast";

const tid = "duty_detail_toast";

export default function Monitor() {
    const { id } = useParams();
    const [date, setDate] = useState({});
    const { registerShift, setRegisterShift, postShift } = useStateContext();

    const { response, loading, error } = useFetch(`/api/v1/admin/duty/${id}`);
    useEffect(() => {
        if (loading) toast.loading("Loading duties...", { id: tid });
        if (response) toast.success(response.message, { id: tid });
        if (error) toast.error(error.message, { id: tid });
        console.log(response);
    }, [loading, error, response]);

    useEffect(() => {
        document.title = "Monitor | Bandobast";
    }, []);

    // Initialize shiftToggle with default values for each shift ID
    const initialShiftToggle = {};
    if (response?.data?.shifts) {
        for (const shift of response?.data?.shifts) {
            initialShiftToggle[shift._id] = false; // Initialize with a default value (true in this case)
        }
    }
    const [shiftToggle, setShiftToggle] = useState(initialShiftToggle);

    const handleSubmit = (e) => {
        e.preventDefault();
        setRegisterShift((prev) => {
            return {
                ...prev,
                duty: id
            };
        });
        postShift(registerShift);
        setDate({});
    };

    return (
        <>
            <div className="mx-8 my-6">
                <Link
                    to="/dashboard"
                    className="flex items-center justify-start pr-4 py-2 bg-[#F4F6FA] w-32 shadow"
                >
                    <IoIosArrowBack size={25} color="#222" />
                    <span className="text-2xl text-neutral-700 font-semibold">
                        Back
                    </span>
                </Link>
                <div className="flex justify-start gap-x-6 mt-6">
                    <div className="flex flex-col justify-start gap-y-6">
                        <div className="bg-[#F4F6FA] px-2 py-3 rounded-md shadow-md">
                            <div className="flex gap-x-2 ml-2">
                                <LuCalendar size={24} color="#000" />
                                <span className="text-lg font-semibold">BANDOBAST SCHEDULE</span>
                            </div>
                            <div className="flex flex-col justify-center items-start bg-white mt-2 rounded text-sm pl-2 py-3">
                                <p>
                                    <span className="text-[#7B7D92]">Start:{" "}</span>
                                    {new Date(response?.data?.start_time).toString().split("G")[0]}
                                </p>
                                <p>
                                    <span className="text-[#7B7D92] pr-2">End:{" "}</span>
                                    {new Date(response?.data?.end_time).toString().split("G")[0]}
                                </p>
                            </div>
                        </div>
                        {/* ------------ Duty location Displaying Map ------------ */}
                        <div className="flex gap-x-2 items-center py-2 px-3">
                            <IoIosInformationCircle size={30} color="#000" />
                            <span className="text-lg font-semibold text-black">
                                BANDOBAST LOCATION
                            </span>
                        </div>
                        <iframe
                            src={`https://maps.google.com/maps?q=${response?.data?.location}&z=15&output=embed`}
                            width="360"
                            height="300"
                            border="0"
                        ></iframe>
                    </div>
                    <div className="flex flex-col w-[34rem] bg-[#F4F6FA] p-6 rounded-md gap-y-4 shadow-md">
                        <h1 className="text-3xl font-semibold">{response?.data?.title}</h1>
                        <p className="text-base text-[#3C3C3C]">{response?.data?.description}</p>
                        <div className="flex gap-x-3">
                            <TitlePersonal />
                            <LocationTime />
                        </div>
                    </div>
                    <div className="w-96 p-4 rounded-md shadow-md bg-[#F4F6FA] mb-12">
                        <div className="flex flex-col justify-between gap-y-4 bg-white w-auto">
                            <h2 className="text-xl font-medium p-3 bg-[#F4F6FA]">Add Shift</h2>
                            <form
                                className="p-4 flex flex-col gap-y-6 rounded"
                                onSubmit={handleSubmit}
                            >
                                <div className="w-auto">
                                    <Label>Shift Name</Label>
                                    <Input
                                        type="text"
                                        name="shift_name"
                                        value={registerShift.shift_name}
                                        onChange={(e) =>
                                            setRegisterShift((prev) => ({
                                                ...prev,
                                                shift_name: e.target.value
                                            }))
                                        }
                                        placeholder="Shift Name"
                                        className="w-full"
                                    />
                                </div>
                                <DatePickerWithRange date={date} setDate={setDate} className="w-auto" />
                                <Button type="submit" className="w-32 self-center">Add Shift</Button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* loop over duty.shifts array */}
                {response?.data?.shifts.map((shift) => {
                    return (
                        <div className="border-3 mt-6 p-3 cursor-pointer" key={shift._id}>
                            {/* below div contains the hardware list and personnel list for every shift */}
                            {/* ------------Shift Name Bar ------------ */}
                            <div
                                onClick={() => {
                                    setShiftToggle((prevShiftToggle) => ({
                                        ...prevShiftToggle,
                                        [shift._id]:
                                            !prevShiftToggle[shift._id] // Toggle the value
                                    }));
                                }}
                            >
                                <h1 className="text-3xl mt-8 font-semibold">{shift.shift_name}</h1>
                            </div>
                            {shiftToggle[shift._id] && (
                                <div>
                                    {/* ------------Shift Info Box ------------ */}
                                    <div className="flex justify-start gap-x-6 mt-6">
                                        {/* ------------Shift schedule Box ------------ */}
                                        <div className="bg-[#F4F6FA] px-2 py-3 rounded-md shadow-md">
                                            <div className="flex gap-x-2 ml-2">
                                                <LuCalendar size={24} color="#000" />
                                                <span className="text-lg font-semibold">SHIFT SCHEDULE</span>
                                            </div>
                                            <div className="flex flex-col justify-center items-start bg-white mt-2 rounded text-sm pl-2 py-3">
                                                <p>
                                                    <span className="text-[#7B7D92]">Start:{" "}</span>
                                                    {new Date(shift.start_time).toString().split("G")[0]}
                                                </p>
                                                <p>
                                                    <span className="text-[#7B7D92] pr-2">End:{" "}</span>
                                                    {new Date(shift.end_time).toString().split("G")[0]}
                                                </p>
                                            </div>
                                        </div>
                                        {/* ------------Shift Monitor Box ------------ */}
                                        <Link
                                            to={`/dashboard/${shift._id}/monitor/details`}
                                            className="w-[20rem] h-[12rem] shadow-md overflow-hidden rounded-xl flex flex-col justify-between bg-[#F4F6FA] p-0"
                                        >
                                            <div className="flex gap-x-2 items-center py-2 px-3">
                                                <IoIosInformationCircle size={30} color="#000" />
                                                <span className="text-lg font-semibold text-black">
                                                    Monitor Info
                                                </span>
                                            </div>
                                            <iframe
                                                src={`https://maps.google.com/maps?q=${response?.data?.location}&z=15&output=embed`}
                                                width="360"
                                                height="200"
                                                border="0"
                                            ></iframe>
                                        </Link>
                                    </div>
                                    {/* ------------Shift Assigned Personnel Table ------------ */}
                                    <br />
                                    {shift.personnel_assigned && (
                                        <PersonnelList
                                            shift_id={shift._id}
                                            data={shift.personnel_assigned}
                                        />
                                    )}
                                    {/* ------------Shift Hardware Attached Table ------------ */}
                                    <br />
                                    {shift.hardwares_attached && (
                                        <HardwareList
                                            shift_id={shift._id}
                                            data={shift.hardwares_attached}
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </>
    );
}
