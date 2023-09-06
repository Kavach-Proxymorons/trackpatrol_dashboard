import {
    TitlePersonal,
    LocationTime,
    Sidebar,
    Navbar
} from "../../../Components";
import { LuCalendar } from "react-icons/lu";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import Input from "../../../Components/ui-components/input";
import Label from "../../../Components/ui-components/label";
import { Button } from "../../../Components/ui-components/button";
import { IoIosInformationCircle } from "react-icons/io";
import HardwareList from "./hardwarelist";
import PersonnelList from "./personnelList";
import { useStateContext } from "../../../Contexts/ContextProvider";
import AuthContext from "../../../Contexts/AuthContext";
import { useEffect, useState, useRef, useContext } from "react";
import { DatePickerWithRange } from "../../../Components/ui-components/datePickerwithRange";
import { useParams } from "react-router-dom";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "../../../Components/ui-components/card";
import {
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Bar
} from "recharts";

import { DatePicker } from "../../../Components/ui-components/datePicker";
import { AlarmCheck, BadgeInfo, ChevronDown } from "lucide-react";
import useFetch from "../../../hooks/useFetch";
import { toast } from "react-hot-toast";
import { Separator } from "../../../Components/ui-components/separator";

const tid = "toast-id";
const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
];

export default function Monitor() {
    const { id } = useParams();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const startTimeRef = useRef();
    const endTimeRef = useRef();
    const { registerShift, setRegisterShift, postShift, activeMenu } =
        useStateContext();
    const { isLoggedIn } = useContext(AuthContext);

    const { response, loading, error } = useFetch(
        `/api/v1/admin/duty/${id}`,
        tid
    );
    const { response: data } = useFetch(`/api/v1/admin/shift/${id}/report`);
    // console.log();
    useEffect(() => {
        if (loading) toast.loading("Loading duties...", { id: tid });
        if (response) toast.success(response.message, { id: tid });
        if (error) toast.error(error.message, { id: tid });

        setRegisterShift((prev) => {
            return {
                ...prev,
                duty: id
            };
        });
    }, [loading, error, response]);

    const combineDateAndTime = function (date, time) {
        if (date === undefined || date === null) return;
        if (time == undefined || date === null) return;
        const timeString = time[0] + time[1] + ":" + time[2] + time[3] + ":00";

        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const dateString = "" + year + "-" + month + "-" + day;
        const combined = new Date(dateString + " " + timeString);

        return combined;
    };

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

    const handleSelect = () => {
        setRegisterShift((prev) => {
            return {
                ...prev,
                start_time: combineDateAndTime(
                    startDate,
                    startTimeRef.current.value
                ),
                end_time: combineDateAndTime(endDate, endTimeRef.current.value)
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postShift();
        setEndDate();
        setStartDate();
        startTimeRef.current.value = "00:00";
        endTimeRef.current.value = "00:00";
        setRegisterShift({});
    };

    return (
        <>
            {isLoggedIn && <Sidebar />}
            <div
                className={`${
                    isLoggedIn ? (activeMenu ? "ml-52" : "ml-[84px]") : ""
                } `}
            >
                <Navbar />
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
                    <div className="flex justify-start gap-x-6 my-6">
                        <Card className="w-[34rem]  flex flex-col justify-between p-6">
                            <CardHeader className="p-0">
                                <CardTitle className="scroll-m-20 border-b pb-2 text-4xl font-semibold tracking-tight transition-colors first:mt-0">
                                    {response?.data?.title}
                                </CardTitle>
                                <CardDescription className="text-base">
                                    {response?.data?.description}
                                </CardDescription>
                            </CardHeader>
                            <Card>
                                <CardHeader className="pt-4">
                                    <CardTitle className="flex items-center scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0">
                                        <div className="w-10">
                                            <LuCalendar
                                                size={24}
                                                color="#000"
                                            />
                                        </div>
                                        BANDOBAST SCHEDULE
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pb-4">
                                    <p>
                                        <span className="text-[#7B7D92]">
                                            Start Time:{" "}
                                        </span>
                                        {new Date(
                                            response?.data?.start_time
                                        ).getDate() +
                                            " " +
                                            months[
                                                new Date(
                                                    response?.data?.start_time
                                                ).getMonth()
                                            ] +
                                            " " +
                                            new Date(
                                                response?.data?.start_time
                                            ).getFullYear()}
                                    </p>
                                    <p>
                                        <span className="text-[#7B7D92] pr-2">
                                            End Time:{" "}
                                        </span>
                                        {new Date(
                                            response?.data?.end_time
                                        ).getDate() +
                                            " " +
                                            months[
                                                new Date(
                                                    response?.data?.end_time
                                                ).getMonth()
                                            ] +
                                            " " +
                                            new Date(
                                                response?.data?.end_time
                                            ).getFullYear()}
                                    </p>
                                </CardContent>
                            </Card>
                            {/* <CardContent className="flex gap-x-3 px-0 pb-0">
                                <TitlePersonal />
                                <LocationTime />
                            </CardContent> */}
                        </Card>
                        <div className="flex flex-col justify-start gap-y-6">
                            {/* <Card>
                                <CardHeader className="pt-4">
                                    <CardTitle className="flex items-center scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0">
                                        <div className="w-10">
                                            <LuCalendar
                                                size={24}
                                                color="#000"
                                            />
                                        </div>
                                        BANDOBAST SCHEDULE
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pb-4">
                                    <p>
                                        <span className="text-[#7B7D92]">
                                            Start Time:{" "}
                                        </span>
                                        {new Date(
                                            response?.data?.start_time
                                        ).getDate() +
                                            " " +
                                            months[
                                                new Date(
                                                    response?.data?.start_time
                                                ).getMonth()
                                            ] +
                                            " " +
                                            new Date(
                                                response?.data?.start_time
                                            ).getFullYear()}
                                    </p>
                                    <p>
                                        <span className="text-[#7B7D92] pr-2">
                                            End Time:{" "}
                                        </span>
                                        {new Date(
                                            response?.data?.end_time
                                        ).getDate() +
                                            " " +
                                            months[
                                                new Date(
                                                    response?.data?.end_time
                                                ).getMonth()
                                            ] +
                                            " " +
                                            new Date(
                                                response?.data?.end_time
                                            ).getFullYear()}
                                    </p>
                                </CardContent>
                            </Card> */}
                            <Card>
                                <CardHeader className="pb-0 pt-4">
                                    <CardTitle className="flex items-center justify-center scroll-m-20 pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0">
                                        <div className="w-10">
                                            <BadgeInfo size={24} color="#000" />
                                        </div>
                                        BANDOBAST LOCATION
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="pb-4 p-0 overflow-hidden">
                                    <iframe
                                        src={`https://maps.google.com/maps?q=${response?.data?.location}&z=15&output=embed`}
                                        width="360"
                                        height="400"
                                        border="0"
                                    ></iframe>
                                </CardContent>
                            </Card>
                        </div>

                        <Card className="w-[23.5rem]">
                            <CardHeader className="pb-0">
                                <CardTitle className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                                    Add shift
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex gap-x-3 pt-4">
                                <form
                                    className="flex flex-col gap-y-2"
                                    onSubmit={handleSubmit}
                                >
                                    <div className="w-auto">
                                        <Label>Shift Name</Label>
                                        <Input
                                            type="text"
                                            name="shift_name"
                                            value={registerShift.shift_name}
                                            onChange={(e) => {
                                                console.log(e.target.value)
                                                setRegisterShift((prev) => ({
                                                    ...prev,
                                                    shift_name: e.target.value
                                                }));
                                            }}
                                            placeholder="Shift Name"
                                            className="w-full"
                                            required
                                        />
                                    </div>
                                    <div className="w-auto">
                                        <Label>Range</Label>
                                        <Input
                                            type="number"
                                            name="distance_radius"
                                            step="500"
                                            value={
                                                registerShift.distance_radius
                                            }
                                            onChange={(e) =>
                                                setRegisterShift((prev) => ({
                                                    ...prev,
                                                    distance_radius:
                                                        e.target.value
                                                }))
                                            }
                                            placeholder="distance in meters"
                                            className="w-full"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label>Start Time</Label>
                                        <div className="flex gap-x-2 justify-between">
                                            <DatePicker
                                                type="date"
                                                className="w-40"
                                                date={startDate}
                                                setDate={setStartDate}
                                                onSelect={handleSelect}
                                                endDate={
                                                    new Date(
                                                        response?.data?.end_time
                                                    )
                                                }
                                                required
                                            />
                                            <div className="relative time">
                                                <Input
                                                    type="time"
                                                    className="w-40 text-muted-foreground"
                                                    placeholder="00:00"
                                                    defaultValue="00:00"
                                                    ref={startTimeRef}
                                                    onSelect={handleSelect}
                                                    required
                                                />
                                                <AlarmCheck className="absolute right-2 top-2 text-muted-foreground" />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <Label>End Time</Label>
                                        <div className="flex gap-x-2 w-full">
                                            <DatePicker
                                                type="date"
                                                className="w-40"
                                                date={endDate}
                                                setDate={setEndDate}
                                                onSelect={handleSelect}
                                                endDate={
                                                    new Date(
                                                        response?.data?.end_time
                                                    )
                                                }
                                                required
                                            />
                                            <div className="relative time">
                                                <Input
                                                    type="time"
                                                    className="w-40 text-muted-foreground"
                                                    placeholder="00:00"
                                                    name="end_time"
                                                    defaultValue="00:00"
                                                    ref={endTimeRef}
                                                    onSelect={handleSelect}
                                                    required
                                                />
                                                <AlarmCheck className="absolute right-2 top-2 text-muted-foreground" />
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-32 self-center mt-4"
                                    >
                                        Create
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* loop over duty.shifts array */}
                    {response?.data?.shifts.map((shift) => {
                        return (
                            <div
                                className="border rounded-md shadow-sm mb-4 p-3 cursor-pointer"
                                key={shift._id}
                            >
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
                                    className="flex justify-between items-center cursor-pointer"
                                >
                                    <div className="flex justify-between items-center w-full">
                                        <h1 className="scroll-m-20 text-2xl font-medium tracking-tight transition-colors first:mt-0">
                                            {shift.shift_name}
                                            {console.log(shift)}
                                        </h1>
                                        <div className="flex gap-x-6 pr-8">
                                            <p>
                                                <span className="font-medium">
                                                    Start Time:{" "}
                                                </span>
                                                {/* 8 Aug 8:00 AM */}
                                                {new Date(
                                                    shift.start_time
                                                ).toLocaleString()}
                                            </p>
                                            <p>
                                                <span className="font-medium">
                                                    End Time:{" "}
                                                </span>
                                                {new Date(
                                                    shift.end_time
                                                ).toLocaleString()}
                                            </p>
                                            <p>
                                                <span className="font-medium">
                                                    Total Personnel:{" "}
                                                </span>
                                                {
                                                    shift.personnel_assigned
                                                        ?.length
                                                }
                                            </p>
                                            <p>
                                                <span className="font-medium">
                                                    Total Hardware:{" "}
                                                </span>
                                                {
                                                    shift.hardwares_attached
                                                        ?.length
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    <ChevronDown size={32} />
                                </div>
                                {shiftToggle[shift._id] && (
                                    <div>
                                        {/* ------------Shift Info Box ------------ */}
                                        <div className="flex justify-start gap-x-6 mt-6">
                                            {/* ------------Shift schedule Box ------------ */}
                                            <div className="bg-[#F4F6FA] px-2 py-3 rounded-md shadow-md">
                                                <div className="flex gap-x-2 ml-2">
                                                    <LuCalendar
                                                        size={24}
                                                        color="#000"
                                                    />
                                                    <span className="text-lg font-semibold">
                                                        SHIFT SCHEDULE
                                                    </span>
                                                </div>
                                                <div className="flex flex-col justify-center items-start bg-white mt-2 rounded text-sm pl-2 py-3">
                                                    <p>
                                                        <span className="text-[#7B7D92]">
                                                            Start:{" "}
                                                        </span>
                                                        {
                                                            new Date(
                                                                shift.start_time
                                                            )
                                                                .toString()
                                                                .split("G")[0]
                                                        }
                                                    </p>
                                                    <p>
                                                        <span className="text-[#7B7D92] pr-2">
                                                            End:{" "}
                                                        </span>
                                                        {
                                                            new Date(
                                                                shift.end_time
                                                            )
                                                                .toString()
                                                                .split("G")[0]
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                            {/* ------------Shift Monitor Box ------------ */}
                                            <Link
                                                to={`/dashboard/${id}/${shift._id}/monitor/details`}
                                                className="w-[20rem] h-[12rem] shadow-md overflow-hidden rounded-xl flex flex-col justify-between bg-[#F4F6FA] p-0"
                                            >
                                                <div className="flex gap-x-2 items-center py-2 px-3">
                                                    <IoIosInformationCircle
                                                        size={30}
                                                        color="#000"
                                                    />
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
                                            {/* <BarChart
                                                width={730}
                                                height={250}
                                                data={
                                                    data?.alloted_personnel_table
                                                }
                                            >
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="score" />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <Bar
                                                    dataKey="sid"
                                                    fill="#8884d8"
                                                />
                                            </BarChart> */}
                                        </div>
                                        <Link
                                            to={`/print/${shift._id}`}
                                            className="w-24 mt-"
                                        >
                                            <Button className="">Print</Button>
                                        </Link>
                                        {/* ------------Shift Assigned Personnel Table ------------ */}
                                        <br />

                                        <div>
                                            {shift.personnel_assigned && (
                                                <PersonnelList
                                                    shift_id={shift._id}
                                                    data={
                                                        shift.personnel_assigned
                                                    }
                                                />
                                            )}
                                            <Separator className="mt-2 mb-6" />
                                            {shift.hardwares_attached && (
                                                <HardwareList
                                                    shift_id={shift._id}
                                                    data={
                                                        shift.hardwares_attached
                                                    }
                                                />
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
